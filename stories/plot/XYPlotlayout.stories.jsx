import React from "react";

import { SVG, XYPlot, PlotRegion } from "@finite/plot";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Plot/XYPlot-layouts",
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  parameters: {
    controls: {
      disabled: true,
    },
  },
};

const Test0 = () => {
  return (
    <SVG>
      <XYPlot>
        <PlotRegion />
      </XYPlot>
    </SVG>
  );
};

export const Default = Test0.bind({});

const Test3 = () => {
  return (
    <SVG>
      <XYPlot margin={{ bottom: 80, left: 80 }}>
        <PlotRegion />
      </XYPlot>
    </SVG>
  );
};

export const BigMargins = Test3.bind({});

const Test1 = () => {
  return (
    <SVG>
      <XYPlot grid={{ left: 0, top: 0, width: 2, height: 2 }}>
        <PlotRegion />
      </XYPlot>
      <XYPlot grid={{ left: 0, top: 1, width: 2, height: 2 }}>
        <PlotRegion />
      </XYPlot>
      <XYPlot grid={{ left: 1, top: 0, width: 2, height: 2 }}>
        <PlotRegion />
      </XYPlot>
      <XYPlot grid={{ left: 1, top: 1, width: 2, height: 2 }}>
        <PlotRegion />
      </XYPlot>
    </SVG>
  );
};

export const SimpleGridLayout = Test1.bind({});

const Test2 = () => {
  return (
    <SVG>
      <XYPlot grid={{ left: 0, right: 1, top: 0, width: 3, height: 2 }}>
        <PlotRegion />
      </XYPlot>
      <XYPlot grid={{ left: 2, top: 0, width: 3, height: 2 }}>
        <PlotRegion />
      </XYPlot>
      <XYPlot grid={{ left: 0, top: 1, width: 3, height: 2 }}>
        <PlotRegion />
      </XYPlot>
      <XYPlot grid={{ left: 1, right: 2, top: 1, width: 3, height: 2 }}>
        <PlotRegion />
      </XYPlot>
    </SVG>
  );
};

export const FlexibleGridLayout = Test2.bind({});
