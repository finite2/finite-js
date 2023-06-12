import { ReactNode } from "react";

import { usePlotContext } from "./plot-utils";

type ChartTitleProps = {
  paddingBottom?: number;
  children: ReactNode;
};

export const ChartTitle = ({ paddingBottom = 5, children }: ChartTitleProps) => {
  const { outerLeft, outerTop, left, top, innerWidth } = usePlotContext();

  return (
    <foreignObject
      className="plot__title"
      x={outerLeft + left}
      y={outerTop}
      height={top - outerTop - paddingBottom}
      width={innerWidth}>
      <div className="plot__title-container absolute bottom-0 w-full">
        <div className="plot__title-title relative h-full w-full text-22 font-semibold text-center">
          {children}
        </div>
      </div>
    </foreignObject>
  );
};
