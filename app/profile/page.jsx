
"use client"
import Link from 'next/link'
import React from 'react'
import Navbar from './_components/Navbar'
// import { useLazyLoadUserDetailQuery } from '../../redux/features/apislice';
import { useSelector } from 'react-redux';
const page = () => {
  const user = useSelector((state) => state.auth.user);


  console.log(user)
   const userId=user?._id
  return (
  <>
 

  </>
  )
}

export default page

