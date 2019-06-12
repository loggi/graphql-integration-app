import React, { useState } from "react";
import { endpoint } from "../../config";
import { STATUS } from "../../constants";

import Button from "../Button";
import WithFeedback from "../Feedback";
import { useStateValue } from "../../store";

export default function GetOrders() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [{ email, loginData, shopId }] = useStateValue();
  const {
    data: {
      login: {
        user: { apiKey }
      }
    }
  } = loginData;

  const query = `
  query {
    allPackages(shopId: ${shopId}) {
      edges {
        node {
          pk
          status
          orderId
          orderStatus
          isRemovable
          trackingKey
          shareds {
            edges {
              node {
                trackingUrl
              }
            }
          }
        }
      }
    }
  }
  `;

  const handleClick = e => {
    e.preventDefault();
    setMessage("Fetching orders...");
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
        setOrders(response.data.allPackages.edges);
        setMessage("");
        setStatus(STATUS.SUCCESS);
      })
      .catch(e => {
        setOrders([]);
        setMessage("Error fetching orders");
        setStatus(STATUS.ERROR);
      });
  };

  return (
    <div id="orders">
      <form className="form-inline">
        <WithFeedback feedback={message}>
          <Button status={status} onClick={handleClick}>
            Get orders for <strong>shopId {shopId}</strong>
          </Button>
        </WithFeedback>
      </form>
      {shopId && orders.length > 0 && (
        <div className="form-group form-result">
          <h2>Orders</h2>
          <ul className="list-group list-orders">
            {orders.map(order => (
              <li
                className="list-group-item d-flex justify-content-between align-items-center"
                key={order.node.pk}
              >
                {order.node.status}
                <span className="badge badge-primary badge-pill">
                  pk: {order.node.pk}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
