import React, { useState } from "react";
import { endpoint } from "../../config";
import { STATUS } from "../../constants";

import Button from "../Button";
import WithFeedback from "../Feedback";
import { useStateValue } from "../../store";

export default function Login() {
  const [password, setPassword] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [status, setStatus] = useState("");
  const [{ email, loginData }, dispatch] = useStateValue();

  const loginQuery = `
  mutation ($input: LoginMutationInput!) {
    login(input: $input) {
      user {
        apiKey
      }
    }
  }
  `;
  const loginVariables = `{
    "input": {
      "email": "${email}",
      "password": "${password}"
    }
  }`;

  const handleSubmission = () => {
    dispatch({ type: "APIKEY_FETCH_REQUEST" });
    setApiMessage("Fetching API key...");
    setStatus(STATUS.RUNNING);

    fetch(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        query: loginQuery,
        variables: loginVariables
      })
    })
      .then(res => {
        return res.json();
      })
      .then(response => {
        if (response.data.login.user) {
          dispatch({
            type: "APIKEY_FETCH_SUCCESS",
            loginData: response
          });
          setApiMessage("");
          setStatus(STATUS.SUCCESS);
        } else {
          dispatch({ type: "APIKEY_FETCH_FAILURE" });
          setApiMessage("No API key for this user");
          setStatus(STATUS.READY);
        }
      })
      .catch(e => {
        dispatch({ type: "APIKEY_FETCH_FAILURE" });
        setApiMessage("Error fetching API key");
        setStatus(STATUS.ERROR);
      });
  };

  const handleForm = e => {
    e.preventDefault();
    if (!email || !password) {
      return;
    }

    handleSubmission();
  };

  return (
    <div>
      <form onSubmit={handleForm}>
        <input
          type="email"
          className="form-control"
          id="emailInput"
          value={email}
          onChange={e =>
            dispatch({
              type: "SET_EMAIL",
              email: e.target.value
            })
          }
          placeholder="E-mail"
        />
        <input
          type="text"
          className="form-control"
          id="emailInput"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="form-inline">
          <WithFeedback feedback={apiMessage}>
            <Button status={status}>Get API key</Button>
          </WithFeedback>
        </div>
      </form>
      <div className="form-group form-result">
        <pre>
          <code>{JSON.stringify(loginData, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}
