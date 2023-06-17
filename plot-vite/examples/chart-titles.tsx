import { ChartTitle, PlotRegion, SVG, XAxis, XYPlot, YAxis } from "plot/index";

export const ChartTitleExample0 = () => {
  return (
    <SVG>
      <XYPlot margin={{ top: 50 }}>
        <PlotRegion draggable={true} />
        <XAxis />
        <YAxis />
        <ChartTitle>
          <span className="text-blue-500">Charts</span> are{" "}
          <span className="text-orange-500">fun</span>
        </ChartTitle>
      </XYPlot>
    </SVG>
  );
};
