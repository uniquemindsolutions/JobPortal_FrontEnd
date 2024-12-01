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
interface JobView {
    id: number;
    job_title: string;
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
                const visitorResponse = await axios.get('http://127.0.0.1:8000/totalvistors/');
                // Fetch profile views
                const viewsResponse = await axios.get('http://127.0.0.1:8000/profileview/');
                // Fetch applied jobs
                const appliedJobsResponse = await axios.get('http://127.0.0.1:8000/appliedjobs/');
                // Fetch shortlisted candidates
                const shortlistedResponse = await axios.get('http://127.0.0.1:8000/shortlistedcandidates/');
                const jobviewResponse = await axios.get('http://127.0.0.1:8000/jobviews/');

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
        axios.get<PostedJob[]>('http://127.0.0.1:8000/submitnewjob/')
            .then(response => {
                setPostedJobData(response.data)
            })
            .catch(error => (
                setError(error = 'data fetching fail')
            ))

        fetch("http://127.0.0.1:8000/cities/")
            .then(response => response.json())
            .then(data => {
                console.log("Cities:", data); // Log to check the data
                setCitys(data); // Store the cities in state
            })
        fetch("http://127.0.0.1:8000/jobviews/")
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

    // days ago script start
    function timeAgo(dateString: string): string {
        const date: Date = new Date(dateString); // Explicitly declare as Date
        const now: Date = new Date(); // Explicitly declare as Date
        const secondsAgo: number = Math.floor((now.getTime() - date.getTime()) / 1000); // Use getTime()

        if (secondsAgo < 60) {
            return "just now";
        } else if (secondsAgo < 3600) {
            const minutes = Math.floor(secondsAgo / 60);
            return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
        } else if (secondsAgo < 86400) {
            const hours = Math.floor(secondsAgo / 3600);
            return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        } else if (secondsAgo < 604800) {
            const days = Math.floor(secondsAgo / 86400);
            return `${days} day${days > 1 ? "s" : ""} ago`;
        } else if (secondsAgo < 2592000) {
            const weeks = Math.floor(secondsAgo / 604800);
            return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
        } else if (secondsAgo < 31536000) {
            const months = Math.floor(secondsAgo / 2592000);
            return `${months} month${months > 1 ? "s" : ""} ago`;
        } else {
            const years = Math.floor(secondsAgo / 31536000);
            return `${years} year${years > 1 ? "s" : ""} ago`;
        }
    }

    const dates = [
        "2024-11-18T10:30:00",
        "2024-10-20T14:00:00",
        "2023-11-18T08:15:00",
    ];

    dates.forEach((date) => {
        console.log(`${date} -> ${timeAgo(date)}`);
    });
    // days ago script end

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
                            {postedJobData.sort((a: any, b: any) => {
                                if (a.job_title > b.job_title) return -1;
                                if (a.job_title < b.job_title) return 1;
                                return 0;
                            }).map((item: any, index) => (
                                <li key={index} className="d-flex justify-content-between align-items-center my-3">
                                    <div>
                                        <h6 className="mb-0 text-primary">{item.job_title}</h6>
                                        <small className="text-muted"><span>{timeAgo(item.created_date.split('T')[0])}, {item.job_type}</span>, <span>{getCityNameById(item.city)}</span></small>
                                    </div>
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