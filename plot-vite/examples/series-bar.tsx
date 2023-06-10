import { scaleLinear } from "d3-scale";
import { HorizontalBarSeries, SVG, VerticalBarSeries, XAxis, XYPlot, YAxis } from "plot/index";

const color = scaleLinear<string>().domain([0, 0.5, 1]).range(["red", "yellow", "green"]);

type Data = {
  x: number;
  y: number;
  test: number;
  label: string;
};

const data = [
  { x: 0.1, y: 0.4, test: 0.8, label: "Shop 1" },
  { x: 0.2, y: 0.2, test: 0.6, label: "Shop 2" },
  { x: 0.4, y: 0.6, test: 0.5, label: "Shop 3" },
  { x: 0.6, y: 0.2, test: 0.6, label: "Shop 4" },
  { x: 0.8, y: 0.6, test: 0.8, label: "Shop 5" },
  { x: 0.9, y: 0.2, test: 0.9, label: "Shop 6" },
];

const getY = (d: Data) => d.y;
const getTest = (d: Data) => d.test;
const getLabel = (d: Data) => d.label;
const getYTest = (d: Data) => d.y + d.test;
const getColor = (d: Data) => color(d.x);

const categories = data.map(getLabel);

export const BarSeriesExample0 = () => {
  return (
    <SVG>
      <XYPlot xType="ordinal" xValues={categories}>
        <VerticalBarSeries data={data} getHeight={getY} />
        <XAxis />
        <YAxis />
      </XYPlot>
    </SVG>
  );
};

export const BarSeriesExample1 = () => {
  return (
    <SVG>
      <XYPlot xType="ordinal" xValues={categories}>
        <VerticalBarSeries data={data} getHeight={getY} color="blue" offset={-0.125} width={0.25} />
        <VerticalBarSeries
          data={data}
          getHeight={getTest}
          color="red"
          offset={0.125}
          width={0.25}
        />
        <XAxis />
        <YAxis />
      </XYPlot>
    </SVG>
  );
};

export const BarSeriesExample2 = () => {
  return (
    <SVG>
      <XYPlot xType="ordinal" xValues={categories}>
        <VerticalBarSeries data={data} getHeight={getY} getColor={getColor} />
        <XAxis tickSize={0} />
        <YAxis />
      </XYPlot>
    </SVG>
  );
};

export const BarSeriesExample3 = () => {
  return (
    <SVG>
      <XYPlot xType="ordinal" xValues={categories} yDomain={[0, 1.6]}>
        <VerticalBarSeries data={data} getHeight={getY} color="blue" />
        <VerticalBarSeries data={data} getHeight={getYTest} getHeight0={getY} color="red" />
        <XAxis tickSize={0} />
        <YAxis />
      </XYPlot>
    </SVG>
  );
};

export const BarSeriesExample4 = () => {
  return (
    <SVG>
      <XYPlot yType="ordinal" yValues={categories} margin={{ left: 80 }}>
        <HorizontalBarSeries
          data={data}
          getHeight={getY}
          color="blue"
          offset={-0.125}
          width={0.25}
        />
        <HorizontalBarSeries
          data={data}
          getHeight={getTest}
          color="red"
          offset={0.125}
          width={0.25}
        />
        <XAxis />
        <YAxis tickSize={0} />
      </XYPlot>
    </SVG>
  );
};

export const BarSeriesExample5 = () => {
  return (
    <SVG>
      <XYPlot xDomain={[0, 1.6]} yType="ordinal" yValues={categories} margin={{ left: 80 }}>
        <HorizontalBarSeries data={data} getHeight={getY} color="blue" />
        <HorizontalBarSeries data={data} getHeight={getYTest} getHeight0={getY} color="red" />
        <XAxis />
        <YAxis tickSize={0} />
      </XYPlot>
    </SVG>
  );
};
