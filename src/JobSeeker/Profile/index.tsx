import React, { useEffect, useState } from 'react'
import './profile.scss'
import axios from 'axios';

interface ITSkill {
    id: number;
    skill: string;
    version: string;
    lastUsed: string;
    experience: string;
}
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
interface PreferredDepartmentFunction {
    id: number
    preferred_departement_name: string;
}
interface PreferredJobTitle {
    id: number
    preferredjobtitle: string;
}
interface Job_Preferences {
    preferred_department_function: string;
    preferred_job_title: string;
    job_type: string;
    employee_type: string;
    prefreed_workplace: string;
    preferred_location: string;
    what_are_you_currently_looking_for: string;
}
interface Skills {
    IT_Skills: string;
    version: string;
    last_used: string;
    experience: string;
}
interface Projects {
    title: string;
    url: string;
    start_date: string;
    end_date: string;
    details_of_project: string;
}
interface PersonDetails {
    gender: string;
    date_of_birth: string;
    category: string;
    Have_you_taken_a_career_break: string;
    resident_status: string;
    work_permit_for_USA: string;
    work_permit_for_other_country: string;
    Nationality: string;
    i_am_specially_abled: string;
}
interface Language {
    id: number;
    Languange_name: string;
}
interface Language_Page {
    languange: string;
    proficiency: string;
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

interface Account_settings {
    hide_profile_from_recruiters: boolean;
    deactivate_account: boolean;
}
const Profiles = () => {
    const [itSkills, setItSkills] = useState([
        { id: 1, skill: 'HTML', version: '5', lastUsed: '-', experience: '8 Years' },
        { id: 2, skill: 'React', version: '-', lastUsed: '-', experience: '-' },
    ]);
    const [cities, setCities] = useState<City[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [newSkill, setNewSkill] = useState<ITSkill>({ skill: '', version: '', lastUsed: '', experience: '', id: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkillId, setCurrentSkillId] = useState(null);
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
    const [PreferredDepartmentFunction, setPreferredDepartmentFunction] = useState<PreferredDepartmentFunction[]>([]);
    const [PreferredJobTitle, setPreferredJobTitle] = useState<PreferredJobTitle[]>([]);;
    const [Job_Preferences, setJob_Preferences] = useState({
        preferred_department_function: '',
        preferred_job_title: '',
        job_type: '',
        employee_type: '',
        prefreed_workplace: '',
        preferred_location: '',
        what_are_you_currently_looking_for: ''
    });
    const [Skills, setSkills] = useState({
        IT_Skills: '',
        version: '',
        last_used: '',
        experience: ''
    });
    const [projects, setProjects] = useState({
        title: '',
        url: '',
        start_date: '',
        end_date: '',
        details_of_project: ''
    });
    const [PersonDetails, setPersonDetails] = useState({
        gender: '',
        date_of_birth: '',
        category: '',
        Have_you_taken_a_career_break: '',
        resident_status: '',
        work_permit_for_USA: '',
        work_permit_for_other_country: '',
        Nationality: '',
        i_am_specially_abled: ''
    });
    const [languange, SetLanguage] = useState<Language[]>([]);;
    const [Language_Page, SetLanguagePage] = useState({
        languange: '',
        proficiency: ''
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
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewSkill({ ...newSkill, [name]: value })

    }
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
        const Languange = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/Languange/');
                SetLanguage(response.data);  // Set the fetched users to state
            } catch (err) {
                setError('Failed to fetch Languange');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        Languange();

    }, []);
    const handleAddSkill = () => {
        if (!newSkill.skill) return; // Don't add empty skill
        setItSkills([...itSkills, { ...newSkill, id: itSkills.length + 1 }]);
        setNewSkill({ skill: '', version: '', lastUsed: '', experience: '', id: 0 }); // Clear form
    };

    // Handle editing a skill
    const handleEditSkill = (id: number) => {
        const skillToEdit = itSkills.find((skill) => skill.id === id);

        // Check if skillToEdit is found
        if (skillToEdit) {
            setNewSkill(skillToEdit); // Set the skill to the form for editing
            setIsEditing(true);
            setCurrentSkillId(null); // Store the id of the skill being edited
        } else {
            console.error('Skill not found');
        }
    };

    // Handle saving an edited skill
    const handleSaveEdit = () => {
        // Check if the currentSkillId exists and there is a valid skill to save
        if (currentSkillId !== null) {
            setItSkills(
                itSkills.map((skill) =>
                    skill.id === currentSkillId ? { ...newSkill, id: currentSkillId } : skill
                )
            );
            // Clear the form and reset editing state
            setNewSkill({ skill: '', version: '', lastUsed: '', experience: '', id: 0 });
            setIsEditing(false);
            setCurrentSkillId(null);
        }
    };

    // Handle deleting a skill
    const handleDeleteSkill = (id: any) => {
        setItSkills(itSkills.filter((skill) => skill.id !== id));
    };
    const handleForm1Submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents page reload on form submit
        const formData = new FormData();
        for (const key in userprofileFormdata) {
            formData.append(key, userprofileFormdata[key as keyof typeof userprofileFormdata] as string);
        }

        try {
            // Make POST request to the API endpoint
            const response = await axios.post(
                "http://127.0.0.1:8000/user/Userprofile/",
                formData,
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
    const handleForm2Submit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    const handleForm3Submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents page reload on form submit
        const formData = new FormData();
        for (const key in Workexperience) {
            formData.append(key, Workexperience[key as keyof typeof Workexperience] as string);
        }

        try {
            // Make POST request to the API endpoint
            const response = await axios.post(
                "http://127.0.0.1:8000/user/EducationDetails/",
                formData,
            );
            setMessage("EducationDetails Created sucessfully");
            alert('EducationDetails created successfully!');
            console.log(response.data);
        } catch (err) {
            setError('Failed to create EducationDetails');
            console.error(err);
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {

            setFile(e.target.files[0]);
            console.log(fileUpload, "newfile");
        }
    }
    const handleForm1Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserProfileFormdata(userprofileFormdata => ({
            ...userprofileFormdata,
            [name]: value,
        }));
    }
    const handleForm2Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setWorkexperience(Workexperience => ({
            ...Workexperience,
            [name]: value,
        }));
    }
    const handleForm3Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        SetEducationDetails(EducationDetails => ({
            ...EducationDetails,
            [name]: value,
        }));
    }
    const handleForm4Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setJob_Preferences(Job_Preferences => ({
            ...Job_Preferences,
            [name]: value,
        }));
    }
    const handleForm5Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setSkills(Skills => ({
            ...Skills,
            [name]: value,
        }));
    }
    const handleForm6Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setProjects(Projects => ({
            ...Projects,
            [name]: value,
        }));
    }
    const handleForm7Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setPersonDetails(PersonDetails => ({
            ...PersonDetails,
            [name]: value,
        }));
    }
    const handleForm8Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        SetLanguagePage(LanguagePage => ({
            ...LanguagePage,
            [name]: value,
        }));
    }
    const handleForm9Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        SetEmail_Push_Notifications(Email_Push_Notifications => ({
            ...Email_Push_Notifications,
            [name]: value,
        }));
    }
    const handleForm10Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setAccountSetting(AccountSetting => ({
            ...AccountSetting,
            [name]: value,
        }));
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
                            <img
                                className='profile-pic'
                                src={window.location.origin + '/images/avtar-pic.avif'}
                                alt="Profile"
                            />
                            <label className="btn btn-outline-primary btn-sm">
                                <i className="fa fa-image"></i>Upload image
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    name="profile_photo"
                                    onChange={(e) => handleForm1Change(e)}
                                />
                            </label>
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
                                        onChange={handleForm1Change}
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
                                        onChange={handleForm1Change}
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
                                        onChange={handleForm1Change}
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
                                        onChange={handleForm1Change}
                                    />
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="resume" className="form-label">Resume</label>
                                    <input
                                        type="text"
                                        name="resume"
                                        placeholder='shekhar-vadla-resume.pdf'
                                        className="form-control"
                                        onChange={handleForm1Change}
                                    />
                                    <button className='btn-sm btn'>Download</button>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="industry" className="form-label">Industry</label>
                                    <input
                                        type="text"
                                        placeholder='IT'
                                        className="form-control"

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
                                    <select
                                        name="current_location"
                                        className="form-control"
                                        value={userprofileFormdata.current_location}
                                        onChange={handleForm1Change}
                                    >
                                        <option value="">Select Location</option>
                                        {countries.map((country) => (
                                            <option key={country.id} value={country.id}>{country.name}</option>
                                        ))}
                                        {/* <option value="India">India</option>
                                            <option value="USA">USA</option>
                                            <option value="UK">UK</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Canada">Canada</option> */}
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                                <div className="col-sm-4 col-lg-4 mb-3">
                                    <label htmlFor="preferred_location" className="form-label">Preferred Locations</label>
                                    <select
                                        name="preferred_location"
                                        className="form-control"
                                        value={userprofileFormdata.preferred_location}
                                        onChange={handleForm1Change}
                                    >
                                        <option value="">Select Preferred Location</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                        {/* <option value="Pan India">Pan India</option>
                                            <option value="Remote">Remote</option>
                                            <option value="On-site">On-site</option> */}
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                                <div className="col-sm-4 col-lg-4 mb-3">
                                    <label htmlFor="noticeperiod" className="form-label">Notice Period</label>
                                    <select
                                        name="noticeperiod"
                                        className="form-control"
                                        value={userprofileFormdata.notice_period}
                                        onChange={handleForm1Change}
                                    >
                                        <option value="">Select Notice Period</option>
                                        <option value="Immediately available">Immediately available</option>
                                        <option value="15 days">15 days</option>
                                        <option value="30 days">30 days</option>
                                        <option value="45 days">45 days</option>
                                        <option value="2 Months">2 Month</option>
                                        <option value="1 Months">3 Month</option>
                                        {/* Add more options as needed */}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="custom-card mt-4">
                    <div className="emp-details mt-4">
                        <div className="card mb-3">
                            <div className="card-header fw-bold">
                                <span><i className="bi bi-duffle text-secondary me-2"></i> Work Experience</span>  <button className='btn btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#addWorkExperiance"> +Add</button></div>
                            <div className="card-body">
                                <ul className='list-unstyled profile-sec'>
                                    <li className='lt-blue-c'>Ui Developer <button className="bi bi-pencil-square float-end btn" data-bs-toggle="modal" data-bs-target="#addWorkExperiance"></button></li>
                                    <li>TCS</li>
                                    <li>Oct 2022 to present</li>
                                    <li>Notice Period : Immediately available</li>
                                    <li>Description</li>
                                </ul>

                                <ul className='list-unstyled profile-sec'>
                                    <li className='lt-blue-c'>Ui Designer And Developer <button className="bi bi-pencil-square float-end btn" data-bs-toggle="modal" data-bs-target="#addWorkExperiance"></button></li>
                                    <li>Vishist Business Solutions</li>
                                    <li>Feb 2022 to Oct 2022</li>
                                    <li>Annual salary : 200000</li>
                                    <li>Description</li>
                                </ul>

                            </div>
                        </div>

                        <div className="card mb-3">
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
                        </div>

                        <div className="card mb-3">
                            <div className="card-header fw-bold">
                                <span><i className="bi bi-card-checklist text-secondary me-2"></i> Job Preferences </span>  <button className="bi bi-pencil-square float-end btn  py-0" data-bs-toggle="modal" data-bs-target="#addJobPreferences"></button></div>
                            <div className="card-body">
                                <ul className='list-unstyled profile-sec'>
                                    <li className='lt-blue-c'>Preferred Department: <b>IT</b></li>
                                    <li>Preferred Location: <b>Hyd</b></li>
                                    <li>Add Preferred Job Title: <b>aaa</b></li>
                                    <li>Add Job Type: <b>Permanent</b></li>
                                    <li>Add Employment Type: <b>Full time </b></li>
                                    <li>Add Preferred Workplace: <b>Work from home</b></li>
                                    <li>Add What are you currently looking for?: <b>aaa</b></li>
                                </ul>
                                {/* */}

                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-header fw-bold">
                                <span><i className="bi bi-gear text-secondary me-2"></i> Skills </span>  <button className="bi bi-pencil-square float-end btn  py-0" data-bs-toggle="modal" data-bs-target="#addSkillSet"></button></div>
                            <div className="card-body">
                                <div className="skill-section">
                                    {/* Skills Header */}
                                    <div className="skills-header">
                                        <h6>Skills</h6>
                                    </div>

                                    {/* Skills List */}
                                    <div className="skills-list">
                                        {['Photoshop', 'Bootstrap', 'Jquery', 'Javascript', 'SCSS', 'HTML5', 'CSS3', 'Angular', 'React'].map((skill, index) => (
                                            <div key={index} className="skill-item">{skill}</div>
                                        ))}
                                    </div>
                                    <hr />
                                    {/* IT Skills Table */}
                                    <div className="it-skills-table table-responsive">
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>IT Skills</th>
                                                    <th>Version</th>
                                                    <th>Last Used</th>
                                                    <th>Experience</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {itSkills.map((skill) => (
                                                    <tr key={skill.id}>
                                                        <td>{skill.skill}</td>
                                                        <td>{skill.version}</td>
                                                        <td>{skill.lastUsed}</td>
                                                        <td>{skill.experience}</td>
                                                        <td>
                                                            <i
                                                                className="bi bi-pencil-square text-primary"
                                                                onClick={() => handleEditSkill(skill.id)}
                                                                style={{ cursor: 'pointer' }}
                                                            />
                                                            <i
                                                                className="bi bi-trash text-danger ms-2"
                                                                onClick={() => handleDeleteSkill(skill.id)}
                                                                style={{ cursor: 'pointer' }}
                                                            />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* Add Button */}
                                    <div className="text-end">
                                        <button className="btn btn-outline-success btn-sm ">
                                            <i className="bi bi-plus-circle"></i> Add Skill
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-header fw-bold">
                                <span><i className="bi bi-clipboard-data text-secondary me-2"></i> Projects </span> <button className='btn btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#addProjects"> +Add</button></div>
                            <div className="card-body">
                                <ul className='list-unstyled profile-sec'>
                                    <li className='lt-blue-c'>Targee Security <button className="bi bi-pencil-square float-end btn  py-0" data-bs-toggle="modal" data-bs-target="#addProjects"></button></li>
                                    <li><a href="#" className='text-decoration-none'>https://targheesec.com/</a></li>
                                    <li>Jan 2024</li>
                                    <li>
                                        Targhee Security streamlines the security assessment process by automating tasks and improving how you communicate your security and trust postures.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-header fw-bold">
                                <span><i className="bi bi-person-vcard text-secondary me-2"></i> Personal Details </span>
                                <button className="bi bi-pencil-square float-end btn  py-0" data-bs-toggle="modal" data-bs-target="#addPersonalDetails"></button></div>
                            <div className="card-body">
                                <ul className='list-unstyled profile-sec'>
                                    <li className='lt-blue-c'>Gender: <b>Male</b> </li>
                                    <li>Date of Birth: <b>05/02/2000</b></li>
                                    <li>Category: <b>Gen</b></li>
                                    <li>Have you taken a career break?: <b>No</b> </li>
                                    <li>Work Permit for USA: <b>No</b> </li>
                                    <li>Nationality: <b>India</b> </li>
                                    <li>Specially abled: <b>No</b> </li>
                                    <li>Add Resident Status: <b>yes</b> </li>
                                    <li>Add Work Permit for Other Country: <b>No</b> </li>
                                </ul>
                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-header fw-bold">
                                <span><i className="bi bi-megaphone text-secondary me-2"></i> Languages </span>
                                <button className='btn btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#addLanguage"> +Add</button>
                            </div>
                            <div className="card-body">
                                <ul className='list-unstyled profile-sec'>
                                    <li className='lt-blue-c '>
                                        <p className='mb-2'>English <button className="bi bi-pencil-square float-end btn  py-0" data-bs-toggle="modal" data-bs-target="#addLanguage"></button></p>
                                        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                                            <input type="checkbox" className="btn-check" id="btncheck1" />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck1">Read</label>

                                            <input type="checkbox" className="btn-check" id="btncheck2" />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck2">Write</label>

                                            <input type="checkbox" className="btn-check" id="btncheck3" />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck3">Speak</label>
                                        </div>
                                    </li>
                                    <li className='mt-3'>
                                        <p className='mb-2'>Telugu</p>
                                        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                                            <input type="checkbox" className="btn-check" id="btncheck22" />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck22">Read</label>

                                            <input type="checkbox" className="btn-check" id="btncheck33" />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck33">Write</label>

                                            <input type="checkbox" className="btn-check" id="btncheck44" />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck44">Speak</label>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addWorkExperiance">
                Launch demo modal
            </button> */}
            <form onSubmit={handleForm1Submit}>
                <div className="modal fade" id="addProfile" aria-labelledby="addProfileLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="addProfileLabel">Personal Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body py-0">
                                {/* education details start */}
                                <form className="education-form">
                                    <div className="row">
                                        <div className="col-sm-12 col-lg-12 mb-3">
                                            <label htmlFor="upload_ profile_image" className="form-label">Upload Profile Image</label>
                                            <input type="file" className="form-control" id="profile_photo"
                                                name="profile_photo" onChange={handleFileChange} />
                                            <span className='float-end text-secondary'><small>(Upload a picture less than 100kb)</small></span>
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
                                                <input type="email" className="form-control" id="email" placeholder="Enter your Email id" name="email"
                                                    onChange={handleForm1Change} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="phone_number" className="form-label">Phone Number *</label>
                                                <input type="number" className="form-control" id="phone_number" placeholder="Enter your phone no." name="phone_number"
                                                    onChange={handleForm1Change} />
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-lg-12 mb-3">
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
                                                <label htmlFor="passingYear" className="form-label">Total Experience</label>
                                                <select className="form-select" id="total_experience" name="total_experience" onChange={handleForm1Change}>
                                                    <option selected>Select Years</option>
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
                                                    <option selected>Select Months</option>
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
                                                    <option selected>Select Current Location</option>
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
                                                    <option selected>Select Preferred Locations</option>
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
                                                    <option value="">Select Notice Period</option>
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
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
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
                                                <option selected>Enter or select your qualification</option>
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
                                                <option selected>Enter or select your specialization</option>
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
                                                <option selected>Enter or select your institute</option>
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
                                                <option selected>Enter or Select your Grading system</option>
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
                                            <input type="number" className="form-control" id="marks" name='marks' placeholder="Enter your Marks" onChange={handleForm3Change}/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="passingYear" className="form-label">Passing Year *</label>
                                            <input type="month" className='form-control' id="passing_year" name="passing_year" onChange={handleForm3Change}/>
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
            <form onSubmit={handleForm2Submit}>
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
                                            <input type="text" className="form-control" id="company_name" placeholder="Most recent company" name='company_name' onChange={handleForm2Change}/>
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Is This Your Current Company?</label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="is_current_company" id="is_current_company" value="yes" onChange={handleForm2Change}/>
                                                    <label className="form-check-label" htmlFor="currentCompanyYes">Yes</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="is_current_company" id="is_current_company" value="no" onChange={handleForm2Change}/>
                                                    <label className="form-check-label" htmlFor="currentCompanyNo">No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="mb-3 row">
                                            <div className="col">
                                                <label htmlFor="startDateYear" className="form-label">Start Date *</label>
                                                <input type='date' className="form-control" id="start_date" name='start_date' onChange={handleForm2Change}/>

                                            </div>
                                            <div className="col">
                                                <label htmlFor="endDateMonth" className="form-label">Start Date *</label>
                                                <input type='date' className="form-control" id="end_date" name='end_date'onChange={handleForm2Change} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="noticePeriod" className="form-label">Notice Period *</label>
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
                                                    <input className="form-check-input" type="radio" name="workplace" id="hybrid" value="hybrid" onChange={handleForm2Change}/>
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
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            </form>
    
            <div className="modal fade" id="addJobPreferences" aria-labelledby="addJobPreferencesLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addJobPreferencesLabel">Job Preferences</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* job prep start */}
                            <form className="job-preference-form">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="department" className="form-label">Preferred Department/Function</label>
                                            <select className="form-select" id="department" onChange={handleForm2Change}>
                                                <option selected>Enter or select your preferred department</option>
                                                {/* Options for departments */}
                                                {PreferredDepartmentFunction.map((preferreddepartmentfunction) => {
                                                    return <option key={preferreddepartmentfunction.id} value={preferreddepartmentfunction.id}>{preferreddepartmentfunction.preferred_departement_name}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="jobTitle" className="form-label">Preferred Job Title *</label>
                                            <select className="form-select" id="jobTitle" onChange={handleForm2Change}>
                                                <option selected>Enter or select your preferred job title</option>
                                                {/* Options for job titles */}
                                                {PreferredJobTitle.map((preferredjobtitle) => {
                                                    return <option key={preferredjobtitle.id} value={preferredjobtitle.id}>{preferredjobtitle.preferredjobtitle}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Job Type</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jobType" id="permanent" value="Permanent" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="permanent">Permanent</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jobType" id="temporary" value="Temporary" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="temporary">Temporary/Contract</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jobType" id="bothJobType" value="Both" onChange={handleForm2Change}/>
                                            <label className="form-check-label" htmlFor="bothJobType">Both</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Employment Type</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="employmentType" id="fullTime" value="Full time" onChange={handleForm2Change}/>
                                            <label className="form-check-label" htmlFor="fullTime">Full time</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="employmentType" id="partTime" value="Part time" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="partTime">Part time</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="employmentType" id="bothEmployment" value="Both" onChange={handleForm2Change}/>
                                            <label className="form-check-label" htmlFor="bothEmployment">Both</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Preferred Workplace</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="workplace" id="office" value="In-Office" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="office">In-Office</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="workplace" id="hybrid" value="Hybrid" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="hybrid">Hybrid</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="workplace" id="workFromHome" value="Work from home" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="workFromHome">Work from home</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Preferred Location *</label>
                                    <select className="form-select" id="location" onChange={handleForm2Change}>
                                        <option selected>Enter or select your preferred location</option>
                                        {/* Options for locations */}
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="currentlyLookingFor" className="form-label">What are you currently looking for?</label>
                                    <select className="form-select" id="currentlyLookingFor" onChange={handleForm2Change}>
                                        <option selected>Select currently looking for</option>
                                        <option selected>Internship</option>
                                        <option selected>Job</option>
                                        {/* Options for what the user is currently looking for */}
                                    </select>
                                </div>
                            </form>
                            {/* job prep end */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addSkillSet" aria-labelledby="addSkillSetLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addSkillSetLabel">Job Preferences</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* skill start */}
                            <form action="">
                                {/* Add/Edit Skill Form */}
                                <div className="add-skill-form">
                                    <div className="mb-3">
                                        <label>IT Skill</label>
                                        <input
                                            type="text"
                                            name="skill"
                                            value={newSkill.skill}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Skill name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Version</label>
                                        <input
                                            type="text"
                                            name="version"
                                            value={newSkill.version}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Version"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Last Used</label>
                                        <input
                                            type="text"
                                            name="lastUsed"
                                            value={newSkill.lastUsed}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Last used date"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Experience</label>
                                        <input
                                            type="text"
                                            name="experience"
                                            value={newSkill.experience}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Experience (e.g., 2 years)"
                                        />
                                    </div>

                                    <div className="add-btn">
                                        {isEditing ? (
                                            <button className="btn btn-success" onClick={handleSaveEdit}>
                                                <i className="bi bi-check-circle"></i> Save Edit
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary" onClick={handleAddSkill}>
                                                <i className="bi bi-plus-circle"></i> Add Skill
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>
                            {/* skill end */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addProjects" aria-labelledby="addProjectsLabel" aria-hidden="true">
                <div className="modal-dialog modal-sm">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addProjectsLabel">Job Preferences</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* projects start */}
                            <form className="mt-4">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Title <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        placeholder="Enter your title"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="url" className="form-label">URL</label>
                                    <input
                                        type="url"
                                        className="form-control"
                                        id="url"
                                        placeholder="Enter your URL"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Start Date</label>
                                    <div className="d-flex">
                                        <input
                                            type="month"
                                            className="form-control"
                                            id="url"
                                            placeholder="Month"
                                        />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">End Date</label>
                                    <div className="d-flex">
                                        <input
                                            type="month"
                                            className="form-control"
                                            id="url"
                                            placeholder="Month"
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="details" className="form-label">Details of Projects</label>
                                    <textarea
                                        className="form-control"
                                        id="details"
                                        // rows="4"
                                        // maxLength="1000"
                                        placeholder="Enter your project detail"
                                        style={{ minHeight: '100px' }}
                                    ></textarea>
                                    <div className="form-text">Max. 1000/1000 Characters</div>
                                </div>
                            </form>
                            {/* projects end */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addPersonalDetails" aria-labelledby="addPersonalDetails" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addPersonalDetails">Personal Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* personal details start */}
                            <form>
                                <div className="row">
                                    <div className="col-md-12 mb-3">
                                        <div className="mb-3">
                                            <label className="form-label me-3">Gender </label>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="gender" id="female" value="female" />
                                                <label className="form-check-label" htmlFor="female">Female</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="gender" id="male" value="male" />
                                                <label className="form-check-label" htmlFor="male">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="gender" id="preferNotToSay" value="preferNotToSay" />
                                                <label className="form-check-label" htmlFor="preferNotToSay">Others</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="yearOfBirth" className="form-label">Date Of Birth</label>
                                        <input type="date" className='form-control' />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="category" className="form-label">Category</label>
                                        <select className="form-select" id="category">
                                            <option value="">Select a Category</option>
                                            {/* Add more category options */}
                                            <option value="OC">OC</option>
                                            <option value="General">General</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Have you taken a career break?</label>
                                        <div className="d-flex">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="careerBreak" id="yesCareerBreak" value="yes" />
                                                <label className="form-check-label" htmlFor="yesCareerBreak">Yes</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="careerBreak" id="noCareerBreak" value="no" />
                                                <label className="form-check-label" htmlFor="noCareerBreak">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="residentStatus" className="form-label">Resident Status</label>
                                        <select className="form-select" id="residentStatus">
                                            <option>Select your resident status</option>
                                            {/* Add resident status options */}
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="workPermitUSA" className="form-label">Work Permit For USA</label>
                                        <select className="form-select" id="workPermitUSA">
                                            <option>Select your work permit for USA</option>
                                            {/* Add work permit options */}
                                            <option value="Green Card holder">Green Card holder</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="workPermitOther" className="form-label">Work Permit For Other Country</label>
                                        <select className="form-select" id="workPermitOther">
                                            <option>Select your work permit</option>
                                            {/* Add options */}
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="nationality" className="form-label">Nationality</label>
                                        <select className="form-select" id="nationality">
                                            <option>Indian</option>
                                            {/* Add more nationality options */}
                                            {countries.map((country) => (
                                                <option key={country.id} value={country.id}>{country.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="speciallyAbled" />
                                            <label className="form-check-label" htmlFor="speciallyAbled">I am specially abled</label>
                                        </div>
                                    </div>

                                </div>
                            </form>
                            {/* personal details end */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addLanguage" aria-labelledby="addLanguage" aria-hidden="true">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addLanguage">Language</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* language start */}
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="">Language </label>
                                        <select className='form-control'>
                                            {languange.map((language) => (
                                                <option key={language.id} value={language.id}>{language.Languange_name}</option>
                                            ))}
                                            {/* <option value="">English</option>
                                                <option value="">Hindi</option> */}
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="">Proficiency  </label>
                                        <select className='form-control'>
                                            <option value="">Expert</option>
                                            <option value="">Beginner</option>
                                            <option value="">Proficient</option>
                                        </select>
                                    </div>

                                    <div className="col-md-12 mt-4">
                                        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                                            <input type="checkbox" className="btn-check" id="btncheck22pop" />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck22pop">Read</label>

                                            <input type="checkbox" className="btn-check" id="btncheck33pop" />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck33pop">Write</label>

                                            <input type="checkbox" className="btn-check" id="btncheck44pop" />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck44pop">Speak</label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            {/* language end */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default Profiles