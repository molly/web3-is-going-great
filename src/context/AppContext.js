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
  const [theme, _setTheme] = useState("system");
  const [useSansSerif, _setUseSansSerif] = useState(null);

  const toggleUseSansSerif = useCallback(() => {
    setLocalStorage(LOCALSTORAGE_KEYS.useSansSerif, !useSansSerif);
    _setUseSansSerif(!useSansSerif);
  }, [useSansSerif]);

  const setTheme = useCallback((theme) => {
    setLocalStorage(LOCALSTORAGE_KEYS.theme, theme);
    _setTheme(theme);
  }, []);

  useEffect(() => {
    // Localstorage can't be accessed during SSR
    _setUseSansSerif(getLocalStorage(LOCALSTORAGE_KEYS.useSansSerif));
    _setTheme(getLocalStorage(LOCALSTORAGE_KEYS.theme, "system"));
  }, [_setUseSansSerif, _setTheme]);

  const state = {
    theme,
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
