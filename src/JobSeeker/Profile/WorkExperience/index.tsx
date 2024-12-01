import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import DatePicker from '../../../Helpers/Datepicker/Datepicker';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

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
const WorkExperience = ({date}:any) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [updateBtn, setUpdateBtn] = useState(false);
    const [saveBtn, setSaveBtn] = useState(true);
    const [startDate, setStartDate] = useState<any>(new Date());
    const [endDate, setEndDate] = useState<any>(new Date());

    const [workExpData, setWorkExpData] = useState<any>([]);
    const [WorkexperiencePost, setWorkexperiencePost] = useState<any>({
        current_job_title: '',
        company_name: '',
        is_current_company: '',
        start_date: '',
        end_date: '',
        workplace: '',
        employment_type: '',
        current_salary: '',
        description: ''
    });
    const [workExpEdit, setWorkExpEdit] = useState<any>([])

    useEffect(() => {
        workExpGet();
    }, [])

    const workExpGet = async () => {
        setLoading(true)
        try {
            const res_workExp = await axios.get('http://127.0.0.1:8000/user/Workexperience/')
            const work_expData = res_workExp.data;
            setWorkExpData(Array.isArray(work_expData) ? work_expData : [work_expData]); // Ensure it's an array
            setMessage(message)
        } catch (error) {
            setError("Data not found")
        } finally {
            setLoading(false)
        }
    }

    const handleSubmitWorkExpPost = async (e: any) => {
        setSaveBtn(true)
        e.preventDefault();
        try {
            const res_workExp = await axios.post(`http://127.0.0.1:8000/user/Workexperience/`, WorkexperiencePost);
            const workExpData = res_workExp.data;
            setWorkexperiencePost(workExpData);
        } catch (error) {
            console.log(error)
   
        }
    }

    const handleInputWorkExpForm = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setWorkexperiencePost((workexperiencePost: any) => ({
            ...workexperiencePost,
            [name]: value,
        }));
    }

    const handlePopulateWorkExp = async (id: number) => {
        setSaveBtn(false)      
        setUpdateBtn(true)  
        setLoading(false);
        try {
            const res_workExp = await axios.get(`http://127.0.0.1:8000/user/Workexperience/${id}/`)
            const workExpDataList = res_workExp.data;

            if (Object.keys(workExpDataList).length > 0) {
                Object.entries(workExpDataList).forEach(([key, value]) => {
                    setWorkexperiencePost((workExpData: any) => {
                        return {
                            ...workExpData, [key]: value
                        }
                    })
                })
            }
        } catch (error) {
            setError("Work experiance not updated")
        } finally {
            setLoading(false)
        }
    }

    const workExpUpdated = async (id: number) => {
        setSaveBtn(false)
        try {
            console.log("workExpUpdated", id);
            const payloadWorkExp = {
                id: WorkexperiencePost.id,
                current_job_title: WorkexperiencePost.current_job_title,
                company_name: WorkexperiencePost.company_name,
                start_date: WorkexperiencePost.start_date,
                end_date: WorkexperiencePost.end_date,
                is_current_company: WorkexperiencePost.is_current_company,
                workplace: WorkexperiencePost.workplace,
                employment_type: WorkexperiencePost.employment_type,
                currency_type: WorkexperiencePost.currency_type,
                current_salary: WorkexperiencePost.current_salary,
                description: WorkexperiencePost.description,
            }

            const res_workExpPut = await axios.put(`http://127.0.0.1:8000/user/Workexperience/${id}/`, payloadWorkExp)
            const result = res_workExpPut.data;
            setMessage("updated successfully")

            const workExpObj = Array.isArray(workExpData)
            if (workExpObj) {
                const updateWorkExp = workExpData?.map(work => work.id === result.id ? result : work
                )
                setWorkExpData(updateWorkExp)
            }
            

        } catch (error) {
            setError("Work experiance not updated")
           
        }
    }

    const handleClearForm = () => {
        setWorkexperiencePost({
            current_job_title: '',
            company_name: '',
            is_current_company: '',
            start_date: '',
            end_date: '',
            workplace: '',
            employment_type: '',
            current_salary: '',
            description: ''
        });
    };

    const workExpDelete = (id: any) => {
        alert("Are you sure you want to delete?");
        try {
            axios.delete(`http://127.0.0.1:8000/user/Workexperience/${id}/`)

            setWorkExpData((preData: any) =>
                Array.isArray(preData) ? preData.filter(item => item.id !== id) : []
            );

            
        } catch (error) {
            setError("Work experience not deleted")
            
        }
    }

    // const handleDeleteProject = async (id: any) => {
    //     try {
    //         alert("Are you sure you want to delete?");
    //         // Proceed with delete request if ID is valid
    //         await axios.delete(`http://127.0.0.1:8000/user/Projects/${id}/`);
    //         setProjectsData((prevItems: any) =>
    //             Array.isArray(prevItems) ? prevItems.filter(item => item.id !== id) : []
    //         );
    //     } catch (error) {
    //         console.error("Error deleting item:", error);
    //         alert("Failed to delete the item");
    //     }
    // };

    // work experiance end 

    return (
        <main>
            <ToastContainer />
            <div className="card-header fw-bold">
                <span><i className="bi bi-duffle text-secondary me-2"></i> Work Experience</span>  <button className='btn btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#addWorkExperiance"> +Add</button></div>
            <div className="card-body">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    workExpData.length > 0 ? (
                        workExpData.sort((a: any, b: any) => {
                            if (a.job_title > b.job_title) return -1;
                            if (a.job_title < b.job_title) return 1;
                            return 0;
                        }).map((item: any, index: number) => (
                            <ul className='list-unstyled profile-sec' key={index}>
                                <li>
                                    <span className='text-secondary'>Job Title:</span> <span className='lt-blue-c'>{item.current_job_title}</span>
                                    <button
                                        className="bi bi-pencil-square float-end btn"
                                        onClick={() => handlePopulateWorkExp(item.id)}
                                        data-bs-toggle="modal"
                                        data-bs-target="#addWorkExperiance"
                                    ></button>
                                </li>
                                <li><span className='text-secondary'>Company Name:</span> {item.company_name}</li>
                                <li><span className='text-secondary'>Date:</span> {item.start_date.split('T')[0]} to {item.end_date.split('T')[0]}</li>
                                <li><span className='text-secondary'>Is Current Company:</span> {item.is_current_company ? "Yes" : "No"}</li>
                                <li><span className='text-secondary'>Workplace:</span> {item.workplace}</li>
                                <li><span className='text-secondary'>Employment Type:</span> {item.employment_type}</li>
                                <li><span className='text-secondary'>Current Salary:</span>{item.currency_type} {item.current_salary}</li>
                                <li><span className='text-secondary'>Description:</span> {item.description}</li>
                            </ul>
                        ))
                    ) : (
                        <p>No data found</p>
                    )
                )}

            </div>


            <div className="modal fade" id="addWorkExperiance" aria-labelledby="addWorkExperianceLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addWorkExperianceLabel">Work Experience</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmitWorkExpPost}>
                            <div className="modal-body">
                                {/* work experiance start */}
                                <form className="job-form py-1">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="current_job_title" className="form-label">Current Job Title *</label>
                                                <input type="text"
                                                    className="form-control"
                                                    id="current_job_title"
                                                    name='current_job_title'
                                                    placeholder="Recent job title"
                                                    value={WorkexperiencePost.current_job_title}
                                                    onChange={handleInputWorkExpForm} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="company_name" className="form-label">Company Name *</label>
                                                {workExpData.company_name}
                                                <input type="text"
                                                    className="form-control"
                                                    id="company_name"
                                                    placeholder="Most recent company"
                                                    name='company_name'
                                                    value={WorkexperiencePost.company_name}
                                                    onChange={handleInputWorkExpForm} />
                                            </div>
                                        </div>

                                        <div className="col-md-5">
                                            <div className="mb-3">
                                                <label className="form-label">Is This Your Current Company?</label>
                                                <div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            id="is_current_company"
                                                            name="is_current_company"
                                                            value="Yes"
                                                            checked={WorkexperiencePost.is_current_company === "Yes"}
                                                            onChange={handleInputWorkExpForm}
                                                        />
                                                        <label className="form-check-label" htmlFor="is_current_company_yes">Yes</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input
                                                            className="form-check-input"
                                                            type="radio"
                                                            id="is_current_company"
                                                            name="is_current_company"
                                                            value="No"
                                                            checked={WorkexperiencePost.is_current_company === "No"}
                                                            onChange={handleInputWorkExpForm}
                                                        />
                                                        <label className="form-check-label" htmlFor="is_current_company_no">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="mb-3 row">
                                                <div className="col">
                                                    <label htmlFor="start_date" className="form-label">Start Date</label>
                                                    {/* <input type='date'
                                                        className="form-control"
                                                        id="start_date"
                                                        name='start_date'
                                                        value={WorkexperiencePost.start_date}
                                                        onChange={handleInputWorkExpForm} />
                                                         */}
                                                       
                                                    <DatePicker
                                                        className='form-control'
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        name="start_date"
                                                        showYearDropdown
                                                    />
                                                </div>

                                                <div className="col">
                                                    <label htmlFor="end_date" className="form-label">End Date</label>
                                                    {/* <input type='date'
                                                        className="form-control"
                                                        id="end_date"
                                                        name='end_date'
                                                        value={WorkexperiencePost.end_date}
                                                        onChange={handleInputWorkExpForm} /> */}
                                                    
                                                         <DatePicker
                                                        className='form-control'
                                                        selected={endDate}
                                                        onChange={(date) => setEndDate(date)}
                                                        name="end_date"
                                                        showYearDropdown
                                                        maxDate={new Date()}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor='workplace'>Workplace</label>
                                                <div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="workplace"
                                                            id="workplace"
                                                            value="in_office"
                                                            checked={WorkexperiencePost.workplace === "in_office"}
                                                            onChange={handleInputWorkExpForm} />
                                                        <label className="form-check-label" htmlFor="inOffice">In-Office</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio"
                                                            name="workplace" id="hybrid"
                                                            value="hybrid"
                                                            checked={WorkexperiencePost.workplace === "hybrid"}
                                                            onChange={handleInputWorkExpForm} />
                                                        <label className="form-check-label" htmlFor="hybrid">Hybrid</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input"
                                                            type="radio"
                                                            name="workplace"
                                                            id="workFromHome"
                                                            value="work_from_home"
                                                            checked={WorkexperiencePost.workplace === "Work From Home"}
                                                            onChange={handleInputWorkExpForm} />
                                                        <label className="form-check-label" htmlFor="workFromHome">Work from home</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="employment_type" className="form-label">Employment Type</label>
                                                <select className="form-select" id="employment_type" name='employment_type' value={WorkexperiencePost.employment_type} onChange={handleInputWorkExpForm}>
                                                    <option selected>Select</option>
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
                                                    <label htmlFor="current_salary" className="form-label">Current Salary (LPA) *</label>
                                                    <select className="form-select" id="current_salary" name='current_salary' value={WorkexperiencePost.currency_type} onChange={handleInputWorkExpForm}>
                                                        <option selected>Select</option>
                                                        {/* Other currency options */}
                                                        <option value="INR">Indian Rupee (INR)</option>
                                                        <option value="USD">US Dollar (USD)</option>
                                                        <option value="AED">UAE Dirham (AED)</option>
                                                    </select>
                                                </div>
                                                <div className="col mt-2">
                                                    <label htmlFor="current_salary"></label>
                                                    <input type="number"
                                                        className="form-control"
                                                        id="current_salary"
                                                        name='current_salary'
                                                        placeholder="Enter your current salary"
                                                        value={WorkexperiencePost.current_salary}
                                                        onChange={handleInputWorkExpForm} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="">
                                                <label htmlFor="description" className="form-label">Description</label>
                                                <textarea className="form-control"
                                                    id="description"
                                                    name='description'
                                                    placeholder="Enter your description"
                                                    value={WorkexperiencePost.description}
                                                    onChange={handleInputWorkExpForm}></textarea>
                                                <small className="form-text text-muted">Max. 1000 characters</small>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                                {/* work experiance end */}
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" className="delete-btn" data-bs-dismiss="modal" onClick={() => workExpDelete(WorkexperiencePost.id)}><i className="bi bi-trash3"></i></button>
                                <span>
                                    <button type="button" className="cancel-btn me-3" onClick={handleClearForm}>Cancel</button>
                                    {updateBtn ? <button type="button" onClick={() => workExpUpdated(WorkexperiencePost.id)} className="update-btn mx-3" data-bs-dismiss="modal">Update</button> : ""}
                                    
                                    {saveBtn ? <button type="submit" data-bs-dismiss="modal" className="save-btn">Save</button> : ""}
                                    
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default WorkExperience