import { HTMLAttributes, useMemo } from "react";

import { usePlotContext, GPlotRegion } from "../plot-utils";

import * as d3Shape from "d3-shape";

type CurveType =
  | "curveBasis"
  | "curveBasisClosed"
  | "curveBasisOpen"
  | "curveCardinal"
  | "curveCardinalClosed"
  | "curveCardinalOpen"
  | "curveCatmullRom"
  | "curveCatmullRomClosed"
  | "curveCatmullRomOpen"
  | "curveMonotoneX"
  | "curveMonotoneY"
  | "curveNatural"
  | "curveLinear"
  | "curveLinearClosed"
  | "curveStep"
  | "curveStepAfter"
  | "curveStepBefore";

const renderArea = <T,>(
  data: T[],
  x: (d: T, index: number) => number,
  y1: (d: T, index: number) => number,
  y0?: (d: T, index: number) => number,
  curve?: CurveType
) => {
  const area = d3Shape.area<T>().x(x).y1(y1);

  if (curve !== null) {
    if (typeof curve === "string" && d3Shape[curve]) {
      area.curve(d3Shape[curve]);
    } else if (typeof curve === "function") {
      area.curve(curve);
    }
  }
  if (y0) {
    area.y0(y0);
  }

  const d = area(data);
  return d ?? undefined;
};

export type LineAreaSeriesProps<T> = {
  data: T[];
  getX: (d: T, i: number) => number;
  getY: (d: T, i: number) => number;
  getY0?: (d: T, i: number) => number;
  curve?: any;
  color?: string;
  fill?: string;
  width?: number;
  className?: string;
} & HTMLAttributes<SVGPathElement>;

export const LineAreaSeries = <T,>({
  data,
  getX,
  getY,
  getY0 = () => 0,
  curve,
  color = "var(--color-primary)",
  fill = "var(--color-primary)",
  width = 0,
  ...rest
}: LineAreaSeriesProps<T>) => {
  const { xScale, yScale } = usePlotContext();

  const areaD = useMemo(
    () =>
      renderArea(
        data,
        (d, index) => xScale(getX(d, index)),
        (d, index) => yScale(getY(d, index)),
        (d, index) => yScale(getY0(d, index)),
        curve
      ),
    [data, xScale, yScale, getX, getY, getY0]
  );

  return (
    <GPlotRegion className="plot__series--line-area">
      <path d={areaD} {...rest} stroke={color} strokeWidth={width} fill={fill} />
    </GPlotRegion>
  );
};
