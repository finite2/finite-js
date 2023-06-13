import { XYPlotExample0, XYPlotExample1, XYPlotExample2, XYPlotExample3 } from "examples/xy-plot";

const data = import.meta.glob("../../examples/xy-plot.tsx", { as: "raw", eager: true });

console.log(data["../../examples/xy-plot.tsx"]);

export const XYPlotPage = () => {
  return (
    <>
      <XYPlotExample0 />
      <XYPlotExample1 />
      <XYPlotExample2 />
      <XYPlotExample3 />
    </>
  );
};
