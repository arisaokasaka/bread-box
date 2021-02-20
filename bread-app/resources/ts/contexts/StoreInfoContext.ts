import React, { createContext } from 'react';

export const StoreInfoContext = createContext({} as {
  stateInfo: any;
  dispatch: React.Dispatch<React.SetStateAction<any>>;
});