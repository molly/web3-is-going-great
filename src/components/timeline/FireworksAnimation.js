import React, { useEffect } from "react";
import { Fireworks, useFireworks } from "fireworks-js/dist/react";

const FireworksAnimation = () => {
  const { enabled, options, setEnabled } = useFireworks({
    initialStart: true,
    initialOptions: {
      traceSpeed: 1,
      delay: { min: 100, max: 300 },
    },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setEnabled(false);
    }, 10000);

    return () => {
      clearTimeout(timeout);
    };
  }, [setEnabled]);

  return (
    <Fireworks
      className="fireworks"
      options={options}
      enabled={enabled}
      style={{ width: "250px", height: "200px" }}
    />
  );
};

export default FireworksAnimation;
