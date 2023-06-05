import React, { useCallback, useMemo } from "react";

import { PlotContext, getScale, useSVGContext, classes } from "./plot-utils";

import { useZoomablePlot } from "./useZoomablePlot";

type Grid = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
};

type PartialGrid = {
  left: number;
  right?: number;
  top: number;
  bottom?: number;
  width: number;
  height: number;
};

const constructGridObject = (grid: PartialGrid) => {
  if (!("right" in grid)) {
    grid.right = grid.left;
  }
  if (!("bottom" in grid)) {
    grid.bottom = grid.top;
  }
  return grid as Grid;
};

type Margin = { left: number; right: number; top: number; bottom: number };

type MarginInput = number | { left?: number; right?: number; top?: number; bottom?: number };

const constructMargin = (margin: MarginInput) => {
  if (typeof margin === "number") {
    return { left: margin, right: margin, top: margin, bottom: margin };
  }

  if (!("left" in margin)) {
    margin.left = 40;
  }
  if (!("right" in margin)) {
    margin.right = 10;
  }
  if (!("top" in margin)) {
    margin.top = 10;
  }
  if (!("bottom" in margin)) {
    margin.bottom = 40;
  }
  return margin as Margin;
};

type XYPlotProps = {
  grid: PartialGrid;
  margin?: MarginInput;
  xType?: "linear" | "log" | "ordinal";
  xDomain?: [number, number];
  xDomainLimit?: [number, number];
  xValues?: string[];
  yType?: "linear" | "log" | "ordinal";
  yDomain?: [number, number];
  yDomainLimit?: [number, number];
  yValues?: string[];
  className?: string;
  preserveRatio?: boolean;
  children: React.ReactNode;
};

export const XYPlot = ({
  grid: initialGrid,
  margin: initialMargin = { left: 50, right: 10, top: 10, bottom: 40 },
  xType = "linear",
  xDomain = [0, 1],
  xDomainLimit,
  xValues,
  yType = "linear",
  yDomain = [0, 1],
  yDomainLimit,
  yValues,
  className,
  preserveRatio = false,
  children,
}: XYPlotProps) => {
  const { width, height } = useSVGContext();

  if (xValues) {
    xType = "ordinal";
    xDomain = [-0.5, xValues.length - 0.5];
  }
  if (yValues) {
    yType = "ordinal";
    yDomain = [-0.5, yValues.length - 0.5];
  }

  const grid = constructGridObject(initialGrid);
  const margin = constructMargin(initialMargin);

  const xGrid = width / grid.width;
  const [outerLeft, outerRight] = [grid.left * xGrid, (grid.right + 1) * xGrid];
  const innerWidth = outerRight - margin.right - outerLeft - margin.left;
  const [left, right] = [outerLeft + margin.left, outerRight - margin.right];

  const yGrid = height / grid.height;
  const [outerTop, outerBottom] = [grid.top * yGrid, (grid.bottom + 1) * yGrid];
  const innerHeight = outerBottom - margin.bottom - outerTop - margin.top;
  const [top, bottom] = [outerTop + margin.top, outerBottom - margin.bottom];

  const xRange: [number, number] = useMemo(() => [0, innerWidth], [innerWidth]);
  const yRange: [number, number] = useMemo(() => [innerHeight, 0], [innerHeight]);

  const [domains, events] = useZoomablePlot(
    xDomain,
    yDomain,
    xRange,
    yRange,
    xDomainLimit,
    yDomainLimit,
    preserveRatio
  );

  const xScale = useCallback(getScale(domains.xDomain, xRange, xType), [
    domains.xDomain,
    xRange,
    xType,
  ]);
  const yScale = useCallback(getScale(domains.yDomain, yRange, yType), [
    domains.yDomain,
    yRange,
    yType,
  ]);

  // available from useSVGContext().containerRef.current.getBoundingClientRect().width;
  const xScaleEvent = useCallback(
    (containerWidth) => {
      const scaleRatio = containerWidth / width;

      return getScale(domains.xDomain, [xRange[0] * scaleRatio, xRange[1] * scaleRatio], xType);
    },
    [domains.xDomain, xRange, xType, width]
  );

  // available from useSVGContext().containerRef.current.getBoundingClientRect().width;
  const yScaleEvent = useCallback(
    (containerHeight) => {
      const scaleRatio = containerHeight / height;

      return getScale(domains.yDomain, [yRange[0] * scaleRatio, yRange[1] * scaleRatio], yType);
    },
    [domains.yDomain, yRange, yType, height]
  );

  return (
    <PlotContext.Provider
      value={{
        innerWidth,
        innerHeight,
        outerLeft,
        outerRight,
        outerBottom,
        outerTop,
        left,
        right,
        bottom,
        top,
        preserveRatio,
        xType,
        xRange,
        xScale,
        xScaleEvent,
        xValues,
        yType,
        yScale,
        yScaleEvent,
        yRange,
        yValues,
        ...domains,
        events,
      }}
    >
      <g className={classes("plot__xyplot", className)}>{children}</g>
    </PlotContext.Provider>
  );
};
