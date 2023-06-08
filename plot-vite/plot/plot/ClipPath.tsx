import { ReactNode, useMemo } from "react";

import { usePlotContext } from "./plot-utils";

type ClipPathProps = {
  id: string;
  className: string;
  margin: number;
};

export const ClipPath = ({ id = "content-area", className, margin = 0 }: ClipPathProps) => {
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

type ClipPlotRegionProps = {
  id?: string;
  margin?: number;
  children: ReactNode;
};

export const ClipPlotRegion = ({ id = "", margin = 0, children }: ClipPlotRegionProps) => {
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
