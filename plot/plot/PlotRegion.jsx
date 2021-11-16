import React, { useRef } from "react";
import styled from "styled-components";

import { usePlotContext } from "./plot-utils";

const PlotRegionRect = styled.rect``;

export const PlotRegion = ({ fill, draggable, children, ...rest }) => {
  const { left, innerWidth, top, innerHeight, events } = usePlotContext();
  const ref = useRef();

  const { onEvents } = usePlotRegionEvents();

  let draggableEvents = {};
  if (draggable) {
    const { onPointerDown, onPointerUp, onPointerMove } = events;

    draggableEvents = {
      onPointerDown: (e) => onPointerDown(e, ref),
      onPointerUp: (e) => onPointerUp(e, ref),
      onPointerMove: (e) => onPointerMove(e, ref),
    };
  }

  return (
    <g
      ref={ref}
      {...draggableEvents}
      {...onEvents({ ...rest }, ref)}
      style={{ cursor: draggable ? "move" : "auto" }}
    >
      <PlotRegionRect
        className="plot__region-dragcatcher"
        x={left}
        y={top}
        width={innerWidth}
        height={innerHeight}
        fill={fill}
      />
      {children}
    </g>
  );
};

const usePlotRegionEvents = () => {
  const { xScale, yScale } = usePlotContext();

  const addData = (e, ref) => {
    const { top, left } = ref.current.getBoundingClientRect();
    e.xAbsPosition = e.clientX - left;
    e.xPosition = xScale.invert(e.xAbsPosition);
    e.yAbsPosition = e.clientY - top;
    e.yPosition = yScale.invert(e.yAbsPosition);
    return e;
  };

  const onEvents = (props, ref) => {
    let eventHandlerKeys = Object.keys(props).filter((k) => k.startsWith("on"));
    let p = {};
    for (var i = 0; i < eventHandlerKeys.length; i++) {
      let key = eventHandlerKeys[i];
      p[key] = (e) => props[key](addData(e, ref));
    }
    return p;
  };

  return { onEvents };
};

PlotRegion.defaultProps = {
  fill: "var(--color-background-alt)",
  draggable: false,
};
