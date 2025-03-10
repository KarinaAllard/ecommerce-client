import { NavLink } from "react-router"

export const Navbar = () => {

    return (

        <div className="nav-div">
            <ul className="nav-bar">
                <li className="nav-item"><NavLink to={"/"}>Home</NavLink></li>
                <li className="nav-item"><NavLink to={"/products"}>Shop</NavLink></li>
                <li className="nav-item"><NavLink to={"/admin"}>Admin</NavLink></li>
            </ul>
        </div>
    )
}