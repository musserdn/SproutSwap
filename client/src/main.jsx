import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import BlogCilantro from './pages/BlogCilantro.jsx';
import CreateAccount from './pages/CreateAccount.jsx';
import FriendsResults from './pages/FriendsResults.jsx';
import IndoorPlants from './pages/IndoorPlants.jsx';
import MyFlowers from './pages/MyFlowers.jsx';
import MyVegetables from './pages/MyVegetables.jsx';
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
        path: 'MyFlowers',
        element: <MyFlowers />,
      },
      {
        path: 'MyVegetables',
        element: <MyVegetables />,
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
        path: 'SearchBlogs',
        element: <SearchBlogs />,
      },
      {
        path: 'SearchFriends',
        element: <SearchFriends />,
      },
      {
        path: 'UserProfile',
        element: <UserProfile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
