import { useEffect, useState } from "react";

export default function useIsBrowserRendering() {
  const [isBrowserRendering, setIsBrowserRendering] = useState(false);
  useEffect(() => {
    setIsBrowserRendering(true);
  }, []);
  return isBrowserRendering;
}
