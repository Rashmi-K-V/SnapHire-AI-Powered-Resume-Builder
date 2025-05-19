import React from "react";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <header className="w-full px-5 py-3 flex justify-between items-center shadow-md z-10  bg-blend-lighten">
      {/* Logo and Branding */}
      <div className="flex items-center gap-2">
        <img src="/logo.svg" alt="logo" className="h-10" />
        <span className="text-2xl font-extrabold bg-gradient-to-r from-rose-500 to-indigo-500 text-transparent bg-clip-text">
          SnapHire
        </span>
      </div>

      {/* Right Side - Auth Buttons */}
      <div className="flex items-center gap-4">
        {isSignedIn ? (
          <>
            <Link to="/dashboard">
              <Button className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300">
                Dashboard
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <Link to="/auth/sign-in">
            <Button className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white font-semibold shadow-md hover:scale-105 transition-transform duration-300">
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
