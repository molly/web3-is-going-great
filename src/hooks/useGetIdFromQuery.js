import { useMemo } from "react";

export default function useGetIdFromQuery() {
  return useMemo(() => {
    if (typeof window == "undefined" || !window.location.search) {
      return null;
    }
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id || !id.match(/\d{4}-\d{2}-\d{2}-?\d{0,2}/)) {
      return null;
    }
    return id;
  }, []);
}
