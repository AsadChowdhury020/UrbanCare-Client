import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import MainLayouts from "../Layouts/MainLayouts";
import LoadingSpinner from "../Components/LoadingSpinner";
import AllIssues from "../Pages/AllIssues";
import AuthenticationLayout from "../Layouts/AuthenticationLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";


export const router = createBrowserRouter([
  { path: "/", 
    Component: MainLayouts,
    // Component: LoadingSpinner,
    children : [
        {
            path : '/',
            Component : Home
        }, 
        {
          path : '/all-issues',
          Component : AllIssues
        }
    ]
  },
  {
    path: "/auth",
    element: <AuthenticationLayout></AuthenticationLayout>,
    children: [
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
]);