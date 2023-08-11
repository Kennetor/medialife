import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
// CSS
import "./index.css";
// Routes
import Dashboard from "./Dashboard.jsx";
import Movies from "./pages/Movies";
import Tv from "./pages/Tv";
import DetailedView from "./components/DetailedView";

const router = createHashRouter([
  {
    path: "/",
    element: <Dashboard />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/movies",
    element: <Movies />,
  },
  {
    path: "/tv",
    element: <Tv />,
  },
  {
    path: "/:mediaType/:mediaId",
    element: <DetailedView />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
