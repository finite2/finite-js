import React from "react";

import { SVG, XYPlot, PlotRegion } from "@finite/plot";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Plot/XYPlot",
  component: XYPlot,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

const Test0 = (args) => {
  return (
    <SVG>
      <XYPlot {...args}>
        <PlotRegion />
      </XYPlot>
    </SVG>
  );
};

export const Default = Test0.bind({});

Default.args = {
  grid: { left: 0, right: 0, top: 0, bottom: 0, width: 1, height: 1 },
  margin: { left: 40, right: 10, top: 10, bottom: 40 },
  xDomain: [0, 1],
  xType: "linear",
  yDomain: [0, 1],
  yType: "linear",
  preserveRatio: false,
};
