import { useState } from "react";
import { NavLink } from "react-router"
import { FaBars, FaTimes } from "../icons";

export const AdminNavbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    
        const toggleMenu = () => {
            setMenuOpen((isOpen) => !isOpen);
        };

    return (

        <div className="nav-div">
             <div className="menu-icon" onClick={toggleMenu}>
                            {menuOpen ? <FaTimes /> : <FaBars />}
                        </div>
            <ul className={`nav-bar ${menuOpen ? "open" : ""}`}>
                <li className="nav-item">
                    <NavLink to={"admin/manage-orders"} onClick={() => setMenuOpen(false)}>Orders</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"admin/manage-customers"} onClick={() => setMenuOpen(false)}>Customers</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"admin/manage-products"} onClick={() => setMenuOpen(false)}>Products</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/products"} onClick={() => setMenuOpen(false)}>Exit Admin</NavLink>
                </li>
            </ul>
        </div>
    )
}