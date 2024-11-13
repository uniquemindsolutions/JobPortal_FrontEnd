import React, { useEffect, useState } from 'react'
import './dashboard.scss'
import { FaUser, FaBookmark, FaEye, FaPen } from 'react-icons/fa'; // Example icons
import DashboardCards from './DashboardCards';
import axios from 'axios';
import { error } from 'console';



interface City {
    id: number;
    name: string;
}
export interface PostedJob {
    job_title: string;
    job_type: string;
    location: string;
    map_location: string;
    city: City;
}
interface JobView{
    id:number;
    job_title:string;
}
const Dashboard = () => {
    // const [isMenuOpen, setIsMenuOpen] = useState(true);

    // const toggleMenu = () => {
    //     setIsMenuOpen(!isMenuOpen);
    // };
    // interface SidebarProps {
    //     isVisible: boolean;
    // }
    const [citys, setCitys] = useState<City[]>([]);
    const [stats, setStats] = useState({
        visitorCount: '0',
        views: '0',
        appliedJobs: '0',
        shortlisted: '0' // Adding shortlist count
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('')
    const [postedJobData, setPostedJobData] = useState<PostedJob[]>([]);
    const [jobview, setJobview] = useState<JobView[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch total visitors
                const visitorResponse = await axios.get('https://uniquemindsolutions.com/usmjobportal/totalvistors/');
                // Fetch profile views
                const viewsResponse = await axios.get('https://uniquemindsolutions.com/usmjobportal/profileview/');
                // Fetch applied jobs
                const appliedJobsResponse = await axios.get('https://uniquemindsolutions.com/usmjobportal/appliedjobs/');
                // Fetch shortlisted candidates
                const shortlistedResponse = await axios.get('https://uniquemindsolutions.com/usmjobportal/shortlistedcandidates/');
                const jobviewResponse = await axios.get('https://uniquemindsolutions.com/usmjobportal/jobviews/');

                // Extract the data from the first item in each array
                const visitorCount = visitorResponse.data[0]?.visitor_count || 'Error';
                const views = viewsResponse.data[0]?.profile_view || 'Error';
                const appliedJobs = appliedJobsResponse.data[0]?.appliedjobs_count || 'Error';
                const shortlisted = shortlistedResponse.data[0]?.shortlisted_count || 'Error'; // Handling shortlisted candidates
                // Update the state with all the fetched data
                setStats({
                    visitorCount,
                    views,
                    appliedJobs,
                    shortlisted
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setStats({
                    visitorCount: 'Error loading',
                    views: 'Error loading',
                    appliedJobs: 'Error loading',
                    shortlisted: 'Error loading'
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        

        // posted get api
        axios.get<PostedJob[]>('https://uniquemindsolutions.com/usmjobportal/submitnewjob/')
            .then(response => {
                setPostedJobData(response.data)
            })
            .catch(error => (
                setError(error = 'data fetching fail')
            ))
            
            fetch("https://uniquemindsolutions.com/usmjobportal/cities/")
            .then(response => response.json())
            .then(data => {
                console.log("Cities:", data); // Log to check the data
                setCitys(data); // Store the cities in state
            })
            fetch("https://uniquemindsolutions.com/usmjobportal/jobviews/")
            .then(response => response.json())
            .then(data => {
                console.log("JobViews:", data); // Log to check the data
                setJobview(data); // Store the cities in state
            })
            .catch(error => console.error('Error fetching jobview:', error));
            // myJobsDetails();
    }, []);

    const getCityNameById = (id: number): string => {
        const city = citys.find((city: City) => city.id === id); // Ensure the type is specified
        return city ? city.name : "Unknown City"; // Return the city name or a default value
    };



    const statItems = [
        { icon: <FaUser />, value: stats.visitorCount, description: 'Total Visitor' },
        { icon: <FaBookmark />, value: stats.shortlisted, description: 'Shortlisted' },
        { icon: <FaEye />, value: stats.views, description: 'Views' },
        { icon: <FaPen />, value: stats.appliedJobs, description: 'Applied Job' },
    ];



    return (
        <>
            {/* cards start */}
            <div className="mt-4">
                <h4>Dashboard</h4>
                <div className="row">
                    {statItems.map((stat, index) => (
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
                                <option value="">Select Industry </option>
                                
                                {/* <option>Web & Mobile Prototype Designer</option>
                                <option>Web Developer</option>
                                <option>python Developer</option>
                                <option>React Developer</option> */}
                                {jobview.map((jobview) => {
                                    return <option key={jobview.id} value={jobview.id}>{jobview.job_title}</option>
                                })}
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
                        <ul className="list-unstyled border-top">
                            {postedJobData.map((item:any, index) => (
                                <li key={index} className="d-flex justify-content-between align-items-center my-3">
                                    <div>
                                        <h6 className="mb-0 text-primary">{item.job_title}</h6>
                                        <small className="text-muted"><span>{item.job_type}</span>, <span>{getCityNameById(item.city)}</span></small>
                                    </div>
                                    {/* <div className="dropdown">
                                        <button className="btn btn-link text-muted"
                                            type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <a className="dropdown-item" href="#">View Job</a>
                                            </li>
                                             <li>
                                                <a className="dropdown-item text-danger" href="#">Delete</a>
                                            </li>
                                        </ul>
                                    </div> */}
                                </li>
                            ))

                            }
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard