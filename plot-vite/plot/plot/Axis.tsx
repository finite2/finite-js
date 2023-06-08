import { useMemo, useRef } from "react";

import {
  getTickValues,
  ORIENTATION,
  DIRECTION,
  GPlotRegion,
  usePlotContext,
  classes,
  Orientation,
} from "./plot-utils";

const getTickFormatFn = (scale, ordinalValues, tickTotal, tickFormat) => {
  if (tickFormat) {
    return tickFormat;
  } else if (ordinalValues) {
    return (v) => ordinalValues[v];
  }
  return scale.tickFormat ? scale.tickFormat(tickTotal) : (v) => v;
};

const isAxisVertical = (orientation: Orientation) =>
  orientation === "left" || orientation === "right";

const areTicksWrapped = (orientation: Orientation) =>
  orientation === "left" || orientation === "top";

const getTickLineProps = (orientation, tickSize, tickSizeInner, tickSizeOuter) => {
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

const getTickLabelProps = (orientation, tickLabelAngle, tickSize, tickSizeOuter, tickPadding) => {
  // Assign the text orientation inside the label of the tick mark.
  let textAnchor;
  if (orientation === LEFT || (orientation === BOTTOM && tickLabelAngle)) {
    textAnchor = "end";
  } else if (orientation === RIGHT || (orientation === TOP && tickLabelAngle)) {
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
    orientation === TOP || tickLabelAngle ? "0" : orientation === BOTTOM ? "0.72em" : "0.32em";

  return {
    textAnchor,
    dy,
    transform,
  };
};

const getTickContainerPropsGetterFn = (orientation) => {
  if (isAxisVertical(orientation)) {
    return (pos) => {
      return { transform: `translate(0, ${pos})` };
    };
  }
  return (pos) => {
    return { transform: `translate(${pos}, 0)` };
  };
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
  tickLabelAngle,
}: {
  orientation: Orientation;
  tickValues?: any[];
  tickTotal?: number;
  tickFormat?: (v: any, i: number, scale: any, tickTotal: number) => any;
  tickSize?: number;
  tickSizeInner?: number;
  tickSizeOuter?: number;
  tickPadding?: number;
  tickLabelAngle?: number;
}) => {
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
    () => getTickLineProps(orientation, tickSize, tickSizeInner, tickSizeOuter),
    [orientation, tickSize, tickSizeInner, tickSizeOuter]
  );

  const textProps = useMemo(
    () => getTickLabelProps(orientation, tickLabelAngle, tickSize, tickSizeOuter, tickPadding),
    [orientation, tickLabelAngle, tickSize, tickSizeOuter, tickPadding]
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
    [scale, tickFormatFn, translateFn, pathProps, textProps, tickTotal, tickSize]
  );

  return <g transform={`translate(${x}, ${y})`}>{ticks}</g>;
};

type XAxisProps = {
  orientation: "top" | "bottom";
  draggable?: boolean;
  on0?: boolean;
  className?: string;
};

export const XAxis = (props: XAxisProps) => {
  const { orientation = "bottom", on0 = false, className, draggable = true } = props;
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
  const linePosition = orientation === BOTTOM ? innerHeight : 0;

  console.log(left, topPos);

  return (
    <>
      <GPlotRegion
        className={classes("plot__x-axis", className)}
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
        <AxisTicks {...props} />
      </GPlotRegion>
      {draggable ? <XDraggableAxis orientation={orientation} /> : null}
    </>
  );
};

type YAxisProps = {
  orientation: "left" | "right";
  draggable?: boolean;
  on0?: boolean;
  className?: string;
};

export const YAxis = (props: YAxisProps) => {
  const { orientation = "left", on0 = false, className, draggable = true } = props;
  const {
    xScale,
    // yScale,
    left,
    top,
    innerWidth,
    innerHeight,
  } = usePlotContext();
  const leftPos = on0 ? left - xScale(0) : left;
  const linePosition = orientation === LEFT ? 0 : innerWidth;

  return (
    <>
      <GPlotRegion
        className={classes("plot__y-axis", className)}
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
        <AxisTicks {...props} />
      </GPlotRegion>
      {draggable ? <YDraggableAxis orientation={orientation} /> : null}
    </>
  );
};

export const DraggableAxis = ({ orientation, fill }) => {
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

  const ref = useRef();

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
    }
    console.warn("orientation not recognised");
  };

  const isVertical = isAxisVertical(orientation);
  const direction = isVertical ? DIRECTION.VERTICAL : DIRECTION.HORIZONTAL;
  const draggableProps = getDraggableProps(orientation);

  const reffedEvents = useMemo(() => {
    const { onPointerMove, onPointerDown, onPointerUp, onWheel, ...rest } = events;

    return {
      onPointerDown: (e) => onPointerDown(e, ref),
      onPointerUp: (e) => onPointerUp(e, ref),
      onPointerMove: (e) => {
        e.stopPropagation();
        onPointerMove(e, ref, direction);
      },
      onWheel: (e) => onWheel(e, direction),
      ...rest,
    };
  }, [events, ref]);

  // TODO fix classes
  return (
    <rect
      className={isVertical ? "s-resize" : "e-resize"}
      ref={ref}
      fill={fill}
      {...draggableProps}
      {...reffedEvents}
    />
  );
};

DraggableAxis.defaultProps = {
  fill: "#0000",
};

export const XDraggableAxis = (props) => {
  return <DraggableAxis {...props} />;
};

XDraggableAxis.defaultProps = {
  orientation: ORIENTATION.BOTTOM,
};

export const YDraggableAxis = (props) => {
  return <DraggableAxis {...props} />;
};

YDraggableAxis.defaultProps = {
  orientation: ORIENTATION.LEFT,
};
