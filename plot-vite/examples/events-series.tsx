import { scaleLinear } from "d3-scale";
import { MarkSeries, SVG, VerticalBarSeries, XAxis, XYPlot, YAxis } from "plot/index";
import { useCallback, useState } from "react";

const color = scaleLinear<string>().domain([0, 0.5, 1]).range(["red", "yellow", "green"]);

type Data = {
  x: number;
  y: number;
  test: number;
  label: string;
};

const data: Data[] = [
  { x: 0.1, y: 0.4, test: 0.8, label: "Shop 1" },
  { x: 0.2, y: 0.2, test: 0.6, label: "Shop 2" },
  { x: 0.4, y: 0.6, test: 0.5, label: "Shop 3" },
  { x: 0.6, y: 0.2, test: 0.6, label: "Shop 4" },
  { x: 0.8, y: 0.6, test: 0.8, label: "Shop 5" },
  { x: 0.9, y: 0.2, test: 0.9, label: "Shop 6" },
];

const labels = data.map((d) => d.label);

// TODO Markseries doesn't play nice with ordinal scales when filtering
// best to think about how to handle ordinal scales properly

const getHeight = (d: Data) => d.y;
const getHeighOffset = (d: Data) => d.y + 0.03;
const getContent = (d: Data) => `$${d.y}k`;

export const EventExamples0 = () => {
  const [selected, setSelected] = useState("");

  const getColor = useCallback(
    (d: Data): string => (d.label === selected ? "#f3f" : "blue"),
    [selected]
  );

  const onMouseOver = useCallback((_e: Event, d: Data) => setSelected(d.label), []);

  const getMarkXPosition = useCallback(
    () => data.findIndex((d) => d.label === selected),
    [selected]
  );

  return (
    <SVG>
      <XYPlot xType="ordinal" xValues={labels}>
        <VerticalBarSeries
          data={data}
          getColor={getColor}
          getHeight={getHeight}
          onMouseOver={onMouseOver}
        />
        <MarkSeries
          data={data.filter((d) => d.label === selected)}
          mark="text"
          color="var(--color-font)"
          getContent={getContent}
          size={14}
          getY={getHeighOffset}
          getX={getMarkXPosition}
        />
        <XAxis />
        <YAxis />
      </XYPlot>
    </SVG>
  );
};
