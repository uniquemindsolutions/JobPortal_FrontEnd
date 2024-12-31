import React, { useEffect, useState } from 'react'
import './profile.scss'
import axios from 'axios';
import Projects from './Projects';
import PersonalDetails from './PersonalDetails';
import EducationDetails from './EducationDetails';
import Languages from './Languages';
import Skills from './Skills';
import JobPreferences from './JobPreferences';
import WorkExperience from './WorkExperience';

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

    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [resume, setResume] = useState<File | null>(null);
    const [resumeName, setResumeName] = useState<string | null>(null); // State for resume file name
    const [resumeLink, setResumeLink] = useState<any>();
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const [cities, setCities] = useState<City[]>([]);
    const [desingList, setDesingList] = useState<any>([])
    const [getYears, setGetYears] = useState<any>([])
    const [getUserProfile, setGetUserProfile] = useState<any>([])
    const [postUserProfile, setPostUserProfile] = useState<any>({
        id: 0,
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        total_experience: 0,
        total_months: '',
        notice_period: '',
        current_location: '',
        preferred_locations: '',
        functional_area: 0,
        profile_photo: null,
        resume: '',
        current_company_name: '',
    });
    useEffect(() => {
        GetHandleUserProfile();
        fetchCities();
        DesignationsList();
        getYearss();
        handlePopulateEditProfile(1);
    }, [])

    const handleInputFormUserpro = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setPostUserProfile((postUserProfile: any) => ({
            ...postUserProfile,
            [name]: value,
        }));
    }

    const GetHandleUserProfile = async () => {
        setLoading(true);
        try {
            const res_profileDetals = await axios.get("http://127.0.0.1:8000/user/Userprofile/4/")
            const profile_list = res_profileDetals.data
            setGetUserProfile(profile_list)
            setPreview(profile_list.profile_photo); // Generate preview URL for profile photo
            console.log("profile data ==== ", profile_list);
            setResumeLink(profile_list.resume);
        } catch (error) {
            setError("Personal data not found")
        }
    }

    const PostHandleUserProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();

            // Append file fields
            if (profilePhoto) data.append('profile_photo', profilePhoto);
            if (resume) data.append('resume', resume);

            // Append other form data
            for (const key in postUserProfile) {
                const value = postUserProfile[key as keyof typeof postUserProfile];

                // Convert non-string values to strings
                data.append(key, typeof value === 'number' ? value.toString() : value);
            }

            if (!profilePhoto) {
                setUploadStatus('Please select a file to upload.');
                return;
            }

            data.append('profile_photo', profilePhoto); // Append the file

            const response = await axios.post('http://127.0.0.1:8000/user/Userprofile/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Response:', response.data);
            setUploadStatus('Profile data uploaded successfully!');
        } catch (error) {
            console.error('Error uploading profile:', error);
            setError('Error: User profile not uploaded');
        } finally {
            setLoading(false);
        }
    };

    const ProfileUpdateProference = async (id: any) => {
        console.log("Updating jobPreferences with ID:", id);
        try {
            const payLoadProfilePrefer = {
                ...postUserProfile
                // id: postUserProfile.id,
                // first_name: postUserProfile.first_name,
                // last_name: postUserProfile.last_name,
                // email: postUserProfile.email,
                // phone_number: postUserProfile.phone_number,
                // current_company_name: postUserProfile.current_company_name,
                // total_experience: postUserProfile.total_experience,
                // total_months: postUserProfile.total_months,
                // notice_period: postUserProfile.notice_period,
                // current_location: postUserProfile.current_location,
                // preferred_locations: postUserProfile.preferred_locations,
                // functional_area: postUserProfile.functional_area,
                // profile_photo: postUserProfile.profile_photo,

            };

            const submissionData = new FormData();
            Object.keys(payLoadProfilePrefer).forEach(key => {
                submissionData.append(key, (payLoadProfilePrefer as any)[key]);
            });
            // alert(profilePhoto)
            // console.log(profilePhoto, 'test Photo ====');

            if (profilePhoto) {
                alert(profilePhoto)
                submissionData.append('profile_photo', profilePhoto)
            }
            if (resume) {
                submissionData.append('resume', resume)
            }

            console.log("payLoadProfilePrefer ===:", payLoadProfilePrefer);

            // data.append('profile_photo', profilePhoto); // Append the file

            const put_response = await axios.post('http://127.0.0.1:8000/user/getuserprofile/', submissionData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });


            const result = put_response.data;
            console.log("Project list 111 ===", result);

            setPostUserProfile(result)

            if (Array.isArray(getUserProfile)) {
                const updatedJobPrefence = getUserProfile.map(user =>
                    user.id === result.id ? result : user
                );

                console.log(updatedJobPrefence, "updatedJobPrefence");
                setGetUserProfile(updatedJobPrefence);
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Axios error:", error.response?.data || error.message);
            } else {
                console.error("Unexpected error:", error);
            }
            alert("Failed to submit the job preferences");
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the selected file
        if (file) {
            setProfilePhoto(file); // Save the file
            setPreview(URL.createObjectURL(file)); // Generate and set a preview URL
        } else {
            // setProfilePhoto('')
        }
    };
    const handleFileResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the selected file
        const { name } = e.target;
        if (file) {
            if (name) {
                const allowedExtensions = /(\.pdf|\.doc|\.docx)$/i;
                if (!allowedExtensions.exec(file.name)) {
                    alert('Invalid file type. Please upload a .pdf, .doc, or .docx file.');
                    return;
                }
                setResume(file);
                setResumeName(file.name);
            }
            // setResume(file); // Save the file
            // setPreview(URL.createObjectURL(file)); // Generate and set a preview URL
        }
    };

    const handlePopulateEditProfile = async (id: number) => {
        // setUpdateBtn(true)
        // setSaveBtn(false)
        setLoading(true);

        try {
            const res_project_edit = await axios.get(`http://127.0.0.1:8000/user/Userprofile/4/`);
            const projectdataEdit = res_project_edit.data;

            if (Object.keys(projectdataEdit).length > 0) {
                Object.entries(projectdataEdit).forEach(([key, value]) => {
                    setPostUserProfile((postUserProfile: any) => ({
                        ...postUserProfile,
                        [key]: value, // Dynamically update the key based on input name
                    }));
                });
            }
            console.log("post UserProfile ====", postUserProfile);

        } catch (error) {
            setError("personal data not found");
        } finally {
            setLoading(false);
        }
    };

    const DesignationsList = async () => {
        setLoading(true);
        try {
            const res_desigList = await axios.get('http://127.0.0.1:8000/user/PreferredJobTitle/');
            const desingData = res_desigList.data;
            setDesingList(desingData); // Update state with fetched data
        } catch (error) {
            console.error("Error fetching job titles:", error);
            setError("Error: Job titles not fetched.");
        } finally {
            setLoading(false); // Ensure loading is reset
        }
    };

    const desigJobsList = (id: any) => {
        const Desig = desingList.find((dis: any) => dis.id === id)
        return Desig ? Desig.preferredjobtitle : ''
    }

    const getYearss = async () => {
        try {
            const res_years = await axios.get('http://127.0.0.1:8000/user/Years/');
            setGetYears(res_years.data)
        } catch (error) {
            setError("Error: Year not fectch")
        }
    }

    const yearsDropList = (id: any) => {
        const yearsDrop = getYears.find((yrs: any) => yrs.id === id)
        return yearsDrop ? yearsDrop.experience_level : ""
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
                    <button onClick={() => handlePopulateEditProfile(1)}
                        className="bi bi-pencil-square btn float-end position-absolute end-0"
                        data-bs-toggle="modal"
                        data-bs-target="#addProfile"
                        style={{ marginRight: '4%', marginTop: '-2%' }}
                        title='Edit'></button>

                    <div className="row form-control-sec">
                        <div className="col-sm-3 col-lg-3 text-center mb-3">
                            <h6>Profile picture</h6>
                            {preview ? <img className='profile-pic' src={getUserProfile.profile_photo} alt="Profile pic" /> :
                                <img className='profile-pic' src={window.location.origin + '/images/avtar-pic.avif'} alt="Profile pic" />
                            }
                        </div>

                        <div className="col-sm-9 col-lg-8 offset-lg-1">
                            <div className="row">
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="first_name" className="form-label">First Name</label>
                                    <div className="form-control-redonly">{postUserProfile.first_name}</div>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="last_name" className="form-label">Last Name</label>
                                    <div className="form-control-redonly">{postUserProfile.last_name}</div>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="email" className="form-label">Email ID</label>
                                    <div className="form-control-redonly">{postUserProfile.email}</div>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="phone_number" className="form-label">Phone Number</label>
                                    <div className="form-control-redonly">{postUserProfile.phone_number}</div>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="phone_number" className="form-label">Current Comapny</label>
                                    <div className="form-control-redonly">{postUserProfile.current_company_name}</div>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label className="form-label">Job Title</label>
                                    <div className="form-control-redonly">{desigJobsList(postUserProfile.functional_area)}</div>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="phone_number" className="form-label">Total Experience (Years)</label>
                                    <div className="form-control-redonly">{yearsDropList(postUserProfile.total_experience)} Year {postUserProfile.total_months}</div>
                                </div>

                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label className="form-label">Resume</label>
                                    <div className="form-control-redonly" title={postUserProfile.resume}>{postUserProfile.resume}</div>
                                    {resumeLink && (<a className='btn-sm btn text-secondary float-end'
                                        href={resumeLink}
                                        download="downloaded-file.ext" // Set the desired file name and extension here
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: 'black', textDecoration: 'none' }}
                                    >
                                        <small>Download</small>
                                    </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body bg-light">
                            <div className="row">
                                <div className="col-sm-6 col-lg-4 mb-3">
                                    <label htmlFor="current_location" className="form-label">Current Location </label>
                                    <div className="form-control-redonly">{citysList(postUserProfile.current_location)}</div>
                                </div>
                                <div className="col-sm-6 col-lg-4 mb-3">
                                    <label htmlFor="preferred_location" className="form-label">Preferred Locations</label>
                                    <div className="form-control-redonly">{citysList(postUserProfile.preferred_locations)}</div>
                                </div>
                                <div className="col-sm-6 col-lg-4 mb-3">
                                    <label htmlFor="noticeperiod" className="form-label">Notice Period</label>
                                    <div className="form-control-redonly">{postUserProfile.notice_period}</div>
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
                        <form onSubmit={PostHandleUserProfile} encType="multipart/form-data">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="addProfileLabel">Profile Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body py-0 custom-card px-lg-3">
                                {/* education details start */}
                                <form className="education-form">
                                    <div className="row">
                                        <div className="col-sm-12 col-lg-12 mb-3 mt-3">
                                            <label htmlFor="upload_ profile_image" className="form-label">Upload Profile Image </label>  <span className='float-end text-secondary'><small>(Upload a picture less than 100kb)</small></span>

                                            <input
                                                type="file"
                                                className="form-control"
                                                id="profilePicture"
                                                name="profile_photo"
                                                accept="image/*" // Restrict to image files
                                                onChange={handleFileChange}
                                                onClick={() => handlePopulateEditProfile}
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="first_name" className="form-label">First Name *</label>
                                                <input type="input"
                                                    className="form-control"
                                                    id="first_name"
                                                    name="first_name"
                                                    value={postUserProfile.first_name}
                                                    onChange={handleInputFormUserpro} required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                                <input type="input"
                                                    className="form-control"
                                                    id="last_name"
                                                    name="last_name"
                                                    value={postUserProfile.last_name}
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
                                                    value={postUserProfile.email}
                                                    onChange={handleInputFormUserpro} required />
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
                                                    value={postUserProfile.phone_number}
                                                    onChange={handleInputFormUserpro} required />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="current_company_name" className="form-label">Company Name</label>
                                                <input type="input"
                                                    className="form-control"
                                                    id="current_company_name"
                                                    name="current_company_name"
                                                    value={postUserProfile.current_company_name}
                                                    onChange={handleInputFormUserpro} />
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="functional_area" className="form-label">Job Ttile</label>
                                                <select className="form-select" id="functional_area" name="functional_area"
                                                    value={postUserProfile.functional_area} onChange={handleInputFormUserpro}>
                                                    <option>Select</option>
                                                    {desingList.map((desi: any) => (
                                                        <option key={desi.id} value={desi.id}>
                                                            {desi.preferredjobtitle}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-sm-6 col-lg-12 mb-3">
                                            <label htmlFor="resume" className="form-label">Upload Resume</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                id="resume"
                                                name="resume"
                                                accept=".pdf,.doc,.docx" // Restrict accepted formats
                                                onChange={handleFileResumeChange}
                                            />
                                            <span className='float-end text-secondary'><small>(Accepted format includes PDF, DOC & DOCX)</small></span>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="total_experience" className="form-label">Total Experience</label>
                                                <select
                                                    className="form-select"
                                                    id="total_experience"
                                                    name="total_experience"
                                                    value={postUserProfile.total_experience}
                                                    onChange={handleInputFormUserpro}
                                                >
                                                    <option value="">Select</option>
                                                    {getYears.map((yrs: any) => (
                                                        <option key={yrs.id} value={yrs.id}>
                                                            {yrs.experience_level} Year
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="passingYear" className="form-label"> </label>
                                                <select className="form-select mt-2" name='total_months' value={postUserProfile.total_months} onChange={handleInputFormUserpro}>
                                                    <option>Select</option>
                                                    <option value="1 month">1 Month</option>
                                                    <option value="2 months">2 Months</option>
                                                    <option value="3 months">3 Months</option>
                                                    <option value="4 months">4 Months</option>
                                                    <option value="5 months">5 Months</option>
                                                    <option value="6 months">6 Months</option>
                                                    <option value="7 months">7 Months</option>
                                                    <option value="8 months">8 Months</option>
                                                    <option value="9 months">9 Months</option>
                                                    <option value="10 months">10 Months</option>
                                                    <option value="11 months">11 Months</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="passingYear" className="form-label">Current Location *</label>
                                                <select className="form-select" id="current_location" value={postUserProfile.current_location} onChange={handleInputFormUserpro} name="current_location" required>
                                                    <option>Select</option>
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
                                                <select className="form-select" id="preferred_locations" value={postUserProfile.preferred_locations} onChange={handleInputFormUserpro} name="preferred_locations">
                                                    <option>Select</option>
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
                                                <select className='form-select' value={postUserProfile.notice_period} onChange={handleInputFormUserpro} id="notice_period" name="notice_period">
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
                                <button type="button" onClick={ProfileUpdateProference} className="update-btn" data-bs-dismiss="modal">Update</button>
                                {/* <button type="submit" data-bs-dismiss="modal" className="save-btn">Save</button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default Profiles