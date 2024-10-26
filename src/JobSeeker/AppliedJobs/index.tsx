import React from 'react'
import { Link } from 'react-router-dom'

const AppliedJobs = () => {
    return (
        <main>
            <img src={process.env.PUBLIC_URL + '/images/applied-job-banner.png'} className='img-fluid' alt="banner" />

            <div className="row mt-4">
                <div className="col-lg-8">
                    <h5>Applied Jobs</h5>

                    <div className="card job-card mt-4">
                        <div className="row">
                            <div className="col-md-2 text-end">
                                <div className="company-logo">
                                    <a href="#">
                                        <img className='img-fluid' src={window.location.origin + '/images/techm-logo.jpg'} />
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className='d-flex justify-content-between'>
                                    <h5 className="job-title">Sr UX Designer</h5>
                                    <div className="text-end" style={{marginTop:'-5px', marginRight:'-6px'}}>
                                        <button className="btn btn-apply btn-sm me-2">Follow Up</button>
                                        <button className="btn bg-danger btn-sm"><i className="bi bi-trash3"></i></button>
                                    </div>
                                </div>
                                <div className="d-md-flex mt-1">
                                    <div className="company-details">
                                        Tech Mahindra
                                    </div>
                                    <div className="job-info ms-auto mt-0">
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
                        </div>
                        <div className="border-bottom my-2"></div>
                        <div className="row">
                            <div className="col-md-12">
                                <span className="job-meta">Application Date: <strong>23-10-2024</strong></span>
                                <span className="job-meta">Views: <strong>222</strong></span>
                                <span className="job-meta">Applicants: <strong>82</strong></span>
                                <span className="job-meta">Recruiter Actions: <strong>82</strong></span>
                                <span className="job-meta">Status: <strong>Applied/Sent</strong></span>
                            </div>
                        </div>
                    </div>

                    <div className="card job-card">
                        <div className="row">
                            <div className="col-md-2 text-end">
                                <div className="company-logo">
                                    <a href="#">
                                        <img className='img-fluid' src={window.location.origin + '/images/techm-logo.jpg'} />
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className='d-flex justify-content-between'>
                                    <h5 className="job-title">Sr UX Designer</h5>
                                    <div className="text-end" style={{marginTop:'-5px', marginRight:'-6px'}}>
                                        <button className="btn btn-apply btn-sm me-2">Follow Up</button>
                                        <button className="btn bg-danger btn-sm"><i className="bi bi-trash3"></i></button>
                                    </div>
                                </div>
                                <div className="d-md-flex mt-1">
                                    <div className="company-details">
                                        Tech Mahindra
                                    </div>
                                    <div className="job-info ms-auto mt-0">
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
                        </div>
                        <div className="border-bottom my-2"></div>
                        <div className="row">
                            <div className="col-md-12">
                                <span className="job-meta">Application Date: <strong>23-10-2024</strong></span>
                                <span className="job-meta">Views: <strong>222</strong></span>
                                <span className="job-meta">Applicants: <strong>82</strong></span>
                                <span className="job-meta">Recruiter Actions: <strong>82</strong></span>
                                <span className="job-meta">Status: <strong>Applied/Sent</strong></span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="card job-card">
                        <div className="row">
                            <div className="col-md-2 text-end">
                                <div className="company-logo">
                                    <a href="#">
                                        <img className='img-fluid' src={window.location.origin + '/images/techm-logo.jpg'} />
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className='d-flex justify-content-between'>
                                    <h5 className="job-title">Sr UX Designer</h5>
                                    <div className="text-end" style={{marginTop:'-5px', marginRight:'-6px'}}>
                                        <button className="btn btn-apply btn-sm me-2">Follow Up</button>
                                        <button className="btn bg-danger btn-sm"><i className="bi bi-trash3"></i></button>
                                    </div>
                                </div>
                                <div className="d-md-flex mt-1">
                                    <div className="company-details">
                                        Tech Mahindra
                                    </div>
                                    <div className="job-info ms-auto mt-0">
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
                        </div>
                        <div className="border-bottom my-2"></div>
                        <div className="row">
                            <div className="col-md-12">
                                <span className="job-meta">Application Date: <strong>23-10-2024</strong></span>
                                <span className="job-meta">Views: <strong>222</strong></span>
                                <span className="job-meta">Applicants: <strong>82</strong></span>
                                <span className="job-meta">Recruiter Actions: <strong>82</strong></span>
                                <span className="job-meta">Status: <strong>Applied/Sent</strong></span>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-lg-4">
                    <h5>Featured Employers</h5>
                    <img src={process.env.PUBLIC_URL + '/images/Employers-logos.png'} className='img-fluid' />
                </div>
            </div>
        </main>
    )
}

export default AppliedJobs