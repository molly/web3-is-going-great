/* eslint-disable no-unused-vars */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import PropTypes from "prop-types";
import {
  getLocalStorage,
  LOCALSTORAGE_KEYS,
  setLocalStorage,
} from "../js/localStorage";

export const AppContext = createContext();

export function AppProvider({ children }) {
  const [colorModeOverride, setColorModeOverrideState] = useState(null);
  const [useSansSerif, setUseSansSerif] = useState(null);

  const toggleUseSansSerif = useCallback(() => {
    setUseSansSerif(!useSansSerif);
    setLocalStorage(LOCALSTORAGE_KEYS.useSansSerif, !useSansSerif);
  }, [useSansSerif]);

  const setColorModeOverride = useCallback((mode) => {
    setColorModeOverrideState(mode);
    setLocalStorage(LOCALSTORAGE_KEYS.colorModeOverride, mode);
  }, []);

  useEffect(() => {
    // Localstorage can't be accessed during SSR
    setUseSansSerif(getLocalStorage(LOCALSTORAGE_KEYS.useSansSerif));
    setColorModeOverride(getLocalStorage(LOCALSTORAGE_KEYS.colorModeOverride));
  }, [setUseSansSerif, setColorModeOverride]);

  const state = {
    colorModeOverride,
    useSansSerif,
    toggleUseSansSerif,
    setColorModeOverride,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAppState() {
  return useContext(AppContext);
}
