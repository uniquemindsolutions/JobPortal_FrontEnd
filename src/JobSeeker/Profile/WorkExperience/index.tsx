import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Workexperience {
    current_job_title: string;
    company_name: string;
    is_cuurent_company: boolean;
    state_date: string;
    end_date: string;
    work_space: string;
    employment_type: string;
    current_salary: string;
    description: string;
}
const WorkExperience = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [workExpData, setWorkExpData] = useState([]);

    const [Workexperience, setWorkexperience] = useState({
        current_job_title: '',
        company_name: '',
        is_cuurent_company: '',
        state_date: '',
        end_date: '',
        work_space: '',
        employment_type: '',
        current_salary: '',
        description: ''
    });

    useEffect(() => {
        workExperiance();
        workExpUpdated();
    }, [])


    // work experiance start 
    const handleWorkExp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents page reload on form submit
        const formData = new FormData();
        for (const key in Workexperience) {
            formData.append(key, Workexperience[key as keyof typeof Workexperience] as string);
        }

        try {
            // Make POST request to the API endpoint
            const response = await axios.post(
                "http://127.0.0.1:8000/user/Workexperience/",
                formData,
            );
            setMessage("Workexperience Created sucessfully");
            alert('Workexperience created successfully!');
            console.log(response.data);
        } catch (err) {
            setError('Failed to create Workexperience');
            console.error(err);
        }
    };
    const workExperiance = async () => {
        setLoading(true)
        try {
            const res_work_exp = await axios.get('http://127.0.0.1:8000/user/Workexperience/')
            const work_exp_data = res_work_exp.data;
            setWorkExpData(work_exp_data)
            setMessage(message)

        } catch (error) {
            setError("Data not found")
        } finally {
            setLoading(false)
        }
    }

    const workExpUpdated = async () => {
        try {
            const res_work_exp_put = await axios.put('http://127.0.0.1:8000/user/Workexperience/1/', workExpData)
            setMessage(res_work_exp_put.data)
        } catch (error) {
            setError("Work experiance not updated")
        }
    }
    // work experiance end 

    const handleForm2Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setWorkexperience(Workexperience => ({
            ...Workexperience,
            [name]: value,
        }));
    }

    return (
        <main>
            <div className="card-header fw-bold">
                <span><i className="bi bi-duffle text-secondary me-2"></i> Work Experience</span>  <button className='btn btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#addWorkExperiance"> +Add</button></div>
            <div className="card-body">
                {workExpData.map((item: any, index: number) => (
                    <ul className='list-unstyled profile-sec' key={index}>
                        <li><span className='text-secondary'>Job Titile:</span> <span className='lt-blue-c'>{item.current_job_title}</span>
                            <button className="bi bi-pencil-square float-end btn" data-bs-toggle="modal" data-bs-target="#addWorkExperiance"></button></li>
                        <li><span className='text-secondary'>Company Name:</span> {item.company_name}</li>
                        <li><span className='text-secondary'>Date:</span> {item.start_date.split('T')[0]} to {item.end_date.split('T')[0]} {item.is_company_name}</li>
                        <li><span className='text-secondary'>Description:</span> {item.description}</li>
                    </ul>
                ))}

                <ul className='list-unstyled profile-sec'>
                    <li className='lt-blue-c'>Ui Designer And Developer <button className="bi bi-pencil-square float-end btn" data-bs-toggle="modal" data-bs-target="#addWorkExperiance"></button></li>
                    <li>Vishist Business Solutions</li>
                    <li>Feb 2022 to Oct 2022</li>
                    <li>Annual salary : 200000</li>
                    <li>Description</li>
                </ul>

            </div>


            <form onSubmit={handleWorkExp}>
                <div className="modal fade" id="addWorkExperiance" aria-labelledby="addWorkExperianceLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="addWorkExperianceLabel">Work Experience</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* work experiance start */}
                                <form className="job-form py-1">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="jobTitle" className="form-label">Current Job Title *</label>
                                                <input type="text" className="form-control" id="current_job_title" name='current_job_title' placeholder="Most recent job title"
                                                    onChange={handleForm2Change} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="companyName" className="form-label">Company Name *</label>
                                                <input type="text" className="form-control" id="company_name" placeholder="Most recent company" name='company_name' onChange={handleForm2Change} />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Is This Your Current Company?</label>
                                                <div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="is_current_company" id="is_current_company" value="yes" onChange={handleForm2Change} />
                                                        <label className="form-check-label" htmlFor="currentCompanyYes">Yes</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="is_current_company" id="is_current_company" value="no" onChange={handleForm2Change} />
                                                        <label className="form-check-label" htmlFor="currentCompanyNo">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="mb-3 row">
                                                <div className="col">
                                                    <label htmlFor="startDateYear" className="form-label">Start Date</label>
                                                    <input type='date' className="form-control" id="start_date" name='start_date' onChange={handleForm2Change} />

                                                </div>
                                                <div className="col">
                                                    <label htmlFor="endDateMonth" className="form-label">End Date</label>
                                                    <input type='date' className="form-control" id="end_date" name='end_date' onChange={handleForm2Change} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="noticePeriod" className="form-label">Notice Period</label>
                                                <select className="form-select" id="noticePeriod" onChange={handleForm2Change}>
                                                    <option selected>Select your notice period</option>
                                                    {/* Options for notice period */}
                                                    <option value="Immediately available">Immediately Available</option>
                                                    <option value="15 days">15 Days</option>
                                                    <option value="30 days">30 Days</option>
                                                    <option value="45 days">45 Days</option>
                                                    <option value="2 Months">2 Months</option>
                                                    <option value="3 Months">3 Months</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Workplace</label>
                                                <div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="workplace" id="workplace" value="in_office" onChange={handleForm2Change} />
                                                        <label className="form-check-label" htmlFor="inOffice">In-Office</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="workplace" id="hybrid" value="hybrid" onChange={handleForm2Change} />
                                                        <label className="form-check-label" htmlFor="hybrid">Hybrid</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="workplace" id="workFromHome" value="work_from_home" onChange={handleForm2Change} />
                                                        <label className="form-check-label" htmlFor="workFromHome">Work from home</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="employmentType" className="form-label">Employment Type</label>
                                                <select className="form-select" id="employment_type" name='employment_type' onChange={handleForm2Change}>
                                                    <option selected>Select your employment type</option>
                                                    {/* Options for employment type */}
                                                    <option value="Full Time">Full Time</option>
                                                    <option value="Part Time">Part Time</option>
                                                    <option value="Internship">Internship</option>
                                                    <option value="Freelance">Freelance</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="mb-3 row">
                                                <div className="col">
                                                    <label htmlFor="salaryCurrency" className="form-label">Current Salary (Annually) *</label>
                                                    <select className="form-select" id="current_salary" name='current_salary' onChange={handleForm2Change}>
                                                        <option selected>Select a Current Salary</option>
                                                        {/* Other currency options */}
                                                        <option value="INR">Indian Rupee (INR)</option>
                                                        <option value="USD">US Dollar (USD)</option>
                                                        <option value="AED">UAE Dirham (AED)</option>
                                                    </select>
                                                </div>
                                                <div className="col">
                                                    <label htmlFor=""></label>
                                                    <input type="number" className="form-control" id="salary" placeholder="Enter your current salary" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="">
                                                <label htmlFor="description" className="form-label">Description</label>
                                                <textarea className="form-control" id="description" name='description' placeholder="Enter your description" onChange={handleForm2Change}></textarea>
                                                <small className="form-text text-muted">Max. 1000 characters</small>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                                {/* work experiance end */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" onClick={workExpUpdated} className="update-btn" data-bs-dismiss="modal">Update</button>
                                <button type="submit" data-bs-dismiss="modal" className="save-btn">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </main>
    )
}

export default WorkExperience