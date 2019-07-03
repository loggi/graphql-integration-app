import React from "react";

import Login from "../components/Login";

function LoginContainer() {
  return (
    <div className="content">
      <h1>Get API key example</h1>
      <p>Simulated user id: {window.loggi.bootstrapData.user.pk}</p>
      <Login />
    </div>
  );
}

export default LoginContainer;
