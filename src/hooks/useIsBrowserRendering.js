import { useEffect, useState } from "react";

export default function useGA() {
  const [isBrowserRendering, setIsBrowserRendering] = useState(false);
  useEffect(() => {
    setIsBrowserRendering(true);
  }, []);
  return isBrowserRendering;
}
