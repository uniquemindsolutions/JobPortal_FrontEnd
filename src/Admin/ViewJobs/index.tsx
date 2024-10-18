import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface viewJobDetails {
    job_title: string;
    number_of_positions: number;
    job_description: string;
    address: string;
    city: number;
    country: number;
    english_fluency: string;
    experience: string;
    industry: string;
    job_category: string;
    job_type: string;
    map_location: string;
    max_salary: string;
    min_salary: string;
    salary: string;
    skills: string;
    state: number;
    upload_file: File | null;
    about_company: string;
    work_mode: string;
    ssc: string;
    inter: string;
    ug_name: string;
    pg_name: string;
}
const ViewJobs = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [viewJob, setViewJob] = useState<viewJobDetails>(
        {
            job_title: '',
            number_of_positions: 1,
            job_description: '',
            address: '',
            city: 0,
            country: 0,
            english_fluency: '',
            experience: '',
            industry: '',
            job_category: '',
            job_type: '',
            map_location: '',
            max_salary: '',
            min_salary: '',
            salary: '',
            skills: '',
            state: 0,
            upload_file: null,
            about_company: '',
            work_mode: '',
            ssc: '',
            inter: '',
            ug_name: '',
            pg_name: '',
        }
    )


    useEffect(() => {
        const viewJobDetails = async () => {
            try {
                const res = await axios.get<viewJobDetails>('http://127.0.0.1:8000/submitnewjob/')
                setViewJob(res.data)
            }
            catch (error) {
                setError("Error fetching data")
            }
            finally {
                setLoading(false)
            }
        };

        viewJobDetails();
    }, [])

    return (
        <main>
            <div className="d-flex justify-content-between mt-4">
                <div><h4>View Job Details</h4></div>
                <div className='text-end'>
                    <div className="d-flex">
                        <div className="dropdown ms-3">
                            <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill px-3" data-bs-toggle="dropdown">
                                Short by
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end tbl-dropdown">
                                <li>
                                    <a className="dropdown-item" href="#">  Active</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#"> Pedding</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#"> Expaired</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-card">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 py-4">
                        <div className="card">
                            <div className="card-header fw-bold text-primary">Job Title: {viewJob.job_title}</div>
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-5">No. of Postions</div>
                                    <div className="col-7">: {viewJob.number_of_positions} </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Job category</div>
                                    <div className="col-7">: {viewJob.job_category} </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Job type</div>
                                    <div className="col-7">: {viewJob.job_type}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Salary type</div>
                                    <div className="col-7">: {viewJob.salary}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Min salary</div>
                                    <div className="col-7">: {viewJob.min_salary}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">max salary</div>
                                    <div className="col-7">: {viewJob.max_salary}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Experience</div>
                                    <div className="col-7">: {viewJob.experience}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Location</div>
                                    <div className="col-7">: {viewJob.map_location}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Industry</div>
                                    <div className="col-7">: {viewJob.industry}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">English fluency</div>
                                    <div className="col-7">: {viewJob.english_fluency}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Address</div>
                                    <div className="col-7">: {viewJob.address}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Country</div>
                                    <div className="col-7">: {viewJob.country}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">State</div>
                                    <div className="col-7">: {viewJob.state}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">City</div>
                                    <div className="col-7">: {viewJob.city}</div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Education</div>
                                    <div className="col-7">: {viewJob.ssc}  {viewJob.inter} {viewJob.ug_name} {viewJob.pg_name}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default ViewJobs;
