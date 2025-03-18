import { Link, NavLink } from "react-router"

export const Navbar = () => {

    return (

        <div className="nav-div">
            <ul className="nav-bar">
                <li className="nav-item"><NavLink to={"/"}>Home</NavLink></li>
                <li className="nav-item"><NavLink to={"/products"}>Shop</NavLink></li>
                <li className="nav-item"><NavLink to={"/admin/manage-products"}>Admin</NavLink></li>
                <li className="nav-item"><NavLink to={"/cart"}>To Cart</NavLink></li>
            </ul>
        </div>
    )
}