"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useSendRequestMutation } from "../../redux/slices/api";
import { useFilterUsersQuery, } from "../../redux/features/auth/apiauth";

const UserDiscovery = () => {
  const { data: users, isLoading, error } = useFilterUsersQuery();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [skillsFilter, setSkillsFilter] = useState("");
  const [interestsFilter, setInterestsFilter] = useState("");
  const [requestMentorship] = useSendRequestMutation();
  const router = useRouter();

  // Get the currently logged-in user's ID from Redux state
  const currentUserId = useSelector((state) => state.auth.user);
  const currentUserIdTo = currentUserId?._id;

  useEffect(() => {
    if (users) {
      setFilteredUsers(users); // Set users initially when fetched
    }
  }, [users]);

  // Function to apply filters
  const viewProfile = (userId) => {
    router.push(`/view-profile/${userId}`);
  };

  const applyFilters = () => {
    let filtered = users;

    if (roleFilter) {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }
    if (skillsFilter) {
      filtered = filtered.filter((user) =>
        user.skills.some((skill) =>
          skill.toLowerCase().includes(skillsFilter.toLowerCase())
        )
      );
    }
    if (interestsFilter) {
      filtered = filtered.filter((user) =>
        user.interests.some((interest) =>
          interest.toLowerCase().includes(interestsFilter.toLowerCase())
        )
      );
    }

    setFilteredUsers(filtered);
  };

  // Function to reset filters
  const resetFilters = () => {
    setRoleFilter("");
    setSkillsFilter("");
    setInterestsFilter("");
    setFilteredUsers(users); // Reset to the original user list
  };

  // Handle filter input change
  const handleFilterChange = (filterType, value) => {
    if (filterType === "role") {
      setRoleFilter(value);
    } else if (filterType === "skills") {
      setSkillsFilter(value);
    } else if (filterType === "interests") {
      setInterestsFilter(value);
    }
    applyFilters(); // Apply filters whenever any filter is changed
  };

  // Send connection request
  const handleConnectRequest = (receiverId) => {
    const requestData = {
      sender: currentUserIdTo,
      receiver: receiverId,
    };

    requestMentorship(requestData)
      .unwrap() // For handling success and error responses
      .then((response) => {
        console.log("Request Sent Successfully", response);
        alert("Connection request sent successfully");

        // Update the filtered users with the new request status
        setFilteredUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === receiverId
              ? { ...user, connectionStatus: "requested" }
              : user
          )
        );
      })
      .catch((error) => {
        console.error("Failed to send request", error);
        alert("Failed to send connection request");
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading users</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">User Discovery</h2>

      {/* Filter Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-lg mb-2">Role</label>
          <select
            className="p-3 border border-gray-300 rounded-lg bg-gray-800 text-white"
            value={roleFilter}
            onChange={(e) => handleFilterChange("role", e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="mentor">Mentor</option>
            <option value="mentee">Mentee</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-lg mb-2">Skills</label>
          <input
            type="text"
            placeholder="Filter by skills"
            className="p-3 border border-gray-300 rounded-lg bg-gray-800 text-white"
            value={skillsFilter}
            onChange={(e) => handleFilterChange("skills", e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-lg mb-2">Interests</label>
          <input
            type="text"
            placeholder="Filter by interests"
            className="p-3 border border-gray-300 rounded-lg bg-gray-800 text-white"
            value={interestsFilter}
            onChange={(e) => handleFilterChange("interests", e.target.value)}
          />
        </div>
      </div>

      {/* Buttons to Apply and Reset Filters */}
      <div className="flex justify-between mb-6">
        <button
          onClick={applyFilters}
          className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700"
        >
          Reset Filters
        </button>
      </div>

      {/* User Profiles List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length === 0 ? (
          <p>No profiles found matching the filters.</p>
        ) : (
          filteredUsers.map((user) => (
            <div key={user._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">
                {user.role === "mentor" ? "Mentor" : "Mentee"}
              </h3>
              <p className="mt-2 text-lg font-medium">
                {user.skills.join(", ")}
              </p>
              <p className="mt-2 text-md text-gray-400">
                {user.interests.join(", ")}
              </p>
              <p className="mt-4">{user.bio}</p>

              {/* Connect Request Button */}
              {user.connectionStatus === "requested" ? (
                <p className="text-yellow-500 mt-2">Request Sent</p>
              ) : user.connectionStatus === "accepted" ? (
                <p className="text-green-500 mt-2">Request Accepted</p>
              ) : user.connectionStatus === "rejected" ? (
                <p className="text-red-500 mt-2">Request Rejected</p>
              ) : (
                <button
                  onClick={() => handleConnectRequest(user.user)}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 mt-2"
                >
                  Connect
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserDiscovery;
