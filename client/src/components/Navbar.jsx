import { isLoggedIn } from "../utils/auth";

const Navbar = () => {

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li><a href="myGarden" className="navbar-link">My Garden</a></li>
                <li><a href="searchfriends" className="navbar-link">Friends</a></li>
                <li><a href="searchblogs" className="navbar-link">Search</a></li>
                <li>
                  <a href={`${isLoggedIn()? "logout": "login"}`} className="navbar-link">
                    {isLoggedIn()? "Logout": "Login"}
                  </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;