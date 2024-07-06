import React, { createContext, useState, useContext, useEffect } from 'react';

// Step 2: Create the Context
export const UsernameContext = createContext();

// Step 3: Create a Provider Component
export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState(
    () => JSON.parse(localStorage.getItem('username')) || ""
  );

  useEffect(() => {
    localStorage.setItem('username', JSON.stringify(username));
  }, [username]);

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

