'use client';

import React from 'react';
import Link from 'next/link';
import ThemeToggle from '../ThemeToggle';
import HoverCardComponent from '../HoverCard';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import SearchBox from '../SearchBox';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-background border-b border-border shadow-sm animate-slide-down">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center space-y-0">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold text-foreground text-rose-500 animate-fade-in"
        >
        BazzarConnect
        </Link>

        {/* SearchBox Section */}
        <div className="flex-grow mx-6 animate-scale-up hidden md:block">
          <SearchBox />
        </div>

        {/* Links Section */}
        <div className="flex items-center space-x-6">
          <ul className="flex flex-col md:flex-row md:space-x-6 mt-3 md:mt-0 animate-fade-in">
            <li>
              <Link
                href="/shop"
                className="text-foreground hover:text-primary block px-3 py-2 rounded-md transition-transform duration-300 hover:scale-105"
              >
                Add Your Shop
              </Link>
            </li>

            <li className="flex items-center space-x-4">
              {/* HoverCard for Menu */}
              <HoverCardComponent
                triggerText={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-foreground transition-transform duration-300 hover:rotate-90"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                }
                contentText={
                  <ul className="space-y-2 animate-fade-in">
                    <li>
                      <Link
                        href="/SignUp"
                        className="text-foreground hover:text-primary block px-3 py-2 rounded-md transition-transform duration-300 hover:scale-105"
                      >
                        SignUp
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        className="text-foreground hover:text-primary block px-3 py-2 rounded-md transition-transform duration-300 hover:scale-105"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/shop"
                        className="text-foreground hover:text-primary block px-3 py-2 rounded-md transition-transform duration-300 hover:scale-105"
                      >
                        Add Your Shop
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contact"
                        className="text-foreground hover:text-primary block px-3 py-2 rounded-md transition-transform duration-300 hover:scale-105"
                      >
                        Contact
                      </Link>
                    </li>
                    <li>
                      <ThemeToggle />
                    </li>
                  </ul>
                }
              />
              {/* Avatar */}
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            type="button"
            className="text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
            aria-controls="navbar-mobile"
            aria-expanded="false"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 19l-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu (hidden by default) */}
      <div
        className="md:hidden flex-col items-center justify-center hidden"
        id="navbar-mobile"
      >
        <ul className="space-y-2">
          <li>
            <Link
              href="/SignUp"
              className="block px-4 py-2 text-foreground hover:text-primary transition-transform duration-300 hover:scale-105"
            >
              SignUp
            </Link>
          </li>
          <li>
            <Link
              href="/login"
              className="block px-4 py-2 text-foreground hover:text-primary transition-transform duration-300 hover:scale-105"
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              href="/shop"
              className="block px-4 py-2 text-foreground hover:text-primary transition-transform duration-300 hover:scale-105"
            >
              Add Your Shop
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block px-4 py-2 text-foreground hover:text-primary transition-transform duration-300 hover:scale-105"
            >
              Contact
            </Link>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}