import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import './JobSeekerAdmin.scss'

const JobSeekerAdmin = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <main>
            <div className="d-flex" id="wrapper">
                {/* Sidebar */}
                <nav id="sidebar" className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                    <div className="sidebar-header">
                        <h4 className="text-white p-3">Admin Panel</h4>
                        <div className="close-icon d-md-none" onClick={toggleSidebar}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                    <ul className="list-unstyled components">
                        <li>
                            <Link to="seeker-dashboard" className="text-white">
                                <i className="fas fa-home me-2"></i> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className="text-white">
                                <i className="fas fa-user me-2"></i> Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/saved-jobs" className="text-white">
                                <i className="fas fa-cog me-2"></i> Applied Jobs
                            </Link>
                        </li>
                        <li>
                            <Link to="/settings" className="text-white">
                                <i className="fas fa-cog me-2"></i> Change Password
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Main content */}
                <div id="page-content-wrapper" className="w-100">
                    <div className="bg-light sticky-top container-fluid">
                        <div className="row">
                            <div className="col-lg-5 col-sm-12">
                                <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 px-4">
                                    <button className="btn btn-primary d-md-none ms-auto" onClick={toggleSidebar}>
                                        <i className="bi bi-list"></i>
                                    </button>
                                    <div className="header-links">
                                        <a href="#">Jobs</a>
                                        <a href="#">Boost</a>
                                        <a href="#">Prep</a>
                                        <a href="#">Learn</a>
                                        <a href="#">Career Advice</a>
                                        <a href="#">Career Fair</a>
                                    </div>
                                </nav>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="from-grou">
                                    <input type="text" className='form-control mt-2' placeholder='Search' />
                                </div>
                            </div>
                            <div className="col-lg-4 col-sm-6 text-end">
                                <span className="dropdown">
                                    <button type="button" className="btn " data-bs-toggle="dropdown"
                                        style={{ background: 'transparent', border: 'none' }}>
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
                                <span className="dropdown">
                                    <button type="button" className="btn" data-bs-toggle="dropdown"
                                        style={{ background: 'transparent', border: 'none', width: '120px' }}>
                                        My Account
                                    </button>
                                    <ul className="dropdown-menu border-0 shadow dropdown-menu-end">
                                         <li>
                                            <a href="#" className="dropdown-item">
                                                Profile
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

                    {/* Main Dashboard Content */}
                    <div className="container-fluid px-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default JobSeekerAdmin