import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext({});

export const StateProvider = ({ reducer = null as any, initialState = null as any, children = null as any }): any => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>{children}</StateContext.Provider>
);

export const useStateValue = (): any => useContext(StateContext);
