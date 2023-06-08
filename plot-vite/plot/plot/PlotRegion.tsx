import { useMemo, useRef, useCallback, memo, RefObject, ReactNode } from "react";

import { usePlotContext, useSVGContext } from "./plot-utils";

type PlotRegionProps = {
  fill?: string;
  draggable?: boolean;
  children?: ReactNode;
  cursor?: string;
};

// TODO event typing
export const PlotRegionUnmemorised = ({
  fill = "var(--color-background-alt)",
  draggable = false,
  children,
  cursor = "auto",
  ...rest
}: PlotRegionProps) => {
  const { left, innerWidth, top, innerHeight, events } = usePlotContext();
  const ref = useRef<SVGRectElement>(null);

  const onEvents = usePlotRegionEvents();

  const regionEvents = useMemo(() => onEvents({ ...rest }, ref), [ref, rest, onEvents]);

  const { onPointerDown, onPointerUp, onPointerMove, onWheel } = events;

  const draggableEvents = useMemo(() => {
    if (draggable) {
      return {
        onPointerUp: (e: PointerEvent) => onPointerUp(e, ref),
        onPointerMove: (e: PointerEvent) => onPointerMove(e, ref),
      };
    }
    return null;
  }, [onPointerUp, onPointerMove, draggable]);

  const style = useMemo(() => ({ cursor: draggable ? "move" : cursor }), [cursor, draggable]);

  return (
    <g
      className="plot__region"
      {...draggableEvents}
      {...regionEvents}
      onPointerDown={onPointerDown}
      onWheel={onWheel}
      style={style}>
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
    [containerRef, xScaleEvent, yScaleEvent]
  );

  return useCallback(
    (props, ref: RefObject<SVGRectElement>) => {
      const eventHandlerKeys = props ? Object.keys(props).filter((k) => k.startsWith("on")) : [];
      const p: any = {};
      for (let i = 0; i < eventHandlerKeys.length; i++) {
        const key = eventHandlerKeys[i];
        p[key] = (e) => props[key](addData(e, ref));
      }
      return p;
    },
    [addData]
  );
};
