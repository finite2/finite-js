import React from "react";

import { SVG, XYPlot, PlotRegion, XAxis, YAxis, ORIENTATION } from "@finite/plot";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Plot/YAxis",
  component: YAxis,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    orientation: {
      options: [ORIENTATION.LEFT, ORIENTATION.RIGHT],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const ExampleTemplate = (args) => {
  console.log(args);

  const margin =
    args.orientation === ORIENTATION.LEFT
      ? { left: 40, right: 10, top: 10, bottom: 40 }
      : { left: 10, right: 40, top: 10, bottom: 40 };

  return (
    <SVG width={600} height={400}>
      <XYPlot margin={margin}>
        <PlotRegion />
        <XAxis />
        <YAxis {...args} />
      </XYPlot>
    </SVG>
  );
};

const BaseTemplate = (args) => {
  return (
    <SVG width={50} height={400}>
      <XYPlot margin={{ left: 0, top: 10, bottom: 10 }}>
        <YAxis {...args} />
      </XYPlot>
    </SVG>
  );
};

export const Example = ExampleTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Example.args = {
  orientation: ORIENTATION.LEFT,
  draggable: true,
};

export const Default = BaseTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
  draggable: true,
};

Default.argTypes = {
  orientation: { table: { disable: true } },
};
