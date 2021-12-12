import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="page-footer">
      <div className="constrain-width">
        <p>
          Text is licensed under a{" "}
          <a
            rel="license"
            href="http://creativecommons.org/licenses/by/3.0/deed.en_US"
          >
            Creative Commons Attribution 3.0 Unported License
          </a>
          . All attribution can be found on the{" "}
          <Link to="/attribution">attribution</Link> page.
        </p>
        <p>
          <a href="https://github.com/molly/web3-timeline">Source code</a> |{" "}
          <Link to="/suggest">Suggest a change or addition</Link>
        </p>
      </div>
    </footer>
  );
}
