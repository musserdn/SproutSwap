const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li><a href="#myGarden" className="navbar-link">My Garden</a></li>
                <li><a href="#friends" className="navbar-link">Friends</a></li>
                <li><a href="#search" className="navbar-link">Search</a></li>
                <li><a href="#logout" className="navbar-link">Logout</a></li>
            </ul>
        </nav>
    );
};

export default Navbar;