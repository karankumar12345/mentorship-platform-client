"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`https://mentorship-platform-server.onrender.com/api/v1/mentorship/getAllMessage/${userId}`); // Replace with your API URL
        setNotifications(response.data.notifications);
      } catch (err) {
        setError("Failed to load notifications.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner"></div> {/* Add your spinner here */}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Your Notifications</h1>
      
      {notifications.length === 0 ? (
        <div className="text-center text-lg text-gray-500">No notifications yet.</div>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification._id}
              className="border p-4 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              <div className="font-semibold text-lg">{notification.content}</div>
              <div className="text-sm text-gray-500">From: {notification?.userId?.name}</div>
              <small className="text-gray-400">{new Date(notification.createdAt).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
