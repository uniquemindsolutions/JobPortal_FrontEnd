import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface JobPreferenceModel {
    id?: number; // Optional for new entries
    preferred_department_function: number;
    preferred_job_title: string;
    preferred_location: string;
    job_type: string;
    prefreed_workplace: string;
    employee_type: string;
    preferred_workplace: string;
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
interface PreferredDepart {
    id: number
    preferred_departement_name: string;
}

const JobPreferences = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [saveBtn, setSaveBtn] = useState(false)

    const [getJobPreferences, setGetJobPreferences] = useState<any>({});
    const [postJobPreferences, setPostJobPreferences] = useState<JobPreferenceModel>({
        preferred_department_function: 0,
        preferred_job_title: "",
        preferred_location: "",
        job_type: "",
        prefreed_workplace: "",
        employee_type: "",
        preferred_workplace: "",
        what_are_you_currently_looking_for: "",
    });
    const [jobPreferences, setJobPreferences] = useState<JobPreferenceModel[]>([]);
    const [editingId, setEditingId] = useState<number | null>(null); // Track ID for updates

    const JobPreferencesApiUrl = "http://127.0.0.1:8000/user/JobPreferences/";

    const [cities, setCities] = useState<City[]>([]);
    const [preferredDepartment, setPreferredDepartment] = useState<PreferredDepart[]>([]);
    const [PreferredJobTitle, setPreferredJobTitle] = useState<PreferredJobTitle[]>([]);

    useEffect(() => {
        getMethodJobPreferences();

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
        getPrefererdDepartList();
        fetchCities();
    }, [])

    const handleInputJobPreferences = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPostJobPreferences({ ...postJobPreferences, [name]: value });
    }

    const getMethodJobPreferences = async () => {
        setLoading(true);
        try {
            const response = await axios.get(JobPreferencesApiUrl);
            setJobPreferences(response.data);
        } catch (error) {
            console.error("Error fetching job preferences:", error);
        }
    }

    const postMethodJobPreferences = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(JobPreferencesApiUrl, postJobPreferences);
            setJobPreferences([...jobPreferences, response.data]);
            setPostJobPreferences({
                ...postJobPreferences
            });
        } catch (error) {
            console.error("Error creating job preference:", error);
        }

        // try {
        //     setLoading(true);
        //     const postJobPrepApi = await axios.post('http://127.0.0.1:8000/user/JobPreferences/', postJobPreferences);
        //     const jobPrepData = postJobPrepApi.data;
        //     setPostJobPreferences(jobPrepData);
        // }
        // catch (error) {
        //     console.error("API Error:");
        // }
    };


    const PopulateJobPreferences = async (id: number) => {
        setLoading(true);
        try {
            const res_JobPrefer = await axios.get(`http://127.0.0.1:8000/user/JobPreferences/1/`);
            const res_JobPrefPopulate = res_JobPrefer.data; // Assuming response is a single object

            if (Object.keys(res_JobPrefPopulate).length > 0) {
                Object.entries(res_JobPrefPopulate).forEach(([keys, value]) => {
                    setPostJobPreferences((JobPrefPopulateData: any) => (
                        { ...JobPrefPopulateData, [keys]: value }
                    ))
                })
            }

            // if (res_JobPrefPopulate) {
            //     setPostJobPreferences(res_JobPrefPopulate); // Update the entire object
            // } else {
            //     console.error("JobPreferences data is empty");
            // }
        } catch (error) {
            setError("JobPreferences data not found");
        } finally {
            setLoading(false);
        }
    };

    const updateJobProference = async (id: any) => {
        if (!editingId) return; // Ensure there's an ID to update
        try {
            

            const response = await axios.put(`${JobPreferencesApiUrl}${editingId}/`, postJobPreferences);
            setJobPreferences((prev) =>
                prev.map((item) => (item.id === editingId ? response.data : item))
            );
            setEditingId(null);
            setPostJobPreferences({
                ...postJobPreferences
            });

            const upDateJobPrep = new FormData();
            Object.keys(postJobPreferences).forEach(key => {
                upDateJobPrep.append(key, (postJobPreferences as any)[key])
            })
        } catch (error) {
            console.error("Error updating job preference:", error);
        }


        // console.log("Updating jobPreferences with ID:", id);
        // try {
        //     const payLoadJobPrefer = {
        //         ...postJobPreferences, id: 1,
        //     };
        //     console.log(id, "ID...");
        //     const upDateJobPrep = new FormData();
        //     Object.keys(payLoadJobPrefer).forEach(key => {
        //         upDateJobPrep.append(key, (payLoadJobPrefer as any)[key])
        //     })

        //     const put_response = await axios.post(
        //         `http://127.0.0.1:8000/user/get-jobpreference/`, payLoadJobPrefer
        //     );

        //     const result = put_response.data;
        //     console.log("projectlist", getJobPreferences);

        //     if (Array.isArray(getJobPreferences)) {
        //         const updatedJobPrefence = getJobPreferences.map(user =>
        //             user.id === result.id ? result : user
        //         );

        //         console.log(updatedJobPrefence, "updatedJobPrefence");
        //         setGetJobPreferences(updatedJobPrefence);
        //     }
        // } catch (error) {
        //     if (axios.isAxiosError(error)) {
        //         console.error("Axios error:", error.response?.data || error.message);
        //     } else {
        //         console.error("Unexpected error:", error);
        //     }
        //     alert("Failed to submit the job preferences");
        // }
    };

    const getPrefererdDepartList = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/user/PreferredDepartmentFunction/');
            setPreferredDepartment(response.data);  // Set the fetched users to state
        } catch (err) {
            setError('Failed to fetch Preferred Department Function');
        } finally {
            setLoading(false);  // Stop loading
        }
    }

    const getDepartmentName = (departmentId: number) => {
        const department = preferredDepartment.find((dept: any) => dept.id === departmentId);
        return department ? department.preferred_departement_name : '';
    };

    const cityList = (cityId: any) => {
        const cityListName = cities.find(cities => cities.id === cityId);
        return cityListName ? cityListName.name : '';
    }

    const PreferJobTitle = (jobId: any) => {
        const jobTitile = PreferredJobTitle.find(jobTitleId => jobTitleId.id === jobId);
        return jobTitile ? jobTitile.preferredjobtitle : '';
    }

    //Job Preferences end
    return (
        <main>
            <div className="card-header fw-bold">
                <span><i className="bi bi-card-checklist text-secondary me-2"></i> Job Preferences </span>
                <button onClick={() => PopulateJobPreferences} className="bi bi-pencil-square float-end btn  py-0" data-bs-toggle="modal" data-bs-target="#addJobPreferences"></button>
            </div>

            <div className="card-body">
                <ul className="list-unstyled profile-sec">
                    <li className="lt-blue-c">
                        Preferred Department: {getDepartmentName(postJobPreferences.preferred_department_function)}
                    </li>
                    <li><span className="text-secondary">Preferred Job Title:</span> {PreferJobTitle(postJobPreferences.preferred_job_title)}</li>
                    <li><span className="text-secondary">Preferred Location:</span> {cityList(postJobPreferences.preferred_location)}</li>
                    <li><span className="text-secondary">Job Type:</span> {postJobPreferences.job_type}</li>
                    <li><span className="text-secondary">Employment Type:</span> {postJobPreferences.employee_type}</li>
                    <li><span className="text-secondary">Preferred Workplace:</span> {postJobPreferences.prefreed_workplace}</li>
                    <li><span className="text-secondary">What are you currently looking for?:</span> {postJobPreferences.what_are_you_currently_looking_for}</li>
                </ul>
            </div>

            <div className="modal fade" id="addJobPreferences" aria-labelledby="addJobPreferencesLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addJobPreferencesLabel">Job Preferences</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="job-preference-form" onSubmit={() => postMethodJobPreferences}>
                            <div className="modal-body">

                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="department" className="form-label">Preferred Department/Function {postJobPreferences?.preferred_department_function}</label>
                                            <select
                                                className="form-select"
                                                name="preferred_department_function"
                                                value={postJobPreferences?.preferred_department_function} // Ensure no uncontrolled inputs
                                                onChange={handleInputJobPreferences}>
                                                <option value="">Select</option>
                                                {preferredDepartment && preferredDepartment.map((jobPrep: any) => (
                                                    <option key={jobPrep.id} value={jobPrep.id}>
                                                        {jobPrep.preferred_departement_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="jobTitle" className="form-label">Preferred Job Title *</label>

                                            <select className="form-select" name="preferred_job_title" id="preferred_job_title" value={postJobPreferences.preferred_job_title} onChange={handleInputJobPreferences}>
                                                <option>Select</option>
                                                {/* Options for job titles */}
                                                {PreferredJobTitle.map((preferredjobtitle) => {
                                                    return <option key={preferredjobtitle.id} value={preferredjobtitle.id}>{preferredjobtitle.preferredjobtitle}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 mb-3">
                                        <label className="form-label">Job Type {postJobPreferences.job_type}</label>
                                        <div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="permanent"
                                                    name="job_type"
                                                    value="Permanent"
                                                    checked={postJobPreferences.job_type === 'Permanent'}
                                                    onChange={handleInputJobPreferences}
                                                />
                                                <label className="form-check-label" htmlFor="permanent">Permanent</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input"
                                                    type="radio"
                                                    id="temporary"
                                                    name="job_type"
                                                    value="Temporary/Contract"
                                                    checked={postJobPreferences.job_type === 'Temporary/Contract'}
                                                    onChange={handleInputJobPreferences} />
                                                <label className="form-check-label" htmlFor="temporary">Temporary/Contract</label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input"
                                                    type="radio"
                                                    id="bothJobType"
                                                    name="job_type"
                                                    value="both"
                                                    checked={postJobPreferences.job_type === 'both'}
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
                                                    id="Full_time"
                                                    name="employee_type"
                                                    value="Full_time" // Set the specific value for this radio button
                                                    checked={postJobPreferences.employee_type === 'Full_time'}
                                                    onChange={handleInputJobPreferences}
                                                />
                                                <label className="form-check-label" htmlFor="Full_time">Full time</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="Part_time"
                                                    name="employee_type"
                                                    value="Part_time" // Set the specific value for this radio button
                                                    checked={postJobPreferences.employee_type === 'Part_time'}
                                                    onChange={handleInputJobPreferences}
                                                />
                                                <label className="form-check-label" htmlFor="Part_time">Part time</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id="bothEmployment"
                                                    name="employee_type"
                                                    value="Both" // Set the specific value for this radio button
                                                    checked={postJobPreferences.employee_type === 'Both'}
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
                                                    checked={postJobPreferences.prefreed_workplace === 'In-Office'}
                                                    onChange={handleInputJobPreferences} />
                                                <label className="form-check-label" htmlFor="office">In-Office</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input"
                                                    type="radio"
                                                    id="Hybrid"
                                                    name="prefreed_workplace"
                                                    value="Hybrid"
                                                    checked={postJobPreferences.prefreed_workplace === 'Hybrid'}
                                                    onChange={handleInputJobPreferences} />
                                                <label className="form-check-label" htmlFor="Hybrid">Hybrid</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input"
                                                    type="radio"
                                                    id="Work_from_home"
                                                    name="prefreed_workplace"
                                                    value="Work_from_home"
                                                    checked={postJobPreferences.prefreed_workplace === 'Work_from_home'}
                                                    onChange={handleInputJobPreferences} />
                                                <label className="form-check-label" htmlFor="Work_from_home">Work from home</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="location" className="form-label">Preferred Location *</label>
                                        <select className="form-select" id="preferred_location" name="preferred_location" value={postJobPreferences?.preferred_location} onChange={handleInputJobPreferences}>
                                            <option selected>Select</option>
                                            {/* Options for locations */}
                                            {cities.map((city) => (
                                                <option key={city.id} value={city.id}>{city.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-lg-6 mb-3">
                                        <label htmlFor="currentlyLookingFor" className="form-label">What are you currently looking for?</label>
                                        <select className="form-select" value={postJobPreferences.what_are_you_currently_looking_for} id="what_are_you_currently_looking_for"
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
                                <button type="button" onClick={updateJobProference} className="update-btn" data-bs-dismiss="modal">Update</button>
                                {
                                    saveBtn ? <button type="submit" className="save-btn" data-bs-dismiss="modal">Save</button> : ''
                                }

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default JobPreferences