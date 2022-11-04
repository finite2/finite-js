import { useState, useRef, useEffect, useMemo } from "react";
import { DIRECTION } from "./plot-utils";

const domainMatch = (curX, curY, prev) => {
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

const scaleLoc = (location, multiplier, direction = null) => {
  const centerX = (location.right + location.left) / 2;
  const centerY = (location.bottom + location.top) / 2;
  let distX = (location.right - location.left) / 2;
  let distY = (location.top - location.bottom) / 2;

  let multiplierX = multiplier,
    multiplierY = multiplier;
  if (direction === DIRECTION.HORIZONTAL) {
    multiplierY = 1;
  } else if (direction === DIRECTION.VERTICAL) {
    multiplierX = 1;
  }

  return {
    left: centerX - distX * multiplierX,
    right: centerX + distX * multiplierX,
    bottom: centerY - distY * multiplierY,
    top: centerY + distY * multiplierY,
  };
};

const transformFixRatio = (xDomain, yDomain, xRange, yRange, preserveRatio) => {
  if (preserveRatio) {
    let xr = Math.abs((xDomain[1] - xDomain[0]) / (xRange[1] - xRange[0]));
    let yr = Math.abs((yDomain[1] - yDomain[0]) / (yRange[1] - yRange[0]));

    if (xr > yr) {
      let xDomainMu = (xDomain[1] + xDomain[0]) / 2;
      let xDomainDiff = (xDomain[1] - xDomain[0]) / 2;
      xDomain = [xDomainMu - (xDomainDiff * yr) / xr, xDomainMu + (xDomainDiff * yr) / xr];
    } else if (yr > xr) {
      let yDomainMu = (yDomain[1] + yDomain[0]) / 2;
      let yDomainDiff = (yDomain[1] - yDomain[0]) / 2;
      yDomain = [yDomainMu - (yDomainDiff * xr) / yr, yDomainMu + (yDomainDiff * xr) / yr];
    }
  }

  return [xDomain, yDomain];
};

const locationFromDomain = ([xDomain, yDomain]) => {
  return {
    left: xDomain[0],
    right: xDomain[1],
    bottom: yDomain[0],
    top: yDomain[1],
  };
};

export const useZoomablePlot = (xDomain, yDomain, xRange, yRange, preserveRatio) => {
  const [lastLocation, setLastLocation] = useState(
    locationFromDomain(transformFixRatio(xDomain, yDomain, xRange, yRange, preserveRatio))
  );

  const lastLocRef = useRef(lastLocation);
  const initalLocRef = useRef(null);
  const lastDomains = useRef(null);
  const lastRange = useRef(null);
  const dragging = useRef(false);
  const scrollEnabled = useRef({
    enabled: true,
    counter: 0,
    preventDefault: (e) => {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.returnValue = false;
    },
  });

  lastLocRef.current = lastLocation;
  lastRange.current = { xRange, yRange };

  useEffect(() => {
    let [xD, yD] = transformFixRatio(xDomain, yDomain, xRange, yRange, preserveRatio);

    if (!domainMatch(xD, yD, lastDomains.current)) {
      setLastLocation(locationFromDomain([xD, yD]));
    }

    lastDomains.current = {
      xDomain: xD,
      yDomain: yD,
    };
  }, [xDomain, yDomain]);

  useEffect(() => {
    let [xD, yD] = transformFixRatio(xDomain, yDomain, xRange, yRange, preserveRatio);

    if (!domainMatch(xD, yD, lastDomains.current)) {
      setLastLocation(locationFromDomain([xD, yD]));

      lastDomains.current = {
        xDomain: xD,
        yDomain: yD,
      };
    }
  }, [xRange, yRange, preserveRatio]);

  const events = useMemo(
    () => ({
      onPointerDown: (e) => {
        dragging.current = true;
        initalLocRef.current = { x: e.screenX, y: e.screenY, ...lastLocRef.current };
      },
      onPointerUp: (e, ref) => {
        ref.current.releasePointerCapture(e.pointerId);
        dragging.current = false;
      },
      onPointerMove: (e, ref, direction = null) => {
        const lastLoc = lastLocRef.current;

        if (dragging.current) {
          if (!ref.current) {
            ref.current.setPointerCapture(e.pointerId);
          }

          let screenDeltaX = e.screenX - initalLocRef.current.x;
          let screenDeltaY = e.screenY - initalLocRef.current.y;

          if (direction === DIRECTION.VERTICAL) {
            screenDeltaX = 0;
          } else if (direction === DIRECTION.HORIZONTAL) {
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

          setLastLocation(newLoc);
        }
      },
      onWheel: (e, direction = null) => {
        const fallbackLocation = { ...lastLocRef.current };
        direction = preserveRatio ? null : direction;

        if (e.deltaY > 0) {
          setLastLocation((location) => scaleLoc(location || fallbackLocation, 1.1, direction));
        } else {
          setLastLocation((location) => scaleLoc(location || fallbackLocation, 1 / 1.1, direction));
        }
      },
      onPointerLeave: () => {
        dragging.current = false;

        // enable document scroll
        scrollEnabled.current.counter--;
        if (scrollEnabled.current.counter === 0) {
          scrollEnabled.current.enabled = true;
          document.removeEventListener("wheel", scrollEnabled.current.preventDefault, {
            passive: false,
          });
        }
      },
      onPointerEnter: () => {
        // disable document scroll

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
    [preserveRatio, setLastLocation, dragging]
  );

  const domains = useMemo(
    () => ({
      xDomain: [lastLocation.left, lastLocation.right],
      yDomain: [lastLocation.bottom, lastLocation.top],
    }),
    [lastLocation]
  );

  return [domains, events];
};
