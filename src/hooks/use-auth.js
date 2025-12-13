"use client";

import { AuthContext } from "../Shared/Providers/AuthProvider";
import { useContext } from "react";


const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, setUser, loading, refreshUser } = context;

  return { user, setUser, loading, refreshUser };
};

export default useAuth;
