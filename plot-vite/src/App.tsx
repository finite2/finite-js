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

function App() {
  return (
    <>
      <div className="max-w-[800px]">
        <AxisExample0 />
        <AxisExample1 />
        <AxisExample2 />
        <AxisExample3 />
        <AxisExample4 />
        <AxisExample5 />
        <AxisExample6 />

        <LineSeriesExample0 />
        <LineSeriesExample1 />

        <BarSeriesExample0 />
        <BarSeriesExample1 />
        <BarSeriesExample2 />
        <BarSeriesExample3 />
        <BarSeriesExample4 />
        <BarSeriesExample5 />
      </div>
    </>
  );
}

export default App;
