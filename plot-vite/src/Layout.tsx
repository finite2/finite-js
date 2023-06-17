import { Link, Outlet } from "react-router-dom";

import { routes } from "./routes";

export const Layout = () => {
  return (
    <div className="fixed w-screen h-screen flex">
      <div className=" bg-blue-300 flex flex-col justify-start items-left p-2 px-4 gap-1">
        <h3>Plot</h3>
        <Link to={routes.xyPlot}>XY Plot</Link>
        <Link to={routes.axes}>Axes</Link>
        <Link to={routes.axesTitles}>Axes titles</Link>
        <Link to={routes.chartTitles}>Chart titles</Link>
        <Link to={routes.gridLines}>Gridlines</Link>
        <Link to={routes.barSeries}>Bar Series</Link>
        <Link to={routes.polygonSeries}>Polygon Series</Link>
        <Link to={routes.markSeries}>Mark Series</Link>
        <Link to={routes.lineSeries}>Line Series</Link>
        <Link to={routes.events}>Events</Link>
        <Link to={routes.examples.ukPopulation}>UK Population</Link>
      </div>
      <div className="flex w-full flex-col gap-2 grow ">
        <div className="w-full overflow-x-auto">
          <div className="my-4 max-w-[800px] mx-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
