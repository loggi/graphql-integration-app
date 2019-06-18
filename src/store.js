import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const initialState = {
  email: "",
  loginData: {
    data: {
      login: {
        user: {
          apiKey: {}
        }
      }
    }
  },
  shops: [],
  shopId: 0
};
