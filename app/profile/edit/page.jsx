"use client";
import React, { useEffect, useState } from "react";
import { useLazyLoadUserDetailQuery } from "../../../redux/features/apislice";
import { useSelector } from "react-redux";
import { useProfileUpdateMutation } from "../../../redux/features/auth/apiauth";
import { useGetProfileUSERIDQuery } from "../../../redux/features/auth/apiauth";
import toast from "react-hot-toast";
const Page = () => {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [bio, setBio] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [interestInput, setInterestInput] = useState("");

  const [create] = useProfileUpdateMutation();
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  const { data: profile, error } = useGetProfileUSERIDQuery(userId);

  useEffect(() => {
    if (profile?.profile) {
      setRole(profile.profile.role || "");
      setSkills(profile.profile.skills || []);
      setInterests(profile.profile.interests || []);
      setBio(profile.profile.bio || "");
    }
  }, [profile]);

  const handleRoleChange = (e) => setRole(e.target.value);
  const handleSkillInputChange = (e) => setSkillInput(e.target.value);
  const handleInterestInputChange = (e) => setInterestInput(e.target.value);
  const handleBioChange = (e) => setBio(e.target.value);

  const addSkill = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const removeSkill = (skillToRemove) =>
    setSkills(skills.filter((skill) => skill !== skillToRemove));

  const removeInterest = (interestToRemove) =>
    setInterests(interests.filter((interest) => interest !== interestToRemove));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = { role, skills, interests, bio, user: userId };

    try {
      await create(profileData);
      toast.success("Profile updated successfully!");
    } catch (err) {
    toast.error("Failed to update profile. Please try again.");
    }
  };

  if (!profile) return <div>Loading...</div>;
  if (error) return <div>Error loading user details</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold mb-6 text-center text-white">
        Profile Setup
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Role Selection */}
        <label className="text-gray-300 mt-4 block">Role</label>
        <select
          value={role}
          onChange={handleRoleChange}
          className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-gray-200"
        >
          <option value="mentor">Mentor</option>
          <option value="mentee">Mentee</option>
        </select>

        {/* Skills Section */}
        <label className="text-gray-300 mt-4 block">Skills</label>
        <div className="flex flex-wrap mt-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-blue-600 text-white rounded-lg px-3 py-2 m-1 flex items-center"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-2 text-red-400 hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Add a skill"
          value={skillInput}
          onChange={handleSkillInputChange}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), addSkill())
          }
          className="w-full mt-2 p-2 rounded-lg bg-gray-800 text-gray-200"
        />

        {/* Interests Section */}
        <label className="text-gray-300 mt-4 block">Interests</label>
        <div className="flex flex-wrap mt-2">
          {interests.map((interest, index) => (
            <div
              key={index}
              className="bg-green-500 text-white rounded-lg px-3 py-2 m-1 flex items-center"
            >
              <span>{interest}</span>
              <button
                type="button"
                onClick={() => removeInterest(interest)}
                className="ml-2 text-red-400 hover:text-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Add an interest"
          value={interestInput}
          onChange={handleInterestInputChange}
          onKeyDown={(e) =>
            e.key === "Enter" && (e.preventDefault(), addInterest())
          }
          className="w-full mt-2 p-2 rounded-lg bg-gray-800 text-gray-200"
        />

        {/* Bio Section */}
        <label className="text-gray-300 mt-4 block">Bio</label>
        <textarea
          rows="3"
          placeholder="Write a brief bio"
          value={bio}
          onChange={handleBioChange}
          className="w-full mt-2 p-2 rounded-lg bg-gray-800 text-gray-200"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 rounded-lg py-2 text-white font-semibold hover:bg-blue-600 transition"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Page;
