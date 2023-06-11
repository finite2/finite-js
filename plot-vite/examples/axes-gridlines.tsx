import { HorizontalGridLines, PlotRegion, SVG, VerticalGridLines, XYPlot } from "plot/index";

export const AxisGridlinesExample0 = () => {
  return (
    <SVG>
      <XYPlot>
        <PlotRegion />
        <HorizontalGridLines />
      </XYPlot>
    </SVG>
  );
};

export const AxisGridlinesExample1 = () => {
  return (
    <SVG>
      <XYPlot>
        <PlotRegion />
        <VerticalGridLines />
      </XYPlot>
    </SVG>
  );
};

export const AxisGridlinesExample2 = () => {
  return (
    <SVG>
      <XYPlot yDomain={[1, 10000]} yType="log">
        <PlotRegion />
        <HorizontalGridLines />
      </XYPlot>
    </SVG>
  );
};
