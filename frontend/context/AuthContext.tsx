// context/AuthContext.tsx
"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
  isLoggedIn: boolean | null;
  setIsLoggedIn: (status: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: null,
  setIsLoggedIn: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/isAuthenticated`, {
        withCredentials: true,
      });
      setIsLoggedIn(res.data.loggedIn);
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
