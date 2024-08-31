import React from 'react'
import './Users.css'
import User from './User.jsx'
import { useSelector } from 'react-redux'

function Userslist() {

    const users = useSelector((state) => state.usersreducer)
    
    return (
        <div className='user-list-container'>
            {users.map((user) => (
                <User user={user} key={user?._id} />
            ))}
        </div>
    )
}

export default Userslist