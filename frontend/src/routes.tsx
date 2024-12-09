import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Stations from "./views/Stations";
import Details from "./views/Stations/Details";
import List from "./views/Stations/List";

export const appRoutes = [
  {
    path: "/",
    element: <Navigate to="/stations/" replace />
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/stations",
        element: <Stations />,
        children: [
          {
            path: "/stations/",
            element: <List />
          },
          {
            path: "/stations/:stationId",
            element: <Details />
          }
        ]
      }
    ]
  }
];

const router = createBrowserRouter(appRoutes);

export default router;
