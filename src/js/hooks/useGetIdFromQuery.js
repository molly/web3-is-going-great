import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function useGetIdFromQuery() {
  const { search } = useLocation();
  return useMemo(() => {
    if (!search) {
      return null;
    }
    return new URLSearchParams(search).get("id");
  }, [search]);
}
