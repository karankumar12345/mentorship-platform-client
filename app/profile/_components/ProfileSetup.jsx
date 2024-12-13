"use client";

import { useLazyLoadUserDetailQuery } from '../../../redux/features/apislice';
import { useProfileUpdateMutation } from '../../../redux/features//profile/profileapi';
import React, { useState, useEffect } from 'react';
// import { useProfileUpdateMutation } from '../redux/features/profile/profileapi';
// import { useLazyLoadUserDetailQuery } from "../redux/features/apislice";
// import { useLazyLoadUserDetailQuery } from '@/redux/features/api/apiSlice';

const ProfileSetup = () => {
  const [role, setRole] = useState('');
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [bio, setBio] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [interestInput, setInterestInput] = useState('');
  
  // Redux hook to load user details
  const [loadUserDetail, { data: userDetail, isLoading, isError }] = useLazyLoadUserDetailQuery();
  const [create] = useProfileUpdateMutation();
  

  useEffect(() => {
    loadUserDetail();
    
    console.log('User details loaded:', userDetail);
    // Call to load user details
  }, [loadUserDetail]);

  const handleRoleChange = (event) => setRole(event.target.value);

  const handleSkillInputChange = (event) => {
    setSkillInput(event.target.value);
  };

  const handleInterestInputChange = (event) => {
    setInterestInput(event.target.value);
  };

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const removeInterest = (interestToRemove) => {
    setInterests(interests.filter(interest => interest !== interestToRemove));
  };

  const handleBioChange = (event) => setBio(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return; // Prevent submission while loading

    const profileData = {
      role,
      skills,
      interests,
      bio,
      user: "675ab41efe23fd07d765ac4d",  // Include userId in profile data
    };

    console.log(profileData)
    console.log('Profile data submitted:', profileData);

    try {
      await create(profileData);
      // Handle success (e.g., show success message or navigate to another page)
    } catch (error) {
      console.log('Error submitting profile:', error);
      // Handle error (e.g., show error message)
    }
  };

  if (isLoading) {
    return <div>Loading user details...</div>;
  }

  if (isError || !userDetail) {
    return <div>Error loading user details</div>;
  }

  return (
    <div className="bg-gray-900 text-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-6">Profile Setup</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="role" className="block text-lg font-medium text-gray-700">Role</label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-900"
            required
          >
            <option value="">Select your role</option>
            <option value="mentor">Mentor</option>
            <option value="mentee">Mentee</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="skills" className="block text-lg font-medium text-gray-700">Skills</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <div key={index} className="bg-gray-900 text-blue-800 px-3 py-1 rounded-lg flex items-center">
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            id="skills"
            value={skillInput}
            onChange={handleSkillInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
              }
            }}
            placeholder="Press Enter to add skill"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-900"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="interests" className="block text-lg font-medium text-gray-700">Interests</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {interests.map((interest, index) => (
              <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-lg flex items-center">
                <span>{interest}</span>
                <button
                  type="button"
                  onClick={() => removeInterest(interest)}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <input
            type="text"
            id="interests"
            value={interestInput}
            onChange={handleInterestInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addInterest();
              }
            }}
            placeholder="Press Enter to add interest"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-900"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="bio" className="block text-lg font-medium text-gray-700">Bio</label>
          <textarea
            id="bio"
            value={bio}
            onChange={handleBioChange}
            placeholder="Write a brief bio about yourself"
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-gray-900"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileSetup;
