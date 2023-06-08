import {
  AxisExample0,
  AxisExample1,
  AxisExample2,
  AxisExample3,
  AxisExample4,
  AxisExample5,
  AxisExample6,
} from "examples/axes";
import { LineSeriesExample0, LineSeriesExample1 } from "examples/line-series";

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
      </div>
    </>
  );
}

export default App;
