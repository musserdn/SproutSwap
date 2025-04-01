import { Outlet, useLocation } from 'react-router-dom'; // Import useLocation
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const location = useLocation(); // Get the current route
  const hideNavbarRoutes = ['/login', '/create-account']; // Define routes where the navbar should be hidden

  return (
    <>
      <Header />
      {/* Only show Navbar if the current path is NOT in the hideNavbarRoutes array */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
