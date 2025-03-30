'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/avatar";
import SearchBox from '../SearchBox'; 

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-rose-500">
          BazzarConnect
        </Link>

        {/* SearchBox - Desktop */}
        <div className="hidden md:flex flex-1 max-w-xl mx-4">
          <SearchBox />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/shop" className="text-gray-700 hover:text-rose-500">
            Add Your Shop
          </Link>
          <Link href="/signup" className="text-gray-700 hover:text-rose-500">
            SignUp
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-rose-500">
            Login
          </Link>
          
          {/* Avatar */}
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden p-2 text-gray-500"
        >
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t p-4">
          {/* SearchBox - Mobile */}
          <div className="mb-4">
            <SearchBox />
          </div>

          <ul className="space-y-2">
            <li><Link href="/shop" className="block px-4 py-2 hover:text-rose-500">Add Your Shop</Link></li>
            <li><Link href="/signup" className="block px-4 py-2 hover:text-rose-500">SignUp</Link></li>
            <li><Link href="/login" className="block px-4 py-2 hover:text-rose-500">Login</Link></li>
          </ul>
        </div>
      )}
    </nav>
  );
}