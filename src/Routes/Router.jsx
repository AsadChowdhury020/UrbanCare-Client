import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import MainLayouts from "../Layouts/MainLayouts";
import LoadingSpinner from "../Components/LoadingSpinner";


export const router = createBrowserRouter([
  { path: "/", 
    Component: MainLayouts,
    // Component: LoadingSpinner,
    children : [
        {
            path : '/',
            Component : Home
        }
    ]
  },
]);