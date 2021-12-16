import React, { useState } from "react";
import PropTypes from "prop-types";

export default function ScamTotal({ total }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const getDisplayNumber = () => {
    if (total < 1e6) {
      return total.toLocaleString();
    } else if (total < 1e9) {
      return `${(total / 1e6).toFixed(2)} million`;
    } else if (total < 1e12) {
      return `${(total / 1e9).toFixed(3)} billion`;
    } else {
      return `${(total / 1e12).toFixed(3)} trillion`;
    }
  };

  return (
    <div className={`grift-counter ${!isExpanded ? "collapsed" : ""}`}>
      <div>
        <button onClick={() => setIsExpanded(!isExpanded)}>
          <i
            className={`fas fa-chevron-${isExpanded ? "right" : "left"}`}
            aria-hidden={true}
          >
            <span className="sr-only">
              ${isExpanded ? "Collapse" : "Expand"}
            </span>
          </i>
        </button>
        <span>${getDisplayNumber()}</span>
      </div>
    </div>
  );
}

ScamTotal.propTypes = {
  total: PropTypes.number.isRequired,
};
