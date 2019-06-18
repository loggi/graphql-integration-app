import React from "react";
import { Switch, Route } from "react-router-dom";

import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";
import Login from "./routes/Login";
import Orders from "./routes/Orders";
import Shops from "./routes/Shops";

import { initialState, StateProvider } from "./store";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.email
      };
    case "SET_SHOP":
      return {
        ...state,
        shopId: action.shopId
      };
    case "APIKEY_FETCH_SUCCESS":
      return {
        ...state,
        loginData: action.loginData
      };
    case "APIKEY_FETCH_FAILURE":
      return {
        ...state,
        loginData: initialState.loginData
      };
    case "SHOPS_FETCH_SUCCESS":
      return {
        ...state,
        shops: action.shops
      };
    case "shops_FETCH_FAILURE":
      return {
        ...state,
        shops: initialState.shops
      };
    default:
      return state;
  }
};

const App = () => (
  <main id="main" className="app">
    <StateProvider initialState={initialState} reducer={reducer}>
      <Header />
      <Switch>
        <Route path="/orders" component={Orders} />
        <Route path="/login" component={Login} />
        <Route path="/shops" component={Shops} />
        <Route component={Login} />
      </Switch>
      <Footer />
    </StateProvider>
  </main>
);

export default App;
