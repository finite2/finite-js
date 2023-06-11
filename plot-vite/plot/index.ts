// SVG
export { SVG } from "./plot/SVG";
export { SVGFill } from "./plot/SVGFill";

// Plot area
export { XYPlot } from "./plot/XYPlot";

// Plot area background and containing content
export { PlotRegion } from "./plot/PlotRegion";
export { ClipPath, ClipPlotRegion } from "./plot/ClipPath";

// Axes
export { XAxis, YAxis } from "./plot/Axis";
export { AxisTitle } from "./plot/AxisTitle";

export { HorizontalGridLines, VerticalGridLines, CrosshairGridLines } from "./plot/GridLines";
export { ChartTitle } from "./plot/ChartTitle";

// Series
export { LineSeries } from "./plot/series/LineSeries";
export type { LineSeriesProps } from "./plot/series/LineSeries";

export { LineAreaSeries } from "./plot/series/LineAreaSeries";
export type { LineAreaSeriesProps } from "./plot/series/LineAreaSeries";

export { MarkSeries } from "./plot/series/MarkSeries";
export type { MarkSeriesProps } from "./plot/series/MarkSeries";

export { PolygonSeries } from "./plot/series/PolygonSeries";
export type { PolygonSeriesProps } from "./plot/series/PolygonSeries";

export { VerticalBarSeries, HorizontalBarSeries } from "./plot/series/BarSeries";
export type { VerticalBarSeriesProps, HorizontalBarSeriesProps } from "./plot/series/BarSeries";
// export { AreaSeries } from "./plot/series/AreaSeries";

// build your own components
export { usePlotContext, useSVGContext } from "./plot/plot-utils";
export { Offset } from "./plot/Offset";
