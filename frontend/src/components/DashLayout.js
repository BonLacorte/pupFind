import { Outlet } from 'react-router-dom'
import DashHeader from './DashHeader'
import DashFooter from './DashFooter'
import DashHeader1 from './DashHeader1'

const DashLayout = () => {
    return (
        <>
            <DashHeader1 />
            <div className="dash-container">
                <Outlet />
            </div>
            {/* <DashFooter /> */}
        </>
    )
}
export default DashLayout