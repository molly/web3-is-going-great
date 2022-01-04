import React from "react";
import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";

export default function useGA() {
  const location = useLocation();

  React.useEffect(() => {
    const currentPath = location.pathname;
    ReactGA.set({ page: currentPath });
    ReactGA.pageview(currentPath);
  }, [location]);
}
