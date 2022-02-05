import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  getLocalStorage,
  LOCALSTORAGE_KEYS,
  setLocalStorage,
} from "../../js/localStorage";

export default function GriftCounter({ total }) {
  const prefersReducedMotion = useMemo(() => {
    const result = window.matchMedia("(prefers-reduced-motion: reduce)");
    return result && result.matches;
  }, []);

  const [isExpanded, setIsExpanded] = useState(
    getLocalStorage(LOCALSTORAGE_KEYS.griftCounterExpanded, true)
  );
  const [isPaused, setIsPaused] = useState(
    getLocalStorage(LOCALSTORAGE_KEYS.flamesAnimationPaused, null) ||
      prefersReducedMotion ||
      null
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
          <span className="sr-only">
            ${isExpanded ? "Collapse" : "Expand"} counter
          </span>
        </i>
      </button>
      <button
        onClick={toggleFlamesAnimation}
        className="pause-button"
        title={isPaused ? "Animate flames" : "Stop flames animation"}
      >
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
      className={clsx("grift-counter", !isExpanded && "collapsed", {
        "no-animate": isPaused === true,
        animate: isPaused === false,
      })}
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
