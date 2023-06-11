import { useCallback, useState } from "react";

import { scaleLinear } from "d3-scale";
import { MarkSeries, SVG, XAxis, XYPlot, YAxis } from "plot/index";

const color = scaleLinear<string>().domain([0, 0.5, 1]).range(["red", "yellow", "green"]);

const size = scaleLinear().domain([0.5, 1]).range([10, 40]);

type Data = {
  x: number;
  y: number;
  test: number;
  content: string;
  mark: "circle" | "text" | "diamond" | "star" | "square";
};

const data: Data[] = [
  { x: 0.1, y: 0.4, test: 0.8, content: "x", mark: "circle" },
  { x: 0.2, y: 0.2, test: 0.6, content: "d", mark: "text" },
  { x: 0.4, y: 0.6, test: 0.5, content: "c", mark: "text" },
  { x: 0.6, y: 0.2, test: 0.6, content: "b", mark: "diamond" },
  { x: 0.8, y: 0.6, test: 0.8, content: "a", mark: "star" },
  { x: 0.9, y: 0.2, test: 0.9, content: "x", mark: "square" },
];

const getX = (d: Data) => d.x;
const getY = (d: Data) => d.y;

export const MarkSeriesExample0 = () => {
  return (
    <SVG>
      <XYPlot>
        <XAxis />
        <YAxis />
        <MarkSeries data={data} getX={getX} getY={getY} />
      </XYPlot>
    </SVG>
  );
};

export const MarkSeriesExample1 = () => {
  return (
    <SVG>
      <XYPlot>
        <XAxis />
        <YAxis />
        <MarkSeries data={data} color="blue" getX={getX} getY={getY} />
        <MarkSeries data={data} getX={getX} getY={(d) => d.test} color="red" />
      </XYPlot>
    </SVG>
  );
};

const getColor = (d: Data) => color(d.x);
const getMark = (d: Data) => d.mark;
const getContent = (d: Data) => d.content;
const getSize = (d: Data) => size(d.test);

export const MarkSeriesExample2 = () => {
  return (
    <SVG>
      <XYPlot>
        <XAxis />
        <YAxis />
        <MarkSeries data={data} getX={getX} getY={getY} getColor={getColor} getSize={getSize} />
      </XYPlot>
    </SVG>
  );
};

export const MarkSeriesExample3 = () => {
  return (
    <SVG>
      <XYPlot>
        <XAxis />
        <YAxis />
        <MarkSeries
          data={data}
          mark="text"
          getX={getX}
          getY={getY}
          getContent={getContent}
          getSize={getSize}
          color="red"
        />
      </XYPlot>
    </SVG>
  );
};

export const MarkSeriesExample4 = () => {
  return (
    <SVG>
      <XYPlot>
        <XAxis />
        <YAxis />
        <MarkSeries
          data={data}
          size={20}
          getX={getX}
          getY={getY}
          getMark={getMark}
          getContent={getContent}
          color="red"
        />
      </XYPlot>
    </SVG>
  );
};

export const MarkSeriesExample5 = () => {
  const [selected, setSelected] = useState(-1);
  const [right, setRight] = useState(-1);

  const getSize = useCallback((_d: Data, i: number) => (i === right ? 30 : 15), [right]);
  const getColor = useCallback(
    (_d: Data, i: number) => (i === selected ? "red" : "blue"),
    [selected]
  );

  const onClick = useCallback((_e: any, _d: Data, i: number) => setSelected(i), [setSelected]);
  const onRightClick = useCallback(
    (e: any, _d: Data, i: number) => {
      e.preventDefault();
      setRight(i);
    },
    [setRight]
  );

  return (
    <SVG>
      <XYPlot>
        <XAxis />
        <YAxis />
        <MarkSeries
          data={data}
          getX={getX}
          getY={getY}
          getColor={getColor}
          getSize={getSize}
          onClick={onClick}
          onContextMenu={onRightClick}
        />
      </XYPlot>
    </SVG>
  );
};
