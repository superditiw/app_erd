import "../styles/Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div className="navbar">

            <div className="nav-left">
                <img src="/8.png" alt="logo" className="nav-logo" />
            </div>

            <div className="nav-menu">
                <NavLink to="/items" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}> ITEMS </NavLink>
                <NavLink to="/report" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}> REPORTS </NavLink>
            </div>

            <div className="nav-right">
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>

        </div>
    );
}

export default Navbar;