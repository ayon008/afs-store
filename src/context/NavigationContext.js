"use client";
import React, { createContext, useContext, useState } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [selectedNav, setSelectedNav] = useState({
    name: "Wing Foil",
    sublink: { name: "Foil" }
  });

  const updateNavigation = (mainNav, sublink = null) => {
    setSelectedNav({
      name: mainNav,
      sublink: sublink
    });
  };

  return (
    <NavigationContext.Provider value={{ selectedNav, updateNavigation }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
