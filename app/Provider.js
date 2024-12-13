"use client"
import { store } from "../redux/store"; // Relative path without alias

// import { store } from "@/redux/store";
import React from  "react";
import { Provider as ReduxProvider } from "react-redux";


const AppProvider =({children})=>{
    return <ReduxProvider store={store}>{children}</ReduxProvider>
}

export default AppProvider;