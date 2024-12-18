import React, { useState } from 'react'
import { ListGroup, Button } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';

const UserList = ({ users, onSelectUser }: any) => {
    return (
        <div className="list-group">
            {users && users.map((user: any) => (
                <button
                    key={user.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => onSelectUser(user)}>
                    <div className="d-flex">
                        <img src={user.profilePic} alt={user.name} className="user-img" />
                        <div>
                            <h6 className='lt-blue-c'>{user.name}</h6>
                            <p><small><i className="bi bi-briefcase text-secondary"></i> {user.role}, <i className="bi bi-geo-alt text-secondary"></i> {user.location}</small></p>
                        </div>
                    </div>
                </button>
            ))}
        </div>
    );
};

export default UserList