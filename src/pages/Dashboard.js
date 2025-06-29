import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import axios from 'axios';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleShowDetails = (event) => {
    alert(`Details for: ${event.eventName}`);
  };

  const generateQrCodeForEvent = async (event) => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${event._id || event.eventId}`;
    
    try {
      await axios.put(`http://localhost:8080/api/events/${event._id || event.eventId}`, {
        qrCodeUrl: qrUrl,
      });
      fetchEvents(); // Refresh list after update
    } catch (error) {
      console.error('Error updating QR code:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Events Dashboard</h2>
      <table className="events-table">
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Event Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Goodies</th>
            <th>QR Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event, index) => (
              <tr key={index}>
                <td>{event._id || event.eventId}</td>
                <td>{event.eventName}</td>
                <td>{event.startDate}</td>
                <td>{event.endDate}</td>
                <td>{event.goodies || event.goodiesDesc}</td>
                <td>
                  {event.qrCodeUrl ? (
                    <img src={event.qrCodeUrl} alt="QR Code" className="qr-image" />
                  ) : (
                    <button
                      className="generate-qr-button"
                      onClick={() => generateQrCodeForEvent(event)}
                    >
                      Generate QR
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="details-button"
                    onClick={() => handleShowDetails(event)}
                  >
                    Show Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">No events found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
