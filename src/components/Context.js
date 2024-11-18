// MyContext.js
import React, { createContext, useState } from 'react';

// إنشاء Context لمشاركة المتغير بين المكونات
export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {
  const [id_C, setid_C] = useState('');

  return (
    <MyContext.Provider value={{ id_C, setid_C }}>
      {children}
    </MyContext.Provider>
  );
};