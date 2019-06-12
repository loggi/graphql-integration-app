import React, { useState } from "react";
import { endpoint } from "../../config";
import { STATUS } from "../../constants";

import Button from "../Button";
import WithFeedback from "../Feedback";
import { useStateValue } from "../../store";

export default function GetShops() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [{ email, loginData, shops, shopId }, dispatch] = useStateValue();
  const {
    data: {
      login: {
        user: { apiKey }
      }
    }
  } = loginData;

  const query = `
  query {
    allShops {
      edges {
        node {
          name
          pickupInstructions
          pk
          address {
            pos
            addressSt
            addressData
          }
          chargeOptions {
            label
          }
        }
      }
    }
  }
  `;

  const handleClickFetch = e => {
    e.preventDefault();
    setMessage("Fetching shops...");
    setStatus(STATUS.RUNNING);

    fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `ApiKey ${email}:${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        dispatch({
          type: "SHOPS_FETCH_SUCCESS",
          shops: response.data.allShops.edges
        });
        setMessage("");
        setStatus(STATUS.SUCCESS);
      })
      .catch(e => {
        dispatch({
          type: "SHOPS_FETCH_FAILURE",
          shops: []
        });
        setMessage("Error fetching shops");
        setStatus(STATUS.ERROR);
      });
  };

  const handleClickShop = pk => {
    dispatch({
      type: "SET_SHOP",
      shopId: pk
    });
  };

  return (
    <div id="shops">
      <form className="form-inline">
        <WithFeedback feedback={message}>
          <Button status={status} onClick={handleClickFetch}>
            Get shops for <strong>{email}</strong>
          </Button>
        </WithFeedback>
      </form>
      {shops.length > 0 && (
        <div className="form-group form-result">
          <h2>Shops</h2>
          <ul className="list-group list-shops">
            {shops.map(city => (
              <li
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                  shopId === city.node.pk ? "list-group-item-dark" : ""
                }`}
                key={city.node.pk}
                onClick={() => handleClickShop(city.node.pk)}
              >
                {city.node.name}
                <span
                className={`badge badge-pill ${
                  shopId === city.node.pk ? "badge-success" : "badge-primary"
                }`}>
                  id: {city.node.pk}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
