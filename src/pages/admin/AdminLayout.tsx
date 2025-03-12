import { Outlet } from "react-router"

export const AdminLayout = () => {

    return (

        <div>
            <section>
                <Outlet />
            </section>
            
        </div>
    )
}