import React, { CSSProperties, HTMLAttributes, useMemo } from "react";

import { usePlotContext, GPlotRegion, classes } from "../plot-utils";

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
  className,
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

  const style: CSSProperties = useMemo(() => ({ stroke: color, strokeWidth: width, fill }), [
    color,
    width,
    fill,
  ]);

  return (
    <GPlotRegion className={classes("plot__series--line-area", className)}>
      <path d={areaD} style={style} {...rest} />
    </GPlotRegion>
  );
};
