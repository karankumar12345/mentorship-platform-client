"use client";
import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
// import { login, logout } from "../../../redux/features/auth/authSlice";
import { useGetProfileUSERIDQuery, useLogoutMutation } from "../../../redux/features/auth/apiauth";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const Navbar = ({ userId }) => {
  const { data: profile, error, isLoading } = useGetProfileUSERIDQuery(userId);
  console.log(profile);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [logout] = useLogoutMutation();
  let isAuthenticated=false;
if(token){
    isAuthenticated=true;
}
else{
  isAuthenticated=false
}
  const handleLogout = async() => {
    await logout() // Dispatch logout action
    console.log("User logged out");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">MyApp</Link>
        </h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/notification">
              <NotificationsActiveIcon />
            </Link>
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
            <div className="absolute bg-white text-black p-2 rounded hidden group-hover:block">
              {isLoading ? (
                <p className="px-4 py-2 text-gray-500">Loading...</p>
              ) : (
                <ul className="space-y-2">
                  {!profile?.success ? (
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
                        <Link
                          href="/match-profile"
                          className="block px-4 py-2 hover:bg-gray-200"
                        >
                          Match Profile
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
          <li>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="hover:text-gray-300"
              >
                Logout
              </button>
            ) : (
              <Link href="/login" className="hover:text-gray-300">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
