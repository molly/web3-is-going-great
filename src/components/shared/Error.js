import React from "react";
import { STORAGE_URL } from "../../constants/urls";

export default function Error() {
  return (
    <div className="error-wrapper">
      <div>
        <img src={`${STORAGE_URL}/alien.png`} alt="" aria-hidden={true} />
      </div>
      <span>
        Something went wrong. Molly would greatly appreciate it if you made sure
        she knows.
      </span>
    </div>
  );
}
