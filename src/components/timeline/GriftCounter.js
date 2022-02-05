import { useState } from "react";
import PropTypes from "prop-types";
import {
  getLocalStorage,
  LOCALSTORAGE_KEYS,
  setLocalStorage,
} from "../../js/localStorage";

export default function GriftCounter({ total }) {
  const [isExpanded, setIsExpanded] = useState(
    getLocalStorage(LOCALSTORAGE_KEYS.griftCounterExpanded, true)
  );
  const [isPaused, setIsPaused] = useState(
    getLocalStorage(LOCALSTORAGE_KEYS.flamesAnimationPaused, false)
  );

  const toggleFlamesAnimation = () => {
    if (isPaused) {
      setLocalStorage(LOCALSTORAGE_KEYS.flamesAnimationPaused, false);
      setIsPaused(false);
    } else {
      setLocalStorage(LOCALSTORAGE_KEYS.flamesAnimationPaused, true);
      setIsPaused(true);
    }
  };

  const showOrHideCounter = () => {
    if (isExpanded) {
      setLocalStorage(LOCALSTORAGE_KEYS.griftCounterExpanded, false);
      setIsExpanded(false);
    } else {
      setLocalStorage(LOCALSTORAGE_KEYS.griftCounterExpanded, true);
      setIsExpanded(true);
    }
  };

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

  const renderButtons = () => (
    <>
      <button
        onClick={showOrHideCounter}
        title={`${isExpanded ? "Collapse" : "Expand"} counter`}
      >
        <i
          className={`fas fa-${isExpanded ? "eye-slash" : "fire"}`}
          aria-hidden={true}
        >
          <span className="sr-only">${isExpanded ? "Collapse" : "Expand"}</span>
        </i>
      </button>
      <button onClick={toggleFlamesAnimation} className="pause-button">
        <i
          className={`fas fa-${isPaused ? "play" : "fire-extinguisher"}`}
          aria-hidden={true}
        >
          <span className="sr-only">
            ${isPaused ? "Animate flames" : "Stop flames animation"}
          </span>
        </i>
      </button>
    </>
  );

  return (
    <div
      className={`grift-counter ${!isExpanded ? "collapsed" : ""} ${
        isPaused ? "no-animate" : ""
      }`}
    >
      <div>
        {renderButtons()}
        <a href="/about#grift-question" target="_blank">
          <span title="W3IGG Grift Counter™">${getDisplayNumber()}</span>
        </a>
      </div>
    </div>
  );
}

GriftCounter.propTypes = {
  total: PropTypes.number.isRequired,
};
