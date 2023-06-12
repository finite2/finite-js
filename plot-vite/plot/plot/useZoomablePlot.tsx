import { useState, useRef, useEffect, useMemo, RefObject, PointerEvent, WheelEvent } from "react";
import { Direction } from "./types";

const domainMatch = (
  curX?: [number, number],
  curY?: [number, number],
  prev?: { xDomain: [number, number]; yDomain: [number, number] }
) => {
  if (!prev) {
    return !(curX || curY);
  }
  return (
    prev?.xDomain?.[0] === curX?.[0] &&
    prev?.xDomain?.[1] === curX?.[1] &&
    prev?.yDomain?.[0] === curY?.[0] &&
    prev?.yDomain?.[1] === curY?.[1]
  );
};

const scaleLoc = (
  location: { left: number; right: number; top: number; bottom: number },
  multiplier: number,
  direction?: Direction,
  xDomainLimit?: [number, number],
  yDomainLimit?: [number, number]
) => {
  const centerX = (location.right + location.left) / 2;
  const centerY = (location.bottom + location.top) / 2;
  const distX = (location.right - location.left) / 2;
  const distY = (location.top - location.bottom) / 2;

  let multiplierX = multiplier,
    multiplierY = multiplier;
  if (direction === "horizontal") {
    multiplierY = 1;
  } else if (direction === "vertical") {
    multiplierX = 1;
  }

  const newLoc = {
    left: centerX - distX * multiplierX,
    right: centerX + distX * multiplierX,
    bottom: centerY - distY * multiplierY,
    top: centerY + distY * multiplierY,
  };

  // handle user defined limits
  if (multiplierX === multiplierY) {
    let newMultiplier = multiplierX;

    if (xDomainLimit) {
      const delta = newLoc.right - newLoc.left;

      if (delta > xDomainLimit[1] - xDomainLimit[0]) {
        newMultiplier = xDomainLimit[1] - xDomainLimit[0] / delta;
      }
    }
    if (yDomainLimit) {
      const delta = newLoc.top - newLoc.bottom;

      if (delta > yDomainLimit[1] - yDomainLimit[0]) {
        newMultiplier = Math.min(newMultiplier, yDomainLimit[1] - yDomainLimit[0] / delta);
      }
    }

    if (newMultiplier !== multiplierX) {
      newLoc.left = centerX - distX * newMultiplier;
      newLoc.right = centerX + distX * newMultiplier;
      newLoc.bottom = centerY - distY * newMultiplier;
      newLoc.top = centerY + distY * newMultiplier;
    }
  }
  if (multiplierX !== 1) {
    if (xDomainLimit) {
      const delta = newLoc.right - newLoc.left;

      if (delta > xDomainLimit[1] - xDomainLimit[0]) {
        newLoc.left = xDomainLimit[0];
        newLoc.right = xDomainLimit[1];
      }
      if (newLoc.left < xDomainLimit[0]) {
        newLoc.left = xDomainLimit[0];
        newLoc.right = newLoc.left + delta;
      }

      if (newLoc.right > xDomainLimit[1]) {
        newLoc.right = xDomainLimit[1];
        newLoc.left = newLoc.right - delta;
      }
    }
  }
  if (multiplierY !== 1) {
    if (yDomainLimit) {
      const delta = newLoc.top - newLoc.bottom;
      if (delta > yDomainLimit[1] - yDomainLimit[0]) {
        newLoc.bottom = yDomainLimit[0];
        newLoc.top = yDomainLimit[1];
      }
      if (newLoc.bottom < yDomainLimit[0]) {
        newLoc.bottom = yDomainLimit[0];
        newLoc.top = newLoc.bottom + delta;
      }

      if (newLoc.top > yDomainLimit[1]) {
        newLoc.top = yDomainLimit[1];
        newLoc.bottom = newLoc.top - delta;
      }
    }
  }

  return newLoc;
};

const transformFixRatio = (
  xDomain: [number, number],
  yDomain: [number, number],
  xRange: [number, number],
  yRange: [number, number],
  preserveRatio: boolean
): [[number, number], [number, number]] => {
  if (preserveRatio) {
    const xr = Math.abs((xDomain[1] - xDomain[0]) / (xRange[1] - xRange[0]));
    const yr = Math.abs((yDomain[1] - yDomain[0]) / (yRange[1] - yRange[0]));

    if (xr > yr) {
      const xDomainMu = (xDomain[1] + xDomain[0]) / 2;
      const xDomainDiff = (xDomain[1] - xDomain[0]) / 2;
      xDomain = [xDomainMu - (xDomainDiff * yr) / xr, xDomainMu + (xDomainDiff * yr) / xr];
    } else if (yr > xr) {
      const yDomainMu = (yDomain[1] + yDomain[0]) / 2;
      const yDomainDiff = (yDomain[1] - yDomain[0]) / 2;
      yDomain = [yDomainMu - (yDomainDiff * xr) / yr, yDomainMu + (yDomainDiff * xr) / yr];
    }
  }

  return [xDomain, yDomain];
};

const locationFromDomain = ([xDomain, yDomain]: [[number, number], [number, number]]) => {
  return {
    left: xDomain[0],
    right: xDomain[1],
    bottom: yDomain[0],
    top: yDomain[1],
  };
};

export type PlotContextEvents = {
  onPointerDown: (event: PointerEvent) => void;
  onPointerUp: (event: PointerEvent, ref: RefObject<SVGRectElement>) => void;
  onPointerMove: (
    event: PointerEvent,
    ref: RefObject<SVGRectElement>,
    direction?: Direction
  ) => void;
  onWheel: (event: WheelEvent, direction?: Direction) => void;
  onPointerLeave: () => void;
  onPointerEnter: () => void;
  onReset: () => void;
};

export const useZoomablePlot = (
  xDomain: [number, number],
  yDomain: [number, number],
  xRange: [number, number],
  yRange: [number, number],
  xDomainLimit?: [number, number],
  yDomainLimit?: [number, number],
  preserveRatio = false
): [{ xDomain: [number, number]; yDomain: [number, number] }, PlotContextEvents] => {
  const [lastLocation, setLastLocation] = useState(
    locationFromDomain(transformFixRatio(xDomain, yDomain, xRange, yRange, preserveRatio))
  );

  const lastLocRef = useRef(lastLocation);

  // TODO check if the initial value is acceptable
  const initalLocRef = useRef<{
    x: number;
    y: number;
    left: number;
    right: number;
    bottom: number;
    top: number;
  }>({ x: 0, y: 0, left: 0, right: 0, bottom: 0, top: 0 });
  const lastDomains = useRef<{ xDomain: [number, number]; yDomain: [number, number] }>({
    xDomain,
    yDomain,
  });
  const lastRange = useRef<{ xRange: [number, number]; yRange: [number, number] }>({
    xRange,
    yRange,
  });
  const dragging = useRef<boolean>(false);
  const scrollEnabled = useRef({
    enabled: true,
    counter: 0,
    preventDefault: (event: Event) => {
      event = event || window.event;
      event?.preventDefault();
      // TODO investigate if this is needed since its deprecated
      event.returnValue = false;
    },
  });

  lastLocRef.current = lastLocation;
  lastRange.current = { xRange, yRange };

  useEffect(() => {
    const [xD, yD] = transformFixRatio(xDomain, yDomain, xRange, yRange, preserveRatio);

    if (!domainMatch(xD, yD, lastDomains.current)) {
      setLastLocation(locationFromDomain([xD, yD]));
    }

    lastDomains.current = {
      xDomain: xD,
      yDomain: yD,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xDomain, yDomain]);

  useEffect(() => {
    const [xD, yD] = transformFixRatio(xDomain, yDomain, xRange, yRange, preserveRatio);

    if (!domainMatch(xD, yD, lastDomains.current)) {
      setLastLocation(locationFromDomain([xD, yD]));

      lastDomains.current = {
        xDomain: xD,
        yDomain: yD,
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xRange, yRange, preserveRatio]);

  const events = useMemo(
    () => ({
      onPointerDown: (event: PointerEvent) => {
        dragging.current = true;
        initalLocRef.current = { x: event.screenX, y: event.screenY, ...lastLocRef.current };
      },
      onPointerUp: (event: PointerEvent, ref: RefObject<SVGRectElement>) => {
        if (ref.current) ref.current.releasePointerCapture(event.pointerId);
        dragging.current = false;
      },
      onPointerMove: (
        event: PointerEvent,
        ref: RefObject<SVGRectElement>,
        direction?: Direction
      ) => {
        const lastLoc = lastLocRef.current;

        if (dragging.current) {
          if (ref.current) ref.current.setPointerCapture(event.pointerId);

          let screenDeltaX = event.screenX - initalLocRef.current.x;
          let screenDeltaY = event.screenY - initalLocRef.current.y;

          if (direction === "vertical") {
            screenDeltaX = 0;
          } else if (direction === "horizontal") {
            screenDeltaY = 0;
          }

          const xUnitPixel =
            (lastLoc.right - lastLoc.left) /
            (lastRange.current.xRange[1] - lastRange.current.xRange[0]);
          const yUnitPixel =
            (lastLoc.top - lastLoc.bottom) /
            (lastRange.current.yRange[1] - lastRange.current.yRange[0]);

          const newLoc = {
            left: initalLocRef.current.left - xUnitPixel * screenDeltaX,
            right: initalLocRef.current.right - xUnitPixel * screenDeltaX,
            bottom: initalLocRef.current.bottom - yUnitPixel * screenDeltaY,
            top: initalLocRef.current.top - yUnitPixel * screenDeltaY,
          };

          // handle user defined limits
          if (xDomainLimit) {
            const delta = newLoc.right - newLoc.left;
            if (newLoc.left < xDomainLimit[0]) {
              newLoc.left = xDomainLimit[0];
              newLoc.right = newLoc.left + delta;
            }

            if (newLoc.right > xDomainLimit[1]) {
              newLoc.right = xDomainLimit[1];
              newLoc.left = newLoc.right - delta;
            }
          }

          if (yDomainLimit) {
            const delta = newLoc.top - newLoc.bottom;
            if (newLoc.bottom < yDomainLimit[0]) {
              newLoc.bottom = yDomainLimit[0];
              newLoc.top = newLoc.bottom + delta;
            }

            if (newLoc.top > yDomainLimit[1]) {
              newLoc.top = yDomainLimit[1];
              newLoc.bottom = newLoc.top - delta;
            }
          }

          setLastLocation(newLoc);
        }
      },
      onWheel: (event: WheelEvent, direction?: Direction) => {
        const fallbackLocation = { ...lastLocRef.current };
        direction = preserveRatio ? undefined : direction;

        if (event.deltaY > 0) {
          setLastLocation((location) =>
            scaleLoc(location || fallbackLocation, 1.1, direction, xDomainLimit, yDomainLimit)
          );
        } else {
          setLastLocation((location) =>
            scaleLoc(location || fallbackLocation, 1 / 1.1, direction, xDomainLimit, yDomainLimit)
          );
        }
      },
      onPointerLeave: () => {
        dragging.current = false;

        // enable document scroll
        scrollEnabled.current.counter--;
        if (scrollEnabled.current.counter === 0) {
          scrollEnabled.current.enabled = true;
          document.removeEventListener("wheel", scrollEnabled.current.preventDefault);
        }
      },
      onPointerEnter: () => {
        // disable document scroll

        console.log(scrollEnabled.current.enabled);

        scrollEnabled.current.counter++;
        if (scrollEnabled.current.enabled) {
          scrollEnabled.current.enabled = false;
          document.addEventListener("wheel", scrollEnabled.current.preventDefault, {
            passive: false,
          });
        }
      },
      onReset: () => {
        setLastLocation({
          left: xDomain[0],
          right: xDomain[1],
          bottom: yDomain[0],
          top: yDomain[1],
        });
      },
    }),
    [preserveRatio, setLastLocation, dragging, xDomain, xDomainLimit, yDomain, yDomainLimit]
  );

  const domains: { xDomain: [number, number]; yDomain: [number, number] } = useMemo(
    () => ({
      xDomain: [lastLocation.left, lastLocation.right],
      yDomain: [lastLocation.bottom, lastLocation.top],
    }),
    [lastLocation]
  );

  return [domains, events];
};
