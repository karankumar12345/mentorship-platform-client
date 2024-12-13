"use client";

import React from "react";
import { useRouter } from "next/navigation"; // For navigation
import { useParams } from "next/navigation";
import { useGetProfileUSERIDQuery } from "../../../redux/features/auth/apiauth"; // Adjust the path as needed
// import { useGetUserByIdQuery } from "@/redux/features/auth/apiauth"; // Assuming you need to fetch user data separately

const ViewProfile = () => {
  const params = useParams(); // Get the user ID from the URL params
  const router = useRouter(); // For navigation

  // Fetch profile data using RTK Query
  const { data: userProfile, isLoading, isError } = useGetProfileUSERIDQuery(params.id);
  

  if (isLoading ) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-blue-500 text-lg">Loading user profile...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">User not found</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-6">User Profile</h2>

      <h3 className="text-3xl font-semibold mb-6">{userProfile.profile.user.name}</h3>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-semibold">
          {userProfile?.profile?.role === "mentor" ? "Mentor" : "Mentee"}
        </h3>
        
        {/* Display skills */}
        <p className="mt-2 text-lg font-medium">
          Skills: {userProfile?.profile?.skills?.join(", ") || "No skills listed"}
        </p>
        
        {/* Display interests */}
        <p className="mt-2 text-md text-gray-400">
          Interests: {userProfile?.profile?.interests?.join(", ") || "No interests listed"}
        </p>
        
        {/* Display bio */}
        <p className="mt-4">{userProfile?.profile?.bio || "No bio available"}</p>
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ViewProfile;
