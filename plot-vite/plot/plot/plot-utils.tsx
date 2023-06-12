import {
  Dispatch,
  MouseEvent,
  PointerEvent,
  RefObject,
  SVGProps,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { ScaleLinear, scaleLinear, scaleLog } from "d3-scale";
import { PlotContextEvents } from "./useZoomablePlot";
import { ISeriesEvents, SeriesEvents } from "./types";

type SVGContext = {
  width: number;
  height: number;
  svgRef: RefObject<SVGSVGElement>;
  containerRef: RefObject<HTMLDivElement>;
  setSize: Dispatch<
    SetStateAction<{
      width: number;
      height: number;
    }>
  >;
  resetSize: () => void;
};

export const SVGContext = createContext<SVGContext | null>(null);

export const useSVGContext = () => {
  const context = useContext(SVGContext);

  if (!context) {
    throw new Error("useSVGContext must be used within a SVGContextProvider");
  }

  return context;
};

// innerWidth, data plot region width
// innerHeight, data plot region height
// outerLeft, outer plot region (relative to svg, including margins)
// outerRight, outer plot region (relative to svg, including margins)
// outerBottom, outer plot region (relative to svg, including margins)
// outerTop, outer plot region (relative to svg, including margins)
// left, inner plot region (relative to svg)
// right, inner plot region (relative to svg)
// bottom, inner plot region (relative to svg)
// top, inner plot region (relative to svg)
// xType, string (possibly optional)
// xDomain, [min,max] (possibly optional)
// xScale, d3 scale object
// yType, string (possibly optional)
// yDomain, [min,max] (possibly optional)
// yScale, d3 scale object
type PlotContext = {
  innerWidth: number;
  innerHeight: number;
  outerLeft: number;
  outerRight: number;
  outerBottom: number;
  outerTop: number;
  left: number;
  right: number;
  bottom: number;
  top: number;
  xType: "linear" | "log" | "ordinal";
  xDomain: [number, number];
  xRange: [number, number];
  xValues?: string[];
  xScale: ScaleLinear<number, number, never>;
  xScaleEvent: (containerWidth: number) => ScaleLinear<number, number, never>; // returns d3 scale object
  yType: "linear" | "log" | "ordinal";
  yDomain: [number, number];
  yRange: [number, number];
  yValues?: string[];
  yScale: ScaleLinear<number, number, never>;
  yScaleEvent: (containerHeight: number) => ScaleLinear<number, number, never>; // returns d3 scale object
  preserveRatio: boolean;
  events: PlotContextEvents;
};
// TODO xType, yType as literal types

export const PlotContext = createContext<PlotContext | null>(null);

export const usePlotContext = () => {
  const context = useContext(PlotContext);

  if (!context) {
    throw new Error("usePlotContext must be used within a PlotContextProvider");
  }

  return context;
};

export const getTickValues = (
  scale: ScaleLinear<number, number, never>,
  ordinalValues?: string[],
  tickTotal?: number,
  tickValues?: number | number[]
): number[] => {
  if (typeof tickValues === "number") {
    return [tickValues];
  } else if (Array.isArray(tickValues)) {
    return tickValues;
  } else if (ordinalValues) {
    return ordinalValues.map((_, i) => i);
  }
  return scale.ticks ? scale.ticks(tickTotal) : scale.domain();
};

export const GPlotRegion = ({ className, children, ...rest }: SVGProps<SVGGElement>) => {
  const { left, top } = usePlotContext();

  return (
    <g className={className} transform={`translate(${left},${top})`} {...rest}>
      {children}
    </g>
  );
};

export function onDataEvents<T>(
  {
    onClick,
    onContextMenu,
    onDoubleClick,
    onPointerEnter,
    onPointerLeave,
    onPointerMove,
    onPointerOut,
  }: SeriesEvents<T>,
  d: T,
  index: number
) {
  const ev: ISeriesEvents = {};

  if (onClick) ev.onClick = (event: MouseEvent) => onClick(event, d, index);
  if (onContextMenu) ev.onContextMenu = (event: MouseEvent) => onContextMenu(event, d, index);
  if (onDoubleClick) ev.onDoubleClick = (event: MouseEvent) => onDoubleClick(event, d, index);
  if (onPointerEnter) ev.onPointerEnter = (event: PointerEvent) => onPointerEnter(event, d, index);
  if (onPointerLeave) ev.onPointerLeave = (event: PointerEvent) => onPointerLeave(event, d, index);
  if (onPointerMove) ev.onPointerMove = (event: PointerEvent) => onPointerMove(event, d, index);
  if (onPointerOut) ev.onPointerOut = (event: PointerEvent) => onPointerOut(event, d, index);

  return ev;
}

export const getScale = (
  domain: [number, number],
  range: [number, number],
  type: "linear" | "log" | "ordinal" = "linear"
) => {
  if (type === "linear" || type === "ordinal") {
    return scaleLinear().domain(domain).range(range);
  } else if (type === "log") {
    if (domain[0] <= 0) {
      console.warn("log scale cannot be less than or equal to zero");
    }
    return scaleLog().domain(domain).range(range);
  } else {
    throw new Error("unknown scale type");
  }
};
