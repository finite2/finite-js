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
  onClick?: (e: PosMouseEvent) => void;
  onDoubleClick?: (e: PosMouseEvent) => void;
  onPointerDown?: (e: PosPointerEvent) => void;
  onPointerUp?: (e: PosPointerEvent) => void;
  onPointerMove?: (e: PosPointerEvent) => void;
  onPointerEnter?: (e: PosPointerEvent) => void;
  onPointerLeave?: (e: PosPointerEvent) => void;
  onPointerOver?: (e: PosPointerEvent) => void;
  onPointerOut?: (e: PosPointerEvent) => void;
  onPointerCancel?: (e: PosPointerEvent) => void;
  onGotPointerCapture?: (e: PosPointerEvent) => void;
  onLostPointerCapture?: (e: PosPointerEvent) => void;
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
        contextPointerLeave,
        contextPointerEnter,
        onPointerDown: (e: PointerEvent) => contextPointerDown(e),
        onPointerUp: (e: PointerEvent) => contextPointerUp(e, ref),
        onPointerMove: (e: PointerEvent) => contextPointerMove(e, ref),
        onWheel: (e: WheelEvent) => contextWheel(e),
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

  console.log("draggableEvents", draggableEvents);
  console.log("regionEvents", regionEvents);

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
    (e: PointerEvent, ref: RefObject<SVGRectElement>): PosPointerEvent => {
      if (!ref.current || !containerRef.current) throw new Error("ref not set");
      const { top, left } = ref.current.getBoundingClientRect();
      const { width, height } = containerRef.current.getBoundingClientRect();

      return {
        ...e,
        xAbsPosition: e.clientX - left,
        xPosition: xScaleEvent(width).invert(e.clientX - left),
        yAbsPosition: e.clientY - top,
        yPosition: yScaleEvent(height).invert(e.clientY - top),
      };
    },
    [containerRef, xScaleEvent, yScaleEvent]
  );

  const addDataMouseEvent = useCallback(
    (e: MouseEvent, ref: RefObject<SVGRectElement>): PosMouseEvent => {
      if (!ref.current || !containerRef.current) throw new Error("ref not set");
      const { top, left } = ref.current.getBoundingClientRect();
      const { width, height } = containerRef.current.getBoundingClientRect();

      return {
        ...e,
        xAbsPosition: e.clientX - left,
        xPosition: xScaleEvent(width).invert(e.clientX - left),
        yAbsPosition: e.clientY - top,
        yPosition: yScaleEvent(height).invert(e.clientY - top),
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

      if (onClick) ev.onClick = (e: MouseEvent) => onClick(addDataMouseEvent(e, ref));
      if (onDoubleClick)
        ev.onDoubleClick = (e: MouseEvent) => onDoubleClick(addDataMouseEvent(e, ref));
      if (onPointerDown) ev.onPointerDown = (e: PointerEvent) => onPointerDown(addData(e, ref));
      if (onPointerUp) ev.onPointerUp = (e: PointerEvent) => onPointerUp(addData(e, ref));
      if (onPointerMove) ev.onPointerMove = (e: PointerEvent) => onPointerMove(addData(e, ref));
      if (onPointerEnter) ev.onPointerEnter = (e: PointerEvent) => onPointerEnter(addData(e, ref));
      if (onPointerLeave) ev.onPointerLeave = (e: PointerEvent) => onPointerLeave(addData(e, ref));
      if (onPointerOver) ev.onPointerOver = (e: PointerEvent) => onPointerOver(addData(e, ref));
      if (onPointerOut) ev.onPointerOut = (e: PointerEvent) => onPointerOut(addData(e, ref));
      if (onPointerCancel)
        ev.onPointerCancel = (e: PointerEvent) => onPointerCancel(addData(e, ref));
      if (onGotPointerCapture)
        ev.onGotPointerCapture = (e: PointerEvent) => onGotPointerCapture(addData(e, ref));
      if (onLostPointerCapture)
        ev.onLostPointerCapture = (e: PointerEvent) => onLostPointerCapture(addData(e, ref));

      return ev;
    },
    [addData, addDataMouseEvent]
  );
};
