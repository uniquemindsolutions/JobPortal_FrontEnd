// SavedJobs.tsx
import React from 'react';

interface SavedJobsProps {
  saveJobsData: Array<any>; // Update with a specific type if available
}

const SavedJobs: React.FC<SavedJobsProps> = ({ saveJobsData }) => {
  return (
    <main>
      <img src={process.env.PUBLIC_URL + '/images/applied-job-banner.png'} className='img-fluid' alt="banner" />

      <div className="row mt-4">
        <div className="col-lg-8">
          <h5>Saved Jobs</h5>
          {saveJobsData.length > 0 ? (
            saveJobsData.map((item, index) => (
              <div className="card job-card mt-4" key={index}>
                <div className="row">
                  <div className="col-md-2 text-end">
                    <div className="company-logo">
                      <a href="#">
                        <img className='img-fluid' src={item.company_logo || window.location.origin + '/images/techm-logo.jpg'} alt="Company Logo" />
                      </a>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <div className='d-flex justify-content-between'>
                      <h5 className="job-title">{item.company_name}</h5>
                      <div className="text-end">
                        <button className="btn bg-danger btn-sm"><i className="bi bi-trash3"></i></button>
                      </div>
                    </div>
                    <div className="d-md-flex">
                      <div className="company-details mt-2">
                        {item.company_name}
                      </div>
                      <div className="job-info ms-auto">
                        <span className="experience">
                          <i className="bi bi-duffle"></i> {item.min_experience} - {item.max_experience} years
                        </span>
                        <span className="salary">
                          <i className="bi bi-currency-rupee"></i> {item.min_salary} - {item.max_salary} L.P.A
                        </span>
                        <span className="location">
                          <i className="bi bi-geo-alt"></i> {item.location || 'Location not specified'}
                        </span>
                        <span className="posted-date">
                          <i className="bi bi-calendar-check"></i> {item.created_date.split('T')[0]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No saved jobs found.</p>
          )}
        </div>

        <div className="col-lg-4">
          <h5>Featured Employers</h5>
          <img src={process.env.PUBLIC_URL + '/images/Employers-logos.png'} alt="Employers Logos" />
        </div>
      </div>
    </main>
  );
}

export default SavedJobs;
