"use client";

import { useLoginMutation } from "../../redux/features/auth/apiauth";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  
  });

  const [register] = useLoginMutation();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {email, password } = formData;
    const data = {
   
      email,
      password,
   
    };

    try {
      const res = await register(data).unwrap();

      console.log(res);

      toast.success("Registration successful! 🎉");  // Success notification
    } catch (error) {
      console.error(error);
      toast.error("Registration failed! Please try again. ❌");  // Error notification
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600">
      <div className="p-4 sm:p-6 lg:p-10 bg-gray-800 rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-3xl font-bold text-white mb-4 text-center">
          Welcome to Mentorship Platform
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
      

          {/* Email Input */}
          <div className="flex flex-col mb-4">
            <label className="text-white font-medium">Enter Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. karan123@gmail.com"
              required
              className="w-full p-2 border rounded-md mt-2 bg-gray-700"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col mb-4">
            <label className="text-white font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full p-2 border rounded-md mt-2 bg-gray-700"
            />
          </div>


          {/* Submit Button */}
          <button
            className="w-full bg-blue-500 text-white hover:bg-blue-600 transition-transform duration-300 py-2 rounded-md"
            type="submit"
            disabled={loading}
          >
            {loading ? "Login..." : "Submit "}
          </button>
        </form>

        {/* Loading Spinner */}
        {loading && (
          <div className="mt-5 flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-blue-500 font-medium">Wait...</p>
          </div>
        )}
        <div className="mt-5 text-center">
          <p className="text-white">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>


    </div>
  );
};

export default Page;
