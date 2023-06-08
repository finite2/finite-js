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

type Marks = "circle" | "square" | "star" | "diamond" | "text" | "error";

type MarkSeriesProps<T> = {
  mark?: Marks | ((d: T, index: number) => string);
  data: T[];
  getX: (d: T, index: number) => number;
  getY: (d: T, index: number) => number;
  getMark?: (d: T, index: number) => string;
  getContent?: (d: T, index: number) => string;
  getSize?: (d: T, index: number) => number;
  getColor?: (d: T, index: number) => string;
  getStroke?: (d: T, index: number) => string;
  getOpacity?: (d: T, index: number) => number;
  getFill?: (d: T, index: number) => string;
  strokeWidth?: number;
  color?: string;
  size?: number;
  markTemplates?: { [key: string]: React.FC<any> };
  className?: string;
  style?: CSSProperties;
};

export const MarkSeries = <T,>({
  mark = "circle",
  data,
  getX,
  getY,
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
  className,
  style,
  ...rest
}: MarkSeriesProps<T>) => {
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
    const fn = (d: T, index: number) => {
      let MarkComponent = Mark;
      if (getMark) {
        MarkComponent = markLibrary[getMark(d, index)];
        if (!Mark) {
          console.error(`Error in markSeries mark named "${getMark(d, index)}" not found`);
          return null;
        }
      }

      const x = xScale(getX(d, index));
      const y = yScale(getY(d, index));
      const attrs = {
        key: index,
        size: getSize ? getSize(d, index) : size,
        content: getContent && getContent(d, index),
        color: getColor ? getColor(d, index) : color,
        style: {
          opacity: getOpacity && getOpacity(d, index),
          stroke: getStroke ? getStroke(d, index) : color,
          fill: getFill ? getFill(d, index) : color,
          strokeWidth: strokeWidth || 1 * Number(mark !== "text"),
          ...style,
        },
        ...onDataEvents(extraProps, d, index),
      };

      return (
        <g transform={`translate(${x},${y})`}>
          <MarkComponent {...attrs} />
        </g>
      );
    };

    return data.map(fn);
  }, [
    data,
    Mark,
    getMark,
    xScale,
    getX,
    yScale,
    getY,
    getSize,
    size,
    getContent,
    getColor,
    color,
    getOpacity,
    getStroke,
    getFill,
    strokeWidth,
    mark,
    style,
    extraProps,
    markLibrary,
  ]);

  return <GPlotRegion className={classes("plot__series--mark", className)}>{points}</GPlotRegion>;
};
