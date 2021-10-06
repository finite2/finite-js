import React from "react";
import { scaleLinear } from "d3-scale";

import { SVGFill, XYPlot, PolygonSeries, XAxis, YAxis } from "../../plot";

export default {
  title: "Plot/Series/PolygonSeries",
  component: PolygonSeries,
  argTypes: {
    className: {
      defaultValue: "",
    },
    data: {
      type: { name: "array", required: true },
    },
    getX: { type: { name: "function" }, defaultValue: (d) => d.x },
    getY: { type: { name: "function" }, defaultValue: (d) => d.y },
    color: { type: { name: "string" }, defaultValue: "blue" },
  },
};

const color = scaleLinear().domain([0, 0.5, 1]).range(["red", "yellow", "green"]);

const size = scaleLinear().domain([0.5, 1]).range([10, 40]);

const data = [
  {
    points: [
      { x: 0.1, y: 0.4 },
      { x: 0.1, y: 0.5 },
      { x: 0.2, y: 0.4 },
    ],
    test: 0.3,
  },
  {
    points: [
      { x: 0.3, y: 0.6 },
      { x: 0.5, y: 0.3 },
      { x: 0.7, y: 0.6 },
    ],
    test: 0.7,
  },
  {
    points: [
      { x: 0.7, y: 0.6 },
      { x: 0.8, y: 0.9 },
      { x: 0.9, y: 1 },
      { x: 0.9, y: 0.5 },
      { x: 0.8, y: 0.4 },
      { x: 0.6, y: 0.2 },
    ],
    test: 1,
  },
];

export const Test0 = (props) => {
  return (
    <SVGFill>
      <XYPlot>
        <XAxis />
        <YAxis />
        <PolygonSeries data={data} />
      </XYPlot>
    </SVGFill>
  );
};

export const Test1 = (props) => {
  return (
    <SVGFill>
      <XYPlot>
        <XAxis />
        <YAxis />
        <PolygonSeries data={data} getFill={(d) => color(d.test)} />
      </XYPlot>
    </SVGFill>
  );
};
