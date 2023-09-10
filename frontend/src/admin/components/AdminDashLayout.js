import { Outlet } from 'react-router-dom'
import AdminDashHeader from './AdminDashHeader'
import AdminDashFooter from './AdminDashFooter'
import AdminDashSidebar from './AdminDashSidebar'

const AdminDashLayout = () => {
    return (
        <>
            
            <div className="mx-auto w-full h-full flex flex-row">
                <AdminDashSidebar/>
                <Outlet />
            </div>
            {/* <AdminDashFooter /> */}
        </>
    )
}
export default AdminDashLayout