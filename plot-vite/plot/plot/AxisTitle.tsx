import React, { CSSProperties, useMemo } from "react";

import { twMerge } from "tailwind-merge";

import { usePlotContext, Orientation } from "./plot-utils";

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

type AxisTitleProps = {
  orientation: Orientation;
  inside: boolean;
  margin: number;
  children: React.ReactNode;
};

export const AxisTitle = ({
  orientation = "bottom",
  inside = false,
  margin,
  children,
}: AxisTitleProps) => {
  const { left, top, innerWidth, innerHeight } = usePlotContext();

  const objectProps = useMemo(() => {
    if (orientation === "bottom") {
      return {
        x: left + margin,
        y: top + margin,
        height: innerHeight - 2 * margin,
        width: innerWidth - 2 * margin,
      };
    } else if (orientation === "top") {
      return {
        x: left + margin,
        y: top + margin,
        height: innerHeight - 2 * margin,
        width: innerWidth - 2 * margin,
      };
    } else if (orientation === "left") {
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
      <div
        className={twMerge(
          "plot__axis-title-container w-full absolute",
          orientation === "bottom" || orientation === "top" ? "bottom-0" : "top-0"
        )}>
        <div
          className={twMerge(
            "plot__axis-title relative h-full w-full text-18 font-semibold text-center",
            orientation === "bottom" || orientation === "top" ? "text-right" : "text-left"
          )}>
          {children}
        </div>
      </div>
    </foreignObject>
  );
};
