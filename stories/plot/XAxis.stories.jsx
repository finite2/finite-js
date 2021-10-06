import React from "react";

import { SVG, XYPlot, PlotRegion, XAxis, YAxis, ORIENTATION } from "../../plot";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Plot/XAxis",
  component: XAxis,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    orientation: {
      options: [ORIENTATION.BOTTOM, ORIENTATION.TOP],
    },
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const ExampleTemplate = (args) => {
  console.log(args);

  const margin =
    args.orientation === ORIENTATION.TOP
      ? { left: 40, right: 10, top: 40, bottom: 10 }
      : { left: 40, right: 10, top: 10, bottom: 40 };

  return (
    <SVG width={600} height={400}>
      <XYPlot margin={margin}>
        <PlotRegion />
        <XAxis {...args} />
        <YAxis />
      </XYPlot>
    </SVG>
  );
};

const BaseTemplate = (args) => {
  return (
    <SVG width={600} height={50}>
      <XYPlot margin={{ left: 40, right: 10, top: 0, bottom: 40 }}>
        <XAxis {...args} />
      </XYPlot>
    </SVG>
  );
};

export const Example = ExampleTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Example.args = {
  orientation: ORIENTATION.BOTTOM,
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
