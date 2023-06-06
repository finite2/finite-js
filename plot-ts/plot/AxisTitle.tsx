import React, { CSSProperties, useMemo } from "react";

import { usePlotContext, ORIENTATION, Orientation } from "./plot-utils";

const titleContainerStyle: CSSProperties = {
  position: "absolute",
  width: "100%",
};

const titleStyle: CSSProperties = {
  position: "relative",
  height: "100%",
  width: "100%",
  fontSize: "18px",
  fontWeight: 600,
  textAlign: "center",
};

export const AxisTitle = ({
  orientation = ORIENTATION.BOTTOM,
  inside = false,
  margin,
  children,
}: {
  orientation: Orientation;
  inside: boolean;
  margin: number;
  children: React.ReactNode;
}) => {
  const {
    // outerLeft,
    // outerRight,
    // outerBottom,
    // outerTop,
    left,
    //right,
    //bottom,
    top,
    innerWidth,
    innerHeight,
  } = usePlotContext();

  const titleStyleMemo: CSSProperties = useMemo(() => {
    if (orientation === ORIENTATION.BOTTOM || orientation === ORIENTATION.TOP) {
      return {
        ...titleStyle,
        textAlign: "right",
      };
    } else {
      return {
        ...titleStyle,
        textAlign: "left",
      };
    }
  }, [orientation]);

  const containerStyleMemo: CSSProperties = useMemo(() => {
    if (orientation === ORIENTATION.BOTTOM || orientation === ORIENTATION.TOP) {
      return {
        ...titleContainerStyle,
        bottom: 0,
      };
    } else {
      return {
        ...titleContainerStyle,
        top: 0,
      };
    }
  }, [orientation]);

  const objectProps = useMemo(() => {
    if (orientation === ORIENTATION.BOTTOM) {
      return {
        x: left + margin,
        y: top + margin,
        height: innerHeight - 2 * margin,
        width: innerWidth - 2 * margin,
      };
    } else if (orientation === ORIENTATION.TOP) {
      return {
        x: left + margin,
        y: top + margin,
        height: innerHeight - 2 * margin,
        width: innerWidth - 2 * margin,
      };
    } else if (orientation === ORIENTATION.LEFT) {
      return {
        x: left + innerWidth / 2 - innerHeight / 2 + margin,
        y: top + innerHeight / 2 - innerWidth / 2 + margin,
        height: innerWidth - 2 * margin,
        width: innerHeight - 2 * margin,
        transform: `rotate(90)`,
        style: {
          transformOrigin: `${left + innerWidth / 2}px ${top + innerHeight / 2}px`,
        },
      };
    } else {
      return {
        x: left + innerWidth / 2 - innerHeight / 2 + margin,
        y: top + innerHeight / 2 - innerWidth / 2 + margin,
        height: innerWidth - 2 * margin,
        width: innerHeight - 2 * margin,
        transform: `rotate(90)`,
        style: {
          transformOrigin: `${left + innerWidth / 2}px ${top + innerHeight / 2}px`,
        },
      };
    }
  }, [orientation, left, top, innerWidth, innerHeight, margin]);

  return (
    <foreignObject {...objectProps}>
      <div className="plot__axis-title-container" style={containerStyleMemo}>
        <div className="plot__axis-title" style={titleStyleMemo}>
          {children}
        </div>
      </div>
    </foreignObject>
  );
};
