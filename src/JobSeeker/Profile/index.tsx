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


interface Country {
    id: number;
    name: string;
}

interface City {
    id: number;
    name: string;
    state: string;
}
interface UserProfile {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    noticeperiod: string;
    current_location: number;
    preferred_location: number;
}

interface PreferredDepartmentFunction {
    id: number
    preferred_departement_name: string;
}
interface PreferredJobTitle {
    id: number
    preferredjobtitle: string;
}

interface Email_Push_Notifications {
    daily_new_jobs: boolean;
    applied_jobs: boolean;
    follow_up_credited: boolean;
    follow_up_used: boolean;
    pending_test: boolean;
    promotional: boolean;
    chat_notifications: boolean;
    educational_notifications: boolean;
}
interface Industry {
    id: number;
    industry: string;
}

interface Account_settings {
    hide_profile_from_recruiters: boolean;
    deactivate_account: boolean;
}
const Profiles = () => {
    const { id } = useParams();

    // const [personalFormData, setPersonalFormData] = useState<PersonDetails>();
    const [imageUrl, setImageUrl] = useState('')
    const [cities, setCities] = useState<City[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);

    const [userprofileFormdata, setUserProfileFormdata] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        total_experience: '',
        notice_period: '',
        current_location: 0,
        preferred_location: 0
    });
    const [fileUpload, setFile] = useState<any | null>(null);


    const [PreferredDepartmentFunction, setPreferredDepartmentFunction] = useState<PreferredDepartmentFunction[]>([]);
    const [PreferredJobTitle, setPreferredJobTitle] = useState<PreferredJobTitle[]>([]);

    const [PersonDetails, setPersonDetails] = useState({
        gender: '',
        date_of_birth: '',
        category: '',
        Have_you_taken_a_career_break: '',
        resident_status: '',
        work_permit_for_USA: '',
        work_permit_for_other_country: '',
        Nationality: '',
        i_am_specially_abled: false
    });

    const [Email_Push_Notifications, SetEmail_Push_Notifications] = useState({
        daily_new_jobs: false,
        applied_jobs: false,
        follow_up_credited: false,
        follow_up_used: false,
        pending_test: false,
        promotional: false,
        chat_notifications: false,
        educational_notifications: false
    });
    const [Account_settings, setAccountSetting] = useState({
        hide_profile_from_recruiters: false,
        deactivate_account: false,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [industry, setIndustry] = useState<Industry[]>([]);


    const [eduUpdate, setEduUpdate] = useState([]);

    useEffect(() => {
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
        const fetchCountry = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/Countries/');
                setCountries(response.data);  // Set the fetched users to state
            } catch (err) {
                setError('Failed to fetch Countries');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        fetchCountry();

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
        handleIndustry();
        fetchProfileImage();
        // presonGetMethod();
        handleUserprofileGet();
    }, []);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            console.log(fileUpload, "profile pic ====");
        }
    }

    const uploadImage = async () => {
        if (!fileUpload) return;  // Don't proceed if no image is selected

        const formData = new FormData();
        formData.append("image", fileUpload);

        try {
            // Send POST request to upload image to server
            const response = await axios.post("http://127.0.0.1:8000/user/Userprofile/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setImageUrl(response.data.imageUrl);  // Update image URL after successful upload
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const fetchProfileImage = async () => {
        try {
            const response = await axios.get("/api/profile-image");
            setImageUrl(response.data.imageUrl); // Use default if no image is found
        } catch (error) {
            console.error("Error fetching profile image:", error);
            setImageUrl(imageUrl);  // Fallback to default image on error
        }
    };

    // const handleFileChangelogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         setFilelogo(e.target.files[0]);
    //          console.log(fileUpload, "newfile");         
    //     } else {
    //         // setFormData({
    //         //     ...formData,
    //         //     upload_file: null, // Clear if no file selected
    //         // });
    //     }
    // };

    const handleForm1Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserProfileFormdata(userprofileFormdata => ({
            ...userprofileFormdata,
            [name]: value,
        }));
    }

    const handleIndustry = async () => {
        try {
            const res_industry = await axios.get("http://127.0.0.1:8000/industry/")
            const industry_list = res_industry.data;
            setIndustry(industry_list)
        } catch (error) {
            setError("Not found Industry")
        }
    }

    const handleUserprofileGet = async () => {
        setLoading(true);
        try {
            const res_personal_details = await axios.get("http://127.0.0.1:8000/user/Userprofile/")
            const personal_details_list = res_personal_details.data
            setUserProfileFormdata(personal_details_list)
        } catch (error) {
            setError("Personal dat not found")
        }
    }

    // user profile end

    const handlePersonalDetails = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents page reload on form submit
        const formData = new FormData();
        for (const key in userprofileFormdata) {
            formData.append(key, userprofileFormdata[key as keyof typeof userprofileFormdata] as string);
        }

        try {
            // Make POST request to the API endpoint
            const response = await axios.post(
                "http://127.0.0.1:8000/user/Userprofile/", formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setMessage("User created successfully!");
            alert('profile created successfully!');
            console.log(response.data);
        } catch (err) {
            setError('Failed to create user');
            console.error(err);
        }
    };

    return (
        <main>
            <div className=" mt-4">
                <h5>Profile</h5>
                <div className="custom-card">
                    <button
                        className="bi bi-pencil-square btn float-end position-absolute end-0"
                        data-bs-toggle="modal"
                        data-bs-target="#addProfile"
                        style={{ marginRight: '4%', marginTop: '-2%' }}
                        title='Edit'
                    ></button>
                    <div className="row">
                        <div className="col-sm-3 col-lg-3 text-center mb-3">
                            <h6>Profile picture</h6>
                            <img
                                className='profile-pic'
                                src={imageUrl || window.location.origin + '/images/avtar-pic.avif'}
                                alt="Profile pic"
                            />
                            {/* <label className="btn btn-outline-primary btn-sm">
                                <i className="fa fa-image"></i>Upload image
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    name="profile_photo"
                                    onChange={(e) => handleForm1Change(e)}
                                />
                            </label> */}
                        </div>
                        <div className="col-sm-9 col-lg-8 offset-lg-1">
                            <div className="row">
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="first_name" className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        placeholder='Shekhar'
                                        className="form-control"
                                        value={userprofileFormdata.first_name}
                                        onChange={handleForm1Change} readOnly
                                    />
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="last_name" className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        placeholder='Vadla'
                                        className="form-control"
                                        value={userprofileFormdata.last_name}
                                        onChange={handleForm1Change} readOnly
                                    />
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="email" className="form-label">Email ID</label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder='test@gmail.com'
                                        className="form-control"
                                        value={userprofileFormdata.email}
                                        onChange={handleForm1Change} readOnly
                                    />
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="phone_number" className="form-label">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        placeholder='+91-9876543210'
                                        className="form-control"
                                        value={userprofileFormdata.phone_number}
                                        onChange={handleForm1Change} readOnly
                                    />
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label className="form-label">Resume</label>
                                    <input
                                        type="text"
                                        placeholder='shekhar-vadla-resume.pdf'
                                        className="form-control"
                                        onChange={handleForm1Change} readOnly
                                    />
                                    <button className='btn-sm btn'>Download</button>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="industry" className="form-label">Industry</label>
                                    <input
                                        type="text"
                                        placeholder='IT'
                                        className="form-control" readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body bg-light">
                            <div className="row">
                                <div className="col-sm-4 col-lg-4 mb-3">
                                    <label htmlFor="current_location" className="form-label">Current Location</label>
                                    <input type="text" onChange={handleForm1Change} value={userprofileFormdata.current_location} name="current_location" className="form-control" readOnly />

                                    {/* <select
                                        name="current_location"
                                        className="form-control"
                                        value={userprofileFormdata.current_location}
                                        onChange={handleForm1Change}
                                    >
                                        <option value="">Select Location</option>
                                        {countries.map((country) => (
                                            <option key={country.id} value={country.id}>{country.name}</option>
                                        ))}
                                    </select> */}
                                </div>
                                <div className="col-sm-4 col-lg-4 mb-3">
                                    <label htmlFor="preferred_location" className="form-label">Preferred Locations</label>
                                    <input type="text" className="form-control" value={userprofileFormdata.preferred_location}
                                        onChange={handleForm1Change} readOnly />
                                    {/* <select
                                        name="preferred_location"
                                        className="form-control"
                                        value={userprofileFormdata.preferred_location}
                                        onChange={handleForm1Change}
                                        >
                                        <option value="">Select Preferred Location</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                    </select> */}
                                </div>
                                <div className="col-sm-4 col-lg-4 mb-3">
                                    <label htmlFor="noticeperiod" className="form-label">Notice Period</label>
                                    <input type="text" value={userprofileFormdata.notice_period}
                                        onChange={handleForm1Change} className="form-control readOnly" />
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
            <form onSubmit={handlePersonalDetails}>
                <div className="modal fade" id="addProfile" aria-labelledby="addProfileLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
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

                                            <div>
                                                <input type="file" id="profile_photo"
                                                    name="profile_photo" onChange={handleFileChange} />
                                                <button onClick={uploadImage}>Upload Image</button>
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="first_name" className="form-label">First Name *</label>
                                                <input type="input" className="form-control" id="first_name" placeholder="Enter your First Name"
                                                    name="first_name" onChange={handleForm1Change} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                                <input type="input" className="form-control" id="last_name" placeholder="Enter your Last Name"
                                                    name="last_name" onChange={handleForm1Change} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email Id *</label>
                                                <input type="email" className="form-control" id="email" placeholder="Enter your Email id" name="email" onChange={handleForm1Change} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="phone_number" className="form-label">Phone Number *</label>
                                                <input type="number" className="form-control" id="phone_number" maxLength={10} placeholder="Enter your phone no." name="phone_number" onChange={handleForm1Change} />
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

                                                <select className="form-select" id="total_experience" name="total_experience" onChange={handleIndustry}>
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
                                                <label htmlFor="passingYear" className="form-label">Total Experience</label>
                                                <select className="form-select" id="total_experience" name="total_experience" onChange={handleForm1Change}>
                                                    <option selected>Select</option>
                                                    <option value="Fresher">Fresher</option>
                                                    <option value="Below 1 year">Below 1 year</option>
                                                    <option value="2 years">2 Years</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="passingYear" className="form-label"> </label>
                                                <select className="form-select mt-2">
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
                                                <select className="form-select" id="current_location" onChange={handleForm1Change} name="current_location">
                                                    <option selected>Select</option>
                                                    {/* <option >Hyderabad</option> */}
                                                    {countries.map((country) => (
                                                        <option key={country.id} value={country.id}>{country.name}</option>
                                                    ))}

                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="passingYear" className="form-label">Preferred Locations</label>
                                                <select className="form-select" id="preferred_location" onChange={handleForm1Change} name="preferred_location">
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
                                                <select className='form-select' onChange={handleForm1Change} id="notice_period" name="notice_period">
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
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="update-btn" data-bs-dismiss="modal">Update</button>
                                <button type="submit" data-bs-dismiss="modal" className="save-btn">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </main>
    );
};

export default Profiles