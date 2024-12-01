import React, { useEffect, useState } from 'react'
import './sekerDashboard.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import SavedJobs from '../SavedJobs';

interface City {
  id: number;
  name: string;
}
interface CompanyDetails {
  company_logo: string;
  company_name: string;
}
interface Industry{
  id:number;
  industry:string;
}
interface JobItem {
  id: string;
  job_title: string;
  company_name: string;
  company_logo: string;
  min_experience: number;
  max_experience: number;
  min_salary: number;
  max_salary: number;
  job_location: number;
  created_date: string;
  number_of_positions: number;
}

const SeekerDashboard = () => {
  const [industries, setIndustries] = useState<Industry[]>([]); 
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedWorkModes, setSelectedWorkModes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [recentJobs, setRecentJobs] = useState<any[]>([]);
  // const [applied setApplied] = useState();
  const [citys, setCitys] = useState<City[]>([]);
  const [saveJobs, setSaveJob] = useState([])
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
  const [CompanyDetails, setCompanyDetailsData] = useState<CompanyDetails | null>(null);
  const handleCheckboxChange = (industry: string) => {
    setSelectedIndustries(prevSelected =>
      prevSelected.includes(industry)
        ? prevSelected.filter(i => i !== industry)
        : [...prevSelected, industry]
    );
  };
  // Toggle work mode selection
  const handleWorkModeChange = (work_mode: string) => {
    setSelectedWorkModes(prev =>
      prev.includes(work_mode)
        ? prev.filter(mode => mode !== work_mode)
        : [...prev, work_mode]
    );
  };

  // Toggle location selection
  const handleLocationChange = (job_location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(job_location)
        ? prev.filter((location) => location !== job_location)
        : [...prev, job_location]
    );
  };

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/industry/')
        const data = await response.json()
        setIndustries(data); // Store industries in state
      } catch (error) {
        console.error("Error fetching industries:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchIndustries();
    const fetchJobsAndCities = async () => {
      fetchData();
      setLoading(true);
      try {
        // Build the query string dynamically for selected filters
        const queryParams: string[] = [];

        // Add industry filters
        if (selectedIndustries.length > 0) {
          queryParams.push(`industry=${selectedIndustries.join(',')}`);
        }

        // Add city filters
        if (selectedLocations.length > 0) {
          queryParams.push(`job_location=${selectedLocations.join(',')}`);
        }

        // Add work mode filters
        if (selectedWorkModes.length > 0) {
          queryParams.push(`work_mode=${selectedWorkModes.join(',')}`);
        }

        // Join all filters into a single query string
        const queryString = queryParams.join('&');
        console.log("Query String:", queryString);
        // Fetch the jobs based on selected filters
        const response = await axios.get(`http://127.0.0.1:8000/submitnewjob/?${queryString}`);
        setRecentJobs(response.data); // Update job list

        // Fetch the list of cities
        const cityResponse = await fetch("http://127.0.0.1:8000/cities/");
        const cityData = await cityResponse.json();
        console.log("Cities:", cityData); // Log to check the data
        setCitys(cityData); // Store the cities in state

      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };
    // Call the function to fetch jobs and cities when filters change
    fetchJobsAndCities();
  }, [selectedIndustries, selectedLocations, selectedWorkModes]); // Dependency array with selected filters
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

  const handleSaveJobs = async () => {
    setLoading(true)
    try {
      const res_saveJobs = await axios.get("http://127.0.0.1:8000/user/submit-job/")
      const savejobsData = res_saveJobs.data;
      setSaveJob(savejobsData)

      console.log("save jobs details ====", savejobsData)
    } catch (error) {
      setError('No data found')
    } finally {
      setLoading(false)
    }
  }
  const getJobCountForWorkMode = (workMode: string) => {
    return recentJobs.filter(job => job.work_mode === workMode).length;
  };
  const getJobCountForLocation = (joblocation: number): number => {
    return recentJobs.filter(job => job.job_location === joblocation).length;
  };

  const getJobCountForIndustry = (industry: number): number => {
    return recentJobs.filter(job => job.industry === industry).length;

  };
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
          <h5>Recent Jobs</h5>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : recentJobs.length > 0 ? (
            recentJobs.sort((a: any, b: any) => {
              if (a.job_title > b.job_title) return -1;
              if (a.job_title < b.job_title) return 1;
              return 0;
          }).map((job: JobItem, index: number) => (
              <div className="card job-card mt-4" key={index}>
                <div className="row">
                  <div className="col-md-2 text-end">
                    <div className="company-logo">
                      <a href="#">
                        <img
                          src={CompanyDetails?.company_logo || `${window.location.origin}/images/default-logo.png`}
                          alt="Company Logo"
                          className="comp-logo"
                        />
                      </a>
                    </div>
                  </div>
                  <div className="col-md-10">
                    <h5 className="job-title">{job.job_title}</h5>
                    <div className="d-md-flex">
                      <div className="company-details">
                        {job.company_name}
                      </div>
                      <div className="job-info ms-auto mt-0">
                        <span className="experience">
                          <i className="bi bi-duffle"></i> {job.min_experience} - {job.max_experience} Years
                        </span>
                        <span className="salary">
                          <i className="bi bi-currency-rupee"></i> {job.min_salary} - {job.max_salary} L.P.A
                        </span>
                        <span className="location">
                          <i className="bi bi-geo-alt"></i> {getCityNameById(job.job_location)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col-md-7 pt-1">
                    <span className="job-meta">Posted: <strong>{job.created_date.split('T')[0]}</strong></span>
                    <span className="job-meta">Openings: <strong>{job.number_of_positions}</strong></span>
                    <span className="job-meta">Applicants: <strong>{dashboardfeilds.applied_count}</strong></span>
                  </div>
                  <div className="col-md-5">
                    <div className="text-end">
                      <button onClick={handleSaveJobs} className="btn btn-outline-primary btn-save me-3">Save</button>
                      <Link to={`/view-job-details/${job.id}`} className="btn btn-primary btn-apply">Apply Now</Link>
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
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="office"
                  name="work_mode"
                  value="Work from office"
                  checked={selectedWorkModes.includes('Work from office')}
                  onChange={() => handleWorkModeChange('Work from office')}
                />
                <label className="form-check-label" htmlFor="office">Work from Office ({getJobCountForWorkMode('Work from office')})</label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="home"
                  name="work_mode"
                  value="Work from Home"
                  checked={selectedWorkModes.includes('Work from Home')}
                  onChange={() => handleWorkModeChange('Work from Home')}
                />
                <label className="form-check-label" htmlFor="home">Work from Home ({getJobCountForWorkMode('Work from Home')})
                </label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="hybrid"
                  name="work_mode"
                  value="Hybrid"
                  checked={selectedWorkModes.includes('Hybrid')}
                  onChange={() => handleWorkModeChange('Hybrid')}
                />
                <label className="form-check-label" htmlFor="hybrid">Hybrid ({getJobCountForWorkMode('Hybrid')})</label>
              </div>
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="remote"
                  name="work_mode"
                  value="Remote"
                  checked={selectedWorkModes.includes('Remote')}
                  onChange={() => handleWorkModeChange('Remote')}
                />
                <label className="form-check-label" htmlFor="remote">Remote ({getJobCountForWorkMode('Remote')})</label>

              </div>
            </div>

            <h6 className='mt-4'>Department</h6>
            <div className='border-bottom my-2'></div>
            <div>
              {industries.length > 0 ? (
                industries.map((Industry, index) => (
                  <div key={Industry.id} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={Industry.industry}
                      value={Industry.industry}
                      checked={selectedIndustries.includes(Industry.industry)}
                      onChange={() => handleCheckboxChange(Industry.industry)} // Dynamically handle location change
                    />
                    <label className="form-check-label" htmlFor={Industry.industry}>
                      {Industry.industry} ({getJobCountForIndustry(Industry.id)})
                    </label>
                  </div>
                ))
              ) : (
                <p>Loading Industry...</p>
              )}
            </div>
            {/* <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="it"
                onChange={() => handleCheckboxChange('IT')}
                checked={selectedIndustries.includes('IT')}
              />
              <label className="form-check-label">IT  ({getJobCountForIndustry(1)})</label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="education"
                onChange={() => handleCheckboxChange('Education')}
                checked={selectedIndustries.includes('Education')}
              />
              <label className="form-check-label">Education  ({getJobCountForIndustry(6)})</label>

            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="software"
                onChange={() => handleCheckboxChange("Software Industry")}
                checked={selectedIndustries.includes("Software Industry")}
              />
              <label className="form-check-label">Software Industry  ({getJobCountForIndustry(3)})</label>
            </div> */}
            {/* <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="check1" name="option1" value="something" />
              <label className="form-check-label">software (500)</label>
            </div> */}

            <h6 className='mt-4'>Location</h6>
            <div className='border-bottom my-2'></div>
            <div>
              {citys.length > 0 ? (
                citys.map((city, index) => (
                  <div key={city.id} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={city.name}
                      value={city.name}
                      checked={selectedLocations.includes(city.name)}
                      onChange={() => handleLocationChange(city.name)} // Dynamically handle location change
                    />
                    <label className="form-check-label" htmlFor={city.name}>
                      {city.name} ({getJobCountForLocation(city.id)})
                    </label>
                  </div>
                ))
              ) : (
                <p>Loading cities...</p>
              )}
            </div>
            {/* <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="hyderabad"
                value="Hyderabad"
                checked={selectedLocations.includes("Hyderabad")}
                onChange={() => handleLocationChange("Hyderabad")}
              />
              <label className="form-check-label" htmlFor="hyderabad">
                Hyderabad ({getJobCountForLocation(24)})
              </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="bengaluru"
                value="Bengaluru"
                checked={selectedLocations.includes("Bengaluru")}
                onChange={() => handleLocationChange("Bengaluru")}
              />
              <label className="form-check-label">Bengaluru  ({getJobCountForLocation(11)}) </label>
            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="delhi"
                value="New Delhi"
                checked={selectedLocations.includes("New Delhi")}
                onChange={() => handleLocationChange("New Delhi")}
              />
              <label className="form-check-label" htmlFor="delhi">
                New Delhi ({getJobCountForLocation(33)})</label>

            </div>
            <div className="form-check mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="Pune"
                value="Pune"
                checked={selectedLocations.includes("Pune")}
                onChange={() => handleLocationChange("Pune")}
              />
              <label className="form-check-label">Pune ({getJobCountForLocation(76)})</label>
            </div> */}
          </div>

          {/* <a href="#"><img className='mb-3 img-fluid' src={window.location.origin + '/images/highlight-resume.png'} /></a>
          <a href="#"><img className='mb-3 img-fluid' src={window.location.origin + '/images/resume-builder.png'} /></a> */}
        </div>
      </div>
    </main>
  )
}

export default SeekerDashboard;