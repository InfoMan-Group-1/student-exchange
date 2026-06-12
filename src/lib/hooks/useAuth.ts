"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getAuthToken, removeAuthToken } from "@/lib/api-client";

export interface AuthUser {
  userId: number;
  email: string;
  role: "admin" | "student";
  exp: number;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    
    if (token) {
      try {
        const decoded = jwtDecode<AuthUser>(token);
        
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          removeAuthToken();
          setUser(null);
        } else {
          setUser(decoded);
        }
      } catch (err) {
        // Invalid token
        removeAuthToken();
        setUser(null);
      }
    } else {
      setUser(null);
    }
    
    setIsLoading(false);
  }, []);

  const logout = () => {
    removeAuthToken();
    setUser(null);
    window.location.href = "/login";
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    logout
  };
}
