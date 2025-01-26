import React, { createContext, useContext, useState } from "react";

// Create the context
const InputContext = createContext();

// Context Provider
export const InputProvider = ({ children }) => {
  const [inputs, setInputs] = useState([]);

  return (
    <InputContext.Provider value={{ inputs, setInputs }}>
      {children}
    </InputContext.Provider>
  );
};

// Custom hook to use the InputContext
export const useInputContext = () => {
  return useContext(InputContext);
};
