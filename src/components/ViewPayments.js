import React, { useState, useEffect } from 'react';
import { paymentsAPI } from '../services/api';
import '../styles/Tables.css';

function ViewPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await paymentsAPI.getAll();
      setPayments(response.data);
    } catch (err) {
      setError('Failed to load payments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this payment record?')) {
      try {
        await paymentsAPI.delete(id);
        setPayments(payments.filter(payment => payment.id !== id));
      } catch (err) {
        alert('Failed to delete payment');
      }
    }
  };

  const filteredPayments = payments.filter(payment =>
    payment.member?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.payment_method.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status) => {
    const statusClass = status === 'completed' ? 'status-active' :
                       status === 'pending' ? 'status-inactive' : 'status-suspended';
    return <span className={`status-badge ${statusClass}`}>{status}</span>;
  };

  const calculateTotal = () => {
    return filteredPayments
      .filter(p => p.status === 'completed')
      .reduce((sum, payment) => sum + parseFloat(payment.amount), 0)
      .toFixed(2);
  };

  const formatAmount = (amount) => {
    return `Ksh ${parseFloat(amount).toFixed(2)}`;
  };

  if (loading) return <div className="loading">Loading payments...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="section-container">
      <h2 className="section-title">View Payments</h2>

      <div className="table-controls">
        <input
          type="text"
          placeholder="Search by member name or payment method..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="payment-summary">
          <span className="payment-count">Total: {filteredPayments.length} payments</span>
          <span className="payment-total">Total Amount: Ksh {calculateTotal()}</span>
        </div>
      </div>

      {filteredPayments.length === 0 ? (
        <p className="no-data">No payments found</p>
      ) : (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Status</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.member?.name || 'N/A'}</td>
                  <td className="amount">{formatAmount(payment.amount)}</td>
                  <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                  <td>{payment.payment_method}</td>
                  <td>{getStatusBadge(payment.status)}</td>
                  <td className="notes-cell">{payment.notes || '-'}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(payment.id)}
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

export default ViewPayments;
