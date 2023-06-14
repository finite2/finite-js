import React, { useMemo } from "react";

import { twMerge } from "tailwind-merge";

import { usePlotContext } from "./plot-utils";
import { Orientation } from "./types";

export type AxisTitleProps = {
  orientation?: Orientation;
  inside?: boolean;
  margin?: number;
  position?: "start" | "middle" | "end";
  children: React.ReactNode;
};

const positionClass  = {
  start: "text-left",
  middle: "text-center",
  end: "text-right",
}

export const AxisTitle = ({
  orientation = "bottom",
  inside = true,
  margin = 5,
  position,
  children,
}: AxisTitleProps) => {
  const { left, top, innerWidth, innerHeight } = usePlotContext();

  const objectProps = useMemo(() => {

    if(inside) {
    if (orientation === "bottom") {
      return {
        x: left + margin,
        y: top + margin,
        height: innerHeight - 2 * margin,
        width: innerWidth - 2 * margin,
        cClass: "bottom-0",
        innerClass: position ? positionClass[position] : "text-right",
      };
    } else if (orientation === "top") {
      return {
        x: left + margin,
        y: top + margin,
        height: innerHeight - 2 * margin,
        width: innerWidth - 2 * margin,
        cClass: "top-0",
        innerClass: position ? positionClass[position] : "text-left",
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
        cClass: "bottom-0",
        innerClass: position ? positionClass[position] : "text-left",
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
        cClass: "top-0",
        innerClass: position ? positionClass[position] : "text-right",
      };
    }
  } else {
        if (orientation === "bottom") {
      return {
        x: left + margin,
        y: top + margin + innerHeight,
        height: 50,
        width: innerWidth - 2 * margin,
        cClass: "top-0",
        innerClass: position ? positionClass[position] : "text-center",
      };
    } else if (orientation === "top") {
      return {
        x: left + margin,
        y: top - margin - 50,
        height: 50,
        width: innerWidth - 2 * margin,
        cClass: "bottom-0",
        innerClass: position ? positionClass[position] : "text-center",
      };
    } else if (orientation === "left") {
      return {
        x: left + innerWidth / 2 - innerHeight / 2 + margin,
        y: top + innerHeight / 2 - innerWidth / 2 - margin - 50,
        height: 50,
        width: innerHeight - 2 * margin,
        transform: `rotate(270)`,
        style: {
          transformOrigin: `${left + innerWidth / 2}px ${top + innerHeight / 2}px`,
        },
        cClass: "bottom-0",
        innerClass: position ? positionClass[position] : "text-center",
      };
    } else {
      return {
        x: left + innerWidth / 2 - innerHeight / 2 + margin,
        y: top + innerHeight / 2 - innerWidth / 2  - margin - 50,
        height: 50,
        width: innerHeight - 2 * margin,
        transform: `rotate(90)`,
        style: {
          transformOrigin: `${left + innerWidth / 2}px ${top + innerHeight / 2}px`,
        },
        cClass: "bottom-0",
        innerClass: position ? positionClass[position] : "text-center",
      };
    }
  }
  }, [orientation, left, top, innerWidth, innerHeight, margin]);


  const {cClass, innerClass, ...rest} = objectProps;

  return (
    <foreignObject className="plot__axis-title select-none bg-transparent" {...rest}>
      <div
        className={twMerge(
          "plot__axis-title-container w-full absolute bg-transparent", cClass
        )}>
        <div
          className={twMerge(
            "plot__axis-sub-container relative h-full w-full text-18 font-semibold text-center bg-transparent", innerClass
          )}>
          {children}
        </div>
      </div>
    </foreignObject>
  );
};
