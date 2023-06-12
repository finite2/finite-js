import { MouseEvent, PointerEvent } from "react";

import { usePlotContext, GPlotRegion, onDataEvents } from "../plot-utils";

// TODO use the d3Shape.area method instead of points.reduce
const generatePath = <P,>(
  points: P[],
  getX: (d: P, index: number) => number,
  getY: (d: P, index: number) => number
) =>
  `${points.reduce(
    (res, d, index) => `${res} ${index ? "L" : "M"}${getX(d, index)} ${getY(d, index)}`,
    ""
  )} Z`;

export type PolygonSeriesProps<T extends { points: P[] }, P> = {
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
  onClick?: (event: MouseEvent, d: T, index: number) => void;
  onContextMenu?: (event: MouseEvent, d: T, index: number) => void;
  onDoubleClick?: (event: MouseEvent, d: T, index: number) => void;
  onPointerEnter?: (event: PointerEvent, d: T, index: number) => void;
  onPointerMove?: (event: PointerEvent, d: T, index: number) => void;
  onPointerLeave?: (event: PointerEvent, d: T, index: number) => void;
  onPointerOut?: (event: PointerEvent, d: T, index: number) => void;
};

export const PolygonSeries = <T extends { points: P[] }, P>({
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
  onContextMenu,
  onDoubleClick,
  onPointerEnter,
  onPointerMove,
  onPointerLeave,
  onPointerOut,
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

    return <path {...attrs} />;
  });

  return <GPlotRegion className="plot__series--polygon">{polygons}</GPlotRegion>;
};
