import React, { useEffect, useState } from 'react'
import './sekerDashboard.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';

const SeekerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);  
  };

  useEffect(()=>{
    const dataFetching = async ()=>{
      
    }
  })
  return (
    <main>
      <h4 className='mt-4'>Dashboard</h4>
      <div className="row text-center">
        {/* Applied Jobs */}
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card stat-card applied-jobs">
            <div className="card-body">
              <div className='d-flex'>
                <div className='dashbd-icon'><i className="bi bi-briefcase stat-icon"></i></div>
                <div className='dashbd-contet'>
                  <h5 className="card-title">Applied Jobs</h5>
                  <p className="stat-value mb-0">300</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Alerts */}
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card stat-card job-alerts">
            <div className="card-body">
              <div className='d-flex'>
                <div className='dashbd-icon'><i className="bi bi-file-earmark-text stat-icon"></i></div>
                <div className='dashbd-contet'>
                  <h5 className="card-title">Job Alerts</h5>
                  <p className="stat-value mb-0">1245</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card stat-card messages">
            <div className="card-body">
              <div className='d-flex'>
                <div className='dashbd-icon'><i className="bi bi-chat-left stat-icon"></i></div>
                <div className='dashbd-contet'>
                  <h5 className="card-title">Messages</h5>
                  <p className="stat-value mb-0">85</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shortlist */}
        <div className="col-lg-3 col-md-6 mb-3">
          <div className="card stat-card shortlist">
            <div className="card-body">
              <div className='d-flex'>
                <div className='dashbd-icon'><i className="bi bi-bookmark stat-icon"></i></div>
                <div className='dashbd-contet'>
                  <h5 className="card-title">Shortlist</h5>
                  <p className="stat-value mb-0">57</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-8">
          <h5>Reacent Jobs</h5>

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
                <h5 className="job-title">Sr UX Designer</h5>
                <div className="d-md-flex">
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

            <div className="row mt-2">
              <div className="col-md-7 pt-1">
                <span className="job-meta">Posted: <strong>5 days ago</strong></span>
                <span className="job-meta">Openings: <strong>2</strong></span>
                <span className="job-meta">Applicants: <strong>82</strong></span>
              </div>
              <div className="col-md-5">
                <div className="text-end">
                  <button className="btn btn-outline-primary btn-save me-3">Save</button>
                  <Link to='/view-job-details' className="btn btn-primary btn-apply">Apply Now</Link>
                </div>
              </div>
            </div>

          </div>


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
                <h5 className="job-title">Sr UX Designer</h5>
                <div className="d-md-flex">
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

            <div className="row mt-2">
              <div className="col-md-7 pt-1">
                <span className="job-meta">Posted: <strong>5 days ago</strong></span>
                <span className="job-meta">Openings: <strong>2</strong></span>
                <span className="job-meta">Applicants: <strong>82</strong></span>
              </div>
              <div className="col-md-5">
                <div className="text-end">
                  <button className="btn btn-outline-primary btn-save me-3">Save</button>
                  <Link to='/view-job-details' className="btn btn-primary btn-apply">Apply Now</Link>
                </div>
              </div>
            </div>

          </div>

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
                <h5 className="job-title">Sr UX Designer</h5>
                <div className="d-md-flex">
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

            <div className="row mt-2">
              <div className="col-md-7 pt-1">
                <span className="job-meta">Posted: <strong>5 days ago</strong></span>
                <span className="job-meta">Openings: <strong>2</strong></span>
                <span className="job-meta">Applicants: <strong>82</strong></span>
              </div>
              <div className="col-md-5">
                <div className="text-end">
                  <button className="btn btn-outline-primary btn-save me-3">Save</button>
                  <Link to='/view-job-details' className="btn btn-primary btn-apply">Apply Now</Link>
                </div>
              </div>
            </div>

          </div>

        </div>

        <div className="col-lg-4">
          <h5>Filters</h5>
          <div className="filer-card">
            <h6 className='mt-4'>Work mode</h6>
            <div className='border-bottom my-2'></div>
            <div className="filter-card-fields">
              <div className="form-check mb-2">
                <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
                <label className="form-check-label">Work from Office (200)</label>
              </div>
              <div className="form-check mb-2">
                <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
                <label className="form-check-label">Work from Home (200)</label>
              </div>
              <div className="form-check mb-2">
                <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
                <label className="form-check-label">Hybrid (200)</label>
              </div>
              <div className="form-check mb-2">
                <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
                <label className="form-check-label">Remot (200)</label>
              </div>
            </div>

            <h6 className='mt-4'>Department</h6>
            <div className='border-bottom my-2'></div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
              <label className="form-check-label">It (500)</label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
              <label className="form-check-label">software (500)</label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
              <label className="form-check-label">It (500)</label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
              <label className="form-check-label">software (500)</label>
            </div>

            <h6 className='mt-4'>Location</h6>
            <div className='border-bottom my-2'></div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
              <label className="form-check-label">Hyderabad (1500)</label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
              <label className="form-check-label">Bengaluru (500)</label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
              <label className="form-check-label"> Delhi / NCR (1000)</label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
              <label className="form-check-label"> Pune (300)</label>
            </div>
          </div>

          {/* <a href="#"><img className='mb-3 img-fluid' src={window.location.origin + '/images/highlight-resume.png'} /></a>
          <a href="#"><img className='mb-3 img-fluid' src={window.location.origin + '/images/resume-builder.png'} /></a> */}
        </div>
      </div>
    </main>
  )
}

export default SeekerDashboard