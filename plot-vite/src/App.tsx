import { EventExamples0 } from "examples/events-series";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Layout } from "./Layout";
import { AxesPage } from "./pages/axes";
import { AxesTitlesPage } from "./pages/axes-titles";
import { ExampleUkPopulationPage } from "./pages/example-uk-population";
import { GridlinesPage } from "./pages/gridlines";
import { BarSeriesPage } from "./pages/series-bar";
import { LineSeriesPage } from "./pages/series-line";
import { MarkSeriesPage } from "./pages/series-mark";
import { PolygonSeriesPage } from "./pages/series-polygon";
import { XYPlotPage } from "./pages/xyplot";
import { routes } from "./routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: routes.xyPlot,
        element: <XYPlotPage />,
      },
      {
        path: routes.axes,
        element: <AxesPage />,
      },
      {
        path: routes.axesTitles,
        element: <AxesTitlesPage />,
      },
      {
        path: routes.gridLines,
        element: <GridlinesPage />,
      },
      {
        path: routes.barSeries,
        element: <BarSeriesPage />,
      },
      {
        path: routes.polygonSeries,
        element: <PolygonSeriesPage />,
      },
      {
        path: routes.markSeries,
        element: <MarkSeriesPage />,
      },
      {
        path: routes.lineSeries,
        element: <LineSeriesPage />,
      },
      {
        path: routes.events,
        element: <EventExamples0 />,
      },
      {
        path: routes.examples.ukPopulation,
        element: <ExampleUkPopulationPage />,
      },
      {
        path: routes.base,
        element: <div>Home</div>,
      },
      {
        path: "*",
        element: <h2 className="my-auto text-center">404 Page Not Found</h2>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
