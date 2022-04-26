import React, { useMemo } from "react";
import PropTypes from "prop-types";
import * as d3Shape from "d3-shape";
import styled from "styled-components";

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

const LinePath = styled.path`
  fill: #0000;
`;

export const LineSeries = ({ data, getX, getY, curve, color, width, className, ...rest }) => {
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
      <LinePath d={d} style={style} {...rest} />
    </GPlotRegion>
  );
};

LineSeries.defaultProps = {
  getX: (d) => d.x,
  getY: (d) => d.y,
  curve: null,
  color: "var(--color-primary)",
  width: 2,
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
