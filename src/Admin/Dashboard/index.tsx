import React, { useState } from 'react'
import './dashboard.scss'

import { FaUser, FaBookmark, FaEye, FaPen } from 'react-icons/fa'; // Example icons

import DashboardCards from './DashboardCards';



const Dashboard = () => {
    // const [isMenuOpen, setIsMenuOpen] = useState(true);

    // const toggleMenu = () => {
    //     setIsMenuOpen(!isMenuOpen);
    // };
    // interface SidebarProps {
    //     isVisible: boolean;
    // }

    const stats = [
        { icon: <FaUser />, value: '1.7k+', description: 'Total Visitor' },
        { icon: <FaBookmark />, value: '03', description: 'Shortlisted' },
        { icon: <FaEye />, value: '2.1k', description: 'Views' },
        { icon: <FaPen />, value: '07', description: 'Applied Job' },
    ];


    return (
        <>
            {/* cards start */}
            <div className="mt-4">
                <h4>Dashboard</h4>
                <div className="row">
                    {stats.map((stat, index) => (
                        <DashboardCards key={index} {...stat} />
                    ))}
                </div>
            </div>
            {/* cards end */}

            <div className="row">
                <div className="col-lg-8 mb-4">
                    <div className="card shadow-sm p-4">
                        <h5 className="mb-3">Job Views</h5>
                        <div className="d-flex align-items-center mb-3">
                            <label htmlFor="jobSelect" className="me-2">Jobs:</label>
                            <select id="jobSelect" className="form-select w-auto">
                                <option>Web & Mobile Prototype Designer</option>
                                <option>Web Developer</option>
                                <option>python Developer</option>
                                <option>React Developer</option>
                            </select>
                        </div>
                        {/* Placeholder for the Chart (use Chart.js here in your actual project) */}
                        <div className="chart-placeholder bg-light p-5">
                            {/* Chart.js integration code goes here */}
                            <p className="text-center">Chart Area</p>
                        </div>
                        <div className="d-flex justify-content-center gap-2 mt-3">
                            <button className="btn btn-outline-secondary">1h</button>
                            <button className="btn btn-success active">Day</button>
                            <button className="btn btn-outline-secondary">Week</button>
                            <button className="btn btn-outline-secondary">Month</button>
                            <button className="btn btn-outline-secondary">Year</button>
                        </div>
                    </div>
                </div>

                {/* Posted Job Section */}
                <div className="col-lg-4">
                    <div className="card shadow-sm p-4">
                        <h5 className="mb-3">Posted Job</h5>
                        <ul className="list-unstyled">
                            {['Fixed-Price', 'Fulltime', 'Part time', 'Freelance', 'Part time', 'Fulltime'].map((job, index) => (
                                <li key={index} className="d-flex justify-content-between align-items-center mb-3">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={`https://via.placeholder.com/40`} // Placeholder image
                                            alt="job-icon"
                                            className="rounded-circle me-3"
                                        />
                                        <div>
                                            <h6 className="mb-0">{job}</h6>
                                            <small className="text-muted">Fulltime · USA, City Name</small>
                                        </div>
                                    </div>
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-link text-muted"
                                            type="button"
                                            id={`dropdownMenuButton${index}`}
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            &#8942;
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby={`dropdownMenuButton${index}`}>
                                            <li>
                                                <a className="dropdown-item" href="#">View Job</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" href="#">Archive</a>
                                            </li>
                                            <li>
                                                <a className="dropdown-item text-danger" href="#">Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard