import React from "react";

import Login from "../components/Login";
import Orders from "../components/Orders";
import Shops from "../components/Shops";
import { useStateValue } from "../store";

function OrdersContainer() {
  const [{ loginData, shopId }] = useStateValue();
  const {
    data: {
      login: {
        user: { apiKey }
      }
    }
  } = loginData;

  return (
    <div className="content">
      <h1>Get orders example</h1>
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
          <div className="alert alert-info">
            <h2>2. Get your "shopId"</h2>
            <p className="mb-0">
              Now that you have your <strong>API key</strong>, you must provide
              a <strong>shopId</strong> to the retrieve the orders. Select a
              shop from the list:
            </p>
          </div>
          <Shops id="shops" />
        </div>
      )}
      {/* ORDERS */}
      <div>
        {shopId > 0 && (
          <div className="step">
            <div className="alert alert-success">
              <h2>3. Get your orders</h2>
              <p className="mb-0">
                With your <strong>API key</strong> and a <strong>shopId</strong>
                , you can now fetch the orders from the selected shop:
              </p>
            </div>
            <Orders />
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersContainer;
