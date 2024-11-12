import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Education_Details {
    qualification: string;
    specialization: string;
    institute: string;
    grading_system: string;
    marks: string;
    passing_year: string;
    passing_year_temp: Date;
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

    const [Qualification, SetQualification] = useState<Qualification[]>([]);
    const [Specialization, SetSpecialization] = useState<Specialization[]>([]);
    const [Institute, SetInstitute] = useState<Institute[]>([]);
    const [EducationDetails, SetEducationDetails] = useState({
        qualification: '',
        specialization: '',
        institute: '',
        grading_system: '',
        marks: '',
        passing_year: '',
        passing_year_temp: '',
        education_type: ''
    });

    useEffect(()=>{
        educationPutData();

        const qualifications = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/Qualification/');
                SetQualification(response.data);  // Set the fetched users to state
            } catch (err) {
                setError('Failed to fetch Qualification');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        qualifications();

        const Specialization = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/Specialization/');
                SetSpecialization(response.data);  // Set the fetched users to state
            } catch (err) {
                setError('Failed to fetch Specialization');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        Specialization();
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

    const handleForm3Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        SetEducationDetails(EducationDetails => ({
            ...EducationDetails,
            [name]: value,
        }));
    }

    const handleForm3Submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents page reload on form submit
        const formData = new FormData();
        // for (const key in Workexperience) {
        //     formData.append(key, Workexperience[key as keyof typeof Workexperience] as string);
        // }

        try {
            // Make POST request to the API endpoint
            const response = await axios.post(
                "http://127.0.0.1:8000/user/EducationDetails/", formData,
            );
            setMessage("EducationDetails Created sucessfully");
            console.log(response.data);
        } catch (err) {
            setError('Failed to create EducationDetails');
            console.error(err);
        }
    };

    const educationPutData = async () => {
        //     try {
        //         const response = await axios.put(
        //             "http://127.0.0.1:8000/user/EducationDetails/", FormData,
        //         );
        //         setMessage("EducationDetails Created sucessfully");
        //         console.log('education data put =====', response.data);
        //    }catch (err) {
        //     setError('Failed to create EducationDetails');
        //     console.error(err);
        // }
    }
  return (
    <main>
        <div className="card-header fw-bold">
                                <span><i className="bi bi-book text-secondary me-2"></i> Education Details </span>  <button className='btn btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#addEducation"> +Add</button></div>
                            <div className="card-body">
                                <ul className='list-unstyled profile-sec'>
                                    <li className='lt-blue-c'>B.Tech. <button className="bi bi-pencil-square float-end btn" data-bs-toggle="modal" data-bs-target="#addEducation"></button></li>
                                    <li>JNTU</li>
                                    <li>2023 (Full time)</li>
                                </ul>

                                <ul className='list-unstyled profile-sec'>
                                    <li className='lt-blue-c'>Intermediate (MPC) <button className="bi bi-pencil-square float-end btn" data-bs-toggle="modal" data-bs-target="#addEducation"></button></li>
                                    <li>Board of intermediate</li>
                                    <li>2019 (Full time)</li>
                                </ul>

                                <ul className='list-unstyled profile-sec'>
                                    <li className='lt-blue-c'>SSC <button className="bi bi-pencil-square float-end btn" data-bs-toggle="modal" data-bs-target="#addEducation"> </button></li>
                                    <li>SSC Board Telangana</li>
                                    <li>2017 (Full time)</li>
                                </ul>

                            </div>


        <form onSubmit={handleForm3Submit}>
                <div className="modal fade" id="addEducation" aria-labelledby="addEducationLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="addEducationLabel">Education Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* education details start */}
                                <form className="education-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="qualification" className="form-label">Qualification *</label>
                                                <select className="form-select" id="qualification" name='qualification' onChange={handleForm3Change}>
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
                                                <select className="form-select" id="specialization" name='specialization' onChange={handleForm3Change}>
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
                                                <select className="form-select" id="institute" name="institute" onChange={handleForm3Change}>
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
                                                <select className="form-select" id="grading_system" name='grading_system' onChange={handleForm3Change}>
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
                                                <label htmlFor="marks" className="form-label">Marks</label>
                                                <input type="number" className="form-control" id="marks" name='marks' placeholder="Enter your Marks" onChange={handleForm3Change} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="passingYear" className="form-label">Passing Year *</label>
                                                <input type="month" className='form-control' id="passing_year" name="passing_year" onChange={handleForm3Change} />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="mb-3">
                                                <label className="form-label">Education Type *</label>
                                                <div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="education_type" id="Full time" value="Full time" />
                                                        <label className="form-check-label" htmlFor="fullTime">Full time</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="education_type" id="Part time" value="Part time" />
                                                        <label className="form-check-label" htmlFor="partTime">Part time</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="education_type" id="Correspondence" value="Correspondence" />
                                                        <label className="form-check-label" htmlFor="correspondence">Correspondence</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                                {/* education details end */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
    </main>
  )
}

export default EducationDetails