import { SVG, XYPlot, PlotRegion, XAxis, YAxis } from "plot/index";

export const AxisExample0 = () => {
  return (
    <SVG>
      <XYPlot>
        <PlotRegion draggable={true} />
        <XAxis />
        <YAxis />
      </XYPlot>
    </SVG>
  );
};

export const AxisExample1 = () => {
  return (
    <SVG>
      <XYPlot margin={{ left: 10, right: 40, top: 40, bottom: 10 }}>
        <PlotRegion />
        <XAxis orientation="top" />
        <YAxis orientation="right" />
      </XYPlot>
    </SVG>
  );
};

export const AxisExample2 = () => {
  return (
    <SVG>
      <XYPlot xDomain={[-10, 20]} yDomain={[-10, 10]}>
        <PlotRegion />
        <XAxis on0 />
        <YAxis on0 />
      </XYPlot>
    </SVG>
  );
};

export const AxisExample3 = () => {
  return (
    <SVG>
      <XYPlot grid={{ left: 0, top: 0, width: 2, height: 2 }}>
        <PlotRegion />
        <XAxis />
        <YAxis />
      </XYPlot>
      <XYPlot grid={{ left: 0, top: 1, width: 2, height: 2 }}>
        <PlotRegion />
        <XAxis />
        <YAxis />
      </XYPlot>
      <XYPlot grid={{ left: 1, top: 0, width: 2, height: 2 }}>
        <PlotRegion />
        <XAxis />
        <YAxis />
      </XYPlot>
      <XYPlot grid={{ left: 1, top: 1, width: 2, height: 2 }} xDomain={[-1, 1]}>
        <PlotRegion />
        <XAxis />
        <YAxis on0 />
      </XYPlot>
    </SVG>
  );
};

export const AxisExample4 = () => {
  return (
    <SVG>
      <XYPlot xType="log" xDomain={[1, 1000]} yType="log" yDomain={[1, 100]}>
        <PlotRegion />
        <XAxis />
        <YAxis />
      </XYPlot>
    </SVG>
  );
};

// doesn't fall over on invalid domain
export const AxisExample5 = () => {
  return (
    <SVG>
      <XYPlot xType="log" xDomain={[0, 1000]} yType="log" yDomain={[1, 100]}>
        <PlotRegion />
        <XAxis />
        <YAxis />
      </XYPlot>
    </SVG>
  );
};

export const AxisExample6 = () => {
  return (
    <SVG>
      <XYPlot>
        <PlotRegion />
        <XAxis tickValues={[0, 0.25, 0.5, 0.75, 1]} tickFormat={(t) => `${t}`} />
        <YAxis />
      </XYPlot>
    </SVG>
  );
};
