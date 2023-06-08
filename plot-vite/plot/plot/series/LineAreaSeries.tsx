import React, { HTMLAttributes, useMemo } from "react";

import { usePlotContext, GPlotRegion } from "../plot-utils";

import * as d3Shape from "d3-shape";

const renderArea = (data, getX, getY, getY0, curve) => {
  let area = d3Shape.area().x(getX).y1(getY);

  if (curve !== null) {
    if (typeof curve === "string" && d3Shape[curve]) {
      area.curve(d3Shape[curve]);
    } else if (typeof curve === "function") {
      area.curve(curve);
    }
  }
  if (getY0) {
    area.y0(getY0);
  }
  return area([...data]);
};

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
}: {
  data: T[];
  getX: (d: T, i: number) => number;
  getY: (d: T, i: number) => number;
  getY0?: (d: T, i: number) => number;
  curve?: any;
  color?: string;
  fill?: string;
  width?: number;
  className?: string;
} & HTMLAttributes<SVGPathElement>) => {
  const { xScale, yScale } = usePlotContext();

  const areaD = useMemo(
    () =>
      renderArea(
        data,
        (d, i) => xScale(getX(d, i)),
        (d, i) => yScale(getY(d, i)),
        (d, i) => yScale(getY0(d, i)),
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
