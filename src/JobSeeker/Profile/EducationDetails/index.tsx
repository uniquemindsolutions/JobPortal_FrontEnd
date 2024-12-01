import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Education_Details {
    qualification: string;
    specialization: string;
    institute: string;
    grading_system: string;
    marks: string;
    passing_year: string;
    // passing_year_temp: Date;
    education_type: string;
}
interface Qualification {
    id: number;
    name: string;
}
interface Specialization {
    id: number;
    qualification: string;
    name: string;
}
interface Institute {
    id: number;
    institute_name: string;
}

const EducationDetails = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [updateBtn, setUpdateBtn] = useState(false);
    const [saveBtn, setSaveBtn] = useState(true);

    const [Qualification, SetQualification] = useState<Qualification[]>([]);
    const [Specialization, SetSpecialization] = useState<Specialization[]>([]);
    const [Institute, SetInstitute] = useState<Institute[]>([]);
    const [getEducation, setGetEducation] = useState<any>([])
    const [postEducationDetails, SetPostEducationDetails] = useState<any>({
        qualification: '',
        specialization: '',
        institute: '',
        grading_system: '',
        marks: '',
        passing_year: '',
        // passing_year_temp: '',
        education_type: ''
    });

    useEffect(() => {
        GetEducationDetails();

        const Specialization = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/Specialization/');
                SetSpecialization(response.data);  // Set the fetched users to state
            } catch (error) {
                setError('Failed to fetch Specialization');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        Specialization();

        const qualifications = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/Qualification/');
                SetQualification(response.data);  // Set the fetched users to state
            } catch (error) {
                setError('Failed to fetch Qualification');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        qualifications();

        const Institute = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/Institute/');
                SetInstitute(response.data);  // Set the fetched users to state
            } catch (err) {
                setError('Failed to fetch Institute');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        Institute();
    }, [])

    const SpzList = (id: any) => {
        const specilizData = Specialization.find((sp: any) => sp.id === id)
        return specilizData ? specilizData.name : ""
    }

    const qualiList = (id: any) => {
        const qualiData = Qualification.find((q: any) => q.id === id)
        return qualiData ? qualiData.name : ""
    }

    const GetEducationDetails = async () => {
        setLoading(true);
        try {
            const res_edu = await axios.get(`http://127.0.0.1:8000/user/EducationDetails/`);
            console.log("API response:", res_edu.data); // Log to check data structure
            const edu_list = Array.isArray(res_edu.data) ? res_edu.data : [res_edu.data];
            setGetEducation(edu_list);
            setLoading(false);
        } catch (error) {
            setError("Education data not found");
            setLoading(false);
        }
    };

    const handleInputEduForm = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        SetPostEducationDetails({ ...postEducationDetails, [name]: value });
    }

    const handlePostEduDetailsForm = async (e: React.FormEvent<HTMLFormElement>) => {
        setSaveBtn(true)
        e.preventDefault(); // Prevents page reload on form submit

        try {

            // Make POST request to the API endpoint
            const response = await axios.post("http://127.0.0.1:8000/user/EducationDetails/", postEducationDetails,)
            const post_res = response.data
            SetPostEducationDetails(post_res)
            setMessage("EducationDetails Created sucessfully");
            console.log(response.data);
            // const toggle = true;
            toast.success("Education Details Created sucessfully", {
                position: "bottom-right",
                theme: "colored"
            });
        } catch (error) {
            setError('Failed to create EducationDetails');
        }
    };

    const handlePopuplateEduDetails = async (id: number) => {
        setUpdateBtn(true)
        setSaveBtn(false)
        try {
            const pupulateEduData = await axios.get(`http://127.0.0.1:8000/user/EducationDetails/${id}/`)
            const eduDataList = pupulateEduData.data;

            if (Object.keys(eduDataList).length > 0) {
                Object.entries(eduDataList).forEach(([keys, value]) => {
                    SetPostEducationDetails((educationData: any) => ({
                        ...educationData, [keys]: value
                    }))
                })
            }
        } catch (error) {
            setError("not data found")
        }
    }

    const updateEduDetails = async (id: number) => {
        try {
            console.log("Updating education details:", id);
            const payloadEduDetails = {
                passing_year: postEducationDetails.passing_year,
                grading_system: postEducationDetails.grading_system,
                marks: postEducationDetails.marks,
                education_type: postEducationDetails.education_type,
                qualification: postEducationDetails.qualification,
                specialization: postEducationDetails.specialization,
                institute: postEducationDetails.institute,
            }

            const res_updateEdu = await axios.put(`http://127.0.0.1:8000/user/EducationDetails/${id}/`, payloadEduDetails)
            const updateEdu = res_updateEdu.data

            const eudUpdateObj = Array.isArray(getEducation)
            if (eudUpdateObj) {
                const eduUpdate = getEducation?.map(edu => edu.id === updateEdu.id ? updateEdu : edu)
                setGetEducation(eduUpdate)
            }

            toast.success("Education Details Updated sucessfully", {
                position: "bottom-right",
                theme: "colored",
                // toggle:true,
            });
        } catch (error) {
            toast.error("Failed to submit the education details", {
                position: "bottom-right",
                theme: "colored"
            });
        }
    }

    const cancelEduDeatial = () => {
        SetPostEducationDetails({
            passing_year: '',
            grading_system: '',
            marks: '',
            education_type: '',
            qualification: '',
            specialization: '',
            institute: '',
        })
    }

    const deleteEduDetails = async (id: number) => {
        alert("Are you sure you want to delete?");
        try {
            await axios.delete(`http://127.0.0.1:8000/user/EducationDetails/${id}/`)
            setGetEducation((eduDel: any) =>
                Array.isArray(eduDel) ? eduDel.filter((item: any) => item.id !== id) : []
            );
            toast.warning("Education Details Deleted sucessfully", {
                position: "bottom-right",
                theme: "colored"
            });

        } catch (error) {
            setError("education detail not deleted")
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


    return (
        <main>
            <ToastContainer />
            <div className="card-header fw-bold">
                <span><i className="bi bi-book text-secondary me-2"></i> Education Details </span>  <button className='btn btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#addEducation"> +Add</button></div>
            <div className="card-body">

                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : getEducation.length > 0 ? (
                    getEducation.map((education: any, index: number) => (
                        <ul className='list-unstyled profile-sec' key={index}>
                            <li className='lt-blue-c'>
                                Qualification: {qualiList(education.qualification)}
                                <button
                                    className="bi bi-pencil-square float-end btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addEducation"
                                    onClick={() => handlePopuplateEduDetails(education.id)}
                                ></button>
                            </li>
                            <li><span className='text-secondary'>Specialization</span> {SpzList(education.specialization)}</li>
                            <li><span className='text-secondary'>Passing year</span> {education.passing_year} {education.education_type}</li>
                            <li><span className='text-secondary'>Grading system</span> {education.grading_system}</li>
                            <li><span className='text-secondary'>Marks percentage</span> {education.marks}</li>
                        </ul>
                    ))
                ) : (
                    <p>No data found</p>
                )}

            </div>



            <div className="modal fade" id="addEducation" aria-labelledby="addEducationLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addEducationLabel">Education Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form className="education-form" onSubmit={handlePostEduDetailsForm}>
                            <div className="modal-body">
                                {/* education details start */}
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="qualification" className="form-label">Qualification *</label>
                                            <select className="form-select" id="qualification" name='qualification' value={postEducationDetails.qualification} onChange={handleInputEduForm}>
                                                <option selected>Select</option>
                                                {Qualification.map((qualification) => {
                                                    return <option key={qualification.id} value={qualification.id}>{qualification.name}</option>
                                                })}

                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="specialization" className="form-label">Specialization *</label>
                                            <select className="form-select" id="specialization" name='specialization' value={postEducationDetails.specialization} onChange={handleInputEduForm}>
                                                <option selected>Select</option>
                                                {/* Options for specializations */}
                                                {Specialization.map((specialization) => {
                                                    return <option key={specialization.id} value={specialization.id}>{specialization.name}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="institute" className="form-label">Institute *</label>
                                            <select className="form-select" id="institute" name="institute" value={postEducationDetails.institute} onChange={handleInputEduForm}>
                                                <option selected>Select</option>
                                                {/* Options for institutes */}
                                                {Institute.map((institute) => {
                                                    return <option key={institute.id} value={institute.id}>{institute.institute_name}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="gradingSystem" className="form-label">Grading system</label>
                                            <select className="form-select" id="grading_system" name='grading_system' value={postEducationDetails.grading_system} onChange={handleInputEduForm}>
                                                <option selected>Select</option>
                                                <option value="Scale 10 Grading System">Scale 10 Grading System</option>
                                                <option value="Scale 4 Grading System">Scale 4 Grading System</option>
                                                <option value="% Marks out of 100">% Marks out of 100</option>
                                                <option value="Course only required to pass">Course only required to pass</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="marks" className="form-label">Marks Percentage</label>
                                            <input type="number"
                                                className="form-control"
                                                id="marks"
                                                name='marks'
                                                placeholder="Enter your Marks"
                                                value={postEducationDetails.marks}
                                                onChange={handleInputEduForm} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="passingYear" className="form-label">Passing Year *</label>
                                            <input type="date" className='form-control' id="passing_year" name="passing_year" onChange={handleInputEduForm} />
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="mb-3">
                                            <label className="form-label">Education Type *</label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input"
                                                        type="radio"
                                                        name="education_type"
                                                        id="Full time"
                                                        value="Full Time"
                                                        checked={postEducationDetails.education_type == "Full Time"}
                                                        onChange={handleInputEduForm} />
                                                    <label className="form-check-label" htmlFor="fullTime">Full time</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input"
                                                        type="radio"
                                                        name="education_type"
                                                        id="Part_time"
                                                        value="Part Time"
                                                        checked={postEducationDetails.education_type == "Part Time"}
                                                        onChange={handleInputEduForm} />
                                                    <label className="form-check-label" htmlFor="Part_time">Part time</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input"
                                                        type="radio"
                                                        name="education_type"
                                                        id="Correspondence"
                                                        value="Correspondence"
                                                        checked={postEducationDetails.education_type == "Correspondence"}
                                                        onChange={handleInputEduForm} />
                                                    <label className="form-check-label" htmlFor="correspondence">Correspondence</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* education details end */}
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" onClick={() => deleteEduDetails(postEducationDetails.id)} data-bs-dismiss="modal" className="delete-btn"><i className="bi bi-trash3"></i></button>
                                <span>
                                    <button type="button" onClick={cancelEduDeatial} className="cancel-btn  me-3">Cancel</button>
                                    {updateBtn ?
                                        <button type="button" onClick={() => updateEduDetails(postEducationDetails.id)} className="update-btn me-3" data-bs-dismiss="modal">Update</button> : ""
                                    }
                                    {saveBtn ?
                                        <button type="submit" className="save-btn" data-bs-dismiss="modal">Save</button> : ""
                                    }
                                    {/* <button onClick={notify}>Notify!</button> */}
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default EducationDetails