import { useEffect } from "react";
import ReactGA from "react-ga";

export default function useGA() {
  useEffect(() => {
    const currentPath = window.location.pathname;
    ReactGA.set({ page: currentPath });
    ReactGA.pageview(currentPath);
  }, []);
}
