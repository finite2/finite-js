import {
  AxisExample0,
  AxisExample1,
  AxisExample2,
  AxisExample3,
  AxisExample4,
  AxisExample5,
  AxisExample6,
} from "examples/axes";
import { LineSeriesExample0, LineSeriesExample1 } from "examples/series-line";
import {
  BarSeriesExample0,
  BarSeriesExample1,
  BarSeriesExample2,
  BarSeriesExample3,
  BarSeriesExample4,
  BarSeriesExample5,
} from "examples/series-bar";
import { PolygonSeriesExample0, PolygonSeriesExample1 } from "examples/series-polygon";
import { EventExamples0 } from "examples/events-series";
import {
  MarkSeriesExample0,
  MarkSeriesExample1,
  MarkSeriesExample2,
  MarkSeriesExample3,
  MarkSeriesExample4,
  MarkSeriesExample5,
} from "examples/series-mark";
import { ExampleUKPopulation } from "examples/example-uk-population";
import {
  AxisGridlinesExample0,
  AxisGridlinesExample1,
  AxisGridlinesExample2,
} from "examples/axes-gridlines";
import { XYPlotExample0, XYPlotExample1, XYPlotExample2, XYPlotExample3 } from "examples/xy-plot";

function App() {
  return (
    <>
      <div className="max-w-[800px]">
        <XYPlotExample0 />
        <XYPlotExample1 />
        <XYPlotExample2 />
        <XYPlotExample3 />

        <AxisExample0 />
        <AxisExample1 />
        <AxisExample2 />
        <AxisExample3 />
        <AxisExample4 />
        <AxisExample5 />
        <AxisExample6 />

        <AxisGridlinesExample0 />
        <AxisGridlinesExample1 />
        <AxisGridlinesExample2 />

        <LineSeriesExample0 />
        <LineSeriesExample1 />

        <BarSeriesExample0 />
        <BarSeriesExample1 />
        <BarSeriesExample2 />
        <BarSeriesExample3 />
        <BarSeriesExample4 />
        <BarSeriesExample5 />

        <PolygonSeriesExample0 />
        <PolygonSeriesExample1 />

        <MarkSeriesExample0 />
        <MarkSeriesExample1 />
        <MarkSeriesExample2 />
        <MarkSeriesExample3 />
        <MarkSeriesExample4 />
        <MarkSeriesExample5 />

        <EventExamples0 />

        <ExampleUKPopulation />
      </div>
    </>
  );
}

export default App;
