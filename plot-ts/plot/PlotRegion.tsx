import React, { useMemo, useRef, useCallback, memo, RefObject } from "react";

import { usePlotContext, useSVGContext } from "./plot-utils";

export const PlotRegionUnmemorised = ({
  fill = "var(--color-background-alt)",
  draggable = false,
  children,
  cursor = "auto",
  ...rest
}) => {
  const { left, innerWidth, top, innerHeight, events } = usePlotContext();
  const ref = useRef<SVGRectElement>(null);

  const onEvents = usePlotRegionEvents();

  const regionEvents = useMemo(() => onEvents({ ...rest }, ref), [ref, rest]);

  const draggableEvents = useMemo(() => {
    if (draggable) {
      const { onPointerDown, onPointerUp, onPointerMove, onWheel } = events;

      return {
        onPointerDown: (e) => onPointerDown(e, ref),
        onPointerUp: (e) => onPointerUp(e, ref),
        onPointerMove: (e) => onPointerMove(e, ref),
        onWheel: (e) => onWheel(e, ref),
      };
    }
    return null;
  }, [events, draggable]);

  const style = useMemo(() => ({ cursor: draggable ? "move" : cursor }), [cursor, draggable]);

  return (
    <g {...draggableEvents} {...regionEvents} style={style}>
      <rect
        ref={ref}
        className="plot__region-dragcatcher"
        x={left}
        y={top}
        width={innerWidth}
        height={innerHeight}
        fill={fill}
      />
      {children}
    </g>
  );
};

export const PlotRegion = memo(PlotRegionUnmemorised);

const usePlotRegionEvents = () => {
  const { xScaleEvent, yScaleEvent } = usePlotContext();
  const { containerRef } = useSVGContext();

  const addData = useCallback(
    (e, ref: RefObject<SVGRectElement>) => {
      if (!ref.current || !containerRef.current) return e;
      const { top, left } = ref.current.getBoundingClientRect();
      const { width, height } = containerRef.current.getBoundingClientRect();

      e.xAbsPosition = e.clientX - left;
      e.xPosition = xScaleEvent(width).invert(e.xAbsPosition);
      e.yAbsPosition = e.clientY - top;
      e.yPosition = yScaleEvent(height).invert(e.yAbsPosition);
      return e;
    },
    [xScaleEvent, yScaleEvent]
  );

  return useCallback(
    (props, ref) => {
      let eventHandlerKeys = props ? Object.keys(props).filter((k) => k.startsWith("on")) : [];
      let p = {};
      for (var i = 0; i < eventHandlerKeys.length; i++) {
        let key = eventHandlerKeys[i];
        p[key] = (e) => props[key](addData(e, ref));
      }
      return p;
    },
    [addData]
  );
};
