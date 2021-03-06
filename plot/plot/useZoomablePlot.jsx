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
  const lastDomains = useRef(null);
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
      onPointerDown: () => {
        dragging.current = true;
      },
      onPointerUp: (e, ref) => {
        ref.current.releasePointerCapture(e.pointerId);
        dragging.current = false;
      },
      onPointerMove: (e, ref, direction = null) => {
        if (dragging.current) {
          const lastLoc = lastLocRef.current;

          ref.current.setPointerCapture(e.pointerId);
          let { movementX, movementY } = e;

          if (direction === DIRECTION.VERTICAL) {
            movementX = 0;
          } else if (direction === DIRECTION.HORIZONTAL) {
            movementY = 0;
          }

          const xUnitPixel = (lastLoc.right - lastLoc.left) / (xRange[1] - xRange[0]);
          const yUnitPixel = (lastLoc.top - lastLoc.bottom) / (yRange[1] - yRange[0]);

          const newLoc = {
            left: lastLoc.left - xUnitPixel * movementX,
            right: lastLoc.right - xUnitPixel * movementX,
            bottom: lastLoc.bottom - yUnitPixel * movementY,
            top: lastLoc.top - yUnitPixel * movementY,
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
    [xRange, yRange, preserveRatio, setLastLocation, dragging]
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
