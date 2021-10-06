import React, { Fragment } from "react";
import styled from "styled-components";

import squarify from "squarify";

import { classes, GPlotRegion, usePlotContext } from "../plot-utils";

const Text = styled.text`
  alignment-baseline: middle;
  text-anchor: middle;
  fill: white;
`;

export const AreaSeries = ({
  data,
  className,
  stroke,
  strokeWidth,
  getStroke,
  getStrokeWidth,
  getArea,
  getLabel,
  getColor,
  onMouseEnter,
}) => {
  const { xRange, yRange } = usePlotContext();

  if (!data) {
    return null;
  }

  const transformedData = data.map((d) => ({
    ...d,
    value: getArea(d),
    label: getLabel(d),
    color: getColor(d),
    stroke: getStroke ? getStroke(d) : stroke,
  }));

  const rectData = squarify(transformedData, {
    x0: xRange[0],
    x1: xRange[1],
    y0: yRange[1],
    y1: yRange[0],
  });

  return (
    <GPlotRegion className={classes("plot__series--area", className)}>
      {rectData.map((d, i) => {
        const { x0, x1, y0, y1, label, color, value } = d;
        const rectProps = {
          x: x0,
          width: x1 - x0,
          y: y0,
          height: y1 - y0,
          fill: color,
          title: `$${value.toFixed(0)}`,
          stroke: getStroke ? getStroke(d) : stroke,
          strokeWidth: getStrokeWidth ? getStrokeWidth(d) : strokeWidth,
          onMouseEnter: onMouseEnter ? () => onMouseEnter(d) : null,
        };

        const textProps = {
          x: (x0 + x1) / 2,
          y: (y0 + y1) / 2,
          style: {
            fontSize: Math.max(6, Math.min(20, (x1 - x0) / label.length)),
          },
        };

        return (
          <Fragment key={i}>
            <rect {...rectProps} />
            <Text {...textProps}>{label}</Text>
          </Fragment>
        );
      })}
    </GPlotRegion>
  );
};

AreaSeries.defaultProps = {
  stroke: "#fff",
  strokeWidth: 0,
  getArea: (d) => d.area,
  getLabel: (d) => d.label,
  getColor: (d) => d.color,
};
