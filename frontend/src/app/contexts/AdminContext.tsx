"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminContextType {
  isAdminLoggedIn: boolean;
  adminLogin: (token: string) => void;
  adminLogout: () => void;
  token: string | null;
  isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if admin token exists on mount
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      setToken(adminToken);
      setIsAdminLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const adminLogin = (newToken: string) => {
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
    setIsAdminLoggedIn(true);
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setIsAdminLoggedIn(false);
  };

  return (
    <AdminContext.Provider value={{ isAdminLoggedIn, adminLogin, adminLogout, token, isLoading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error("useAdmin must be used within AdminProvider");
  return context;
};
