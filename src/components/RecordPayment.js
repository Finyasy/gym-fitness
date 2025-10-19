import React, { useState, useEffect } from 'react';
import { paymentsAPI, membersAPI } from '../services/api';
import '../styles/Forms.css';

function RecordPayment() {
  const [members, setMembers] = useState([]);
  const [formData, setFormData] = useState({
    member_id: '',
    amount: '',
    payment_date: new Date().toISOString().split('T')[0],
    payment_method: 'Cash',
    status: 'completed',
    notes: ''
  });
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await membersAPI.getAll();
      setMembers(response.data.filter(m => m.status === 'active'));
    } catch (err) {
      console.error('Failed to load members');
    }
  };

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
      await paymentsAPI.create(formData);
      setMessage({ type: 'success', text: 'Payment recorded successfully!' });
      setFormData({
        member_id: '',
        amount: '',
        payment_date: new Date().toISOString().split('T')[0],
        payment_method: 'Cash',
        status: 'completed',
        notes: ''
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.errors?.join(', ') || 'Failed to record payment'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section-container">
      <h2 className="section-title">Record Payment</h2>

      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="member_id">Select Member *</label>
            <select
              id="member_id"
              name="member_id"
              value={formData.member_id}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value="">-- Choose a member --</option>
              {members.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name} - {member.membership_type}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
              disabled={loading}
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="payment_date">Payment Date *</label>
            <input
              type="date"
              id="payment_date"
              name="payment_date"
              value={formData.payment_date}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="payment_method">Payment Method *</label>
            <select
              id="payment_method"
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="Cash">Cash</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Mobile Money">Mobile Money</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="3"
            disabled={loading}
            placeholder="Add any additional notes..."
          />
        </div>

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Recording Payment...' : 'Record Payment'}
        </button>
      </form>
    </div>
  );
}

export default RecordPayment;
