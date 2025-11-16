'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_CONTENT } from '../constants/content'; // your base fallback

const ContentContext = createContext();

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(DEFAULT_CONTENT);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('siteContent');
      if (saved) setContent(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('siteContent', JSON.stringify(content));
    }
  }, [content]);

  // 🔧 Generic update function
  const updateContentField = (section, index, field, value) => {
    setContent((prev) => {
      const updated = { ...prev };

      if (index !== null && Array.isArray(updated[section])) {
        updated[section][index] = {
          ...updated[section][index],
          [field]: value,
        };
      } else {
        updated[section] = {
          ...updated[section],
          [field]: value,
        };
      }

      return updated;
    });
  };

  return (
    <ContentContext.Provider value={{ content, updateContentField }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
