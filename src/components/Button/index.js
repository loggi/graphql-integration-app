import React from "react";
import { STATUS } from "../../constants";

export default function Button({ children, onClick, status }) {
  return (
    <button
      className={`btn btn-loggi my-0 ${
        status === STATUS.RUNNING ? "btn-loading" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
