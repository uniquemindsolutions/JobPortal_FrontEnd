import React, { useEffect, useState } from 'react'
import './sekerDashboard.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
// import AppliedJobs from '../AppliedJobs';

// interface MyData {
//   id: number;
//   applied_count: number;
//   jobalert_count: number;
//   message_count: number;
//   shortlist_count: number;
// }
interface City {
  id: number;
  name: string;
}
const SeekerDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recentJobs, setRecentJobs] = useState<any>();
  const [citys, setCitys] = useState<City[]>([]);
  const [dashboardfeilds, SetDashboardFeilds] = useState({
    applied_count: '0',
    jobalert_count: '0',
    message_count: '0',
    shortlist_count: '0'
  })
  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  useEffect(() => {
    fetchData();


    const handleRecentJobs = async () => {
      setLoading(true);
      try {
        const res_recentjob = await axios.get('http://127.0.0.1:8000/user/submit-job/');
        const recentjob_data = res_recentjob;
        setRecentJobs(recentjob_data.data)
        console.log(res_recentjob)

        fetch("http://127.0.0.1:8000/cities/")
          .then(response => response.json())
          .then(data => {
            console.log("Cities:", data); // Log to check the data
            setCitys(data); // Store the cities in state
          })
      }
      catch (error) { setError("Failed to fetch data...") }


    }

    handleRecentJobs()
  }, []); // Empty dependency array means this runs once when component mounts

  const getCityNameById = (id: number) => {
    const city = citys.find((city: City) => city.id === id)
    return city ? city.name : 'Unknown City';
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      const appliedcountResponse = await axios.get('http://127.0.0.1:8000/user/Appliedjobs/');
      const jobalertcountResponse = await axios.get('http://127.0.0.1:8000/user/jobalerts/');
      const messagecountResponse = await axios.get('http://127.0.0.1:8000/user/messages/');
      const shortlistcountResponse = await axios.get('http://127.0.0.1:8000/user/shortlist/');

      const applied_count = appliedcountResponse.data[0]?.applied_count;
      const jobalert_count = jobalertcountResponse.data[0]?.jobalert_count;
      const message_count = messagecountResponse.data[0]?.message_count;
      const shortlist_count = shortlistcountResponse.data[0]?.shortlist_count;

      SetDashboardFeilds({
        applied_count,
        jobalert_count,
        message_count,
        shortlist_count
      })
    }

    catch (error) {
      console.error("Error fetching data:", error);
      SetDashboardFeilds({
        applied_count: 'Error loading',
        jobalert_count: 'Error loading',
        message_count: 'Error loading',
        shortlist_count: 'Error loading'
      });
    } finally {
      setLoading(false)
    }
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;



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
                  <p className="stat-value mb-0">{dashboardfeilds ? dashboardfeilds.applied_count : 'No data found'}</p>
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
                  <p className="stat-value mb-0">{dashboardfeilds ? dashboardfeilds.jobalert_count : "No data found"}</p>
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
                  <p className="stat-value mb-0">{dashboardfeilds ? dashboardfeilds.message_count : "No data found"}</p>
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
                  <p className="stat-value mb-0">{dashboardfeilds ? dashboardfeilds.shortlist_count : 'No data found'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-lg-8">
          <h5>Reacent Jobs</h5>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : recentJobs.length > 0 ? (
            recentJobs.map((item: any, index: any) => (

              <div className="card job-card mt-4" key={index}>
                <div className="row">
                  <div className="col-md-2 text-end">
                    <div className="company-logo">
                      <a href="#">
                        <img className='img-fluid' src={window.location.origin + '/images/techm-logo.jpg'} />
                      </a>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <h5 className="job-title">{item.job_title}</h5>
                    <div className="d-md-flex">
                      <div className="company-details">
                        {item.company_name}
                      </div>
                      <div className="job-info ms-auto mt-0">
                        <span className="experience">
                          <i className="bi bi-duffle"></i> 6 - 9 years
                        </span>
                        <span className="salary">
                          <i className="bi bi-currency-rupee"></i> {item.min_salary} - {item.max_salary} Lacs P.A
                        </span>
                        <span className="location">
                          <i className="bi bi-geo-alt"></i> {getCityNameById(item.city)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-7 pt-1">
                    <span className="job-meta">Posted: <strong>{item.created_date.split('T')[0]}</strong></span>
                    <span className="job-meta">Openings: <strong>{item.number_of_positions}</strong></span>
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
            ))
          ) : (
            <p>No jobs found.</p>
          )}


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