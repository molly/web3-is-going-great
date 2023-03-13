import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useThrottledCallback } from "use-debounce";

import {
  XS_BREAKPOINT,
  SM_BREAKPOINT,
  MD_BREAKPOINT,
  LG_BREAKPOINT,
} from "../constants/breakpoints";

export const WindowWidthPropType = PropTypes.oneOf([
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
]);

const getWindowWidth = (px) => {
  if (px <= XS_BREAKPOINT) {
    return "xs";
  } else if (px <= SM_BREAKPOINT) {
    return "sm";
  } else if (px <= MD_BREAKPOINT) {
    return "md";
  } else if (px <= LG_BREAKPOINT) {
    return "lg";
  }
  return "xl";
};

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(null);

  // Get initial width
  useEffect(() => setWindowWidth(getWindowWidth(window.innerWidth)), []);

  // Update width on window resize
  const handleResize = useThrottledCallback(() => {
    setWindowWidth(getWindowWidth(window.innerWidth));
  }, 500);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return windowWidth;
};

export default useWindowWidth;
