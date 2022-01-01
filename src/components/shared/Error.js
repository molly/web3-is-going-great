import React from "react";
import PropTypes from "prop-types";
import { STORAGE_URL } from "../../constants/urls";

export default function Error({ customMessage }) {
  return (
    <div className="error-wrapper">
      <div>
        <img src={`${STORAGE_URL}/alien.png`} alt="" aria-hidden={true} />
      </div>
      <span>{customMessage}</span>
    </div>
  );
}

Error.propTypes = {
  customMessage: PropTypes.node,
};

Error.defaultProps = {
  customMessage:
    "Something went wrong. Molly would greatly appreciate it if you made sure she knows.",
};
