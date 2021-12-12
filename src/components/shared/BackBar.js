import React from "react";
import { Link } from "react-router-dom";

export default function BackBar() {
  return (
    <nav className="navigation-bar">
      <div className="contents">
        <Link to="/">
          <i className="fas fa-arrow-left-long" aria-hidden={true} alt="" />{" "}
          Back
        </Link>
      </div>
    </nav>
  );
}
