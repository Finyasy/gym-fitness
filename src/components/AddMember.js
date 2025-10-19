import React, { useState } from 'react';
import { membersAPI } from '../services/api';
import '../styles/Forms.css';

function AddMember() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membership_type: 'Daily',
    join_date: new Date().toISOString().split('T')[0],
    status: 'active'
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      await membersAPI.create(formData);
      setMessage({ type: 'success', text: 'Member added successfully!' });
      setFormData({
        name: '',
        email: '',
        phone: '',
        membership_type: 'Daily',
        join_date: new Date().toISOString().split('T')[0],
        status: 'active'
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.errors?.join(', ') || 'Failed to add member'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-container">
      <h2 className="section-title">Add New Member</h2>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Full Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="membership_type">Membership Type *</label>
            <select
              id="membership_type"
              name="membership_type"
              value={formData.membership_type}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="join_date">Join Date *</label>
            <input
              type="date"
              id="join_date"
              name="join_date"
              value={formData.join_date}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Adding Member...' : 'Add Member'}
        </button>
      </form>
    </div>
  );
}

export default AddMember;
