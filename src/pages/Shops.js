import React from "react";

import Login from "../components/Login";
import Shops from "../components/Shops";
import { useStateValue } from "../store";

function ShopsContainer() {
  const [{ loginData }] = useStateValue();
  const {
    data: {
      login: {
        user: { apiKey }
      }
    }
  } = loginData;

  return (
    <div className="content">
      <h1>Get shops example</h1>
      <div className="alert alert-info">
        <h2>1. Authentication</h2>
        <p className="mb-0">
          This query requires an authentication token to be sent in the request
          header. The first step is to acquire the token for your account.
        </p>
      </div>
      <Login />
      {/* SHOPS */}
      {apiKey.length > 0 && (
        <div className="step">
          <div className="alert alert-success">
            <h2>2. Get your shops</h2>
            <p className="mb-0">
              Now that you have your <strong>API key</strong>, you are allowed
              to fetch the shops for this user.
            </p>
          </div>
          <Shops />
        </div>
      )}
    </div>
  );
}

export default ShopsContainer;
