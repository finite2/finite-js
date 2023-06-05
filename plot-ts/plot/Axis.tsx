import React, { useMemo, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import {
  getTickValues,
  ORIENTATION,
  DIRECTION,
  GPlotRegion,
  usePlotContext,
  classes,
  Orientation,
} from "./plot-utils";

const AxisLine = styled.line`
  stroke: var(--color-font);
  fill: var(--color-font);
`;

const { TOP, LEFT, RIGHT, BOTTOM } = ORIENTATION;

const getTickFormatFn = (scale, ordinalValues, tickTotal, tickFormat) => {
  if (tickFormat) {
    return tickFormat;
  } else if (ordinalValues) {
    return (v) => ordinalValues[v];
  }
  return scale.tickFormat ? scale.tickFormat(tickTotal) : (v) => v;
};

const isAxisVertical = (orientation) => orientation === LEFT || orientation === RIGHT;

const areTicksWrapped = (orientation) => orientation === LEFT || orientation === TOP;

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

  const x = orientation === RIGHT ? innerWidth : 0;
  const y = orientation === BOTTOM ? innerHeight : 0;

  const tickFormatFn = useMemo(() => getTickFormatFn(scale, ordinalValues, tickTotal, tickFormat), [
    scale,
    ordinalValues,
    tickTotal,
    tickFormat,
  ]);

  const values = useMemo(() => getTickValues(scale, ordinalValues, tickTotal, tickValues), [
    scale,
    ordinalValues,
    tickTotal,
    tickValues,
  ]);

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

export const XAxis = (props) => {
  const { orientation, on0, className, draggable } = props;
  const {
    // xScale,
    yScale,
    left,
    top,
    // bottom,
    innerWidth,
    innerHeight,
  } = usePlotContext();

  let leftPos = left,
    topPos = top;
  if (on0) {
    topPos = top - yScale(0);
  }

  const linePosition = orientation === BOTTOM ? innerHeight : 0;

  return (
    <>
      <GPlotRegion
        className={classes("plot__x-axis", className)}
        transform={`translate(${leftPos}, ${topPos})`}
      >
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

XAxis.defaultProps = {
  orientation: BOTTOM,
  draggable: true,
};

XAxis.propTypes = {
  orientation: PropTypes.oneOf([BOTTOM, TOP]),
  draggable: PropTypes.bool,
};

export const YAxis = (props) => {
  const { orientation, on0, className, draggable } = props;
  const {
    xScale,
    // yScale,
    left,
    top,
    innerWidth,
    innerHeight,
  } = usePlotContext();
  let leftPos = left,
    topPos = top;
  if (on0) {
    leftPos = left - xScale(0);
  }

  const linePosition = orientation === LEFT ? 0 : innerWidth;

  return (
    <>
      <GPlotRegion
        className={classes("plot__y-axis", className)}
        transform={`translate(${leftPos}, ${topPos})`}
      >
        <AxisLine x1={linePosition} x2={linePosition} y1={0} y2={innerHeight} />
        <AxisTicks {...props} />
      </GPlotRegion>
      {draggable ? <YDraggableAxis orientation={orientation} /> : null}
    </>
  );
};

YAxis.defaultProps = {
  orientation: LEFT,
  draggable: true,
};

YAxis.propTypes = {
  orientation: PropTypes.oneOf([LEFT, RIGHT]),
  draggable: PropTypes.bool,
};

const AxisRect = styled.rect.attrs(({ vertical, style, ...rest }) => {
  return {
    style: {
      cursor: vertical ? "s-resize" : "e-resize",
      ...style,
    },
    ...rest,
  };
})``;

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

  const getDraggableProps = (orientation) => {
    if (orientation === ORIENTATION.BOTTOM) {
      return {
        x: left,
        y: bottom,
        width: innerWidth,
        height: outerBottom - bottom,
      };
    } else if (orientation === ORIENTATION.TOP) {
      return {
        x: left,
        y: outerTop,
        width: innerWidth,
        height: top - outerTop,
      };
    } else if (orientation === ORIENTATION.LEFT) {
      return {
        x: outerLeft,
        y: top,
        width: left - outerLeft,
        height: innerHeight,
      };
    } else if (orientation === ORIENTATION.RIGHT) {
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

  return (
    <AxisRect ref={ref} vertical={isVertical} fill={fill} {...draggableProps} {...reffedEvents} />
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
