import React, { useState, useEffect } from 'react';
import { schedulesAPI } from '../services/api';
import '../styles/Schedule.css';

function ViewSchedule() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await schedulesAPI.getAll();
      setSchedules(response.data);
    } catch (err) {
      setError('Failed to load schedule');
    } finally {
      setLoading(false);
    }
  };

  const getSchedulesByDay = (day) => {
    return schedules.filter(schedule => schedule.day === day);
  };

  if (loading) return <div className="loading">Loading schedule...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="section-container">
      <h2 className="section-title">Weekly Schedule</h2>

      {schedules.length === 0 ? (
        <p className="no-data">No classes scheduled</p>
      ) : (
        <div className="schedule-grid">
          {daysOfWeek.map((day) => {
            const daySchedules = getSchedulesByDay(day);

            return (
              <div key={day} className="day-card">
                <h3 className="day-title">{day}</h3>
                {daySchedules.length === 0 ? (
                  <p className="no-classes">No classes</p>
                ) : (
                  <div className="classes-list">
                    {daySchedules.map((schedule) => (
                      <div key={schedule.id} className="class-item">
                        <div className="class-time">{schedule.time_slot}</div>
                        <div className="class-activity">{schedule.activity}</div>
                        <div className="class-trainer">
                          <span className="trainer-icon">👤</span>
                          {schedule.trainer}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ViewSchedule;
