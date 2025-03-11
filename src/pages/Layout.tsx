import { Outlet } from "react-router"
import { Navbar } from "../components/Navbar"
import "../styles/global.css"
import "../styles/layout.css"

export const Layout = () => {

    return (

        <>
        <header><Navbar /></header>
        <main><Outlet/></main>
        
        </>
    )
}