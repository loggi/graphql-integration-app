import React, { Fragment } from "react";

export default function WithFeedback({ children, feedback }) {
  return (
    <Fragment>
      {children}
      {feedback && (
        <label className="my-0 ml-2" htmlFor="inlineFormCustomSelectPref">
          {feedback}
        </label>
      )}
    </Fragment>
  );
}
