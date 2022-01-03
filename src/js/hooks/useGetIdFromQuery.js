import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export default function useGetIdFromQuery() {
  const { search } = useLocation();
  return useMemo(() => {
    if (!search) {
      return null;
    }
    const id = new URLSearchParams(search).get("id");
    if (!id || !id.match(/\d{4}-\d{2}-\d{2}-?\d{0,2}/)) {
      return null;
    }
    return id;
  }, [search]);
}
