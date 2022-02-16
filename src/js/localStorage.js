export const LOCALSTORAGE_KEYS = {
  flamesAnimationPaused: "flames-animation-paused",
  griftCounterExpanded: "grift-counter-expanded",
  griftCounterCountUp: "grift-counter-count-up",
};

export const getLocalStorage = (key, returnValueIfNotSet = null) => {
  let value;
  try {
    value = localStorage.getItem(key);
    if (value === undefined || value === null) {
      return returnValueIfNotSet;
    } else {
      return JSON.parse(value);
    }
  } catch (err) {
    if (!value) {
      // Couldn't get the value at all (security settings, etc.)
      return returnValueIfNotSet;
    } else {
      // Something went wrong with the JSON parsing but the value exists
      return value;
    }
  }
};

export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, value);
  } catch (err) {
    // Localstorage isn't used for anything critical, so we can just move on
  }
};
