// ViewProfile.js

"use client"
import React from 'react';
import { useRouter } from 'next/router'; // Assuming Next.js routing
import { useSelector } from 'react-redux';

const ViewProfile = () => {
  const router = useRouter();
  const { userId } = router.query; // Get the userId from URL query
  const users = useSelector(state => state.users.data); // Assuming user data is stored in Redux
  const user = users.find(u => u._id === userId); // Find the user based on userId

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">User Profile</h2>
      
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold">{user.role === 'mentor' ? 'Mentor' : 'Mentee'}</h3>
        <p className="mt-2 text-lg font-medium">{user.skills.join(', ')}</p>
        <p className="mt-2 text-md text-gray-400">{user.interests.join(', ')}</p>
        <p className="mt-4">{user.bio}</p>
      </div>

      <button 
        onClick={() => router.push('/user-discovery')}
        className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
      >
        Back to User Discovery
      </button>
    </div>
  );
};

export default ViewProfile;
