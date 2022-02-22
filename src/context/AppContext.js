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
  const [useDarkMode, setUseDarkMode] = useState(null);
  const [useSansSerif, setUseSansSerif] = useState(null);

  const toggleUseSansSerif = useCallback(() => {
    setLocalStorage(LOCALSTORAGE_KEYS.useSansSerif, !useSansSerif);
    setUseSansSerif(!useSansSerif);
  }, [useSansSerif]);

  const toggleDarkMode = useCallback(() => {
    setLocalStorage(LOCALSTORAGE_KEYS.useDarkMode, !useDarkMode);
    setUseDarkMode(!useDarkMode);
  }, [useDarkMode]);

  useEffect(() => {
    // Localstorage can't be accessed during SSR
    setUseSansSerif(getLocalStorage(LOCALSTORAGE_KEYS.useSansSerif));
    setUseDarkMode(getLocalStorage(LOCALSTORAGE_KEYS.useDarkMode));
  }, [setUseSansSerif, setUseDarkMode]);

  const state = {
    useDarkMode,
    useSansSerif,
    toggleUseSansSerif,
    toggleDarkMode,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAppState() {
  return useContext(AppContext);
}
