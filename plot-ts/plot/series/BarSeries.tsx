import React from "react";
// import styled from "styled-components";

import {
  usePlotContext,
  GPlotRegion,
  classes,
  onDataEvents,
  DIRECTION,
  Direction,
} from "../plot-utils";

const getPosition = (
  direction: Direction,
  x0: number,
  y0: number,
  y1: number,
  halfWidth: number
) => {
  if (direction === DIRECTION.VERTICAL) {
    return { x: x0, y: y0, width: halfWidth * 2, height: y1 - y0 };
  } else {
    return { x: y1, y: x0, width: y0 - y1, height: halfWidth * 2 };
  }
};

export const BarSeries = ({
  direction,
  data,
  getCategory = (d, i) => i,
  getHeight = (d) => d.y,
  getHeight0,
  getColor,
  getStroke = getColor,
  getOpacity,
  getFill = getColor,
  strokeWidth,
  color = "blue",
  width = 0.5,
  offset = 0,
  className,
  style,
  ...rest
}) => {
  const extraProps = { ...rest };
  const { xScale, yScale /* xType, yType */ } = usePlotContext();

  const categoryScale = direction === DIRECTION.VERTICAL ? xScale : yScale;
  const heightScale = direction === DIRECTION.VERTICAL ? yScale : xScale;

  const distance = Math.abs(categoryScale(1) - categoryScale(0));
  const halfWidth = (distance * width) / 2;
  const offsetDist = distance * offset;

  // debugger;

  const points = data.map((d, i) => {
    const x0 = categoryScale(getCategory(d, i)) - halfWidth + offsetDist;
    const y0 = heightScale(getHeight(d, i));
    const y1 = heightScale(getHeight0 ? getHeight0(d, i) : 0);

    const attrs = {
      ...getPosition(direction, x0, y0, y1, halfWidth),
      key: i,
      color: getColor ? getColor(d, i) : color,
      style: {
        opacity: getOpacity && getOpacity(d, i),
        stroke: getStroke ? getStroke(d, i) : color,
        fill: getFill ? getFill(d, i) : color,
        strokeWidth: strokeWidth || 1,
        ...style,
      },
      ...onDataEvents(extraProps, d, i),
    };

    return <rect {...attrs} />;
  });

  return <GPlotRegion className={classes("plot__series--bars", className)}>{points}</GPlotRegion>;
};

export const VerticalBarSeries = ({ ...props }) => {
  return <BarSeries direction={DIRECTION.VERTICAL} {...props} />;
};
export const HorizontalBarSeries = ({ ...props }) => {
  return <BarSeries direction={DIRECTION.HORIZONTAL} {...props} />;
};
