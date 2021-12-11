import React from "react";
import { STORAGE_URL } from "../../constants/urls";

export default function Header() {
  return (
    <header className="timeline-page page-header">
      <div className="constrain-width">
        <img
          className="logo"
          src={`${STORAGE_URL}/monkey.png`}
          alt="Illustration: A sad-looking Bored Ape Yacht Club NFT monkey looks at a world engulfed in flames."
        />
        <div className="header-content">
          <h1>Web3 is going just great</h1>
          <p>
            ...and is definitely not an enormous grift that's pouring lighter
            fluid on our already-smoldering planet.
          </p>
          <p>
            Timeline by <a href="https://twitter.com/molly0xFFF">Molly White</a>
            .
          </p>
        </div>
      </div>
    </header>
  );
}
