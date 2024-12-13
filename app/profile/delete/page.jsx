"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { useDeleteProfileMutation } from "../../../redux/features/auth/apiauth";
import { useSelector } from "react-redux";
import { useProfileDeleteMutation } from "../../../redux/features/auth/apiauth";

const DeleteProfilePage = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const router = useRouter();
  const user = useSelector((state) => state.auth.user);

  const [deleteProfile] = useProfileDeleteMutation();

  const handleDeleteProfile = async () => {
    try {
      await deleteProfile(user?._id).unwrap();
      console.log("Profile deleted successfully.");
      router.push("/"); // Redirect to home page after deletion
    } catch (err) {
      console.error("Failed to delete the profile:", err);
    }
  };

  const toggleConfirmation = () => setIsConfirmed((prev) => !prev);

  return (
    <div className="max-w-lg mx-auto p-6 bg-red-900 rounded-lg shadow-lg mt-10">
      <h2 className="text-4xl font-bold text-center mb-6 text-white">
        Delete Your Profile
      </h2>

      <p className="text-gray-300 mb-4">
        Are you sure you want to delete your profile? This action is
        <strong className="text-red-500">irreversible</strong>.
      </p>

      <div className="flex justify-center gap-4 mt-6">
        {!isConfirmed ? (
          <button
            onClick={toggleConfirmation}
            className="px-6 py-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition"
          >
            Delete Profile
          </button>
        ) : (
          <>
            <button
              onClick={handleDeleteProfile}
              className="px-6 py-2 bg-red-900 rounded-lg text-white hover:bg-red-800 transition"
            >
              Confirm Delete
            </button>

            <button
              onClick={toggleConfirmation}
              className="px-6 py-2 bg-gray-600 rounded-lg text-white hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DeleteProfilePage;
