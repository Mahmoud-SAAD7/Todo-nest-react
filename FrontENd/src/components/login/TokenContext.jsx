import React, { createContext, useState, useContext } from 'react';


const TokenContext = createContext();


export const useToken = () => useContext(TokenContext);


export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};
