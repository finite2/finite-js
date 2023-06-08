import { CSSProperties, useMemo } from "react";

import { getTickValues, usePlotContext, GPlotRegion } from "./plot-utils";

type GridLinesProps = {
  tickTotal?: number;
  direction?: "horizontal" | "vertical";
  tickValues?: number[];
  stroke?: string;
};

export const GridLines = ({ tickTotal, direction, tickValues, stroke }: GridLinesProps) => {
  const { innerHeight, innerWidth, xScale, xValues, yScale, yValues } = usePlotContext();

  const isVertical = direction === "vertical";
  const tickXAttr = isVertical ? "y" : "x";
  const tickYAttr = isVertical ? "x" : "y";
  const scale = isVertical ? xScale : yScale;
  const length = isVertical ? innerHeight : innerWidth;
  const ordinalValues = direction === "vertical" ? xValues : yValues;

  const lines = useMemo(() => {
    const values = getTickValues(scale, ordinalValues, tickTotal, tickValues);

    return values.map((v, key) => {
      const pos = scale(v);
      const pathProps = {
        [`${tickYAttr}1`]: pos,
        [`${tickYAttr}2`]: pos,
        [`${tickXAttr}1`]: 0,
        [`${tickXAttr}2`]: length,
        stroke: stroke || `#c8d6dd`,
        style: { pointerEvents: "none" } as CSSProperties,
      };

      return <line className="plot__grid-lines__line" {...pathProps} key={key} />;
    });
  }, [scale, ordinalValues, tickTotal, tickValues, length, stroke, tickYAttr, tickXAttr]);

  return <GPlotRegion className="plot__grid-lines">{lines}</GPlotRegion>;
};

GridLines.defaultProps = {
  tickTotal: 5,
};

export const HorizontalGridLines = (props: Omit<GridLinesProps, "direction">) => (
  <GridLines direction="horizontal" {...props} />
);

export const VerticalGridLines = (props: Omit<GridLinesProps, "direction">) => (
  <GridLines direction="vertical" {...props} />
);

export const CrosshairGridLines = ({
  position,
  ...rest
}: Omit<GridLinesProps, "direction"> & { position: { x: number; y: number } }) => {
  const x = useMemo(() => [position.x], [position.x]);
  const y = useMemo(() => [position.y], [position.y]);
  return (
    <>
      {position && <HorizontalGridLines tickValues={y} {...rest} />}
      {position && <VerticalGridLines tickValues={x} {...rest} />}
    </>
  );
};
