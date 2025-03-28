import { Outlet, useLocation } from "react-router"
import { Navbar } from "../components/Navbar"
import "../styles/global.css"
import "../styles/layout.css"
import { AdminNavbar } from "../components/AdminNavbar"
import { Footer } from "../components/Footer"

export const Layout = () => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");

    return (

        <>
        <header>{isAdmin ? <AdminNavbar /> : <Navbar />}</header>
        <main><Outlet/></main>
        <footer><Footer/></footer>
        </>
    )
}