import React from "react";

import { usePlotContext, GPlotRegion } from "../plot-utils";

const generatePath = <P,>(
  points: P[],
  getX: (d: P, index: number) => number,
  getY: (d: P, index: number) => number
) =>
  `${points.reduce(
    (res, d, index) => `${res} ${index ? "L" : "M"}${getX(d, index)} ${getY(d, index)}`,
    ""
  )} Z`;

type PolygonSeriesProps<T extends { points: P[] }, P> = {
  data: T[];
  getX: (d: P, index: number) => number;
  getY: (d: P, index: number) => number;
  getColor?: (d: T, index: number) => string;
  getStroke?: (d: T, index: number) => string;
  getOpacity?: (d: T, index: number) => number;
  getFill?: (d: T, index: number) => string;
  strokeWidth?: number;
  stroke?: string;
  color?: string;
  onClick?: (
    e: React.MouseEvent,
    d: T,
    getX: (d: P, index: number) => number,
    getY: (d: P, index: number) => number
  ) => void;
  onMouseEnter?: (e: React.MouseEvent, d: T) => void;
  id?: string;
};

export const PolygonSeries = <T extends { points: P[] }, P>({
  id,
  data,
  getX,
  getY,
  getColor,
  getStroke = getColor,
  getFill = getColor,
  getOpacity,
  strokeWidth,
  stroke,
  color = "blue",
  onClick,
  onMouseEnter,
  ...rest
}: PolygonSeriesProps<T, P>) => {
  const { xScale, yScale } = usePlotContext();

  const scaledGetX = (d: P, index: number) => xScale(getX(d, index));
  const scaledGetY = (d: P, index: number) => yScale(getY(d, index));

  const polygons = data.map((d, index) => {
    const attrs = {
      key: index,
      d: generatePath<P>(d.points, scaledGetX, scaledGetY),
      stroke: strokeWidth ? (getStroke ? getStroke(d, index) : stroke ? stroke : color) : undefined,
      fill: getFill ? getFill(d, index) : color,
      strokeWidth: strokeWidth || 0,
      opacity: getOpacity ? getOpacity(d, index) : undefined,
      onClick: onClick ? (e) => onClick(e, d, scaledGetX, scaledGetY) : undefined,
      onMouseEnter: onMouseEnter ? (e) => onMouseEnter(e, d) : undefined,
    };

    return <path {...attrs} {...rest} />;
  });

  return (
    <GPlotRegion id={id} className="plot__series--polygon">
      {polygons}
    </GPlotRegion>
  );
};
