"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SearchBox from "../SearchBox";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/isAuthenticated`,
          { withCredentials: true }
        );
        setIsLoggedIn(res.data.loggedIn);
      } catch (err) {
        console.error("Auth check failed:", err);
        setIsLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      setIsLoggedIn(false);
      router.push("/");
      router.refresh();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out",
      });
    } catch (err) {
      console.error("Logout failed:", err);
      toast({
        title: "Logout failed",
        description: "Could not log out properly",
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-rose-500">
          BazzarConnect
        </Link>

        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <SearchBox />
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/shop" className="text-gray-700 hover:text-rose-500">
            Add Your Shop
          </Link>

          {isLoggedIn === null ? null : isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-rose-500"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/signup" className="text-gray-700 hover:text-rose-500">
                SignUp
              </Link>
              <Link href="/login" className="text-gray-700 hover:text-rose-500">
                Login
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-gray-500"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t p-4">
          <div className="mb-4">
            <SearchBox />
          </div>

          <ul className="space-y-2">
            <li>
              <Link href="/shop" className="block px-4 py-2 hover:text-rose-500">
                Add Your Shop
              </Link>
            </li>

            {isLoggedIn === null ? null : isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 hover:text-rose-500 w-full text-left"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/signup" className="block px-4 py-2 hover:text-rose-500">
                    SignUp
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="block px-4 py-2 hover:text-rose-500">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;