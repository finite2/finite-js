import React, { CSSProperties, useMemo } from "react";

import { usePlotContext, GPlotRegion, classes, onDataEvents } from "../plot-utils";

const textMarkStyle: CSSProperties = {
  alignmentBaseline: "middle",
  textAnchor: "middle",
};

const starPoints = (size: number): string => {
  return [...new Array(5)]
    .map((c, index) => {
      const angle = (index / 5) * Math.PI * 2;
      const innerAngle = angle + Math.PI / 10;
      const outerAngle = angle - Math.PI / 10;
      // ratio of inner polygon to outer polgyon
      const innerRadius = size / 2.61;
      return `
        ${Math.cos(outerAngle) * size} ${Math.sin(outerAngle) * size}
        ${Math.cos(innerAngle) * innerRadius} ${Math.sin(innerAngle) * innerRadius}
      `;
    })
    .join(" ");
};

const marks = {
  circle: ({ size, ...rest }) => <circle r={size / 2} {...rest} />,
  square: ({ size, ...rest }) => (
    <rect x={-size / 2} y={-size / 2} width={size} height={size} {...rest} />
  ),
  star: ({ size, ...rest }) => <polygon points={starPoints(size / 2)} {...rest} />,
  diamond: ({ size, ...rest }) => (
    <polygon
      points={`0 0 ${size / 2} ${size / 2} 0 ${size} ${-size / 2} ${size / 2} 0 0`}
      {...rest}
    />
  ),
  text: ({ size, content, ...rest }) => (
    <text fontSize={size} style={textMarkStyle} {...rest}>
      {content}
    </text>
  ),
  error: ({ size, content, ...rest }) => (
    <text fontSize={size} style={textMarkStyle} {...rest}>
      Error in MarkSeries mark type not found
    </text>
  ),
};

export const MarkSeries = ({
  mark = "circle",
  data,
  getX = (d) => d.x,
  getY = (d) => d.y,
  getMark,
  getContent,
  getSize,
  getColor,
  getStroke,
  getOpacity,
  getFill,
  strokeWidth,
  color = "blue",
  size = 10,
  markTemplates,
  className,
  style,
  ...rest
}) => {
  const { xScale, yScale } = usePlotContext();

  // warning extraProps is heading into useMemo and won't trigger updates there
  const extraProps = { ...rest };

  const [Mark, markLibrary] = useMemo(() => {
    const markLibrary = markTemplates ? { ...marks, ...markTemplates } : marks;

    if (typeof mark === "string") {
      if (mark in markLibrary) {
        return [markLibrary[mark], markLibrary];
      } else {
        console.error(`Error in MarkSeries mark named "${mark}" not found`);
        return [markLibrary.error, markLibrary];
      }
    } else if (mark instanceof Function) {
      return [mark, markLibrary];
    } else {
      throw new Error("Error in MarkSeries mark must be a string or function");
    }
  }, [marks, markTemplates]);

  if (getColor) {
    if (!getFill) {
      getFill = getColor;
    }
    if (!getStroke) {
      getStroke = getColor;
    }
  }

  const points = useMemo(() => {
    const fn = (d, i) => {
      let MarkComponent = Mark;
      if (getMark) {
        MarkComponent = markLibrary[getMark(d, i)];
        if (!Mark) {
          console.error(`Error in markSeries mark named "${getMark(d, i)}" not found`);
          return null;
        }
      }

      const x = xScale(getX(d, i));
      const y = yScale(getY(d, i));
      const attrs = {
        key: i,
        size: getSize ? getSize(d, i) : size,
        content: getContent && getContent(d, i),
        color: getColor ? getColor(d, i) : color,
        style: {
          opacity: getOpacity && getOpacity(d, i),
          stroke: getStroke ? getStroke(d, i) : color,
          fill: getFill ? getFill(d, i) : color,
          strokeWidth: strokeWidth || 1 * Number(mark !== "text"),
          ...style,
        },
        ...onDataEvents(extraProps, d, i),
      };

      return (
        <g transform={`translate(${x},${y})`}>
          <MarkComponent {...attrs} />
        </g>
      );
    };

    if (Array.isArray(data)) {
      return data.map(fn);
    }

    return fn(data, 0);
  }, [
    data,
    getX,
    getY,
    getSize,
    getMark,
    getContent,
    getColor,
    getOpacity,
    getStroke,
    getFill,
    strokeWidth,
    color,
    size,
    mark,
    style,
    xScale,
    yScale,
  ]);

  return (
    <GPlotRegion className={classes("plot__series--mark", className)} style={{ fill: color }}>
      {points}
    </GPlotRegion>
  );
};
