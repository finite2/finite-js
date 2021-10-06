import React, { useState } from "react";
import { scaleLinear } from "d3-scale";

import { SVGFill, XYPlot, MarkSeries, XAxis, YAxis } from "../../plot";

export default {
  title: "Plot/Series/MarkSeries",
  component: MarkSeries,
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
    size: { defaultValue: 5 },
  },
};

const color = scaleLinear().domain([0, 0.5, 1]).range(["red", "yellow", "green"]);

const size = scaleLinear().domain([0.5, 1]).range([10, 40]);

const data = [
  { x: 0.1, y: 0.4, test: 0.8, content: "x", mark: "circle" },
  { x: 0.2, y: 0.2, test: 0.6, content: "d", mark: "text" },
  { x: 0.4, y: 0.6, test: 0.5, content: "c", mark: "text" },
  { x: 0.6, y: 0.2, test: 0.6, content: "b", mark: "diamond" },
  { x: 0.8, y: 0.6, test: 0.8, content: "a", mark: "star" },
  { x: 0.9, y: 0.2, test: 0.9, content: "x", mark: "square" },
];

export const Test0 = (props) => {
  return (
    <SVGFill>
      <XYPlot>
        <XAxis />
        <YAxis />
        <MarkSeries data={data} />
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
        <MarkSeries data={data} color="blue" />
        <MarkSeries data={data} getY={(d) => d.test} color="red" />
      </XYPlot>
    </SVGFill>
  );
};

export const Test2 = (props) => {
  return (
    <SVGFill>
      <XYPlot>
        <XAxis />
        <YAxis />
        <MarkSeries data={data} getColor={(d) => color(d.x)} getSize={(d) => size(d.test)} />
      </XYPlot>
    </SVGFill>
  );
};

export const Test3 = (props) => {
  return (
    <SVGFill>
      <XYPlot>
        <XAxis />
        <YAxis />
        <MarkSeries
          data={data}
          mark="text"
          getContent={(d) => d.content}
          getSize={(d) => size(d.test)}
          color="red"
        />
      </XYPlot>
    </SVGFill>
  );
};

export const Test4 = (props) => {
  return (
    <SVGFill>
      <XYPlot>
        <XAxis />
        <YAxis />
        <MarkSeries
          data={data}
          size={20}
          getMark={(d) => d.mark}
          getContent={(d) => d.content}
          color="red"
        />
      </XYPlot>
    </SVGFill>
  );
};

export const Test5 = (props) => {
  const [selected, setSelected] = useState(-1);
  const [right, setRight] = useState(-1);

  return (
    <SVGFill>
      <XYPlot>
        <XAxis />
        <YAxis />
        <MarkSeries
          data={data}
          getColor={(d, i) => (i === selected ? "red" : "blue")}
          getSize={(d, i) => (i === right ? 30 : 15)}
          onClick={(e, data, i) => setSelected(i)}
          onContextMenu={(e, data, i) => {
            e.preventDefault();
            setRight(i);
          }}
        />
      </XYPlot>
    </SVGFill>
  );
};
