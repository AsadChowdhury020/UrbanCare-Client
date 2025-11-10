import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import MainLayouts from "../Layouts/MainLayouts";


export const router = createBrowserRouter([
  { path: "/", 
    Component: MainLayouts,
    children : [
        {
            path : '/',
            Component : Home
        }
    ]
  },
]);