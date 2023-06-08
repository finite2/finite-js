import React, { CSSProperties, ReactNode } from "react";

import { usePlotContext } from "./plot-utils";

const titleContainerStyle: CSSProperties = {
  position: "absolute",
  bottom: 0,
  width: "100%",
};

const titleStyle: CSSProperties = {
  position: "relative",
  height: "100%",
  width: "100%",
  fontSize: "22px",
  fontWeight: 600,
  textAlign: "center",
};

export const ChartTitle = ({
  paddingBottom = 5,
  children,
}: {
  paddingBottom: number;
  children: ReactNode;
}) => {
  const {
    outerLeft,
    //outerRight,
    //outerBottom,
    outerTop,
    left,
    //right,
    //bottom,
    top,
    innerWidth,
    // innerHeight,
  } = usePlotContext();

  return (
    <foreignObject
      x={outerLeft + left}
      y={outerTop}
      height={top - outerTop - paddingBottom}
      width={innerWidth}
    >
      <div className="plot__title-container" style={titleContainerStyle}>
        <div className="plot__title-title" style={titleStyle}>
          {children}
        </div>
      </div>
    </foreignObject>
  );
};
