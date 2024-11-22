import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const UserDetails = ({ user }: any) => {
    if (!user) {
        return <div className="p-4">Select a user to see details</div>;
    }

    return (
        <main>
            <div className="user-details p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className='d-flex'>
                        <img src={user.profilePic} alt={user.name} className="user-img me-3" />
                        <span>
                            <h4>{user.name}</h4>
                            <div>{user.role}  {user.appliedFrom}</div>
                            <p className='mb-0 text-secondary'><span>Applied 5 days ago</span>,  <span>Hyderabad</span></p>
                        </span>
                    </div>
                    <div>
                        <button className="save-btn me-2">Interview</button>
                        <button className="update-btn">Reject</button>
                    </div>
                </div>

                <div className="user-info">
                     <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" data-bs-toggle="tab" href="#GeneralInformation">General Information</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#Activies">Activies</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#Contacts">Contacts</a>
                        </li>
                    </ul>
                    
                    <div className="tab-content  mt-4">
                        <div className="tab-pane container active" id="GeneralInformation">
                            <ul>
                                <li>Tags: <span>UI UX, Design</span></li>
                                <li>Email: <span>{user.email}</span></li>
                                <li>Phone: <span>{user.phone}</span></li>
                                <li>Source: <span>{user.source}</span></li>
                            </ul>
                        </div>
                        <div className="tab-pane container fade" id="Activies">Activies</div>
                        <div className="tab-pane container fade" id="Contacts">Contacts</div>
                    </div>




                </div>
            </div>
        </main>
    );
};

export default UserDetails;
