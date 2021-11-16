import React, { Fragment } from "react";
import styled from "styled-components";

import squarify from "squarify";

import { classes, GPlotRegion, usePlotContext } from "../plot-utils";

const ForeignObject = styled.foreignObject`
  user-select: none;
  pointer-events: none;
`;

const AreaTextContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const TextDiv = styled.div`
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  font-weight: 600;
  text-align: center;
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
  onClick,
  getCharacters,
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
    characters: getCharacters ? getCharacters(d) : 4,
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
        const { x0, x1, y0, y1, label, color, value, characters } = d;

        const strokeW = getStrokeWidth ? getStrokeWidth(d) : strokeWidth;
        const rectProps = {
          x: x0 + strokeW / 2,
          width: x1 - x0 - strokeW,
          y: y0 + strokeW / 2,
          height: y1 - y0 - strokeW,
          fill: color,
          title: `$${value.toFixed(0)}`,
          stroke: getStroke ? getStroke(d) : stroke,
          strokeWidth: strokeW,
          onMouseEnter: onMouseEnter ? () => onMouseEnter(d) : null,
          onClick: onClick ? () => onClick(d) : null,
        };

        if (label) {
          const textProps = {
            x: x0,
            y: y0,
            width: x1 - x0,
            height: y1 - y0,
          };

          const style = {
            fontSize: Math.max(6, Math.min(26, (x1 - x0) / characters)),
          };

          return (
            <Fragment key={i}>
              <rect {...rectProps} />
              <ForeignObject {...textProps}>
                <AreaTextContainer>
                  <TextDiv style={style}>{label}</TextDiv>
                </AreaTextContainer>
              </ForeignObject>
            </Fragment>
          );
        } else {
          return <rect key={i} {...rectProps} />;
        }
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
