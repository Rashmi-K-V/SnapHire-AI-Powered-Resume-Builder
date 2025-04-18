import React from 'react'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Button } from '../ui/button'
import { Link, Links, Outlet } from 'react-router-dom'
import SignInPage from "@/auth/sign-in"
import Dashboard from "@/dashboard/index.jsx";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className='p-2 pt-3 flex justify-between shadow-md'>
      <img src="/logo.svg" alt="logo" height={25} />

      {isSignedIn ?
        <div className='flex gap-2 items-center'>
          <Link to={'/dashboard'}> 
            <Button variant="outline">Dashboard</Button>
          </Link>
          <UserButton />
        </div> :
        //  At click of Get Started, it will direct to auth/sign-in 
        <Link to={'/auth/sign-in'}>
          <Button>Get Started</Button>
        </Link>
      }

    </div>
  )
}

export default Header