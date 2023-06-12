import { CSSProperties, MouseEvent, PointerEvent, useMemo } from "react";

import { usePlotContext, GPlotRegion, onDataEvents } from "../plot-utils";
import { twMerge } from "tailwind-merge";

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

export type MarkProps = {
  size: number;
  content?: string;
  color?: string;
  opacity?: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  className?: string;
  onClick?: (e: MouseEvent) => void;
  onContextMenu?: (e: MouseEvent) => void;
  onDoubleClick?: (e: MouseEvent) => void;
  onPointerEnter?: (e: PointerEvent) => void;
  onPointerMove?: (e: PointerEvent) => void;
  onPointerLeave?: (e: PointerEvent) => void;
  onPointerOut?: (e: PointerEvent) => void;
};

const marks = {
  circle: ({ size, ...rest }: MarkProps) => <circle r={size / 2} {...rest} />,
  square: ({ size, ...rest }: MarkProps) => (
    <rect x={-size / 2} y={-size / 2} width={size} height={size} {...rest} />
  ),
  star: ({ size, ...rest }: MarkProps) => <polygon points={starPoints(size / 2)} {...rest} />,
  diamond: ({ size, ...rest }: MarkProps) => (
    <polygon
      points={`0 0 ${size / 2} ${size / 2} 0 ${size} ${-size / 2} ${size / 2} 0 0`}
      {...rest}
    />
  ),
  text: ({ size, content, className, ...rest }: MarkProps) => (
    <text className={twMerge("plot__mark-text anchor-center", className)} fontSize={size} {...rest}>
      {content}
    </text>
  ),
  error: ({ size, content, className, ...rest }: MarkProps) => (
    <text
      className={twMerge("plot__mark-error anchor-center", className)}
      fontSize={size}
      style={textMarkStyle}
      {...rest}>
      Error in MarkSeries mark type not found
    </text>
  ),
};

type Marks = "circle" | "square" | "star" | "diamond" | "text" | "error";

export type MarkSeriesProps<T> = {
  mark?: Marks | ((props: MarkProps) => JSX.Element);
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
  markTemplates?: { [key: string]: () => JSX.Element };
  className?: string;
  onClick?: (event: MouseEvent, d: T, index: number) => void;
  onContextMenu?: (event: MouseEvent, d: T, index: number) => void;
  onDoubleClick?: (event: MouseEvent, d: T, index: number) => void;
  onPointerEnter?: (event: PointerEvent, d: T, index: number) => void;
  onPointerMove?: (event: PointerEvent, d: T, index: number) => void;
  onPointerLeave?: (event: PointerEvent, d: T, index: number) => void;
  onPointerOut?: (event: PointerEvent, d: T, index: number) => void;
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
  markTemplates,
  strokeWidth,
  color = "blue",
  size = 10,
  className,
  onClick,
  onContextMenu,
  onDoubleClick,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  onPointerOut,
}: MarkSeriesProps<T>) => {
  const { xScale, yScale } = usePlotContext();

  const markLibrary: { [key: string]: (props: MarkProps) => JSX.Element } = useMemo(() => {
    return markTemplates ? { ...marks, ...markTemplates } : marks;
  }, [markTemplates]);

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
      const MarkComponent: (props: MarkProps) => JSX.Element =
        getMark && markLibrary[getMark(d, index)]
          ? markLibrary[getMark(d, index)]
          : typeof mark === "string"
          ? markLibrary[mark]
          : mark;
      if (!MarkComponent) {
        console.error(
          `Error in markSeries mark named "${
            getMark ? getMark(d, index) : typeof mark === "string" ? markLibrary[mark] : "??"
          }" not found`
        );
        return null;
      }

      const x = xScale(getX(d, index));
      const y = yScale(getY(d, index));
      const attrs: MarkProps & { key: number | string } = {
        key: index,
        size: getSize ? getSize(d, index) : size,
        content: getContent && getContent(d, index),
        color: getColor ? getColor(d, index) : color,
        opacity: getOpacity && getOpacity(d, index),
        stroke: getStroke ? getStroke(d, index) : color,
        fill: getFill ? getFill(d, index) : color,
        strokeWidth: strokeWidth || 1 * Number(mark !== "text"),
        className,
        ...onDataEvents(
          {
            onClick,
            onContextMenu,
            onDoubleClick,
            onPointerEnter,
            onPointerMove,
            onPointerLeave,
            onPointerOut,
          },
          d,
          index
        ),
      };

      return (
        <g key={index} transform={`translate(${x},${y})`}>
          <MarkComponent {...attrs} />
        </g>
      );
    };

    return data.map(fn);
  }, [
    data,
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
    className,
    markLibrary,
    onClick,
    onContextMenu,
    onDoubleClick,
    onPointerEnter,
    onPointerMove,
    onPointerLeave,
    onPointerOut,
  ]);

  return <GPlotRegion className="plot__series--mark">{points}</GPlotRegion>;
};
