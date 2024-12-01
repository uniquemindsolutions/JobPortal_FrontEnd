import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom';
import './JobSeekerAdmin.scss'
import axios from 'axios';

interface City {
    id: number;
    name: string;
}

const JobSeekerAdmin = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeLink, setActiveLink] = useState<string>('');
    const [cities, setCities] = useState<City[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [jobTitle, setJobTitle] = useState<any>("N/A");
    const [companyName, setCompanyName] = useState<string>("N/A");
    const [totalExp, setTotalExp] = useState<string>("N/A");
    const [preview, setPreview] = useState<string | null>(null);
    const [getUserprofile, setGetUserprofile] = useState<any>([]);
    const [currentLocan, setCurrentLocan] = useState<City[]>([])

    useEffect(() => {
        GetUserProfile();
        // GetUserExp();
        currentLocation();
        fetchCities();
        GetFunctionalArea();
    }, [])

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLinkActive = (link: string) => {
        setActiveLink(link)
    }
    const GetUserProfile = async () => {
        setLoading(true)
        try {
            const res_userDetls = await axios.get('http://127.0.0.1:8000/user/Userprofile/1/');
            const userDetailData = res_userDetls.data;
            setGetUserprofile(userDetailData);
            setPreview(userDetailData.profile_photo);

            // if (Array.isArray(getUserprofile)) {
            //     const updatedJobPrefence = getUserprofile.map(user =>
            //         user.id === userDetailData.id ? userDetailData : user
            //     );
            //     setGetUserprofile(getUserprofile)
            // }
        } catch (error) {
            setError("Erro: User Profile data not found")
        }
    }

    // const GetUserExp = async () => {
    //     try {
    //         const res_userExp = await axios.get('http://127.0.0.1:8000/user/Workexperience/');
    //         const userExp_data = res_userExp.data;
    //         setJobTitle(userExp_data[0].current_job_title)
    //         setCompanyName(userExp_data[0].company_name)
    //         setTotalExp(userExp_data[0].end_date)
    //     } catch (error) {
    //         setError("Erro: User Profile data not found")
    //     }
    // }

    const fetchCities = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/user/Cities/');
            setCities(response.data);  // Set the fetched users to state
        } catch (err) {
            setError('Failed to fetch Cities');
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    const currentLocation = async () => {
        try {
            const curLoc = await axios.get("http://127.0.0.1:8000/user/Userprofile/");
            const currLocData = curLoc.data;
            setCurrentLocan(currLocData)

        } catch (error) {
            setError("Erro: User Profile data not found")
        }
    }

    const currLocations = (id: number | null | undefined) => {
        if (!id || !Array.isArray(cities)) return "Unknown"; // Handle cases where id is invalid or cities is not an array

        const city = cities.find((c) => c.id === id); // Find the city by id
        return city ? city.name : "Unknown"; // Return the city name if found, otherwise return "Unknown"
    };

    const GetFunctionalArea = async () => {
        try {
            const res_funcArea = await axios.get('http://127.0.0.1:8000/user/PreferredJobTitle/')
            const funcAreaData = res_funcArea.data;
            setJobTitle(funcAreaData)
        } catch (error) {
            setError('Error: Job titles not found')
        }
    }

    const jobTitleList = (id: any) => {
        if (!id || !Array.isArray(jobTitle)) return
        const jobTitles = jobTitle.find((job: any) => job.id === id);
        return jobTitles ? jobTitles.preferredjobtitle : ''
    }

    return (
        <main>
            <div className="d-flex" id="wrapper">
                {/* Sidebar */}
                <nav id="sidebar" className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                    <div className="sidebar-header">
                        <div className="close-icon d-md-none" onClick={toggleSidebar}>
                            <i className="fas fa-times"></i>
                        </div>

                        {/* profile detais start */}
                        <div className="card dashb-profile-card">
                            <div className="card-header text-center">
                                <Link to={'profile'}> <i className="bi bi-pencil text-white" style={{ position: 'absolute', right: '10px' }}></i></Link>
                                <div className="profile-image">
                                    {/* <img
                                        src="https://via.placeholder.com/80" // Profile picture placeholder
                                        alt="Profile"
                                        className="rounded-circle"
                                    /> */}
                                    {preview ? <img className='profile-pic' src={getUserprofile.profile_photo} alt="Profile pic" /> :
                                        <img className='profile-pic' src={window.location.origin + '/images/avtar-pic.avif'} alt="Profile pic" />
                                    }
                                </div>

                                <h5 className="profile-name mt-2">{getUserprofile.first_name} {getUserprofile.last_name}</h5>
                                <p className="profile-title mb-2"> {jobTitleList(getUserprofile.functional_area)}</p>
                                <p className="profile-location">
                                    <i className="bi bi-geo-alt"></i> {currLocations(getUserprofile?.current_location)}
                                </p>
                            </div>
                            <div className="card-body">
                                <div className='mb-2'><i className="bi bi-building"></i> {getUserprofile.current_company_name}</div>
                                <div className='mb-2'><i className="bi bi-briefcase"></i> Exp: {getUserprofile.total_experience} Years, {getUserprofile.total_months}</div>
                                <div className='mb-2'><i className="bi bi-telephone"></i> {getUserprofile.phone_number} </div>
                                <div className='mb-2'><i className="bi bi-envelope"></i> {getUserprofile.email}</div>

                                {/* <div className="profile-completion mt-4">
                                    <h6>100% Profile Complete</h6>
                                    <p className="text-muted">Well done! Make sure to keep your information updated.</p>
                                    <div className="progress">
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: "100%" }}
                                            aria-valuenow={100}
                                            aria-valuemin={0}
                                            aria-valuemax={100}
                                        >
                                            100%
                                        </div>
                                    </div>
                                </div> */}

                                {/* <div className="profile-updated mt-3 text-center">
                                    <small className="text-muted">Updated on: 7 October 2024</small>
                                </div> */}
                            </div>
                        </div>
                        {/* profile detais end */}
                    </div>


                    <ul className="list-unstyled components">
                        <li>
                            <Link to="seeker-dashboard" className={`menuLink ${activeLink === 'seeker-dashboard' ? 'active' : ''}`} onClick={() => handleLinkActive('seeker-dashboard')}>
                                <i className="bi bi-speedometer2 me-2"></i> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/applied-jobs" className={`menuLink ${activeLink === 'applied-jobs' ? 'active' : ''}`} onClick={() => handleLinkActive('applied-jobs')}>
                                <i className="bi bi-calendar2-check me-2"></i> Applied Jobs
                            </Link>
                        </li>
                        <li>
                            <Link to="saved-jobs" className={`menuLink ${activeLink === 'saved-jobs' ? 'active' : ''}`} onClick={() => handleLinkActive('saved-jobs')}>
                                <i className="bi bi-save me-2"></i> Saved Jobs
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className={`menuLink ${activeLink === '' ? 'active' : ''}`} onClick={() => handleLinkActive('')}>
                                <i className="bi bi-person-lines-fill me-2"></i> My Interviews
                            </Link>
                        </li>

                    </ul>
                </nav>

                {/* Main content */}
                <div id="page-content-wrapper">
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

                            <div className="col-lg-4 col-sm-6 text-center">
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
                                    <button type="button" className="ms-4 btn btn-outline-primary dropdown-toggle" data-bs-toggle="dropdown">
                                        My Account
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li><Link to='profile' className="dropdown-item">Profile</Link></li>
                                        <li><a className="dropdown-item" href="#">Recruiter View</a></li>
                                        <li><Link to='settings' className="dropdown-item">Settings</Link></li>
                                        <li><Link to='change-password' className="dropdown-item">Change Password</Link></li>
                                        <li><a className="dropdown-item" href="#">Logout</a></li>
                                    </ul>
                                </span>

                            </div>
                        </div>
                    </div>

                    {/* Main Dashboard Content */}
                    <div className="container-fluid px-4 xs-px-1">
                        <Outlet />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default JobSeekerAdmin