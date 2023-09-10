import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const UserBadgeItem = ({ user, handleFunction, admin }) => {
    return (
        <div className="inline-flex items-center px-2 py-2 rounded-lg mx-1 my-2 bg-purple-500 text-white text-xs cursor-pointer space-x-1">
            <span>{user.name}</span>
            {admin === user._id && <span className="ml-1">(Admin)</span>}
            <FontAwesomeIcon icon={faCircleXmark} onClick={handleFunction}/>
        </div>
    )
}

export default UserBadgeItem