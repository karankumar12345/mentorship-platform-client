"use client";
import React from "react";
import { useGetAllRequestsQuery, useAcceptRequestMutation, useRejectRequestMutation } from "../../redux/slices/api";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const MentorshipRequests = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id; // Get the current user's ID
  const router = useRouter();

  // Fetch all requests for the user (assuming the userId is passed correctly to the query)
  const { data, isLoading, error } = useGetAllRequestsQuery(userId);

  // Mutations for accepting and rejecting requests
  const [acceptRequest] = useAcceptRequestMutation();
  const [rejectRequest] = useRejectRequestMutation();

  if (isLoading) return <p>Loading requests...</p>;
  if (error) return <p>Error fetching requests: {error.message}</p>;

  // Handle Accept Request
  const handleAccept = (requestId) => {
    acceptRequest({ requestId })
      .unwrap()
      .then((response) => {
        console.log("Request Accepted", response);
        alert("Request Accepted");
      })
      .catch((error) => {
        console.error("Failed to accept request", error);
        alert("Failed to accept request");
      });
  };

  // Handle Reject Request
  const handleReject = (requestId) => {
    rejectRequest({ requestId })
      .unwrap()
      .then((response) => {
        console.log("Request Rejected", response);
        alert("Request Rejected");
      })
      .catch((error) => {
        console.error("Failed to reject request", error);
        alert("Failed to reject request");
      });
  };

  // Handle View Profile
  const handleViewProfile = (userId) => {
    router.push(`/view-profile/${userId}`);
  };

  return (
    <div className="bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">Mentorship Requests</h1>
      <ul className="space-y-6">
        {data?.requests?.map((request) => (
          <li
            key={request._id}
            className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <h2 className="text-xl font-semibold">{request?.sender?.name}</h2>
              <p className="mt-2 sm:mt-0 sm:ml-4">{request?.status}</p>
            </div>

            <div className="mt-4 sm:mt-0 flex flex-wrap justify-between gap-4 sm:gap-6">
              {/* View Profile Button */}
              <button
                onClick={() => handleViewProfile(request?.sender?._id)}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 w-full sm:w-auto"
              >
                View Profile
              </button>

              {/* Accept Button */}
              <button
                onClick={() => handleAccept(request?._id)}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-full sm:w-auto"
              >
                Accept
              </button>

              {/* Reject Button */}
              <button
                onClick={() => handleReject(request?._id)}
                className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 w-full sm:w-auto"
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorshipRequests;
