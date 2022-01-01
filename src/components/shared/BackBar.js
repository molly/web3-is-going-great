import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function BackBar({ customText }) {
  return (
    <nav className="navigation-bar">
      <div className="contents">
        <Link to="/">
          <i className="fas fa-arrow-left-long" aria-hidden={true} alt="" />{" "}
          {customText || "Back"}
        </Link>
      </div>
    </nav>
  );
}

BackBar.propTypes = {
  customText: PropTypes.string,
};
