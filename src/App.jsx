import React from "react";
import { Navigate, Outlet } from "react-router-dom"
import { Button } from "./components/ui/button"
import { useState } from "react"
import "./App.css"
import reactlogo from "./assets/react.svg"
import { useUser } from '@clerk/clerk-react'
import SignInPage from "@/auth/sign-in"
import Header from "./components/custom/Header";


function App() {
  //const [count,setCount] = useState(0)
  //info about user information
  const {user,isLoaded,isSignedIn}=useUser();

  if(!isSignedIn && isLoaded){
    //if user is not signed in and is loaded 
    return <Navigate to={'/auth/sign-in'} />
  }

  return (
   <>
   {/* Throughout we use same header */}
   <Header/>
   {/* Can render all the routes such as home,dashboard */}
    <Outlet/>
   </> 
  )
}

export default App
