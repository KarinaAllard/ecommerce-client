import { useState } from "react"
import { FaShoppingCart, FaTimes, FaBars } from "../icons"
import { NavLink } from "react-router"

export const Navbar = () => {
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
                    <NavLink to={"/"} onClick={() => setMenuOpen(false)}>Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/products"} onClick={() => setMenuOpen(false)}>Shop</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={"/admin/manage-products"} onClick={() => setMenuOpen(false)}>Admin</NavLink>
                </li>    
            </ul>
            <div className="cart-icon">
                <NavLink to={"/cart"}>
                    <FaShoppingCart/>
                </NavLink>
            </div>
        </div>
    )
}