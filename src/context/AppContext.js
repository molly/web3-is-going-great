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
  const [useTheme, setUseTheme] = useState("system");
  const [useSansSerif, setUseSansSerif] = useState(null);

  const toggleUseSansSerif = useCallback(() => {
    setLocalStorage(LOCALSTORAGE_KEYS.useSansSerif, !useSansSerif);
    setUseSansSerif(!useSansSerif);
  }, [useSansSerif]);

  const setTheme = useCallback(
    (theme) => {
      setLocalStorage(LOCALSTORAGE_KEYS.useTheme, theme);
      setUseTheme(theme);
    },
    [useTheme]
  );

  useEffect(() => {
    // Localstorage can't be accessed during SSR
    setUseSansSerif(getLocalStorage(LOCALSTORAGE_KEYS.useSansSerif));
    setUseTheme(getLocalStorage(LOCALSTORAGE_KEYS.useTheme, "system"));
  }, [setUseSansSerif, setUseTheme]);

  const state = {
    useTheme,
    setTheme,
    useSansSerif,
    toggleUseSansSerif,
  };

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAppState() {
  return useContext(AppContext);
}
