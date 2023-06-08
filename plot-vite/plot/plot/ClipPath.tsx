import React, { ReactNode, useMemo } from "react";

import { usePlotContext } from "./plot-utils";

export const ClipPath = ({
  id = "content-area",
  className,
  margin = 0,
}: {
  id: string;
  className: string;
  margin: number;
}) => {
  const { left, top, innerWidth, innerHeight } = usePlotContext();

  return (
    <clipPath id={id} className={className}>
      <rect
        x={left - margin}
        y={top - margin}
        width={innerWidth + margin}
        height={innerHeight + margin}
      />
    </clipPath>
  );
};

export const ClipPlotRegion = ({
  id = "",
  margin = 0,
  children,
}: {
  id?: string;
  margin?: number;
  children: ReactNode;
}) => {
  const idMemo = useMemo(() => (id ? id : `clip-path-${Math.random()}`), [id]);
  const style = useMemo(() => ({ clipPath: `url(#${idMemo})` }), [idMemo]);

  return (
    <>
      <ClipPath className="plot__clippath" id={idMemo} margin={margin} />
      <g className="plot__g-clippath" style={style}>
        {children}
      </g>
    </>
  );
};

ClipPlotRegion.defaultProps = {
  id: "",
  margin: 0,
};
