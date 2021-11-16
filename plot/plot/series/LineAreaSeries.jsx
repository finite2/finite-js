import React, { useMemo } from "react";
import PropTypes from "prop-types";

import { usePlotContext, GPlotRegion, classes } from "../plot-utils";

import * as d3Shape from "d3-shape";

const renderArea = (data, x, y, y0, curve) => {
  let area = d3Shape.area().x(x).y1(y);

  if (curve !== null) {
    if (typeof curve === "string" && d3Shape[curve]) {
      area.curve(d3Shape[curve]);
    } else if (typeof curve === "function") {
      area.curve(curve);
    }
  }
  if (y0) {
    area.y0(y0);
  }
  return area([...data]);
};

export const LineAreaSeries = ({
  data,
  getX,
  getY,
  getY0,
  baseline,
  curve,
  color,
  fill,
  width,
  className,
  ...rest
}) => {
  const { xScale, yScale } = usePlotContext();

  const areaD = useMemo(
    () =>
      renderArea(
        data,
        (d, i) => xScale(getX(d, i)),
        (d, i) => yScale(getY(d, i)),
        (d, i) => yScale(getY0(d, i)),
        curve
      ),
    [data, xScale, yScale, getX, getY, getY0]
  );

  return (
    <GPlotRegion className={classes("plot__series--line-area", className)}>
      <path d={areaD} style={{ stroke: color, strokeWidth: width, fill }} {...rest} />
    </GPlotRegion>
  );
};

LineAreaSeries.defaultProps = {
  getX: (d) => d.x,
  getY: (d) => d.y,
  getY0: () => 0,
  curve: null,
  color: "var(--color-primary)",
  fill: "var(--color-primary)",
  width: 0,
};

LineAreaSeries.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  getX: PropTypes.func,
  getY: PropTypes.func,
  getY0: PropTypes.func,
  curve: PropTypes.func,
  color: PropTypes.string,
  width: PropTypes.number,
};
