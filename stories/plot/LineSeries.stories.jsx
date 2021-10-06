import React from "react";

import { SVG, SVGFill, XYPlot, LineSeries, XAxis, YAxis } from "../../plot";

export default {
  title: "Plot/Series/LineSeries",
  component: LineSeries,
  argTypes: {
    className: {
      defaultValue: "",
    },
    data: {
      type: { name: "array", required: true },
    },
    getX: { type: { name: "function" }, defaultValue: (d) => d.x },
    getY: { type: { name: "function" }, defaultValue: (d) => d.y },
    curve: { type: { name: "function" } },
    color: { type: { name: "string" }, defaultValue: "blue" },
    width: { defaultValue: 2 },
  },
};

const data = [
  { x: 0, y: 0.4, test: 0.8 },
  { x: 0.2, y: 0.2, test: 0.6 },
  { x: 0.4, y: 0.6, test: 0.5 },
  { x: 0.6, y: 0.2, test: 0.6 },
  { x: 0.8, y: 0.6, test: 0.8 },
  { x: 1, y: 0.2, test: 0.9 },
];

const Test0 = (args) => {
  return (
    <SVGFill>
      <XYPlot>
        <XAxis />
        <YAxis />
        <LineSeries data={data} {...args} />
      </XYPlot>
    </SVGFill>
  );
};

const Test1 = (args) => {
  return (
    <SVGFill>
      <XYPlot>
        <XAxis />
        <YAxis />
        <LineSeries data={data} {...args} />
      </XYPlot>
    </SVGFill>
  );
};

export const Default = Test0.bind({});

export const WithGetters = Test1.bind({});

WithGetters.args = {
  getY: (d) => d.test,
  color: "red",
};

WithGetters.argTypes = {};
