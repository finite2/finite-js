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

type BarSeriesProps<T> = {
  direction: Direction;
  data: T[];
  getCategory?: (d: T, index: number) => number;
  getHeight: (d: T, index: number) => number;
  getHeight0?: (d: T, index: number) => number;
  getColor?: (d: T, index: number) => string;
  getStroke?: (d: T, index: number) => string;
  getOpacity?: (d: T, index: number) => number;
  getFill?: (d: T, index: number) => string;
  strokeWidth?: number;
  color?: string;
  width?: number;
  offset?: number;
  className?: string;
  style?: React.CSSProperties;
};

export const BarSeries = <T,>({
  direction,
  data,
  getCategory = (d: T, index: number) => index,
  getHeight,
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
}: BarSeriesProps<T>) => {
  const extraProps = { ...rest };
  const { xScale, yScale /* xType, yType */ } = usePlotContext();

  const categoryScale = direction === DIRECTION.VERTICAL ? xScale : yScale;
  const heightScale = direction === DIRECTION.VERTICAL ? yScale : xScale;

  const distance = Math.abs(categoryScale(1) - categoryScale(0));
  const halfWidth = (distance * width) / 2;
  const offsetDist = distance * offset;

  // debugger;

  const points = data.map((d, index) => {
    const x0 = categoryScale(getCategory(d, index)) - halfWidth + offsetDist;
    const y0 = heightScale(getHeight(d, index));
    const y1 = heightScale(getHeight0 ? getHeight0(d, index) : 0);

    const attrs = {
      ...getPosition(direction, x0, y0, y1, halfWidth),
      key: index,
      color: getColor ? getColor(d, index) : color,
      style: {
        opacity: getOpacity && getOpacity(d, index),
        stroke: getStroke ? getStroke(d, index) : color,
        fill: getFill ? getFill(d, index) : color,
        strokeWidth: strokeWidth || 1,
        ...style,
      },
      ...onDataEvents<T>(extraProps, d, index),
    };

    return <rect {...attrs} />;
  });

  return <GPlotRegion className={classes("plot__series--bars", className)}>{points}</GPlotRegion>;
};

export const VerticalBarSeries = ({ data, getHeight, ...props }) => {
  return <BarSeries direction={DIRECTION.VERTICAL} data={data} getHeight={getHeight} {...props} />;
};
export const HorizontalBarSeries = ({ data, getHeight, ...props }) => {
  return (
    <BarSeries direction={DIRECTION.HORIZONTAL} data={data} getHeight={getHeight} {...props} />
  );
};
