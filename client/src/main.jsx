import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Logout from './pages/Logout.jsx';
import BlogCilantro from './pages/BlogCilantro.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import FriendsResults from './pages/FriendsResults.jsx';
import IndoorPlants from './pages/IndoorPlants.jsx';
import NonEdible from './pages/nonEdible.jsx';
import Edible from './pages/Edible.jsx';
import OutdoorPlants from './pages/OutdoorPlants.jsx';
import Rose1 from './pages/Rose1.jsx';
import SearchBlogs from './pages/SearchBlogs.jsx';
import SearchFriends from './pages/SearchFriends.jsx';
import UserProfile from './pages/UserProfile.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login', 
        element: <Login />,
      },
      {
        path: 'BlogCilantro',
        element: <BlogCilantro />,
      },
      {
        path: 'CreateAccount',
        element: <CreateAccount />,
      },
      {
        path: 'FriendsResults',
        element: <FriendsResults />,
      },
      {
        path: 'IndoorPlants',
        element: <IndoorPlants />,
      },
      {
        path: 'NonEdible',
        element: <NonEdible />,
      },
      {
        path: 'Edible',
        element: <Edible />,
      },
      {
        path: 'OutdoorPlants',
        element: <OutdoorPlants />,
      },
      {
        path: 'Rose1',
        element: <Rose1 />,
      },
      {
        path: 'searchblogs',
        element: <SearchBlogs />,
      },
      {
        path: 'searchfriends',
        element: <SearchFriends />,
      },
      {
        path: 'UserProfile',
        element: <UserProfile />,
      },
      {
        path: 'logout',
        element: <Logout />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
