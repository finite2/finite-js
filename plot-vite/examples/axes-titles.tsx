import { AxisTitle, PlotRegion, SVG, XAxis, XYPlot, YAxis } from "plot/index";

export const AxisTitleExample0 = () => {
  return (
    <SVG>
      <XYPlot>
        <PlotRegion draggable={true} />
        <XAxis />
        <YAxis />
        <AxisTitle>Time (ms)</AxisTitle>
        <AxisTitle orientation="left">Cash flow ($)</AxisTitle>
      </XYPlot>
    </SVG>
  );
};

export const AxisTitleExample1 = () => {
  return (
    <SVG>
      <XYPlot margin={{ left: 10, right: 40, top: 40, bottom: 10 }}>
        <PlotRegion />
        <XAxis orientation="top" />
        <AxisTitle orientation="top">Time (ms)</AxisTitle>
        <YAxis orientation="right" />
        <AxisTitle orientation="right">Cash flow ($)</AxisTitle>
      </XYPlot>
    </SVG>
  );
};

export const AxisTitleExample2 = () => {
  return (
    <SVG>
      <XYPlot margin={{ left: 60, right: 10, top: 10, bottom: 60 }}>
        <PlotRegion draggable={true} />
        <XAxis />
        <YAxis />
        <AxisTitle inside={false} margin={30}>
          Time (ms)
        </AxisTitle>
        <AxisTitle inside={false} orientation="left" margin={40}>
          Cash flow ($)
        </AxisTitle>
      </XYPlot>
    </SVG>
  );
};

export const AxisTitleExample3 = () => {
  return (
    <SVG>
      <XYPlot margin={{ left: 10, right: 70, top: 60, bottom: 10 }}>
        <PlotRegion />
        <XAxis orientation="top" />
        <AxisTitle inside={false} orientation="top" margin={30}>
          Time (ms)
        </AxisTitle>
        <YAxis orientation="right" />
        <AxisTitle inside={false} orientation="right" margin={40}>
          Cash flow ($)
        </AxisTitle>
      </XYPlot>
    </SVG>
  );
};

export const AxisTitleExample4 = () => {
  return (
    <SVG>
      <XYPlot>
        <PlotRegion draggable={true} />
        <XAxis />
        <YAxis />
        <AxisTitle position="start">Time (ms)</AxisTitle>
        <AxisTitle orientation="left">Cash flow ($)</AxisTitle>
      </XYPlot>
    </SVG>
  );
};
