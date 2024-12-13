"use client";

import React, { useEffect } from "react";
import Link from "next/link";
// import { useGetProfileUSERIDQuery } from "redux/features/auth/apiauth";
import { useLazyLoadUserDetailQuery } from "../../../redux/features/apislice";
import { useSelector } from "react-redux";
import { useGetProfileUSERIDQuery } from "../../../redux/features/auth/apiauth";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import { useGetProfileUSERIDQuery } from "../../../redux/features/profile/profileapi";

const Navbar = ({ userId }) => {
  // Fetch user profile using RTK Query
  const { data: profile, error, isLoading } = useGetProfileUSERIDQuery(userId);
console.log(profile)

  // Determine if the profile exists
  const hasProfile = profile?.success ?? false;

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">MyApp</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/notification"><NotificationsActiveIcon/></Link>
          </li>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/filter">Search</Link>
          </li>
          <li>
            <Link href="/request">Request</Link>
          </li>
          <li className="relative group">
            <button className="hover:text-gray-300">Profile</button>
            {/* Dropdown */}
            <div className="absolute bg-white text-black p-2 rounded hidden group-hover:block">
              {isLoading ? (
                <p className="px-4 py-2 text-gray-500">Loading...</p>
              )  : (
                <ul className="space-y-2">
                  {!hasProfile ? (
                    <li>
                      <Link
                        href="/profile/create"
                        className="block px-4 py-2 hover:bg-gray-200"
                      >
                        Create Profile
                      </Link>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/profile/view"
                          className="block px-4 py-2 hover:bg-gray-200"
                        >
                          View Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/profile/edit"
                          className="block px-4 py-2 hover:bg-gray-200"
                        >
                          Edit Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/profile/delete"
                          className="block px-4 py-2 hover:bg-gray-200"
                        >
                          Delete Profile
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
