import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Job_Preferences {
    preferred_department_function: number;
    preferred_job_title: string;
    job_type: string;
    employee_type: string;
    prefreed_workplace: string;
    preferred_location: string;
    what_are_you_currently_looking_for: string;
}
interface PreferredJobTitle {
    id: number
    preferredjobtitle: string;
}
interface City {
    id: number;
    name: string;
    state: string;
}
interface PreferredDepartmentFunction {
    id: number
    preferred_departement_name: string;
}

const JobPreferences = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const [getJobPreferences, setGetJobPreferences] = useState<Job_Preferences | null>(null);
    const [jobPreferences, setJobPreferences] = useState<any>({
        job_type: "",
        employee_type: "",
        prefreed_workplace: "",
        what_are_you_currently_looking_for: "",
        preferred_department_function: "",
        preferred_job_title: "",
        preferred_location: "",
    });
    const [getJobPreferencesEdit, setJobPreferencesEdit] = useState<string | null>(null);
    const [cities, setCities] = useState<City[]>([]);
    const [PreferredDepartmentFunction, setPreferredDepartmentFunction] = useState<PreferredDepartmentFunction[]>([]);
    const [PreferredJobTitle, setPreferredJobTitle] = useState<PreferredJobTitle[]>([]);

    useEffect(() => {
        jobPreferencesGet();

        const PreferredJobTitle = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/PreferredJobTitle/');
                setPreferredJobTitle(response.data);  // Set the fetched users to state
            } catch (err) {
                setError('Failed to fetch PreferredJobTitle');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        PreferredJobTitle();

        const PreferredDepartmentFunction = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/PreferredDepartmentFunction/');
                setPreferredDepartmentFunction(response.data);  // Set the fetched users to state
            } catch (err) {
                setError('Failed to fetch PreferredDepartmentFunction');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        PreferredDepartmentFunction();

        const fetchCities = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/Cities/');
                setCities(response.data);  // Set the fetched users to state
            } catch (err) {
                setError('Failed to fetch Cities');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        fetchCities();
    }, [])

    //Job Preferences start

    const jobPreferencesGet = async () => {
        setLoading(true);
        try {
            const res_jobPreferences = await axios.get(`http://127.0.0.1:8000/user/JobPreferences/2/`)
            const jobPreferences_list = res_jobPreferences.data;
            setGetJobPreferences(jobPreferences_list)
            console.log("Job Preferences data list1 ===", jobPreferences_list);
        } catch (error) {
            setError("Job Preferences data not found");
        }
    }

    const handleInputJobPreferences = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setJobPreferences({ ...jobPreferences, [name]: value });

        // const { name, value } = e.target;
        // setJobPreferences((jobPreferences: any) => ({
        //     ...jobPreferences,
        //     [name]: value,
        // }));
    }

    const handleSubmitJobPreferences = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/user/JobPreferences/`, jobPreferences);
            setJobPreferences(response)
            console.log("JobPreferences ===:", response.data); // Log response here
            // Handle response, e.g., add job prefer to state or show success message
        } catch (error) {
            console.error("API Error:", error); // Log any errors
        }
    }

    const handleInputEditJobPreferences = async () => {
        setLoading(true);
        try {
            const res_JobPrefer = await axios.get(`http://127.0.0.1:8000/user/JobPreferences/`);
            const res_JobPreferencesEdit = res_JobPrefer.data[0];
            // setJobPreferencesEdit(res_JobPreferencesEdit);

            if (Object.keys(res_JobPreferencesEdit).length > 0) {
                Object.entries(res_JobPreferencesEdit).forEach(([key, value]) => {
                    setJobPreferences((jobPreferences: any) => ({
                        ...jobPreferences,
                        [key]: value, // Dynamically update the key based on input name
                    }));
                });
            }

            console.log("form Job Preferences ====", jobPreferences);
        } catch (error) {
            setError("JobPreferences data not found");
        } finally {
            setLoading(false);
        }
    };

    const updateJobProference = async (id: any) => {
        console.log("Updating jobPreferences with ID:", id);
        try {
            const payLoadJobPrefer = {
                id: jobPreferences.id,
                job_type: jobPreferences.job_type,
                employee_type: jobPreferences.employee_type,
                prefreed_workplace: jobPreferences.prefreed_workplace,
                what_are_you_currently_looking_for: jobPreferences.what_are_you_currently_looking_for,
                preferred_department_function: jobPreferences.preferred_department_function,
                preferred_job_title: jobPreferences.preferred_job_title,
                preferred_location: jobPreferences.preferred_location,
            }

            console.log("payLoadJobPrefer ===:", payLoadJobPrefer);
            const put_response = await axios.put(`http://127.0.0.1:8000user/JobPreferences/${id}`, payLoadJobPrefer);
            const result = put_response.data;
            alert("Hi")
            // const put_data=put_response.;
            console.log("projectlist", getJobPreferences);

            const dataobj = Array.isArray(getJobPreferences);
            if (dataobj) {
                const updatedJobPrefence = getJobPreferences?.map(user =>
                    user.id === result.id ? result : user
                );

                console.log(updatedJobPrefence, "updatedJobPrefence");
                setGetJobPreferences(getJobPreferences);
            };
        } catch (error) {
            console.error("Error submitting job prefer:", error);
            alert("Failed to submit the job preferences");
        }
    }

    const getDepartmentName = (departmentId: number) => {
        const department = PreferredDepartmentFunction.find(dept => dept.id === departmentId);
        return department ? department.preferred_departement_name : 'N/A';
    };

    const cityList = (cityId: any) => {
        const cityListName = cities.find(cities => cities.id === cityId);
        return cityListName ? cityListName.name : 'N/A';
    }

    const PreferJobTitle = (jobId: any) => {
        const jobTitile = PreferredJobTitle.find(jobTitleId => jobTitleId.id === jobId);
        return jobTitile ? jobTitile.preferredjobtitle : 'N/A';
    }

    //Job Preferences end
    return (
        <main>
            <div className="card-header fw-bold">
                <span><i className="bi bi-card-checklist text-secondary me-2"></i> Job Preferences </span>
                <button onClick={handleInputEditJobPreferences} className="bi bi-pencil-square float-end btn  py-0" data-bs-toggle="modal" data-bs-target="#addJobPreferences"></button></div>
            <div className="card-body">
                {getJobPreferences && (
                    <ul className='list-unstyled profile-sec'>
                        <li className='lt-blue-c'>
                            Preferred Department: {getDepartmentName(getJobPreferences.preferred_department_function)}
                        </li>
                        <li><span className='text-secondary'>Preferred Job Title:</span> {PreferJobTitle(getJobPreferences.preferred_job_title)}</li>
                        <li><span className='text-secondary'>Preferred Location:</span> {cityList(getJobPreferences.preferred_location)}</li>
                        <li><span className='text-secondary'>Job Type:</span> {getJobPreferences.job_type}</li>
                        <li><span className='text-secondary'>Employment Type:</span> {getJobPreferences.employee_type}</li>
                        <li><span className='text-secondary'>Preferred Workplace:</span> {getJobPreferences.prefreed_workplace}</li>
                        <li><span className='text-secondary'>What are you currently looking for?:</span>  {getJobPreferences.what_are_you_currently_looking_for}</li>
                    </ul>
                )}

            </div>


            <div className="modal fade" id="addJobPreferences" aria-labelledby="addJobPreferencesLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addJobPreferencesLabel">Job Preferences</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="job-preference-form" onSubmit={handleSubmitJobPreferences}>
                            <div className="modal-body">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="department" className="form-label">Preferred Department/Function</label>
                                            <select className="form-select" name="preferred_department_function" id="preferred_department_function" value={jobPreferences.preferred_department_function}
                                                onChange={handleInputJobPreferences}>
                                                <option>Select</option>
                                                {/* Options for departments */}
                                                {PreferredDepartmentFunction.map((jobPrep) => {
                                                    return <option key={jobPrep.id}
                                                        value={jobPrep.id}>{jobPrep.preferred_departement_name}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="jobTitle" className="form-label">Preferred Job Title *</label>

                                            <select className="form-select" name="preferred_job_title" id="preferred_job_title" value={jobPreferences.preferred_job_title} onChange={handleInputJobPreferences}>
                                                <option>Select</option>
                                                {/* Options for job titles */}
                                                {PreferredJobTitle.map((preferredjobtitle) => {
                                                    return <option key={preferredjobtitle.id} value={preferredjobtitle.id}>{preferredjobtitle.preferredjobtitle}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 mb-3">
                                        <label className="form-label">Job Type {jobPreferences?.job_type}</label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" id="permanent"
                                                    name="job_type"
                                                    value="Permanent"
                                                    checked={jobPreferences?.job_type === 'Permanent'}
                                                    onChange={handleInputJobPreferences} />
                                                <label className="form-check-label" htmlFor="permanent">Permanent</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input"
                                                    type="radio"
                                                    id="temporary"
                                                    name="job_type"
                                                    value="Temporary/Contract"
                                                    checked={jobPreferences?.job_type === 'Temporary/Contract'}
                                                    onChange={handleInputJobPreferences} />
                                                <label className="form-check-label" htmlFor="temporary">Temporary/Contract</label>
                                            </div>
                                            
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input"
                                                    type="radio"
                                                    id="bothJobType"
                                                    name="job_type"
                                                    value="both"
                                                    checked={jobPreferences?.job_type === 'both'}
                                                    onChange={handleInputJobPreferences} />
                                                <label className="form-check-label" htmlFor="bothJobType">Both</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 mb-3">
                                        <label className="form-label">Employment Type</label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="fullTime"
                                                    name="employee_type"
                                                    value="Full Time" // Set the specific value for this radio button
                                                    checked={jobPreferences?.employee_type === 'Full Time'}
                                                    onChange={handleInputJobPreferences}
                                                />
                                                <label className="form-check-label" htmlFor="fullTime">Full time</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="partTime"
                                                    name="employee_type"
                                                    value="Part Time" // Set the specific value for this radio button
                                                    checked={jobPreferences?.employee_type === 'Part Time'}
                                                    onChange={handleInputJobPreferences}
                                                />
                                                <label className="form-check-label" htmlFor="partTime">Part time</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="bothEmployment"
                                                    name="employee_type"
                                                    value="Both" // Set the specific value for this radio button
                                                    checked={jobPreferences?.employee_type === 'Both'}
                                                    onChange={handleInputJobPreferences}
                                                />
                                                <label className="form-check-label" htmlFor="bothEmployment">Both</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 mb-3">
                                        <label className="form-label">Preferred Workplace</label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input"
                                                    type="radio"
                                                    id="office"
                                                    name="prefreed_workplace"
                                                    value="In-Office"
                                                    checked={jobPreferences?.prefreed_workplace === 'In-Office'}
                                                    onChange={handleInputJobPreferences} />
                                                <label className="form-check-label" htmlFor="office">In-Office</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input"
                                                    type="radio"
                                                    id="hybrid"
                                                    name="prefreed_workplace"
                                                    value="hybrid"
                                                    checked={jobPreferences?.prefreed_workplace === 'hybrid'}
                                                    onChange={handleInputJobPreferences} />
                                                <label className="form-check-label" htmlFor="hybrid">Hybrid</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input"
                                                    type="radio"
                                                    id="workFromHome"
                                                    name="prefreed_workplace"
                                                    value="Work from home"
                                                    checked={jobPreferences?.prefreed_workplace === 'Work from home'}
                                                    onChange={handleInputJobPreferences} />
                                                <label className="form-check-label" htmlFor="workFromHome">Work from home</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="location" className="form-label">Preferred Location *</label>
                                        <select className="form-select" id="preferred_location" name="preferred_location" value={jobPreferences?.preferred_location} onChange={handleInputJobPreferences}>
                                            <option selected>Select</option>
                                            {/* Options for locations */}
                                            {cities.map((city) => (
                                                <option key={city.id} value={city.id}>{city.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="currentlyLookingFor" className="form-label">What are you currently looking for?</label>
                                        <select className="form-select" value={jobPreferences?.what_are_you_currently_looking_for} id="what_are_you_currently_looking_for"
                                            name="what_are_you_currently_looking_for" onChange={handleInputJobPreferences}>
                                            <option selected>Select</option>
                                            <option value='Job'>Job</option>
                                            <option value='Intership'>Internship</option>
                                        </select>
                                    </div>
                                </div>

                            </div>
                            <div className="modal-footer">
                                <button type="button" className="cancel-btn" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" onClick={updateJobProference} className="update-btn" data-bs-dismiss="modal">Update</button>
                                <button type="submit" className="save-btn" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default JobPreferences