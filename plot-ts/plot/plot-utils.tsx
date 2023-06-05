import { SVGProps, createContext, useContext } from "react";
import { scaleLinear, scaleLog } from "d3-scale";

export const SVGContext = createContext({
  width: 900,
  height: 600,
});

export const useSVGContext = () => useContext(SVGContext);

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
  xScale: any;
  xScaleEvent: (containerWidth: number) => any; // returns d3 scale object
  yType: "linear" | "log" | "ordinal";
  yDomain: [number, number];
  yRange: [number, number];
  yValues?: string[];
  yScale: any;
  yScaleEvent: (containerHeight: number) => any; // returns d3 scale object
  preserveRatio: boolean;
  events: any;
};
// TODO d3 scale types
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
  scale,
  ordinalValues: string[],
  tickTotal?: number,
  tickValues?: number | number[]
): number[] => {
  if (typeof tickValues === "number") {
    return [tickValues];
  } else if (Array.isArray(tickValues)) {
    return tickValues;
  } else if (ordinalValues) {
    return ordinalValues.map((d, i) => i);
  }
  return scale.ticks ? scale.ticks(tickTotal) : scale.domain();
};

export function classes(...args: any[]) {
  return [...args].filter(Boolean).join(" ");
}

type ValueOf<T> = T[keyof T];

export const ORIENTATION = {
  TOP: "top",
  LEFT: "left",
  RIGHT: "right",
  BOTTOM: "bottom",
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal",
} as const;

export type Orientation = ValueOf<typeof ORIENTATION>;

export const DIRECTION = {
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal",
} as const;

export type Direction = ValueOf<typeof DIRECTION>;

export const GPlotRegion = ({
  className,
  children,
  ...rest
}: Omit<SVGProps<SVGGElement>, "transform">) => {
  const { left, top } = usePlotContext();

  return (
    <g className={className} transform={`translate(${left},${top})`} {...rest}>
      {children}
    </g>
  );
};

export function onDataEvents<T>(props: any, data: T[], index: number) {
  let eventHandlerKeys = Object.keys(props).filter((k) => k.startsWith("on"));
  let p = {};
  for (var i = 0; i < eventHandlerKeys.length; i++) {
    let key = eventHandlerKeys[i];
    p[key] = (e) => props[key](e, data, index);
  }
  return p;
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
  }
};
