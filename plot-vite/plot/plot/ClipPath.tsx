import { ReactNode, useMemo } from "react";

import { usePlotContext } from "./plot-utils";
import { getID } from "plot/utils/getID";

type RectClipPathProps = {
  id: string;
  margin: number;
};

const RectClipPath = ({ id = "content-area", margin = 0 }: RectClipPathProps) => {
  const { left, top, innerWidth, innerHeight } = usePlotContext();

  return (
    <clipPath id={id} className="plot__clippath">
      <rect
        className="plot__clippath-rect"
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
  const idMemo = useMemo(() => (id ? id : `clip-path-${getID()}`), [id]);
  const style = useMemo(() => ({ clipPath: `url(#${idMemo})` }), [idMemo]);

  return (
    <>
      <RectClipPath id={idMemo} margin={margin} />
      <g className="plot__g-clippath" style={style}>
        {children}
      </g>
    </>
  );
};
