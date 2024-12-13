
"use client"
import React from 'react'
import Navbar from './profile/_components/Navbar'
import ProfileSetup from './profile/_components/ProfileSetup'
import { useSelector } from 'react-redux';

const page = () => {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  return (
 <>
     <div className="bg-gray-900 text-white pt-[20%]">




      {/* Hero Section */}
      <section id="home" className="bg-cover bg-center  relative" >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto flex justify-center items-center h-full text-center px-6">
          <div>
            <h2 className="text-5xl font-semibold text-white mb-4">Connect with the Right Mentors</h2>
            <p className="text-xl text-white mb-8">Empowering growth through mentorship. Learn, grow, and achieve your goals.</p>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-800">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold text-blue-500 mb-8">Our Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6">
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold mb-4">Find the Perfect Mentor</h4>
              <p>Search for mentors based on your career goals and skills to receive tailored guidance.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold mb-4">Connect and Grow</h4>
              <p>Build meaningful relationships and take your career to the next level with personalized mentorship.</p>
            </div>
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg">
              <h4 className="text-2xl font-semibold mb-4">Track Your Progress</h4>
              <p>Set goals, get feedback, and monitor your growth with integrated progress tracking tools.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-900">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold text-blue-500 mb-8">About Us</h3>
          <p className="text-xl text-white max-w-3xl mx-auto">MentorshipHub is a platform that connects mentees with experienced mentors across various fields. Our mission is to foster growth, learning, and collaboration by helping individuals connect with the right mentors who can guide them toward success.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-800">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-semibold text-blue-500 mb-8">Contact Us</h3>
          <p className="text-xl text-white mb-4">Have questions or need assistance? We’re here to help!</p>
          <a href="mailto:contact@mentorshiphub.com" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg">Get in Touch</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6">
        <div className="container mx-auto text-center text-white">
          <p>&copy; 2024 MentorshipHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
 </>
  )
}

export default page
