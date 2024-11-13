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


    // work experiance start 

    // const handleFormSubmit = async (e:any) => {
    //     e.preventDefault(); // Prevents page reload on form submit
    //     // const formData = new FormData();
    //     // for (const key in Workexperience) {
    //     //     formData.append(key, Workexperience[key as keyof typeof Workexperience] as string);
    //     // }

    //     try {
    //         // Make POST request to the API endpoint
    //         const response = await axios.post(
    //             `http://127.0.0.1:8000/user/Workexperience/`, WorkexperiencePost,
    //         );
    //         setMessage("Workexperience Created sucessfully");
    //         alert('Workexperience created successfully!');
    //         console.log(response.data);
    //     } catch (err) {
    //         setError('Failed to create Workexperience');
    //         console.error(err);
    //     }
    // };
    const workExpGet = async () => {
        setLoading(true)
        try {
            const res_workExp = await axios.get('http://127.0.0.1:8000/user/Workexperience/1/')
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
        e.preventDefault();
        try {
            const res_workExp = await axios.post(`http://127.0.0.1:8000/user/Workexperience/`, WorkexperiencePost)
            const workExpData = res_workExp.data;
            setWorkexperiencePost(workExpData)

            setMessage("Workexperience Created sucessfully");
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
        setLoading(true);
        try {
            const res_workExp = await axios.get(`http://127.0.0.1:8000/user/Workexperience/${id}`)
            const workExpData = res_workExp.data;
            setWorkExpEdit(workExpData)

            if (Object.keys(workExpData).length > 0) {
                Object.entries(workExpData).forEach(([key, value]) => {
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

    // test start
    // const handlePopulateEditProjects = async (id: number) => {
    //     setUpdateBtn(true)
    //     setLoading(true);
    //     try {
    //         const res_project_edit = await axios.get(`http://127.0.0.1:8000/user/Projects/${id}/`);
    //         const projectdataEdit = res_project_edit.data;

    //         if (Object.keys(projectdataEdit).length > 0) {
    //             Object.entries(projectdataEdit).forEach(([key, value]) => {
    //                 setProjectsCreate((projectdata: any) => ({
    //                     ...projectdata,
    //                     [key]: value, // Dynamically update the key based on input name
    //                 }));
    //             });
    //         }
    //         console.log("projectsCreateformdata ====", projectsCreate);
    //     } catch (error) {
    //         setError("personal data not found");
    //     } finally {
    //         setLoading(false);
    //     }
        // test end



        const workExpUpdated = async () => {
            try {
                const res_work_exp_put = await axios.put('http://127.0.0.1:8000/user/Workexperience/', workExpData)
                setMessage(res_work_exp_put.data)
            } catch (error) {
                setError("Work experiance not updated")
            }
        }
        // work experiance end 

        return (
            <main>
                <div className="card-header fw-bold">
                    <span><i className="bi bi-duffle text-secondary me-2"></i> Work Experience</span>  <button className='btn btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#addWorkExperiance"> +Add</button></div>
                <div className="card-body">
                    {workExpData.length > 0 && workExpData.map((item: any, index: number) => (
                        <ul className='list-unstyled profile-sec' key={index}>
                            <li><span className='text-secondary'>Job Titile:</span> <span className='lt-blue-c'>{item.current_job_title}</span>
                                <button className="bi bi-pencil-square float-end btn" onClick={() => handlePopulateWorkExp(item.id)} data-bs-toggle="modal" data-bs-target="#addWorkExperiance"></button></li>
                            <li><span className='text-secondary'>Company Name:</span> {item.company_name}</li>
                            <li><span className='text-secondary'>Date:</span> {item.start_date.split('T')[0]} to {item.end_date.split('T')[0]} {item.is_company_name}</li>
                            <li><span className='text-secondary'>Is Current Company:</span> {item.is_current_company} {item.is_company_name}</li>
                            <li><span className='text-secondary'>Workplace:</span> {item.workplace}</li>
                            <li><span className='text-secondary'>Employment Type:</span> {item.employment_type}</li>
                            <li><span className='text-secondary'>Current Salary:</span> {item.current_salary} </li>
                            <li><span className='text-secondary'>Description:</span> {item.description}</li>
                        </ul>
                    ))}

                    {/* <ul className='list-unstyled profile-sec'>
                    <li className='lt-blue-c'>Ui Designer And Developer 123 <button className="bi bi-pencil-square float-end btn" data-bs-toggle="modal" data-bs-target="#addWorkExperiance"></button></li>
                    <li>Vishist Business Solutions</li>
                    <li>Feb 2022 to Oct 2022</li>
                    <li>Annual salary : 200000</li>
                    <li>Description</li>
                </ul> */}

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
                                                        value={workExpData.current_job_title}
                                                        onChange={handleInputWorkExpForm} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="mb-3">
                                                    <label htmlFor="company_name" className="form-label">Company Name *</label>
                                                    <input type="text"
                                                        className="form-control"
                                                        id="company_name"
                                                        placeholder="Most recent company"
                                                        name='company_name'
                                                        value={workExpData.company_name}
                                                        onChange={handleInputWorkExpForm} />
                                                </div>
                                            </div>

                                            <div className="col-md-12">
                                                <div className="mb-3">
                                                    <label className="form-label">Is This Your Current Company?</label>
                                                    <div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input"
                                                                type="radio"
                                                                id="is_current_company"
                                                                name="is_current_company"
                                                                value={workExpData.yes}
                                                                checked={WorkexperiencePost.is_current_company === "yes"}
                                                                onChange={handleInputWorkExpForm} />
                                                            <label className="form-check-label" htmlFor="currentCompanyYes">Yes</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input"
                                                                type="radio"
                                                                name="is_current_company"
                                                                id="is_current_company"
                                                                value={workExpData.no}
                                                                checked={WorkexperiencePost.is_current_company === "no"}
                                                                onChange={handleInputWorkExpForm} />
                                                            <label className="form-check-label" htmlFor="is_current_company">No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="mb-3 row">
                                                    <div className="col">
                                                        <label htmlFor="start_date" className="form-label">Start Date</label>
                                                        <input type='date' 
                                                        className="form-control" 
                                                        id="start_date" 
                                                        name='start_date' 
                                                        value={workExpData.start_date}
                                                        onChange={handleInputWorkExpForm} />
                                                    </div>

                                                    <div className="col">
                                                        <label htmlFor="end_date" className="form-label">End Date</label>
                                                        <input type='date' 
                                                        className="form-control" 
                                                        id="end_date" 
                                                        name='end_date'
                                                        value={workExpData.end_date}
                                                        onChange={handleInputWorkExpForm} />
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
                                                                value="Work From Home"
                                                                checked={workExpData.workplace === "Work From Home"}
                                                                onChange={handleInputWorkExpForm} />
                                                            <label className="form-check-label" htmlFor="workFromHome">Work from home</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-md-4">
                                                <div className="mb-3">
                                                    <label htmlFor="employment_type" className="form-label">Employment Type</label>
                                                    <select className="form-select" id="employment_type" name='employment_type' onChange={handleInputWorkExpForm}>
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
                                                        <label htmlFor="current_salary" className="form-label">Current Salary (Annually) *</label>
                                                        <select className="form-select" id="current_salary" name='current_salary' onChange={handleInputWorkExpForm}>
                                                            <option selected>Select</option>
                                                            {/* Other currency options */}
                                                            <option value="INR">Indian Rupee (INR)</option>
                                                            <option value="USD">US Dollar (USD)</option>
                                                            <option value="AED">UAE Dirham (AED)</option>
                                                        </select>
                                                    </div>
                                                    <div className="col mt-2">
                                                        <label htmlFor=""></label>
                                                        <input type="number" className="form-control" id="salary" placeholder="Enter your current salary" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="">
                                                    <label htmlFor="description" className="form-label">Description</label>
                                                    <textarea className="form-control" id="description" name='description' placeholder="Enter your description" onChange={handleInputWorkExpForm}></textarea>
                                                    <small className="form-text text-muted">Max. 1000 characters</small>
                                                </div>
                                            </div>

                                        </div>
                                    </form>
                                    {/* work experiance end */}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="cancel-btn" data-bs-dismiss="modal">Cancel</button>
                                    <button type="button" onClick={workExpUpdated} className="update-btn" data-bs-dismiss="modal">Update</button>
                                    <button type="submit" data-bs-dismiss="modal" className="save-btn">Save</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>


            </main>
        )
    }

    export default WorkExperience