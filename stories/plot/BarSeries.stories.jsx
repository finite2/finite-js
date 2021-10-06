import React from "react";
import { scaleLinear } from "d3-scale";

import { SVGFill, XYPlot, VerticalBarSeries, HorizontalBarSeries, XAxis, YAxis } from "../../plot";

export default {
  title: "Plot/Series/BarSeries",
  component: VerticalBarSeries,
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

const data = [
  { x: 0.1, y: 0.4, test: 0.8, label: "Shop 1" },
  { x: 0.2, y: 0.2, test: 0.6, label: "Shop 2" },
  { x: 0.4, y: 0.6, test: 0.5, label: "Shop 3" },
  { x: 0.6, y: 0.2, test: 0.6, label: "Shop 4" },
  { x: 0.8, y: 0.6, test: 0.8, label: "Shop 5" },
  { x: 0.9, y: 0.2, test: 0.9, label: "Shop 6" },
];

export const Test0 = () => {
  return (
    <SVGFill>
      <XYPlot xType="ordinal" xValues={data.map((d) => d.label)}>
        <VerticalBarSeries data={data} />
        <XAxis />
        <YAxis />
      </XYPlot>
    </SVGFill>
  );
};

export const Test1 = () => {
  return (
    <SVGFill>
      <XYPlot xType="ordinal" xValues={data.map((d) => d.label)}>
        <VerticalBarSeries data={data} color="blue" offset={-0.125} width={0.25} />
        <VerticalBarSeries
          data={data}
          getHeight={(d) => d.test}
          color="red"
          offset={0.125}
          width={0.25}
        />
        <XAxis />
        <YAxis />
      </XYPlot>
    </SVGFill>
  );
};

export const Test2 = () => {
  return (
    <SVGFill>
      <XYPlot xType="ordinal" xValues={data.map((d) => d.label)}>
        <VerticalBarSeries data={data} getColor={(d) => color(d.x)} />
        <XAxis tickSize={0} />
        <YAxis />
      </XYPlot>
    </SVGFill>
  );
};

export const Test3 = () => {
  return (
    <SVGFill>
      <XYPlot xType="ordinal" xValues={data.map((d) => d.label)} yDomain={[0, 1.6]}>
        <VerticalBarSeries data={data} color="blue" />
        <VerticalBarSeries
          data={data}
          getHeight={(d) => d.test + d.y}
          getHeight0={(d) => d.y}
          color="red"
        />
        <XAxis tickSize={0} />
        <YAxis />
      </XYPlot>
    </SVGFill>
  );
};

export const Test4 = () => {
  return (
    <SVGFill>
      <XYPlot yType="ordinal" yValues={data.map((d) => d.label)} margin={{ left: 80 }}>
        <HorizontalBarSeries data={data} color="blue" offset={-0.125} width={0.25} />
        <HorizontalBarSeries
          data={data}
          getHeight={(d) => d.test}
          color="red"
          offset={0.125}
          width={0.25}
        />
        <XAxis />
        <YAxis tickSize={0} />
      </XYPlot>
    </SVGFill>
  );
};

export const Test5 = () => {
  return (
    <SVGFill>
      <XYPlot
        xDomain={[0, 1.6]}
        yType="ordinal"
        yValues={data.map((d) => d.label)}
        margin={{ left: 80 }}
      >
        <HorizontalBarSeries data={data} color="blue" />
        <HorizontalBarSeries
          data={data}
          getHeight={(d) => d.test + d.y}
          getHeight0={(d) => d.y}
          color="red"
        />
        <XAxis />
        <YAxis tickSize={0} />
      </XYPlot>
    </SVGFill>
  );
};
