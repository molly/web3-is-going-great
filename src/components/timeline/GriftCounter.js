import PropTypes from "prop-types";
import clsx from "clsx";

const getDisplayNumber = (num) => {
  if (num < 1e6) {
    return num.toLocaleString();
  } else if (num < 1e9) {
    return `${(num / 1e6).toFixed(2)} million`;
  } else if (num < 1e12) {
    return `${(num / 1e9).toFixed(3)} billion`;
  } else {
    return `${(num / 1e12).toFixed(3)} trillion`;
  }
};

export default function GriftCounter({
  runningGriftTotal,
  griftTotal,
  isAnimationPaused,
  isGriftCounterCountingUp,
}) {
  const numberToShow = isGriftCounterCountingUp
    ? runningGriftTotal
    : griftTotal - runningGriftTotal;

  return (
    <div
      className={clsx("grift-counter", {
        "no-animate": isAnimationPaused,
        animate: !isAnimationPaused,
      })}
    >
      <div>
        <a href="/about#grift-question" target="_blank">
          <span title="W3IGG Grift Counter™">
            ${getDisplayNumber(numberToShow)}
          </span>
        </a>
      </div>
    </div>
  );
}

GriftCounter.propTypes = {
  runningGriftTotal: PropTypes.number.isRequired,
  griftTotal: PropTypes.number.isRequired,
  isAnimationPaused: PropTypes.bool,
  isGriftCounterCountingUp: PropTypes.bool.isRequired,
};
