import React from 'react'

const SavedJobs = () => {
  return (
    <main>
    <img src={process.env.PUBLIC_URL + '/images/applied-job-banner.png'} className='img-fluid' alt="banner" />

    <div className="row mt-4">
        <div className="col-lg-8">
            <h5>Saved Jobs</h5>

            <div className="card job-card p-3">
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
                            <div className="text-end">
                                <button className="btn bg-danger btn-sm"><i className="bi bi-trash3"></i></button>
                            </div>
                        </div>
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
                            <span className="location">
                            <i className="bi bi-calendar-check"></i> 23-10-2024
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card job-card p-3">
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
                            <div className="text-end">
                                <button className="btn bg-danger btn-sm"><i className="bi bi-trash3"></i></button>
                            </div>
                        </div>
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
                            <span className="location">
                            <i className="bi bi-calendar-check"></i> 23-10-2024
                            </span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div className="col-lg-4">
            <h5>Featured Employers</h5>
            <img src={process.env.PUBLIC_URL + '/images/Employers-logos.png'} />
        </div>
    </div>
</main>
  )
}

export default SavedJobs