import React, { useEffect, useState } from 'react'
import './ViewJobDetails.scss'
import axios from 'axios';

interface viewJobsData {
    job_title: string;
    company_logo: any;
}

interface City {
    id:number,
    name: string,
}

const ViewJobDetails = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')
    const [viewJobsData, setViewJobsData] = useState<viewJobsData[]>([])
    const [citys, setCitys] = useState<City[]>([])


    useEffect(() => {
        ViewJobDetails()
    }, [])

    const ViewJobDetails = async () => {
        setLoading(true)
        try {
            // const res_viewJobDetails = await axios.get('http://127.0.0.1:8000/submitnewjob/1')
            // const viewJobDetails_data = res_viewJobDetails.data;
            // setViewJobsData(viewJobDetails_data)
            fetch(`http://127.0.0.1:8000/submitnewjob/1`)
            .then(response => response.json())
            .then(data => {
                console.log("Submit job details:", data);
                const viewJobDetails_data = data;               
            })
            
            .catch(error => console.error("Error fetching job details:", error));
            // console.log("View jobs data =======", viewJobDetails_data);

            const citys = await axios.get("http://127.0.0.1:8000/cities/")
            const res_citys = citys.data;
            setCitys(res_citys)
        }
        catch (error) {
            setError('No data found')
        } finally {
            setLoading(false);
        }
    }

    const getCityNameById = (id: number) => {
        const city = citys.find((city: City) => city.id === id)
        return city ? city.name : 'Unknown City';
      }

    return (
        <main>            
            <div className="row mt-4">
                <div className="col-lg-8">
                <h4 className=' mb-3'>View Job Details</h4>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : viewJobsData.length > 0 ? (
                        viewJobsData.map((item: any, index: number) => (
                            <div key={index}>
                                <div className="card job-card p-3">
                                    <div className="row">
                                        <div className="col-md-2 text-end">
                                            <div className="company-logo">
                                                <a href="#">
                                                    <img className='img-fluid' src={item ? item.company_logo : window.location.origin + '/images/default-logo.png'} />
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-md-10">
                                            <h5 className="job-title">{item.job_title}</h5>
                                            <p className="company-details">
                                                {item.company_name}
                                            </p>
                                            <div className="job-info">
                                                <span className="experience">
                                                    <i className="bi bi-duffle"></i> {item.min_experience} - {item.max_experience} Years
                                                </span>
                                                <span className="salary">
                                                    <i className="bi bi-currency-rupee"></i> {item.min_salary} - {item.max_salary} L.P.A
                                                </span>
                                                <span className="location">
                                                    <i className="bi bi-geo-alt"></i> {getCityNameById(item.city_location)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-bottom my-2"></div>
                                    <div className="row">
                                        <div className="col-md-7 pt-1">
                                            <span className="job-meta">Posted: <strong>{item.created_date.split('T')[0]}</strong></span>
                                            <span className="job-meta">Openings: <strong>{item.number_of_positions}</strong></span>
                                            <span className="job-meta">Applicants: <strong>82</strong></span>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="text-end">
                                                <button className="btn btn-outline-primary btn-save me-3">Save</button>
                                                <button className="btn btn-primary btn-apply">Apply</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <h6>Job Description</h6>
                                <div className="card p-4 mb-3">
                                    {item.job_description}
                                </div>
                                <h6>About Company</h6>
                                <div className="card p-4 mb-4">
                                    {item.about_company}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No jobs found.</p>
                    )}


                    {/* job details start */}
                    
                    {/* job details end */}
                </div>
                <div className="col-lg-4">
                    <h4>Similar Jobs</h4>
                    <a href='#' className="card job-card p-3 text-decoration-none">
                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="job-title">Sr UX Designer</h5>
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
                                <h5 className="job-title">Sr UX Designer</h5>
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
                                <h5 className="job-title">Sr UX Designer</h5>
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