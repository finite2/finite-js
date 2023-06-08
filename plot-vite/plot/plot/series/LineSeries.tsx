import React, { useMemo } from "react";
import * as d3Shape from "d3-shape";
import { usePlotContext, GPlotRegion, CurveType } from "../plot-utils";

const renderLine = <T,>(
  data: T[],
  x: (d: T, index: number) => number,
  y: (d: T, index: number) => number,
  curve?: CurveType
) => {
  const line = d3Shape.line<T>().x(x).y(y);
  if (curve !== null) {
    if (typeof curve === "string" && d3Shape[curve]) {
      line.curve(d3Shape[curve]);
    } else if (typeof curve === "function") {
      line.curve(curve);
    }
  }

  const d = line(data);

  return d ?? undefined;
};

type LineSeriesProps<T> = {
  data: T[];
  getX: (d: T, index: number) => number;
  getY: (d: T, index: number) => number;
  curve?: CurveType;
  color?: string;
  width?: number;
  className?: string;
} & React.SVGProps<SVGPathElement>;

export const LineSeries = <T,>({
  data,
  getX,
  getY,
  curve,
  color = "var(--color-primary)",
  width = 2,
  ...rest
}: LineSeriesProps<T>) => {
  const { xScale, yScale } = usePlotContext();

  const dPath = useMemo(
    () =>
      renderLine(
        data,
        (d, index) => xScale(getX(d, index)),
        (d, index) => yScale(getY(d, index)),
        curve
      ),
    [data, xScale, yScale, getX, getY, curve]
  );

  return (
    <GPlotRegion className="plot__series--line">
      <path d={dPath} fill="#0000" stroke={color} strokeWidth={width} {...rest} />
    </GPlotRegion>
  );
};
