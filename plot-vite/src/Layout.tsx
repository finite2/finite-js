import { Link, Outlet } from "react-router-dom";

import { routes } from "./routes";

export const Layout = () => {
  return (
    <div className="w-screen h-screen flex">
      <div className="bg-blue-300 flex flex-col justify-start items-left p-2 px-4 gap-1">
        <h3>Plot</h3>
        <Link to={routes.xyPlot}>XY Plot</Link>
        <Link to={routes.axes}>Axes</Link>
        <Link to={routes.gridLines}>Gridlines</Link>
        <Link to={routes.barSeries}>Bar Series</Link>
        <Link to={routes.polygonSeries}>Polygon Series</Link>
        <Link to={routes.markSeries}>Mark Series</Link>
        <Link to={routes.lineSeries}>Line Series</Link>
        <Link to={routes.events}>Events</Link>
        <Link to={routes.examples.ukPopulation}>UK Population</Link>
      </div>
      <div className="flex flex-col gap-2 grow max-w-[800px] mx-auto my-4">
        <Outlet />
      </div>
    </div>
  );
};
