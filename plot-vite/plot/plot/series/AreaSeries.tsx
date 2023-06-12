// ! LO doesn't need this one.
// There is a beautiful example here: https://atlas.cid.harvard.edu/explore/

import { CSSProperties, Fragment, useMemo } from "react";

import squarify from "squarify";

import { classes, GPlotRegion, usePlotContext } from "../plot-utils";

const foreignObjectStyle: CSSProperties = {
  userSelect: "none",
  pointerEvents: "none",
};

const areaTextContainerStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  height: "100%",
};

const textStyle: CSSProperties = {
  position: "absolute",
  width: "100%",
  top: "50%",
  transform: "translateY(-50%)",
  fontWeight: 600,
  textAlign: "center",
};

// TODO: this needs a bit of tidying up
export const AreaSeries = ({
  data,
  className,
  stroke,
  strokeWidth,
  getStroke,
  getStrokeWidth,
  getArea,
  getLabel,
  getColor,
  onPointerEnter,
  onClick,
  getCharacters,
}) => {
  const { xRange, yRange } = usePlotContext();

  if (!data) {
    return null;
  }

  const transformedData = useMemo(
    () =>
      data.map((d) => ({
        ...d,
        value: getArea(d),
        label: getLabel(d),
        color: getColor(d),
        stroke: getStroke ? getStroke(d) : stroke,
        characters: getCharacters ? getCharacters(d) : 4,
      })),
    [getArea, getLabel, getColor, getStroke, stroke, getCharacters, data]
  );

  const rectData = useMemo(
    () =>
      squarify(transformedData, {
        x0: xRange[0],
        x1: xRange[1],
        y0: yRange[1],
        y1: yRange[0],
      }),
    [transformedData, xRange, yRange]
  );

  return (
    <GPlotRegion className={classes("plot__series--area", className)}>
      {rectData.map((d, i) => {
        const { x0, x1, y0, y1, label, color, value, characters } = d;

        const strokeW = getStrokeWidth ? getStrokeWidth(d) : strokeWidth;
        const rectProps = {
          x: x0 + strokeW / 2,
          width: x1 - x0 - strokeW,
          y: y0 + strokeW / 2,
          height: y1 - y0 - strokeW,
          fill: color,
          title: `$${value.toFixed(0)}`,
          stroke: getStroke ? getStroke(d) : stroke,
          strokeWidth: strokeW,
          onPointerEnter: onPointerEnter ? () => onPointerEnter(d) : undefined,
          onClick: onClick ? () => onClick(d) : undefined,
        };

        if (label) {
          const textProps = {
            x: x0,
            y: y0,
            width: x1 - x0,
            height: y1 - y0,
          };

          const style = {
            ...textStyle,
            fontSize: Math.max(6, Math.min(26, (x1 - x0) / characters)),
          };

          return (
            <Fragment key={i}>
              <rect {...rectProps} />
              <foreignObject className="plot_area-text" style={foreignObjectStyle} {...textProps}>
                <div style={areaTextContainerStyle}>
                  <div style={style}>{label}</div>
                </div>
              </foreignObject>
            </Fragment>
          );
        } else {
          return <rect key={i} {...rectProps} />;
        }
      })}
    </GPlotRegion>
  );
};

AreaSeries.defaultProps = {
  stroke: "#fff",
  strokeWidth: 0,
  getArea: (d) => d.area,
  getLabel: (d) => d.label,
  getColor: (d) => d.color,
};
