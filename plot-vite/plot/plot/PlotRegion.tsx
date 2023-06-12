import {
  useMemo,
  useRef,
  useCallback,
  memo,
  RefObject,
  ReactNode,
  CSSProperties,
  PointerEvent,
  WheelEvent,
  MouseEvent,
} from "react";

import { usePlotContext, useSVGContext } from "./plot-utils";
import { GEvents, LocationEvents, PosMouseEvent, PosPointerEvent } from "./types";
import { twMerge } from "tailwind-merge";

type PlotRegionProps = {
  fill?: string;
  draggable?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  onClick?: (event: PosMouseEvent) => void;
  onDoubleClick?: (event: PosMouseEvent) => void;
  onPointerDown?: (event: PosPointerEvent) => void;
  onPointerUp?: (event: PosPointerEvent) => void;
  onPointerMove?: (event: PosPointerEvent) => void;
  onPointerEnter?: (event: PosPointerEvent) => void;
  onPointerLeave?: (event: PosPointerEvent) => void;
  onPointerOver?: (event: PosPointerEvent) => void;
  onPointerOut?: (event: PosPointerEvent) => void;
  onPointerCancel?: (event: PosPointerEvent) => void;
  onGotPointerCapture?: (event: PosPointerEvent) => void;
  onLostPointerCapture?: (event: PosPointerEvent) => void;
};

// TODO event typing
export const PlotRegionUnmemorised = ({
  fill = "var(--color-background-alt)",
  draggable = false,
  className,
  children,
  onClick,
  onDoubleClick,
  onPointerDown,
  onPointerUp,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
  onPointerOver,
  onPointerOut,
  onPointerCancel,
  onGotPointerCapture,
  onLostPointerCapture,
  style,
}: PlotRegionProps) => {
  const { left, innerWidth, top, innerHeight, events } = usePlotContext();
  const ref = useRef<SVGRectElement>(null);

  const onEvents = usePlotRegionEvents();

  const regionEvents = useMemo(
    () =>
      onEvents(
        {
          onClick,
          onDoubleClick,
          onPointerDown,
          onPointerUp,
          onPointerMove,
          onPointerEnter,
          onPointerLeave,
          onPointerOver,
          onPointerOut,
          onPointerCancel,
          onGotPointerCapture,
          onLostPointerCapture,
        },
        ref
      ),
    [
      ref,
      onClick,
      onDoubleClick,
      onPointerDown,
      onPointerUp,
      onPointerMove,
      onPointerEnter,
      onPointerLeave,
      onPointerOver,
      onPointerOut,
      onPointerCancel,
      onGotPointerCapture,
      onLostPointerCapture,
      onEvents,
    ]
  );

  const {
    onPointerEnter: contextPointerEnter,
    onPointerLeave: contextPointerLeave,
    onPointerDown: contextPointerDown,
    onPointerUp: contextPointerUp,
    onPointerMove: contextPointerMove,
    onWheel: contextWheel,
  } = events;

  const draggableEvents = useMemo(() => {
    if (draggable) {
      return {
        onPointerLeave: contextPointerLeave,
        onPointerEnter: contextPointerEnter,
        onPointerDown: (event: PointerEvent) => contextPointerDown(event),
        onPointerUp: (event: PointerEvent) => contextPointerUp(event, ref),
        onPointerMove: (event: PointerEvent) => contextPointerMove(event, ref),
        onWheel: (event: WheelEvent) => contextWheel(event),
      };
    }
    return null;
  }, [
    contextPointerEnter,
    contextPointerDown,
    contextPointerLeave,
    contextPointerUp,
    contextPointerMove,
    contextWheel,
    draggable,
  ]);

  // TODO: event type mismatch here. Decide what to do about it.
  return (
    <g className="plot__region" {...draggableEvents} {...regionEvents}>
      <rect
        ref={ref}
        className={twMerge("plot__region-dragcatcher", draggable && "cursor-move", className)}
        style={style}
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

  // TODO these functions share implementation but not type
  const addData = useCallback(
    (event: PointerEvent, ref: RefObject<SVGRectElement>): PosPointerEvent => {
      if (!ref.current || !containerRef.current) throw new Error("ref not set");
      const { top, left } = ref.current.getBoundingClientRect();
      const { width, height } = containerRef.current.getBoundingClientRect();

      return {
        ...event,
        xAbsPosition: event.clientX - left,
        xPosition: xScaleEvent(width).invert(event.clientX - left),
        yAbsPosition: event.clientY - top,
        yPosition: yScaleEvent(height).invert(event.clientY - top),
      };
    },
    [containerRef, xScaleEvent, yScaleEvent]
  );

  const addDataMouseEvent = useCallback(
    (event: MouseEvent, ref: RefObject<SVGRectElement>): PosMouseEvent => {
      if (!ref.current || !containerRef.current) throw new Error("ref not set");
      const { top, left } = ref.current.getBoundingClientRect();
      const { width, height } = containerRef.current.getBoundingClientRect();

      return {
        ...event,
        xAbsPosition: event.clientX - left,
        xPosition: xScaleEvent(width).invert(event.clientX - left),
        yAbsPosition: event.clientY - top,
        yPosition: yScaleEvent(height).invert(event.clientY - top),
      };
    },
    [containerRef, xScaleEvent, yScaleEvent]
  );

  return useCallback(
    (
      {
        onClick,
        onDoubleClick,
        onPointerDown,
        onPointerUp,
        onPointerMove,
        onPointerEnter,
        onPointerLeave,
        onPointerOver,
        onPointerOut,
        onPointerCancel,
        onGotPointerCapture,
        onLostPointerCapture,
      }: LocationEvents,
      ref: RefObject<SVGRectElement>
    ): Partial<GEvents> => {
      const ev: Partial<GEvents> = {};

      if (onClick) ev.onClick = (event: MouseEvent) => onClick(addDataMouseEvent(event, ref));
      if (onDoubleClick)
        ev.onDoubleClick = (event: MouseEvent) => onDoubleClick(addDataMouseEvent(event, ref));
      if (onPointerDown)
        ev.onPointerDown = (event: PointerEvent) => onPointerDown(addData(event, ref));
      if (onPointerUp) ev.onPointerUp = (event: PointerEvent) => onPointerUp(addData(event, ref));
      if (onPointerMove)
        ev.onPointerMove = (event: PointerEvent) => onPointerMove(addData(event, ref));
      if (onPointerEnter)
        ev.onPointerEnter = (event: PointerEvent) => onPointerEnter(addData(event, ref));
      if (onPointerLeave)
        ev.onPointerLeave = (event: PointerEvent) => onPointerLeave(addData(event, ref));
      if (onPointerOver)
        ev.onPointerOver = (event: PointerEvent) => onPointerOver(addData(event, ref));
      if (onPointerOut)
        ev.onPointerOut = (event: PointerEvent) => onPointerOut(addData(event, ref));
      if (onPointerCancel)
        ev.onPointerCancel = (event: PointerEvent) => onPointerCancel(addData(event, ref));
      if (onGotPointerCapture)
        ev.onGotPointerCapture = (event: PointerEvent) => onGotPointerCapture(addData(event, ref));
      if (onLostPointerCapture)
        ev.onLostPointerCapture = (event: PointerEvent) =>
          onLostPointerCapture(addData(event, ref));

      return ev;
    },
    [addData, addDataMouseEvent]
  );
};
