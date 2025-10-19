import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddMember from '../components/AddMember';
import ViewMembers from '../components/ViewMembers';
import RecordPayment from '../components/RecordPayment';
import ViewPayments from '../components/ViewPayments';
import ViewSchedule from '../components/ViewSchedule';
import '../styles/Dashboard.css';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('add-member');
  const [adminData, setAdminData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const admin = localStorage.getItem('adminData');

    if (!token || !admin) {
      navigate('/admin/login');
    } else {
      setAdminData(JSON.parse(admin));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminData');
    navigate('/admin/login');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'add-member':
        return <AddMember />;
      case 'view-members':
        return <ViewMembers />;
      case 'record-payment':
        return <RecordPayment />;
      case 'view-payments':
        return <ViewPayments />;
      case 'view-schedule':
        return <ViewSchedule />;
      default:
        return <AddMember />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>EXTREME FITNESS</h1>
          <p className="sidebar-slogan">Stronger Every Day</p>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`nav-item ${activeSection === 'add-member' ? 'active' : ''}`}
            onClick={() => setActiveSection('add-member')}
          >
            <span className="nav-icon">➕</span>
            Add Member
          </button>

          <button
            className={`nav-item ${activeSection === 'view-members' ? 'active' : ''}`}
            onClick={() => setActiveSection('view-members')}
          >
            <span className="nav-icon">👥</span>
            View Members
          </button>

          <button
            className={`nav-item ${activeSection === 'record-payment' ? 'active' : ''}`}
            onClick={() => setActiveSection('record-payment')}
          >
            <span className="nav-icon">💳</span>
            Record Payment
          </button>

          <button
            className={`nav-item ${activeSection === 'view-payments' ? 'active' : ''}`}
            onClick={() => setActiveSection('view-payments')}
          >
            <span className="nav-icon">💰</span>
            View Payments
          </button>

          <button
            className={`nav-item ${activeSection === 'view-schedule' ? 'active' : ''}`}
            onClick={() => setActiveSection('view-schedule')}
          >
            <span className="nav-icon">📅</span>
            View Schedule
          </button>
        </nav>

        <div className="sidebar-footer">
          {adminData && (
            <div className="admin-info">
              <p className="admin-name">{adminData.name}</p>
              <p className="admin-email">{adminData.email}</p>
            </div>
          )}
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="content-wrapper">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
