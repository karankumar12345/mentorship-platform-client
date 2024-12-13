// RouterWrapper.js
"use client";

import React from "react";
import Navbar from "./profile/_components/Navbar";
import { useSelector } from "react-redux";
// Uncomment and use hooks only if needed
// import { useLoadUserQuery } from "../../redux/features/apislice";

const RouterWrapper = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;
  return <>
  <Navbar userId={userId}/>
  {children}
  
  </>;
};

export default RouterWrapper;
