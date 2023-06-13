import { useState, useRef, useMemo } from "react";

import { throttle } from "plot/utils/throttle";

/**
 *  Add to PlotRegion to retreive the pointer position in x,y space.
 *  good for crosshairs
 *
 * @returns [{x,y}, events, setPosition]
 */
export const usePointerPosition = () => {
  const [pointerPosition, setPointerPosition] = useState(null);

  const lastSet = useRef();

  const events = useMemo(() => {
    return {
      onPointerMove: throttle((e) => {
        lastSet.current = Date.now();
        setPointerPosition({ x: e.xPosition, y: e.yPosition });
      }, 50),
      onPointerLeave: () => {
        setPointerPosition(null);
      },
    };
  }, [setPointerPosition]);

  return [pointerPosition, events, setPointerPosition];
};
