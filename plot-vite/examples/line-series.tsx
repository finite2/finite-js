import { SVG, XYPlot, LineSeries, XAxis, YAxis } from "plot/index";

// TODO curve type examples
// TODO stretch: custom curve type

type Data = {
  x: number;
  y: number;
  test: number;
};

const data: Data[] = [
  { x: 0, y: 0.4, test: 0.8 },
  { x: 0.2, y: 0.2, test: 0.6 },
  { x: 0.4, y: 0.6, test: 0.5 },
  { x: 0.6, y: 0.2, test: 0.6 },
  { x: 0.8, y: 0.6, test: 0.8 },
  { x: 1, y: 0.2, test: 0.9 },
];

const getX = (d: Data) => d.x;
const getY = (d: Data) => d.y;
const getTest = (d: Data) => d.test;

export const LineSeriesExample0 = () => {
  return (
    <SVG>
      <XYPlot>
        <XAxis />
        <YAxis />
        <LineSeries getX={getX} getY={getY} data={data} />
      </XYPlot>
    </SVG>
  );
};

export const LineSeriesExample1 = () => {
  return (
    <SVG>
      <XYPlot>
        <XAxis />
        <YAxis />
        <LineSeries data={data} getX={getX} getY={getTest} color="red" />
        <LineSeries data={data} getX={getX} getY={getY} color="blue" />
      </XYPlot>
    </SVG>
  );
};
