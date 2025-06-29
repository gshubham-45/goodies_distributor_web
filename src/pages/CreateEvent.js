import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateEvent.css';
import axios from 'axios';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    startDate: '',
    endDate: '',
    goodiesDesc: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
   const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:8080/api/events', formData);
      if (response.status === 201 || response.status === 200) {
        setSuccess(true);
        setFormData({
          eventName: '',
          startDate: '',
          endDate: '',
          goodiesDesc: '',
        });
      }
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Failed to create event. Please try again.');
    }
  };

  return (
    <div className="create-event-container">
      <h2>Create New Event</h2>
      <form className="event-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          value={formData.eventName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="goodiesDesc"
          placeholder="Goodies"
          value={formData.goodiesDesc}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {success && navigate('/')
      }
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default CreateEvent;
