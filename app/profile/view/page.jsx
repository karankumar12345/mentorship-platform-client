"use client";
import React from "react";
import { useSelector } from "react-redux";
import { useGetProfileUSERIDQuery } from "../../../redux/features/auth/apiauth";

const Page = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  // Fetch user profile using RTK Query
  const { data: profile, error, isLoading } = useGetProfileUSERIDQuery(userId);


  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching profile: {error.message}</p>;

  return (
 
        <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-900 rounded-lg shadow-lg">
          {profile ? (
            <>
              <h2 className="text-3xl font-bold mb-6 text-center text-white">
                🧑‍💼 Profile Information
              </h2>
    
              <div className="space-y-4">
                {/* Role */}
                <p className="text-white">
                  <strong className="font-medium">Role:</strong> {profile.profile.role}
                </p>
    
                {/* Skills */}
                <p className="text-white">
                  <strong className="font-medium">Skills:</strong>{" "}
                  {Array.isArray(profile.profile.skills) ? profile.profile.skills.join(", ") : "N/A"}
                </p>
    
                {/* Interests */}
                <p className="text-white">
                  <strong className="font-medium">Interests:</strong>{" "}
                  {Array.isArray(profile.profile.interests) ? profile.profile.interests.join(", ") : "N/A"}
                </p>
    
                {/* Bio */}
                <p className="text-white">
                  <strong className="font-medium">Bio:</strong> {profile.profile.bio}
                </p>
    
                {/* Created At */}
                <p className="text-white">
                  <strong className="font-medium">Created At:</strong>{" "}
                  {new Date(profile.profile.createdAt).toLocaleDateString()}
                </p>
    
                {/* Updated At */}
                <p className="text-white">
                  <strong className="font-medium">Updated At:</strong>{" "}
                  {new Date(profile.profile.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </>
          ) : (
            <p className="text-center text-white mt-4">No profile information available</p>
          )}
        </div>

  );
};

export default Page;
