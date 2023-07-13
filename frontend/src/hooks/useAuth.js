import { useSelector } from 'react-redux'
// import { selectCurrentToken } from "../features/auth/authSlice"
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const token = useSelector(selectCurrentToken)
    let isAdmin = false
    let isEmployee = false
    let status = "Customer"

    if (token) {
        const decoded = jwtDecode(token)
        const { id, firstname, lastname, email, roles } = decoded.UserInfo

        isEmployee = roles.includes('Employee')
        isAdmin = roles.includes('Admin')

        if (isEmployee) status = "Employee"
        if (isAdmin) status = "Admin"

        return { id, firstname, lastname, email, roles, status, isEmployee, isAdmin }
    }

    return { id: '', firstname: '', lastname: '', email: '', roles: [], isEmployee, isAdmin, status }
}
export default useAuth