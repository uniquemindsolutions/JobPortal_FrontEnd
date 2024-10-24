import React, { useState } from 'react'
import './profile.scss'

interface ITSkill {
    id: number;
    skill: string;
    version: string;
    lastUsed: string;
    experience: string;
}
const Profiles = () => {
    const [itSkills, setItSkills] = useState([
        { id: 1, skill: 'HTML', version: '5', lastUsed: '-', experience: '8 Years' },
        { id: 2, skill: 'React', version: '-', lastUsed: '-', experience: '-' },
    ]);

    const [newSkill, setNewSkill] = useState<ITSkill>({ skill: '', version: '', lastUsed: '', experience: '', id: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkillId, setCurrentSkillId] = useState(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewSkill({ ...newSkill, [name]: value })
    }

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


    return (
        <main>
            <div className=" mt-4">
                <h5>Profile</h5>
                <div className="custom-card">
                    <button className="bi bi-pencil-square btn float-end position-absolute end-0" data-bs-toggle="modal" data-bs-target="#addProfile" style={{ marginRight: '4%', marginTop: '-2%' }} title='Edit'></button>
                    <div className="row">
                        <div className="col-sm-3 col-lg-3 text-center mb-3">
                            <img className='profile-pic' src={window.location.origin + '/images/avtar-pic.avif'} />
                            <label className="btn btn-outline-primary btn-sm">
                                <i className="fa fa-image"></i>Upload image<input type="file" style={{ display: 'none' }} name="image" />
                            </label>
                        </div>
                        <div className="col-sm-9 col-lg-8 offset-lg-1">

                            <div className="row">
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="first_name" className="form-label">First Name</label>
                                    <input type="text" placeholder='Shekhar' className="form-control" readOnly />
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="last_name" className="form-label">Last Name</label>
                                    <input type="text" placeholder='Vadla' className="form-control" readOnly />
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="email_id" className="form-label">Email ID</label>
                                    <input type="text" placeholder='test@gmail.com' className="form-control" readOnly />
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="phone_number" className="form-label">Phone Number</label>
                                    <input type="text" placeholder='+91-9876543210' className="form-control" readOnly />
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="resume" className="form-label">Resume</label>
                                    <input type="text" placeholder='shekhar-vadla-resume.pdf' className="form-control" readOnly />
                                    <button className='btn-sm btn'>Download</button>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="industry" className="form-label">Industry</label>
                                    <input type="text" placeholder='IT'
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
                                    <label htmlFor="last_name" className="form-label">Current Location</label>
                                    <input type="text" placeholder='India' className="form-control" readOnly />
                                </div>
                                <div className="col-sm-4 col-lg-4 mb-3">
                                    <label htmlFor="last_name" className="form-label">Preferred Locations</label>
                                    <input type="text" placeholder='Pan india location' className="form-control" readOnly />
                                </div>
                                <div className="col-sm-4 col-lg-4 mb-3">
                                    <label htmlFor="last_name" className="form-label">Notice Period</label>
                                    <input type="text" placeholder='Immediately Available' className="form-control" readOnly />
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
                                        <input type="file" className="form-control" id="upload_ profile_image"
                                            name="upload_ profile_image" />
                                        <span className='float-end text-secondary'><small>(Upload a picture less than 100kb)</small></span>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="first_name" className="form-label">First Name *</label>
                                            <input type="input" className="form-control" id="first_name" placeholder="Enter your First Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="last_name" className="form-label">Last Name</label>
                                            <input type="number" className="form-control" id="last_name" placeholder="Enter your Last Name" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email Id *</label>
                                            <input type="email" className="form-control" id="email" placeholder="Enter your Email id" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="phone_no" className="form-label">Phone Number *</label>
                                            <input type="number" className="form-control" id="phone_no" placeholder="Enter your phone no." />
                                        </div>
                                    </div>
                                    <div className="col-sm-12 col-lg-12 mb-3">
                                        <label htmlFor="upload_resume" className="form-label">Upload Resume</label>
                                        <input type="file"
                                            className="form-control"
                                            id="upload_resume"
                                            name="upload_resume" />
                                        <span className='float-end text-secondary'><small>(Accepted format includes PDF, DOC & DOCX)</small></span>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="passingYear" className="form-label">Total experiance</label>
                                            <select className="form-select" id="qualification">
                                                <option selected>Select Years</option>
                                                <option >Fresher</option>
                                                <option >1 Below year</option>
                                                <option >2 Year</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="passingYear" className="form-label"> </label>
                                            <select className="form-select mt-2" id="qualification">
                                                <option selected>Select Months</option>
                                                <option >1 Month</option>
                                                <option >2 Months</option>
                                                <option >3 Months</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="passingYear" className="form-label">Current Location *</label>
                                            <select className="form-select" id="qualification">
                                                <option selected>Select Current Location</option>
                                                <option >Hyderabad</option>

                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="passingYear" className="form-label">Preferred Locations</label>
                                            <select className="form-select" id="qualification">
                                                <option selected>Select Preferred Locations</option>
                                                <option>Bangalore</option>

                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="passingYear" className="form-label">Notice Period</label>
                                            <select className='form-select'>
                                                <option value="">Select Notice Period</option>
                                                <option value="">Immediately Available</option>
                                                <option value="">15 Days</option>
                                                <option value="">30 Days</option>
                                                <option value="">45 Days</option>
                                                <option value="">2 Months</option>
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </form>
                            {/* education details end */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

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
                                            <select className="form-select" id="qualification">
                                                <option selected>Enter or select your qualification</option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="specialization" className="form-label">Specialization *</label>
                                            <select className="form-select" id="specialization">
                                                <option selected>Enter or select your specialization</option>
                                                {/* Options for specializations */}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label htmlFor="institute" className="form-label">Institute *</label>
                                            <select className="form-select" id="institute">
                                                <option selected>Enter or select your institute</option>
                                                {/* Options for institutes */}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="gradingSystem" className="form-label">Grading system</label>
                                            <select className="form-select" id="gradingSystem">
                                                <option selected>Enter or Select your Grading system</option>
                                                {/* Options for grading systems */}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="marks" className="form-label">Marks</label>
                                            <input type="number" className="form-control" id="marks" placeholder="Enter your Marks" />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="passingYear" className="form-label">Passing Year *</label>
                                            <input type="month" className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="mb-3">
                                            <label className="form-label">Education Type *</label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="educationType" id="fullTime" value="Full time" />
                                                    <label className="form-check-label" htmlFor="fullTime">Full time</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="educationType" id="partTime" value="Part time" />
                                                    <label className="form-check-label" htmlFor="partTime">Part time</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="educationType" id="correspondence" value="Correspondence" />
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
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

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
                                            <input type="text" className="form-control" id="jobTitle" placeholder="Most recent job title" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="companyName" className="form-label">Company Name *</label>
                                            <input type="text" className="form-control" id="companyName" placeholder="Most recent company" />
                                        </div>
                                    </div>

                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Is This Your Current Company?</label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="currentCompany" id="currentCompanyYes" value="yes" />
                                                    <label className="form-check-label" htmlFor="currentCompanyYes">Yes</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="currentCompany" id="currentCompanyNo" value="no" />
                                                    <label className="form-check-label" htmlFor="currentCompanyNo">No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="mb-3 row">
                                            <div className="col">
                                                <label htmlFor="startDateYear" className="form-label">Start Date *</label>
                                                <input type='date' className="form-control" id="startDateYear" />

                                            </div>
                                            <div className="col">
                                                <label htmlFor="endDateMonth" className="form-label">Start Date *</label>
                                                <input type='date' className="form-control" id="endDateYear" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="noticePeriod" className="form-label">Notice Period *</label>
                                            <select className="form-select" id="noticePeriod">
                                                <option selected>Select your notice period</option>
                                                {/* Options for notice period */}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Workplace</label>
                                            <div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="workplace" id="inOffice" value="inOffice" />
                                                    <label className="form-check-label" htmlFor="inOffice">In-Office</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="workplace" id="hybrid" value="hybrid" />
                                                    <label className="form-check-label" htmlFor="hybrid">Hybrid</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="workplace" id="workFromHome" value="workFromHome" />
                                                    <label className="form-check-label" htmlFor="workFromHome">Work from home</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="mb-3">
                                            <label htmlFor="employmentType" className="form-label">Employment Type</label>
                                            <select className="form-select" id="employmentType">
                                                <option selected>Select your employment type</option>
                                                {/* Options for employment type */}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="mb-3 row">
                                            <div className="col">
                                                <label htmlFor="salaryCurrency" className="form-label">Current Salary (Annually) *</label>
                                                <select className="form-select" id="salaryCurrency">
                                                    <option selected>INR</option>
                                                    {/* Other currency options */}
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
                                            <textarea className="form-control" id="description" placeholder="Enter your description"></textarea>
                                            <small className="form-text text-muted">Max. 1000 characters</small>
                                        </div>
                                    </div>

                                </div>
                            </form>
                            {/* work experiance end */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

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
                                            <select className="form-select" id="department">
                                                <option selected>Enter or select your preferred department</option>
                                                {/* Options for departments */}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="jobTitle" className="form-label">Preferred Job Title *</label>
                                            <select className="form-select" id="jobTitle">
                                                <option selected>Enter or select your preferred job title</option>
                                                {/* Options for job titles */}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Job Type</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jobType" id="permanent" value="Permanent" />
                                            <label className="form-check-label" htmlFor="permanent">Permanent</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jobType" id="temporary" value="Temporary" />
                                            <label className="form-check-label" htmlFor="temporary">Temporary/Contract</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jobType" id="bothJobType" value="Both" />
                                            <label className="form-check-label" htmlFor="bothJobType">Both</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Employment Type</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="employmentType" id="fullTime" value="Full time" />
                                            <label className="form-check-label" htmlFor="fullTime">Full time</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="employmentType" id="partTime" value="Part time" />
                                            <label className="form-check-label" htmlFor="partTime">Part time</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="employmentType" id="bothEmployment" value="Both" />
                                            <label className="form-check-label" htmlFor="bothEmployment">Both</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Preferred Workplace</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="workplace" id="office" value="In-Office" />
                                            <label className="form-check-label" htmlFor="office">In-Office</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="workplace" id="hybrid" value="Hybrid" />
                                            <label className="form-check-label" htmlFor="hybrid">Hybrid</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="workplace" id="workFromHome" value="Work from home" />
                                            <label className="form-check-label" htmlFor="workFromHome">Work from home</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Preferred Location *</label>
                                    <select className="form-select" id="location">
                                        <option selected>Enter or select your preferred location</option>
                                        {/* Options for locations */}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="currentlyLookingFor" className="form-label">What are you currently looking for?</label>
                                    <select className="form-select" id="currentlyLookingFor">
                                        <option selected>Select currently looking for</option>
                                        <option selected>Internshipe</option>
                                        <option selected>Job</option>
                                        {/* Options for what the user is currently looking for */}
                                    </select>
                                </div>
                            </form>
                            {/* job prep end */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
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
                                            <option value="Gen">Gen</option>
                                            {/* Add more category options */}
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
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="workPermitUSA" className="form-label">Work Permit For USA</label>
                                        <select className="form-select" id="workPermitUSA">
                                            <option>Select your work permit for USA</option>
                                            {/* Add work permit options */}
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="workPermitOther" className="form-label">Work Permit For Other Country</label>
                                        <select className="form-select" id="workPermitOther">
                                            <option>Select your work permit</option>
                                            {/* Add options */}
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="nationality" className="form-label">Nationality</label>
                                        <select className="form-select" id="nationality">
                                            <option>Indian</option>
                                            {/* Add more nationality options */}
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
                                            <option value="">English</option>
                                            <option value="">Hindi</option>
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
    )
}

export default Profiles