import { useState, useEffect } from "react";

export function useViewportDimensions() {
  const hasWindow = typeof window !== "undefined";

  const [dimensions, setDimensions] = useState({
    width: hasWindow ? window.innerWidth : 0,
    height: hasWindow ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (!hasWindow) return;

    function handleResize() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [hasWindow]);

  return dimensions;
}
