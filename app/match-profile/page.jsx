"use client";
import React, { useEffect, useState } from "react";
import { useGetAllProfileQuery } from "../../redux/features/auth/apiauth";

import { useSelector } from "react-redux";
import { useSendRequestMutation } from "../../redux/slices/api";
import toast from "react-hot-toast";
const MatchmakingPage = () => {
  const [suggestedMatches, setSuggestedMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [requestMentorship] = useSendRequestMutation();
  const { data: allUsers, isLoading, isError } = useGetAllProfileQuery();
  const currentUserId = useSelector((state) => state.auth.user);
  const currentUserIdTo = currentUserId?._id;

  console.log(allUsers)
  // Basic Matching Algorithm
  const calculateSimilarity = (user1, user2) => {
    const skillsMatch = user1.skills.filter((skill) =>
      user2.skills.includes(skill)
    ).length;
    const interestsMatch = user1.interests.filter((interest) =>
      user2.interests.includes(interest)
    ).length;

    return skillsMatch + interestsMatch;
  };

  const getSuggestedMatches = () => {
    if (!allUsers?.Profiles) {
      setError("Profiles data is not available.");
      setLoading(false);
      return;
    }

    const mentee = allUsers.Profiles.find((user) => user.role === "mentee");
    const mentors = allUsers.Profiles.filter((user) => user.role === "mentor");

    if (!mentee || mentors.length === 0) {
      setError("No mentee or mentors available for matching.");
      setLoading(false);
      return;
    }

    const matches = mentors.map((mentor) => ({
      mentor,
      score: calculateSimilarity(mentee, mentor),
    }));

    matches.sort((a, b) => b.score - a.score);

    setSuggestedMatches(matches.slice(0, 3) || []);
    setLoading(false);
  };

  const handleConnectRequest = (mentorId) => {
    const requestData = {
      sender: currentUserIdTo,
      receiver: mentorId,
    };
    requestMentorship(requestData)
    toast.success("Request Sent Successfully")
 
  };

  useEffect(() => {
    if (!isLoading && !isError) {
      getSuggestedMatches();
    }
  }, [isLoading, isError, allUsers]);

  if (isLoading) return <p>Loading matches...</p>;
  if (isError || error) return <p>{error || "An error occurred while fetching data."}</p>;

  return (
    <div className="bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Suggested Mentorship Matches
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestedMatches.length === 0 ? (
          <p>No matching mentors found.</p>
        ) : (
          suggestedMatches.map(({ mentor, score }) => (
            <div key={mentor._id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold">Mentor Name: {mentor?.user?.name}</h3>
              <h4 className="text-xl font-semibold">Mentor Email: {mentor?.user?.email}</h4>
              <p className="mt-2 text-lg font-medium">
                Skills: {mentor.skills.join(", ")}
              </p>
              <p className="mt-2 text-md text-gray-400">
                Interests: {mentor.interests.join(", ")}
              </p>
              <p className="mt-4">{mentor.bio}</p>
              <p className="mt-2 text-yellow-500">Match Score: {score}</p>
             
                <button
                  onClick={() => handleConnectRequest(mentor?.user?._id)}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 mt-2"
                >
                  Connect
                </button>
         
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MatchmakingPage;
