import { PlotRegion, SVG, XYPlot } from "plot/index";

export const XYPlotExample0 = () => {
  return (
    <SVG>
      <XYPlot>
        <PlotRegion />
      </XYPlot>
    </SVG>
  );
};

export const XYPlotExample1 = () => {
  return (
    <SVG>
      <XYPlot grid={{ left: 0, top: 0, width: 2, height: 2 }}>
        <PlotRegion />
      </XYPlot>
      <XYPlot grid={{ left: 0, top: 1, width: 2, height: 2 }}>
        <PlotRegion />
      </XYPlot>
      <XYPlot grid={{ left: 1, top: 0, width: 2, height: 2 }}>
        <PlotRegion />
      </XYPlot>
      <XYPlot grid={{ left: 1, top: 1, width: 2, height: 2 }}>
        <PlotRegion />
      </XYPlot>
    </SVG>
  );
};

export const XYPlotExample2 = () => {
  return (
    <SVG>
      <XYPlot grid={{ left: 0, right: 1, top: 0, width: 3, height: 2 }}>
        <PlotRegion />
      </XYPlot>
      <XYPlot grid={{ left: 2, top: 0, width: 3, height: 2 }}>
        <PlotRegion />
      </XYPlot>
      <XYPlot grid={{ left: 0, top: 1, width: 3, height: 2 }}>
        <PlotRegion />
      </XYPlot>
      <XYPlot grid={{ left: 1, right: 2, top: 1, width: 3, height: 2 }}>
        <PlotRegion />
      </XYPlot>
    </SVG>
  );
};

export const XYPlotExample3 = () => {
  return (
    <SVG>
      <XYPlot margin={{ bottom: 80, left: 80 }}>
        <PlotRegion />
      </XYPlot>
    </SVG>
  );
};
