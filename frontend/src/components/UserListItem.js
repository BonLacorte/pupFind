import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../features/chat/userApiSlice'

const UserListItem = ({ user, handleFunction }) => {

    // const user = useSelector(state => selectUserById(state, userId))

    const consoleLogs = () => {
        console.log(user)
        // console.log(userId)
    }

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
        }
        return text;
    };

    return (
        <>
            <ul className="mt-4 border">
                <li className="flex items-center hover:bg-gray-100" onClick={handleFunction}>
                    <img src={user.pic} alt="User Avatar" className="rounded-full h-8 w-8 mr-2" />
                    <div>
                    <p className="font-bold">{truncateText(user.name, 15)}</p>
                    <p className="text-gray-500">{truncateText(user.email, 20)}</p>
                    </div>
                </li>
            </ul>
            {/* <div className="flex items-center mb-2">
                <button onClick={consoleLogs}>Press</button>
                <div>HELLOOOOOOOO</div>
            </div> */}
        </>
    )
}

export default UserListItem