import React from "react";

import { SVGFill, XYPlot, PlotRegion, HorizontalGridLines, VerticalGridLines } from "@finite/plot";

export default {
  title: "Plot/GridLines",
  component: HorizontalGridLines,
  parameters: {
    controls: {
      disabled: true,
    },
  },
};

const Test0 = () => {
  return (
    <SVGFill>
      <XYPlot>
        <PlotRegion />
        <HorizontalGridLines />
      </XYPlot>
    </SVGFill>
  );
};

const Test1 = () => {
  return (
    <SVGFill>
      <XYPlot>
        <PlotRegion />
        <VerticalGridLines />
      </XYPlot>
    </SVGFill>
  );
};

const Test2 = () => {
  return (
    <SVGFill>
      <XYPlot yDomain={[1, 10000]} yType="log">
        <PlotRegion />
        <HorizontalGridLines />
      </XYPlot>
    </SVGFill>
  );
};

export const Horizontal = Test0.bind({});

export const Vertical = Test1.bind({});

export const LogScales = Test2.bind({});
