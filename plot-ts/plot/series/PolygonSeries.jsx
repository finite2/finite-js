import React from "react";
import styled from "styled-components";

import { usePlotContext, GPlotRegion, classes } from "../plot-utils";

const generatePath = (data, getX, getY) =>
  `${data.reduce((res, row, i) => `${res} ${i ? "L" : "M"}${getX(row)} ${getY(row)}`, "")} Z`;

const PolygonPath = styled.path`
  stroke-width: 0;
`;

export const PolygonSeries = ({
  id,
  className,
  style,
  data,
  getX,
  getY,
  getColor,
  getStroke,
  getOpacity,
  getFill,
  strokeWidth,
  stroke,
  color,
  onClick,
  onMouseEnter,
}) => {
  const { xScale, yScale } = usePlotContext();

  if (getColor) {
    if (!getFill) {
      getFill = getColor;
    }
    if (!getStroke) {
      getStroke = getColor;
    }
  }

  const scaledGetX = (d) => xScale(getX(d));
  const scaledGetY = (d) => yScale(getY(d));

  const polygons = data.map((d, i) => {
    const attrs = {
      key: i,
      d: generatePath(d.points, scaledGetX, scaledGetY),
      style: {
        opacity: getOpacity && getOpacity(d),
        stroke: strokeWidth ? (getStroke ? getStroke(d) : stroke ? stroke : color) : null,
        fill: getFill ? getFill(d) : color,
        strokeWidth: strokeWidth || null,
        ...style,
      },
      onClick: (e) => onClick(e, d, scaledGetX, scaledGetY),
      onMouseEnter: onMouseEnter ? (e) => onMouseEnter(e, d) : null,
    };

    return <PolygonPath {...attrs} />;
  });

  return (
    <GPlotRegion
      id={id}
      className={classes("plot__series--polygon", className)}
      style={{ fill: color }}>
      {polygons}
    </GPlotRegion>
  );
};

PolygonSeries.defaultProps = {
  getX: (d) => d.x,
  getY: (d) => d.y,
  color: "blue",
  onClick: () => null,
};
