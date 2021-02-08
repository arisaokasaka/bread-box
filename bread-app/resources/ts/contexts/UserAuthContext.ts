import React, { createContext } from 'react';

export const UserAuthContext = createContext({} as {
  state: any;
  dispatch: React.Dispatch<React.SetStateAction<any>>;
});