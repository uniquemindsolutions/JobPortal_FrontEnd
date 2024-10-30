import React, { useState } from 'react'
import './admin.scss'
import SideMenu from './SideMenu'
import Dashboard from './Dashboard'
import { Outlet, Link } from 'react-router-dom'



const Admin = () => {
    const [showNotifications, setShowNotifications] = useState(false);

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    return (
        <>
            <div className="admin-container">
                <div className="sidebar">
                    <SideMenu />
                </div>

                <div className="w-100 px-3">
                    <header className="dash-head sticky-top shadow-sm p-3">
                        {/* Search Bar */}
                        <div className="row">
                            <div className="col-md-6">
                                <div className="search-bar">
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Search here..."
                                        style={{ borderRadius: '30px', padding: '0.5rem 1rem', width: '300px' }}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="text-end">
                                    <span className="dropdown">
                                        <button type="button" className="btn position-relative " data-bs-toggle="dropdown"
                                            style={{ background: 'transparent', border: 'none' }}
                                        >
                                            <i className="bi bi-bell" style={{ fontSize: '1.5rem' }}></i>
                                            <span className="position-absolute mt-1 top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle"
                                                style={{ fontSize: '10px' }}
                                            ></span>
                                        </button>
                                        <ul className="dropdown-menu border-0 shadow" style={{ width: '300px' }}>
                                            <h6 className='px-3 mt-2 text-danger'>Notification</h6>
                                            <hr className='mb-0' />
                                            <li>
                                                <a href="#" className="dropdown-item">
                                                    <div className=" mt-1">
                                                        <div className='text-primary'>You have 3 new messages</div>
                                                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>3 hours ago</div>
                                                    </div>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="dropdown-item">
                                                    <div className="mt-1">
                                                        <div className='text-primary'>You have 5 new tasks</div>
                                                        <div className="text-muted" style={{ fontSize: '0.8rem' }}>5 hours ago</div>
                                                    </div>
                                                </a>
                                            </li>

                                        </ul>
                                    </span>

                                    <Link to="submit-job" className="btn btn-lg btn-outline-primary ms-4 me-5"
                                        style={{ borderRadius: '30px', padding: '0.5rem 1.5rem' }} >
                                        Post a Job
                                    </Link>
                                    <span className="dropdown">
                                        <button type="button" className="btn" data-bs-toggle="dropdown"
                                            style={{ background: 'transparent', border: 'none' }}
                                        >
                                            <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>

                                        </button>
                                        <ul className="dropdown-menu border-0 shadow" style={{transform: `'translate(16px, 40px)!important'`}}>
                                            <li>
                                                <a href="#" className="dropdown-item">
                                                    Profile
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="dropdown-item">
                                                    Settings
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" className="dropdown-item">
                                                    Logout
                                                </a>
                                            </li>

                                        </ul>
                                    </span>
                                </div>
                            </div>
                        </div>


                        {/* Notification Icon */}

                    </header>
                    <div className="">
                        {/* Navbar */}
                        {/* <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <button className="btn btn-outline-primary" onClick={toggleSidebar}>
                                {isSidebarVisible ? 'Hide Menu' : 'Show Menu'}
                            </button>
                        </nav> */}

                        {/* Page Content */}

                        <Outlet /> {/* Outlet renders the matching route component */}

                    </div>
                </div>

            </div>
        </>
    )
}

export default Admin