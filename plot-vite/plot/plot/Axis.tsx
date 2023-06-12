import { useMemo, useRef, WheelEvent, PointerEvent } from "react";
import { ScaleLinear } from "d3-scale";

import { getTickValues, GPlotRegion, usePlotContext } from "./plot-utils";
import { twMerge } from "tailwind-merge";
import { Orientation } from "./types";

type TickFormatFn = (
  v: number,
  i: number,
  scale: ScaleLinear<number, number>,
  tickTotal: number
) => string;

const getTickFormatFn = (
  scale: ScaleLinear<number, number, never>,
  ordinalValues?: string[],
  tickTotal?: number,
  tickFormat?: TickFormatFn
) => {
  if (tickFormat) {
    return tickFormat;
  } else if (ordinalValues) {
    return (v: number) => ordinalValues[v];
  }
  return scale.tickFormat ? scale.tickFormat(tickTotal) : (v: number) => v;
};

const isAxisVertical = (orientation: Orientation) =>
  orientation === "left" || orientation === "right";

const areTicksWrapped = (orientation: Orientation) =>
  orientation === "left" || orientation === "top";

const getTickLineProps = (
  orientation: Orientation,
  tickSizeInner: number,
  tickSizeOuter: number
) => {
  const isVertical = isAxisVertical(orientation);
  const tickXAttr = isVertical ? "y" : "x";
  const tickYAttr = isVertical ? "x" : "y";
  const wrap = areTicksWrapped(orientation) ? -1 : 1;
  return {
    [`${tickXAttr}1`]: 0,
    [`${tickXAttr}2`]: 0,
    [`${tickYAttr}1`]: -wrap * tickSizeInner,
    [`${tickYAttr}2`]: wrap * tickSizeOuter,
  };
};

const getTickLabelProps = (
  orientation: Orientation,
  tickLabelAngle: number,
  tickSizeOuter: number,
  tickPadding: number
) => {
  // Assign the text orientation inside the label of the tick mark.
  let textAnchor;
  if (orientation === "left" || (orientation === "bottom" && tickLabelAngle)) {
    textAnchor = "end";
  } else if (orientation === "right" || (orientation === "top" && tickLabelAngle)) {
    textAnchor = "start";
  } else {
    textAnchor = "middle";
  }

  // The label's position is translated to the given padding and then the
  // label is rotated to the given angle.
  const isVertical = isAxisVertical(orientation);
  const wrap = areTicksWrapped(orientation) ? -1 : 1;

  const labelOffset = wrap * (tickSizeOuter + tickPadding);
  const transform =
    (isVertical ? `translate(${labelOffset}, 0)` : `translate(0, ${labelOffset})`) +
    (tickLabelAngle ? ` rotate(${tickLabelAngle})` : "");

  // Set the vertical offset of the label according to the position of
  // the axis.
  const dy =
    orientation === "top" || tickLabelAngle ? "0" : orientation === "bottom" ? "0.72em" : "0.32em";

  return {
    textAnchor,
    dy,
    transform,
  };
};

const getTickContainerPropsGetterFn = (orientation: Orientation) => {
  if (isAxisVertical(orientation)) {
    return (pos: number) => {
      return { transform: `translate(0, ${pos})` };
    };
  }
  return (pos: number) => {
    return { transform: `translate(${pos}, 0)` };
  };
};

type AxisTicksProps = {
  orientation: Orientation;
  tickValues?: number[];
  tickTotal?: number;
  tickFormat?: TickFormatFn;
  tickSize?: number;
  tickSizeInner?: number;
  tickSizeOuter?: number;
  tickPadding?: number;
  tickLabelAngle?: number;
};

const AxisTicks = ({
  orientation,
  tickValues,
  tickTotal = 5,
  tickFormat,
  tickSize = 6,
  tickSizeInner = tickSize,
  tickSizeOuter = tickSize,
  tickPadding = tickSize + 2,
  tickLabelAngle = 0,
}: AxisTicksProps) => {
  const { innerWidth, xScale, xValues, innerHeight, yScale, yValues } = usePlotContext();

  const scale = isAxisVertical(orientation) ? yScale : xScale;
  const ordinalValues = isAxisVertical(orientation) ? yValues : xValues;

  const x = orientation === "right" ? innerWidth : 0;
  const y = orientation === "bottom" ? innerHeight : 0;

  const tickFormatFn = useMemo(
    () => getTickFormatFn(scale, ordinalValues, tickTotal, tickFormat),
    [scale, ordinalValues, tickTotal, tickFormat]
  );

  const values = useMemo(
    () => getTickValues(scale, ordinalValues, tickTotal, tickValues),
    [scale, ordinalValues, tickTotal, tickValues]
  );

  const translateFn = useMemo(() => getTickContainerPropsGetterFn(orientation), [orientation]);

  const pathProps = useMemo(
    () => getTickLineProps(orientation, tickSizeInner, tickSizeOuter),
    [orientation, tickSizeInner, tickSizeOuter]
  );

  const textProps = useMemo(
    () => getTickLabelProps(orientation, tickLabelAngle, tickSizeOuter, tickPadding),
    [orientation, tickLabelAngle, tickSizeOuter, tickPadding]
  );

  const ticks = useMemo(
    () =>
      values.map((v, i) => {
        const pos = scale(v);
        const labelNode = tickFormatFn(v, i, scale, tickTotal);

        return (
          <g key={i} {...translateFn(pos)}>
            {tickSize !== 0 ? <line stroke="var(--color-font)" {...pathProps} /> : null}
            <text {...textProps} className={"plot__tick-label select-none"}>
              {labelNode}
            </text>
          </g>
        );
      }),
    [scale, tickFormatFn, translateFn, pathProps, textProps, tickTotal, tickSize, values]
  );

  return <g transform={`translate(${x}, ${y})`}>{ticks}</g>;
};

type XAxisProps = {
  orientation?: "top" | "bottom";
  draggable?: boolean;
  on0?: boolean;
  className?: string;
};

export const XAxis = ({
  orientation = "bottom",
  on0 = false,
  className,
  draggable = true,
  ...axisTickProps
}: XAxisProps & Omit<AxisTicksProps, "orientation">) => {
  const {
    // xScale,
    yScale,
    left,
    top,
    // bottom,
    innerWidth,
    innerHeight,
  } = usePlotContext();

  const topPos = on0 ? top - yScale(0) : top;
  const linePosition = orientation === "bottom" ? innerHeight : 0;

  return (
    <>
      <GPlotRegion
        className={twMerge("plot__x-axis", className)}
        transform={`translate(${left}, ${topPos})`}>
        <line
          className="plot__axis-line"
          stroke="var(--color-font)"
          fill="var(--color-font)"
          x1={0}
          x2={innerWidth}
          y1={linePosition}
          y2={linePosition}
        />
        <AxisTicks orientation={orientation} {...axisTickProps} />
      </GPlotRegion>
      {draggable ? <DraggableAxis orientation={orientation} /> : null}
    </>
  );
};

type YAxisProps = {
  orientation?: "left" | "right";
  draggable?: boolean;
  on0?: boolean;
  className?: string;
};

export const YAxis = ({
  orientation = "left",
  on0 = false,
  className,
  draggable = true,
  ...axisTickProps
}: YAxisProps & Omit<AxisTicksProps, "orientation">) => {
  const {
    xScale,
    // yScale,
    left,
    top,
    innerWidth,
    innerHeight,
  } = usePlotContext();
  const leftPos = on0 ? left + xScale(0) : left;
  const linePosition = orientation === "left" ? 0 : innerWidth;

  return (
    <>
      <GPlotRegion
        className={twMerge("plot__y-axis", className)}
        transform={`translate(${leftPos}, ${top})`}>
        <line
          className="plot__axis-line"
          stroke="var(--color-font)"
          fill="var(--color-font)"
          x1={linePosition}
          x2={linePosition}
          y1={0}
          y2={innerHeight}
        />
        <AxisTicks orientation={orientation} {...axisTickProps} />
      </GPlotRegion>
      {draggable ? <DraggableAxis orientation={orientation} /> : null}
    </>
  );
};

type DraggableAxisProps = {
  orientation: Orientation;
  fill?: string;
};

export const DraggableAxis = ({ orientation, fill = "#0000" }: DraggableAxisProps) => {
  const {
    outerLeft,
    outerRight,
    outerBottom,
    outerTop,
    left,
    right,
    bottom,
    top,
    innerWidth,
    innerHeight,
    events,
  } = usePlotContext();

  const ref = useRef<SVGRectElement>(null);

  const getDraggableProps = (orientation: Orientation) => {
    if (orientation === "bottom") {
      return {
        x: left,
        y: bottom,
        width: innerWidth,
        height: outerBottom - bottom,
      };
    } else if (orientation === "top") {
      return {
        x: left,
        y: outerTop,
        width: innerWidth,
        height: top - outerTop,
      };
    } else if (orientation === "left") {
      return {
        x: outerLeft,
        y: top,
        width: left - outerLeft,
        height: innerHeight,
      };
    } else if (orientation === "right") {
      return {
        x: right,
        y: top,
        width: outerRight - right,
        height: innerHeight,
      };
    } else {
      throw new Error("orientation not recognised");
    }
  };

  const isVertical = isAxisVertical(orientation);
  const direction = isVertical ? "vertical" : "horizontal";
  const draggableProps = getDraggableProps(orientation);

  const { onPointerEnter, onPointerLeave, onPointerMove, onPointerDown, onPointerUp, onWheel } =
    events;

  const reffedEvents = useMemo(() => {
    return {
      onPointerUp: (event: PointerEvent) => onPointerUp(event, ref),
      onPointerMove: (event: PointerEvent) => {
        event.stopPropagation();
        onPointerMove(event, ref, direction);
      },
      onWheel: (event: WheelEvent) => onWheel(event, direction),
    };
  }, [onPointerMove, onPointerUp, onWheel, direction, ref]);

  return (
    <rect
      className={twMerge(
        "plot__draggable-axis",
        isVertical ? "cursor-s-resize" : "cursor-e-resize"
      )}
      ref={ref}
      fill={fill}
      onPointerDown={onPointerDown}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      {...draggableProps}
      {...reffedEvents}
    />
  );
};
