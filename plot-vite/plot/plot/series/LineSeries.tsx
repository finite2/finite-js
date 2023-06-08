import React, { useMemo } from "react";
import * as d3Shape from "d3-shape";

import { usePlotContext, GPlotRegion } from "../plot-utils";

//TODO add curve type
const renderLine = <T,>(
  data: T[],
  x: (d: T, index: number) => number,
  y: (d: T, index: number) => number,
  curve
) => {
  let line = d3Shape.line().x(x).y(y);
  if (curve !== null) {
    if (typeof curve === "string" && d3Shape[curve]) {
      line.curve(d3Shape[curve]);
    } else if (typeof curve === "function") {
      line.curve(curve);
    }
  }
  return line(data);
};

type LineSeriesProps<T> = {
  data: T[];
  getX: (d: T, index: number) => number;
  getY: (d: T, index: number) => number;
  curve?: any;
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
    [data, xScale, yScale, getX, getY]
  );

  return (
    <GPlotRegion className="plot__series--line">
      <path d={dPath} fill="#0000" stroke={color} strokeWidth={width} {...rest} />
    </GPlotRegion>
  );
};
