import React, { useEffect, useState } from 'react'
import './profile.scss'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { url } from 'inspector';
import Projects from './Projects';
import PersonalDetails from './PersonalDetails';
import EducationDetails from './EducationDetails';
import Languages from './Languages';
import Skills from './Skills';
import JobPreferences from './JobPreferences';
import WorkExperience from './WorkExperience';

interface Industry {
    id: number;
    industry: string;
}
interface City {
    id: number;
    name: string;
    state: string;
}

const Profiles = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');


    const [preview, setPreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const [cities, setCities] = useState<City[]>([]);
    const [industry, setIndustry] = useState<Industry[]>([]);

    const [getUserProfile, setGetUserProfile] = useState<any>([])
    const [postUserProfile, setPostUserProfile] = useState({
        profile_photo: '',
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        resume: '',
        industry: '',
        total_experience: '',
        notice_period: '',
        current_location: 0,
        preferred_locations: 0
    });

    useEffect(() => {
        GetHandleUserProfile();
        handleIndustry();
        fetchCities();
    }, [])

    const handleInputFormUserpro = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setPostUserProfile(postUserProfile => ({
            ...postUserProfile,
            [name]: value,
        }));
    }


    const GetHandleUserProfile = async () => {
        setLoading(true);
        try {
            const res_profileDetals = await axios.get("http://127.0.0.1:8000/user/Userprofile/1/")
            const profile_list = res_profileDetals.data
            setGetUserProfile(profile_list)
        } catch (error) {
            setError("Personal data not found")
        }
    }

    const PostHandleUserProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        try {
            const postData = await axios.post(`http://127.0.0.1:8000/user/Userprofile/`, postUserProfile);
            const dataPost = postData.data;
            setPostUserProfile(dataPost);
        } catch (error) {
            setError("Error: User Profile not posted")
        }

    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file)); // Preview the image
        }

    };
    const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selectedFile) {
            setUploadStatus('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('profile_picture', selectedFile);

        try {
            const response = await axios.post('http://127.0.0.1:8000/user/Userprofile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSelectedFile(selectedFile)
            setUploadStatus('Profile picture uploaded successfully!');
            console.log('Server response:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
            setUploadStatus('Failed to upload profile picture.');
        }
    };




    const handleIndustry = async () => {
        try {
            const res_industry = await axios.get("http://127.0.0.1:8000/industry/")
            const industry_list = res_industry.data;
            setIndustry(industry_list)
        } catch (error) {
            setError("Not found Industry")
        }
    }

    const getIndustryList = (id:any) => {
        const inds = industry.find((ind)=> ind.id === id)
        return inds ? inds.industry : " "
    }


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
    
    const citysList = (id: any) => {
        const city = cities.find((cty: any) => cty.id === id)
        return city ? city.name : ""
    }

    return (
        <main>
            <div className=" mt-4">
                <h5>Profile</h5>
                <div className="custom-card form-control-sec">
                    <button
                        className="bi bi-pencil-square btn float-end position-absolute end-0"
                        data-bs-toggle="modal"
                        data-bs-target="#addProfile"
                        style={{ marginRight: '4%', marginTop: '-2%' }}
                        title='Edit'></button>

                    <div className="row form-control-sec">
                        <div className="col-sm-3 col-lg-3 text-center mb-3">
                            <h6>Profile picture</h6>
                            {preview ? <img className='profile-pic' src={preview} alt="Profile pic" /> :
                                <img className='profile-pic' src={window.location.origin + '/images/avtar-pic.avif'} alt="Profile pic" />
                            }
                        </div>

                        <div className="col-sm-9 col-lg-8 offset-lg-1">
                            <div className="row">
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="first_name" className="form-label">First Name</label>
                                    <div className="form-control-redonly">{getUserProfile.first_name}</div>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="last_name" className="form-label">Last Name</label>
                                    <div className="form-control-redonly">{getUserProfile.last_name}</div>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="email" className="form-label">Email ID</label>
                                    <div className="form-control-redonly">{getUserProfile.email}</div>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="phone_number" className="form-label">Phone Number</label>
                                    <div className="form-control-redonly">{getUserProfile.phone_number}</div>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label className="form-label">Resume</label>
                                    <div className="form-control-redonly">{getUserProfile.resume}</div>
                                    <button className='btn-sm btn text-secondary'>Download</button>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label className="form-label">Industry</label>
                                    <div className="form-control-redonly">{getIndustryList(getUserProfile.industry)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body bg-light">
                            <div className="row">
                                <div className="col-sm-4 col-lg-4 mb-3">
                                    <label htmlFor="current_location" className="form-label">Current Location </label>
                                    <div className="form-control-redonly">{citysList(getUserProfile.current_location)}</div>
                                </div>
                                <div className="col-sm-4 col-lg-4 mb-3">
                                    <label htmlFor="preferred_location" className="form-label">Preferred Locations</label>
                                    <div className="form-control-redonly">{citysList(getUserProfile.preferred_locations)}</div>
                                </div>
                                <div className="col-sm-4 col-lg-4 mb-3">
                                    <label htmlFor="noticeperiod" className="form-label">Notice Period</label>
                                    <div className="form-control-redonly">{getUserProfile.notice_period}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="custom-card mt-4">
                    <div className="emp-details mt-4">
                        <div className="card mb-3">
                            <WorkExperience />
                        </div>

                        <div className="card mb-3">
                            <EducationDetails />
                        </div>

                        <div className="card mb-3">
                            <JobPreferences />
                        </div>

                        <div className="card mb-3">
                            <Skills />
                        </div>

                        <div className="card mb-3">
                            <Projects />
                        </div>

                        <div className="card mb-3">
                            <PersonalDetails />
                        </div>

                        <div className="card mb-3">
                            <Languages />
                        </div>
                    </div>
                </div>
            </div>


            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addWorkExperiance">
                Launch demo modal
            </button> */}

            <div className="modal fade" id="addProfile" aria-labelledby="addProfileLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <form onSubmit={PostHandleUserProfile}>
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="addProfileLabel">Profile Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body py-0">
                                {/* education details start */}
                                <form className="education-form">
                                    <div className="row">
                                        <div className="col-sm-12 col-lg-12 mb-3">
                                            <label htmlFor="upload_ profile_image" className="form-label">Upload Profile Image </label>  <span className='float-end text-secondary'><small>(Upload a picture less than 100kb)</small></span>
                                            {/* <input type="file" className="form-control" id="profile_photo"
                                                name="profile_photo" onChange={handleFileChange} /> */}

                                            {/* <div>
                                                <input type="file" id="profile_photo"
                                                    name="profile_photo" onChange={handleFileChange} />
                                                <button onClick={uploadImage}>Upload Image</button>
                                            </div> */}

                                            <input
                                                type="file"
                                                accept="image/*"
                                                id="profilePicture"
                                                name="profile_photo"
                                                onChange={handleFileChange} />
                                        </div>


                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="first_name" className="form-label">First Name *</label>
                                                <input type="input"
                                                    className="form-control"
                                                    id="first_name"
                                                    name="first_name"
                                                    onChange={handleInputFormUserpro} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                                <input type="input" 
                                                    className="form-control" 
                                                    id="last_name" 
                                                    name="last_name" 
                                                    onChange={handleInputFormUserpro} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email Id *</label>
                                                <input type="email" 
                                                className="form-control" 
                                                id="email" 
                                                name="email" 
                                                onChange={handleInputFormUserpro} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="phone_number" className="form-label">Phone Number *</label>
                                                <input type="number" 
                                                className="form-control" 
                                                id="phone_number" 
                                                maxLength={10} 
                                                name="phone_number" 
                                                onChange={handleInputFormUserpro} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-lg-6 mb-3">
                                            <label htmlFor="upload_resume" className="form-label">Upload Resume</label>
                                            <input type="file"
                                                className="form-control"
                                                id="resume"
                                                name="resume"
                                                onChange={handleFileChange} />
                                            <span className='float-end text-secondary'><small>(Accepted format includes PDF, DOC & DOCX)</small></span>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="industry" className="form-label">Industry</label>
                                                <select className="form-select" id="total_experience" name="industry" onChange={handleIndustry}>
                                                    <option selected>Select</option>
                                                    {industry && industry.length > 0 ? industry.map((ind: any, index: number) => (
                                                        <option key={index} value={ind.id}>
                                                            {ind.industry}
                                                        </option>
                                                    )) : (
                                                        <option value="">No industries available</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="total_experience" className="form-label">Total Experience</label>
                                                <select className="form-select" id="total_experience" name="total_experience" onChange={handleInputFormUserpro}>
                                                    <option selected>Select</option>
                                                    <option value="Fresher">Fresher</option>
                                                    <option value="1 year">1 year</option>
                                                    <option value="2 years">2 Years</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="passingYear" className="form-label"> </label>
                                                <select className="form-select mt-2" name='total_experience' onChange={handleInputFormUserpro}>
                                                    <option selected>Select</option>
                                                    <option value="1 month">1 Month</option>
                                                    <option value="2 month">2 Month</option>
                                                    <option value="3 month">3 Month</option>
                                                    <option value="4 month">4 Month</option>
                                                    <option value="5 month">5 Month</option>
                                                    <option value="6 month">6 Month</option>
                                                    <option value="7 month">7 Month</option>
                                                    <option value="8 month">8 Month</option>
                                                    <option value="9 month">9 Month</option>
                                                    <option value="10 month">10 Month</option>
                                                    <option value="11 month">11 Month</option>
                                                    <option value="12 month">12 Month</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="passingYear" className="form-label">Current Location *</label>
                                                <select className="form-select" id="current_location" onChange={handleInputFormUserpro} name="current_location">
                                                    <option selected>Select</option>
                                                    {/* <option >Hyderabad</option> */}
                                                    {cities.map((city) => (
                                                        <option key={city.id} value={city.id}>{city.name}</option>
                                                    ))}

                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="preferred_locations" className="form-label">Preferred Locations</label>
                                                <select className="form-select" id="preferred_locations" onChange={handleInputFormUserpro} name="preferred_locations">
                                                    <option selected>Select</option>
                                                    {/* <option>Bangalore</option> */}
                                                    {cities.map((city) => (
                                                        <option key={city.id} value={city.id}>{city.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="passingYear" className="form-label">Notice Period</label>
                                                <select className='form-select' onChange={handleInputFormUserpro} id="notice_period" name="notice_period">
                                                    <option value="">Select</option>
                                                    <option value="Immediately available">Immediately Available</option>
                                                    <option value="15 days">15 Days</option>
                                                    <option value="30 days">30 Days</option>
                                                    <option value="45 days">45 Days</option>
                                                    <option value="2 Months">2 Months</option>
                                                    <option value="3 Months">3 Months</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {/* education details end */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="cancel-btn">Cancel</button>
                                <button type="button" className="update-btn" data-bs-dismiss="modal">Update</button>
                                <button type="submit" data-bs-dismiss="modal" className="save-btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default Profiles