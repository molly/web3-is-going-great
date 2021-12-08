import React from "react";

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
          . All image and asset attribution can be found on the{" "}
          <a href="/attribution">attribution</a> page.
        </p>
        <p>
          <a href="https://github.com/molly/web3-timeline">Source code</a> |{" "}
          <a href="https://github.com/molly/static-timeline-generator">
            Create your own timeline like this
          </a>
        </p>
      </div>
    </footer>
  );
}
