import { createBrowserRouter } from "react-router";
import Home from "../Pages/Home";
import MainLayouts from "../Layouts/MainLayouts";
import LoadingSpinner from "../Components/LoadingSpinner";
import AllIssues from "../Pages/AllIssues";
import AuthenticationLayout from "../Layouts/AuthenticationLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Hero from "../Components/Hero";
import PrivateRoute from "./PriveteRoute";
import IssueDetails from "../Pages/IssueDetails";
import AddIssue from "../Pages/AddIssue";
import MyIssues from "../Pages/MyIssues";
import MyContributions from "../Pages/MyContributions";
import NotFound from "../Pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayouts,
    // Component: NotFound,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/all-issues",
        Component: AllIssues,
      },
      {
        path: "/issue/:id",
        element: (
          <PrivateRoute>
            <IssueDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/add-issue",
        element: (
          <PrivateRoute>
            <AddIssue />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-issues",
        element: (
          <PrivateRoute>
            <MyIssues />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-contributions",
        element: (
          <PrivateRoute>
            <MyContributions />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/hero",
    Component: Hero,
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
  // {
  //   path : '*',
  //   Component : NotFound
  // }
]);
