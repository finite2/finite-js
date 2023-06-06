import React, { useMemo } from "react";
import PropTypes from "prop-types";
import * as d3Shape from "d3-shape";

import { usePlotContext, GPlotRegion, classes } from "../plot-utils";

const renderLine = (data, x, y, curve) => {
  let line = d3Shape.line().x(x).y(y);
  if (curve !== null) {
    if (typeof curve === "string" && d3Shape[curve]) {
      line.curve(d3Shape[curve]);
    } else if (typeof curve === "function") {
      line.curve(curve);
    }
  }
  return line(data);
};

export const LineSeries = ({
  data,
  getX = (d) => d.x,
  getY = (d) => d.y,
  curve,
  color = "var(--color-primary)",
  width = 2,
  className,
  ...rest
}) => {
  const { xScale, yScale } = usePlotContext();

  const d = useMemo(
    () =>
      renderLine(
        data,
        (d, i) => xScale(getX(d, i)),
        (d, i) => yScale(getY(d, i)),
        curve
      ),
    [data, xScale, yScale, getX, getY]
  );

  const style = useMemo(() => ({ stroke: color, strokeWidth: width }), [color, width]);

  return (
    <GPlotRegion className={classes("plot__series--line", className)}>
      <path d={d} style={style} fill="#0000" {...rest} />
    </GPlotRegion>
  );
};

LineSeries.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  getX: PropTypes.func,
  getY: PropTypes.func,
  curve: PropTypes.func,
  color: PropTypes.string,
  width: PropTypes.number,
};
