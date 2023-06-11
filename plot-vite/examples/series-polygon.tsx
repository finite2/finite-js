import { scaleLinear } from "d3-scale";
import { PolygonSeries, SVG, XAxis, XYPlot, YAxis } from "plot/index";

const color = scaleLinear<string>().domain([0, 0.5, 1]).range(["red", "yellow", "green"]);

type Point = { x: number; y: number };

type Data = {
  points: Point[];
  test: number;
};

const data: Data[] = [
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

const getX = (d: Point) => d.x;
const getY = (d: Point) => d.y;
const getFill = (d: Data) => color(d.test);

export const PolygonSeriesExample0 = () => {
  return (
    <SVG>
      <XYPlot>
        <XAxis />
        <YAxis />
        <PolygonSeries data={data} getX={getX} getY={getY} />
      </XYPlot>
    </SVG>
  );
};

export const PolygonSeriesExample1 = () => {
  return (
    <SVG>
      <XYPlot>
        <XAxis />
        <YAxis />
        <PolygonSeries data={data} getFill={getFill} getX={getX} getY={getY} />
      </XYPlot>
    </SVG>
  );
};
