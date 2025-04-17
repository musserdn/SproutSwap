import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import BlogCilantro from "./pages/BlogCilantro.jsx";
import CreateAccount from "./pages/CreateAccount.jsx";
import FriendsResults from "./pages/FriendsResults.jsx";
import SearchPlants from "./pages/SearchPlants.jsx";
import PlantDetails from "./pages/PlantDetails.jsx";
import SearchBlogs from "./pages/SearchBlogs.jsx";
import SearchFriends from "./pages/SearchFriends.jsx";
import UserProfile from "./pages/UserProfile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "BlogCilantro",
        element: (
          <ProtectedRoute>
            <BlogCilantro />
          </ProtectedRoute>
        ),
      },
      {
        path: "CreateAccount",
        element: <CreateAccount />,
      },
      {
        path: "FriendsResults",
        element: (
          <ProtectedRoute>
            <FriendsResults />
          </ProtectedRoute>
        ),
      },
      {
        path: "SearchPlants",
        element: (
          <ProtectedRoute>
            <SearchPlants />
          </ProtectedRoute>
        ),
      },
      {
        path: "PlantDetails/:plantId",
        element: (
          <ProtectedRoute>
            <PlantDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "searchblogs",
        element: (
          <ProtectedRoute>
            <SearchBlogs />
          </ProtectedRoute>
        ),
      },
      {
        path: "searchfriends",
        element: (
          <ProtectedRoute>
            <SearchFriends />
          </ProtectedRoute>
        ),
      },
      {
        path: "UserProfile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
