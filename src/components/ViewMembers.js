import React, { useState, useEffect } from 'react';
import { membersAPI } from '../services/api';
import '../styles/Tables.css';

function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      setMembers(response.data);
    } catch (err) {
      setError('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await membersAPI.delete(id);
        setMembers(members.filter(member => member.id !== id));
      } catch (err) {
        alert('Failed to delete member');
      }
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  const getStatusBadge = (status) => {
    const statusClass = status === 'active' ? 'status-active' :
                       status === 'inactive' ? 'status-inactive' : 'status-suspended';
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  if (loading) return <div className="loading">Loading members...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="section-container">
      <h2 className="section-title">View Members</h2>

      <div className="table-controls">
        <input
          type="text"
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="member-count">Total: {filteredMembers.length} members</div>
      </div>

      {filteredMembers.length === 0 ? (
        <p className="no-data">No members found</p>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Membership</th>
                <th>Join Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member) => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email || '-'}</td>
                  <td>{member.phone}</td>
                  <td>{member.membership_type}</td>
                  <td>{new Date(member.join_date).toLocaleDateString()}</td>
                  <td>{getStatusBadge(member.status)}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(member.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewMembers;
