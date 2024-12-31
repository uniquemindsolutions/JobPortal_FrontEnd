import React, { useEffect, useState } from 'react'
import './ViewJobDetails.scss'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
// interface viewJobsData {
//     job_title: string;
//     company_logo: any;
//     id:number,
// }

// interface viewJobsData {
//     id: number,
//     job_title: string;
//     company_logo: string;
//     company_name: string;
//     min_experience: number;
//     max_experience: number;
//     min_salary: number;
//     max_salary: number;
//     city_location: number;
//     created_date: string;
//     number_of_positions: number;
//     job_description: string;
//     about_company: string;
// }

interface City {
    id: number,
    name: string,
}

const ViewJobDetails = ({ viewJobDataProp, onclickViewJobDetls }: any) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')
    const [viewJobsData, setViewJobsData] = useState<any>([])
    const [citys, setCitys] = useState<City[]>([])
    const { jobId } = useParams();
    const [company, setCompany] = useState<any>([])
    const [viewJobData, setViewJobData] = useState<any>([])


    useEffect(() => {
        const getMethodViewJobDetail = async () => {
            setLoading(true);
            try {
                const res_viewJobDetails = await axios.get(`http://127.0.0.1:8000/submitnewjob/${jobId}/`);
                const viewJobDetails_data = res_viewJobDetails.data;
                console.log("Job Details Response:", viewJobDetails_data);
                setViewJobsData(viewJobDetails_data);
                setCompany(viewJobDetails_data)
            } catch (error) {
                console.error("Error fetching job details:", error);
                setError("No data found");
            } finally {
                setLoading(false);
            }
        };
        getMethodViewJobDetail();
        getCitysApi();
    }, [jobId])


    if (!viewJobsData) {
        debugger
        return <p>Loading job details...</p>;
    }



    // const location = useLocation();
    // const navigate = useNavigate();
    // const job = location.state?.job;

    // console.log("jobs alert === ",job)
    // if (!job) {
    //     return <p>No job details found. <button onClick={() => navigate(-1)}>Go Back</button></p>;
    //   }

    const getCitysApi = async () => {
        try {
            const citys = await axios.get("http://127.0.0.1:8000/cities/");
            const res_citys = citys.data;
            console.log("Cities Response:", res_citys);
            setCitys(res_citys);
        } catch (error) {
            console.error("Error fetching cities:", error);
            setError("Error: Cities are not found");
        }
    };

    const getCityNameById = (id: any) => {
        console.log("City ID:", id);
        const city = citys.find((city) => city.id === id);
        return city ? city.name : "Unknown City";
    };
    
    return (
        <main>
            <div className="row mt-4">
                <div className="col-lg-8">
                    <h4 className=' mb-3'>View Job Details </h4>

                    {viewJobsData ? (
                        <div>
                            <div className="card job-card p-3">
                                <div className="row">
                                    <div className="col-md-2 text-end">
                                        <div className="company-logo">
                                            <a href="#">
                                                <img
                                                    className="img-fluid"
                                                    src={viewJobsData?.company_logo || window.location.origin + "/images/default-logo.png"}
                                                    alt="Company Logo"
                                                />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-10">
                                        <h6 className="job-title mb-0">{viewJobsData?.job_title || "No Job Title"}</h6>
                                        <p className="company-details mb-0">{viewJobsData?.company_name || "No Company Name"}</p>
                                        <div className="job-info">
                                            <span className="experience">
                                                <i className="bi bi-duffle"></i>{viewJobsData?.min_experience || 0} - {viewJobsData?.max_experience || 0} Years
                                            </span>
                                            <span className="salary">
                                                <i className="bi bi-currency-rupee me-0"></i>{viewJobsData?.min_salary || 0} - {viewJobsData?.max_salary || 0} L.P.A
                                            </span>
                                            <span className="location"></span>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-bottom my-2"></div>
                                <h6>Job Description</h6>
                                <div className="card p-4 mb-3">
                                    {viewJobsData?.job_description || "No Description Available"}
                                </div>
                                <h6>About Company</h6>
                                <div className="card p-4 mb-4">
                                    {viewJobsData?.about_company || "No Information Available"}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>No jobs found.</p>
                    )}
                </div>
                
                <div className="col-lg-4">
                    <h4>Similar Jobs</h4>
                    <a href='#' className="card job-card p-3 text-decoration-none">
                        <div className="row">
                            <div className="col-md-12">
                                <h6 className="job-title">Sr UX Designer</h6>
                                <p className="company-details">
                                    Tech Mahindra
                                </p>
                                <div className="job-info">
                                    <span className="experience">
                                        <i className="bi bi-duffle"></i> 6 - 9 years
                                    </span>
                                    <span className="salary">
                                        <i className="bi bi-currency-rupee"></i> Not Disclosed
                                    </span>
                                    <span className="location">
                                        <i className="bi bi-geo-alt"></i> Hyderabad
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom my-2"></div>
                        <div className="row">
                            <div className="col-md-12 pt-1">
                                <span className="job-meta">Posted: <strong>5 days ago</strong></span>
                                <span className="job-meta">Openings: <strong>2</strong></span>
                                <span className="job-meta">Applicants: <strong>82</strong></span>
                            </div>
                        </div>
                    </a>
                    <a href='#' className="card job-card p-3 text-decoration-none">
                        <div className="row">
                            <div className="col-md-12">
                                <h6 className="job-title">Sr UX Designer</h6>
                                <p className="company-details">
                                    Tech Mahindra
                                </p>
                                <div className="job-info">
                                    <span className="experience">
                                        <i className="bi bi-duffle"></i> 6 - 9 years
                                    </span>
                                    <span className="salary">
                                        <i className="bi bi-currency-rupee"></i> Not Disclosed
                                    </span>
                                    <span className="location">
                                        <i className="bi bi-geo-alt"></i> Hyderabad
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom my-2"></div>
                        <div className="row">
                            <div className="col-md-12 pt-1">
                                <span className="job-meta">Posted: <strong>5 days ago</strong></span>
                                <span className="job-meta">Openings: <strong>2</strong></span>
                                <span className="job-meta">Applicants: <strong>82</strong></span>
                            </div>
                        </div>
                    </a>
                    <a href='#' className="card job-card p-3 text-decoration-none">
                        <div className="row">
                            <div className="col-md-12">
                                <h6 className="job-title">Sr UX Designer</h6>
                                <p className="company-details">
                                    Tech Mahindra
                                </p>
                                <div className="job-info">
                                    <span className="experience">
                                        <i className="bi bi-duffle"></i> 6 - 9 years
                                    </span>
                                    <span className="salary">
                                        <i className="bi bi-currency-rupee"></i> Not Disclosed
                                    </span>
                                    <span className="location">
                                        <i className="bi bi-geo-alt"></i> Hyderabad
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom my-2"></div>
                        <div className="row">
                            <div className="col-md-12 pt-1">
                                <span className="job-meta">Posted: <strong>5 days ago</strong></span>
                                <span className="job-meta">Openings: <strong>2</strong></span>
                                <span className="job-meta">Applicants: <strong>82</strong></span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </main>
    )
}

export default ViewJobDetails