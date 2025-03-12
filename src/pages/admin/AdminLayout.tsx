import { Outlet } from "react-router"
import "/src/styles/adminlayout.css"

export const AdminLayout = () => {

    return (

        <div>
            <section>
                <Outlet />
            </section>
            
        </div>
    )
}