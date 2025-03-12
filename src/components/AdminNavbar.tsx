import { NavLink } from "react-router"

export const AdminNavbar = () => {

    return (

        <div className="nav-div">
            <ul className="nav-bar">
                <li className="nav-item"><NavLink to={"admin/manage-orders"}>Orders</NavLink></li>
                <li className="nav-item"><NavLink to={"admin/manage-customers"}>Customers</NavLink></li>
                <li className="nav-item"><NavLink to={"admin/manage-products"}>Products</NavLink></li>
                <li className="nav-item"><NavLink to={"/products"}>Exit Admin</NavLink></li>
            </ul>
        </div>
    )
}