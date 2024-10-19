import React, { useState, useEffect } from 'react';
import './submitJobs.scss';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


interface SubmitJob {
    job_title: string;
    number_of_positions: string;
    created_date: string;
    job_description: string;
    address: string;
    city: number;
    country: number;
    english_fluency: string;
    experience: string;
    industry: string;
    job_category: string;
    job_type: string;
    // map_location: string;
    max_salary: string;
    min_salary: string;
    salary_type: string;
    skills: string;
    state: number;
    upload_file: File | null;
    about_company: string;
    work_mode: string;
    ssc: string;
    inter: string;
    ug_name: string;
    pg_name: string;
}

interface JobCategory {
    id: number;
    job_category: string;
}

interface Industry {
    id: number;
    name: string;
    industry: string;
}

interface Country {
    id: number;
    name: string;
}

interface State {
    id: number;
    name: string;
    country: string;
}

interface city {
    id: number;
    name: string;
    state: string;
}
interface inter {
    id: number;
    inter: string;
}
interface graduate {
    id: number;
    ug_name: string;
}
interface postGraduate {
    id: number;
    pg_name: string;
}

const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ 'size': [] }],
        [{ 'color': [] }, { 'background': [] }],    // Text color and background color
        [{ 'align': [] }],
        ['bold', 'italic', 'underline', 'strike'],  // Text formatting
        [{ 'script': 'sub' }, { 'script': 'super' }], // Subscript / superscript
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],                   // Text direction
        ['link', 'image', 'video'],                 // Links, images, and videos
        ['clean']                                   // Remove formatting
    ]
};

const SubmitJob = () => {
    const { id } = useParams<{ id: string }>();
    const [getsubmitjob, setGetSubmit] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [industriesorg, setIndustries] = useState<any[]>([]);
    const [jobcategoriesorg, setJobCategories] = useState<any[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<city[]>([]);
    const [inter, setInter] = useState<inter[]>([]);
    const [graduate, setGraduate] = useState<graduate[]>([]);
    const [postGraduate, setPostGraduate] = useState<postGraduate[]>([]);
    // const [error, setError] = useState('');

    const [errors, setErrors] = useState({
        job_title: '',
        number_of_positions: '',
        industry: ''
    });

    const [formData, setFormData] = useState<SubmitJob>({
        job_title: '',
        number_of_positions: '',
        created_date: '',
        job_description: '',
        address: '',
        city: 0,
        country: 0,
        english_fluency: '',
        experience: '',
        industry: '',
        job_category: '',
        job_type: '',
        // map_location: '',
        max_salary: '',
        min_salary: '',
        salary_type: '',
        skills: '',
        state: 0,
        upload_file: null,
        about_company: '',
        work_mode: '',
        ssc: '',
        inter: '',
        ug_name: '',
        pg_name: '',
    });
    const validateForm = () => {
        const newErrors: any = {};
        if (!formData.job_title) newErrors.job_title = "Job Title is required";
        if (!formData.number_of_positions) newErrors.job_title = "No of postions is required";
        // if (!formData.job_description) newErrors.job_description = "Job Description is required";
        if (!formData.industry) newErrors.industry = "Industry is required";
        // if (!formData.job_category) newErrors.job_category = "Job Category is required";
        // if (!formData.address) newErrors.address = "Address is required";
        // if (!formData.country) newErrors.country = "Country is required";
        // if (!formData.state) newErrors.state = "State is required";
        // if (!formData.city) newErrors.city = "City is required";

        setErrors(newErrors);

        // If no errors, return true
        return Object.keys(newErrors).length === 0;
    };
    // Fetch industries, job categories, countries, states, and cities
    useEffect(() => {
        if (id) {
            fetch(`http://127.0.0.1:8000/submitnewjob/${id}/`)
                .then(response => response.json())
                .then(data => {
                    console.log("Submit job details:", data);
                    setGetSubmit(data);
                    if (Object.keys(data).length > 0) {
                        alert("Hi");
                        const copyobject = {
                            job_title: data.job_title,
                            number_of_positions: data.number_of_positions,
                            created_date: data.created_date,
                            job_description: data.job_description,
                            address: data.address,                            
                            city: data.city,
                            // country: 0,
                            // english_fluency: '',
                            // experience: '',
                            industry: data.industry.industry,
                            // job_category: '',
                            // job_type: '',
                            // // map_location: '',
                            max_salary: data.max_salary,
                            min_salary: data.min_salary,
                            // salary_type: '',
                            skills:data.skills,
                            // state: 0,
                            // upload_file: null,
                            // about_company: data.about_company,
                            // work_mode: '',
                            // ssc: '',
                            // inter: '',
                            // ug_name: '',
                            // pg_name: '',
                            
                        }
                        Object.entries(copyobject).forEach(([key, value]) => {
                            console.log("Key and Value:",key,value);
                            setFormData((formData) => ({
                                ...formData,
                                [key]: value, // Dynamically update the key based on input name
                              }));
                        });
                        console.log("Latest form data =", formData);


                    }
                })
                .catch(error => console.error("Error fetching job details:", error));
        }
        const handleEditClick = () => {
            setIsEditing(true);
        };
        const handleSaveClick = () => {
            // Implement save functionality here
            // Example: POST request to update job details
            fetch(`http://127.0.0.1:8000/submitnewjob/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(getsubmitjob), // Assuming jobDetails is in the correct format
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Updated job details:", data);
                    setGetSubmit(data);
                    setIsEditing(false);
                })
                .catch(error => console.error("Error updating job details:", error));
        };
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setGetSubmit({
                ...getsubmitjob,
                [e.target.name]: e.target.value,
            });
        };
        // Fetch industries
        fetch("http://127.0.0.1:8000/industry/")
            .then(response => response.json())
            .then(data => {
                console.log("Industries:", data); // Log to check the data
                setIndustries(data);
            })
            .catch(error => console.error('Error fetching industries:', error));

        // Fetch job categories
        fetch("http://127.0.0.1:8000/jobcategory/")
            .then(response => response.json())
            .then(data => {
                console.log("Job Categories:", data); // Log to check the data
                setJobCategories(data);
            })
            .catch(error => console.error('Error fetching job categories:', error));

        // Fetch countries
        fetch("http://127.0.0.1:8000/countries/")
            .then(response => response.json())
            .then(data => {
                console.log("Countries:", data); // Log to check the data
                setCountries(data);
            })
            .catch(error => console.error('Error fetching countries:', error));

        // Fetch states
        // fetch("http://127.0.0.1:8000/states/")
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log("States:", data); // Log to check the data
        //         setStates(data);
        //     })
        //     .catch(error => console.error('Error fetching countries:', error));

        // // Fetch cities
        // fetch("http://127.0.0.1:8000/cities/")
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log("Cities:", data); // Log to check the data
        //         setCities(data);
        //     })
        //     .catch(error => console.error('Error fetching cities:', error));


        // fetch("http://127.0.0.1:8000/education/intermediate/")
        // .then(response => response.json())
        // .then(data => {
        //     console.log("intermediate:", data); // Log to check the data
        //     setInter(response.data)
        // })
        // .catch(error => console.error('Error fetching cities:', error));

        // axios.get('http://127.0.0.1:8000/education/intermediate/')
        //     .then(res => {
        //         setInter(res.data)
        //     })
        //     .catch(error => {
        //         setError(error)
        //     })
        fetch("http://127.0.0.1:8000/education/intermediate/")
            .then(response => response.json())
            .then(data => {
                console.log("inter:", data); // Log to check the data
                setInter(data);
            })
            .catch(error => console.error('Error fetching inter:', error));


        fetch("http://127.0.0.1:8000/education/UG/")
            .then(response => response.json())
            .then(data => {
                console.log("Education UG:", data); // Log to check the data
                setGraduate(data);
            })
            .catch(error => console.error('Error fetching Education UG:', error));

        fetch('http://127.0.0.1:8000/education/PG/')
            .then(response => response.json())
            .then(data => {
                console.log("Education PG:", data); // Log to check the data
                setPostGraduate(data);
            })
            .catch(error => console.error('Error fetching Education PG:', error));

    }, [id]);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        const { name, value } = e.target;
        console.log(name, "name value test ======", value)
        setFormData({
            ...formData, [name]: value
        });
        console.log(e.target, "evet test ======", formData)
    };

    // const handleEditorChange = (value:any)=>{
    //     setFormData({...formData, job_description:value})
    // }
    const handleEditorChange = (value: any) => {
        setFormData({
            ...formData,
            job_description: value,
        });
    };
    const aboutCompanyHandleEditorChange = (value: any) => {
        setFormData({ ...formData, about_company: value })
    }

    // Handle file input change
    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setFormData({
    //         ...formData,
    //         upload_file: e.target.files ? e.target.files[0] : null
    //     });
    // };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({
                ...formData,
                upload_file: e.target.files[0], // Capture the first selected file
            });
        } else {
            setFormData({
                ...formData,
                upload_file: null, // Clear if no file selected
            });
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData, 'submited data=====')

        const submissionData = new FormData();

        Object.keys(formData).forEach(key => {
            submissionData.append(key, (formData as any)[key]);
        });
        const payload = {
            "job_title": formData.job_title,
            "number_of_positions": formData.number_of_positions,
            "job_description": formData.job_description,
            "address": formData.address,
            "city": formData.city,
            "country": formData.country,
            "english_fluency": formData.english_fluency,
            "experience": formData.experience,
            "industry": {
                "industry": formData.industry
            },
            "job_category": {
                "job_category": formData.job_category
            },
            "job_type": formData.job_type,
            // "map_location": formData.map_location,
            "max_salary": formData.max_salary,
            "min_salary": formData.min_salary,
            "salary_type": formData.salary_type,
            "skills": formData.skills,
            "state": formData.state,
            "upload_file": null,
            "about_company": formData.about_company,
            "work_mode": formData.work_mode,
            "ssc": formData.ssc,
            "inter": formData.inter,
            "ug_name": formData.ug_name,
            "pg_name": formData.pg_name
        }
        // submissionData.append('upload_file', formData.upload_file )

        try {
            const response = await fetch("http://127.0.0.1:8000/submitnewjob/", {
                method: "POST",
                // body:payload
                body: JSON.stringify(payload),
                headers: {
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Job submitted successfully:", result);
            } else {
                console.error("Error submitting job:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting job:", error);
        }
    };
    console.log("datachecking", industriesorg);


    const handleonchangecountry = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        // if (!validateForm()) {
        //     console.log('Form has errors:', errors);
        //     return; // Prevent submission if there are errors
        // }
        console.log('Submitting form:', formData);
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });

        const countryId = e.target.options.selectedIndex;
        // const {id, value} = e.target;
        // console.log(stateId, "state values====");
        // setSelectedCountry(country);

        fetch(`http://127.0.0.1:8000/states/?countryid=${countryId}`)
            .then(response => response.json())
            .then(data => {
                console.log("States:", data); // Log to check the data
                setStates(data);
            })
            .catch(error => console.error('Error fetching states:', error));
    };
    const handleonchangestate = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
        const stateId = e.target.options.selectedIndex;
        console.log(stateId);
        fetch(`http://127.0.0.1:8000/cities/?stateid=${stateId}`)
            .then(response => response.json())
            .then(data => {
                console.log("cities:", data); // Log to check the data
                setCities(data);
            })
            .catch(error => console.error('Error fetching states:', error));
    };
    return (
        <main>
            <h4 className="mt-4">Submit a Job</h4>
            <form onSubmit={handleSubmit}>
                <div className="custom-card">
                    <h4 className='text-primary'>Job Details</h4>
                    <div className="row">
                        {/* Job Title */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="job_title" className="form-label">Job Title*</label>
                            <input
                                type="text"
                                className="form-control"
                                name="job_title"
                                value={formData.job_title}
                                onChange={handleInputChange}
                                placeholder="UI Developer"
                                required
                            />
                            {errors.job_title && <span className="text-danger">{errors.job_title}</span>}
                        </div>
                        {/* Number of Positions */}
                        <div className="col-md-3 mb-3">
                            <label htmlFor="number_of_positions" className="form-label">Number of Positions*</label>
                            <input
                                type="text"
                                className="form-control"
                                name="number_of_positions"
                                value={formData.number_of_positions}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.number_of_positions && <span className="text-danger">{errors.number_of_positions}</span>}
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="created_date" className="form-label">Date</label>
                            <input
                                type="date"
                                id='created_date'
                                className="form-control"
                                name="created_date"
                                value = {formData.created_date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        {/* Job Description */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="job_description" className="form-label">Job Description</label>
                            <ReactQuill
                                theme="snow"
                                value={formData.job_description}
                                // name="job_description"
                                onChange={handleEditorChange}
                                modules={modules}
                                placeholder="Enter Job description"
                            />
                        </div>

                        {/* Industry */}
                        <div className="col-md-5 mb-3">
                            <label htmlFor="industry" className="form-label">Industry*</label>
                            <select
                                className="form-select"
                                value={formData.industry}
                                name="industry"
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select industry</option>
                                {/* {industriesorg.map((industry: Industry) => (
                                        <option key={industry.id} value={industry.id}>
                                            {industry.industry}
                                        </option>
                                    )
                                )} */}
                                {industriesorg && industriesorg.length > 0 ? (
                                    industriesorg.map((industry: Industry) => (
                                        <option key={industry.id} value={industry.id}>
                                            {industry.industry}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No industries available</option>
                                )}
                            </select>
                            {errors.industry && <span className="text-danger">{errors.industry}</span>}
                        </div>
                        {/* Job Category */}
                        <div className="col-md-5 mb-3">
                            <label htmlFor="job_category" className="form-label">Job Category</label>
                            <select
                                className="form-select"
                                name="job_category"
                                onChange={handleInputChange}
                            >
                                <option value="">Select Job Category</option>
                                {jobcategoriesorg && jobcategoriesorg.length > 0 ? (
                                    jobcategoriesorg.map((job_category: JobCategory) => (
                                        <option key={job_category.id} value={job_category.id}>
                                            {job_category.job_category}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No Job Category available</option>
                                )}
                            </select>
                        </div>

                        <div className="col-md-2 mb-3">
                            <label htmlFor="JobType" className="form-label">Job Type</label>
                            <select className="form-select" name="job_type" id="JobType"
                                onChange={handleInputChange}>
                                <option value="">Select Job Type</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Hourly-Contract">Hourly-Contract</option>
                                <option value="Fixed-Price">Fixed-Price</option>
                            </select>
                        </div>
                        <div className="col-md-4 col-lg-3 mb-3">
                            <label htmlFor="work_mode" className="form-label">Work Mode</label>
                            <select className="form-select" name="work_mode" id="work_mode" onChange={handleInputChange}>
                                <option value="">Select work mode</option>
                                <option value="Work from office">Work from Office</option>
                                <option value="Work from Home">Work from Home</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div className="col-md-4 col-lg-3 col-lg-3 mb-3">
                            <label htmlFor="salary_type" className="form-label">Salary Type</label>
                            <select className="form-select" name="salary_type" id="salary_type" onChange={handleInputChange}>
                                <option value="">Select Type</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Weekly">Weekly</option>
                            </select>
                        </div>
                        {/* Min Salary */}
                        <div className="col-md-4 col-lg-3 mb-3">
                            <label htmlFor="min_salary" className="form-label">Min Salary</label>
                            <input
                                type="number"
                                value={formData.min_salary}
                                className="form-control"
                                id="min_salary"
                                name="min_salary"
                                onChange={handleInputChange}
                                placeholder="Min Salary"
                            />
                        </div>

                        {/* Max Salary */}
                        <div className="col-md-4 col-lg-3 mb-3">
                            <label htmlFor="max_salary" className="form-label">Max Salary</label>
                            <input
                                type="number"
                                className="form-control"
                                value={formData.max_salary}
                                id="max_salary"
                                name="max_salary"
                                onChange={handleInputChange}
                                placeholder="Max Salary"
                            />
                        </div>
                        {/* Skills */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="skills" className="form-label">Skills</label>
                            <input
                                type="text"
                                className="form-control"
                                id="skills"
                                value={formData.skills}
                                name="skills"
                                onChange={handleInputChange}
                                placeholder="Add Skills"
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="Experience" className="form-label">Experience</label>
                            <select className="form-select" name="experience" id="Experience" onChange={handleInputChange}>
                                <option value="">Select Experience</option>
                                <option value="Expert">Expert</option>
                                <option value="Medium">Medium</option>
                                <option value="Fresher">Fresher</option>
                            </select>
                        </div>
                        {/* <div className="col-md-4 mb-3">
                            <label htmlFor="Location" className="form-label">Location</label>
                            <select className="form-select" name="city" id="Location" onChange={handleInputChange}>
                                <option value="">Select Location</option>
                                {cities.map((cty) => (
                                    <option key={cty.id} value={cty.id}>{cty.name}</option>
                                ))}
                            </select>
                        </div> */}

                        <div className="col-md-4 mb-3">
                            <label htmlFor="EnglishFluency" className="form-label">English Fluency </label>
                            <select className="form-select" name="english_fluency" id="EnglishFluency" onChange={handleInputChange}>
                                <option value="">Select English Fluency</option>
                                <option value="Basic">Basic</option>
                                <option value="Medium">Medium</option>
                                <option value="Excellent">Excellent</option>
                            </select>
                        </div>
                        {/* Upload File */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="upload_file" className="form-label">File Attachment</label>
                            <input
                                className="form-control"
                                type="file"
                                name="upload_file"
                                onChange={handleFileChange}
                            />
                        </div>

                        <h4 className='text-primary mt-4'>Company Info</h4>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="address" className="form-label">About Company</label>
                            {/* <textarea className='form-control' name="about_company" id="about_company" onChange={handleInputChange}></textarea> */}

                            <ReactQuill
                                theme="snow"
                                value={formData.about_company}
                                // name="job_description"
                                onChange={aboutCompanyHandleEditorChange}
                                modules={modules}
                                placeholder="Enter about company"
                            />
                        </div>
                        {/* Address */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                value={formData.address}
                                className="form-control"
                                name="address"
                                onChange={handleInputChange}
                                placeholder="Address"
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="country" className="form-label">Country</label>
                            <select className="form-select" id="country" name="country" onChange={handleonchangecountry}>
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                    // <option key={country.id} value={country.id}>{country.id}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="state" className="form-label">State</label>
                            <select className="form-select" id="state" name="state" onChange={handleonchangestate} >
                                <option value="">Select State</option>
                                {states?.map((state) => (
                                    // <option key={state?.id} value={state?.id}>{state?.name}</option>
                                    <option key={state.id} value={state.id}>{state.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="city" className="form-label">City</label>
                            <select className="form-select" id="city" name="city">
                                <option value="">Select city</option>
                                {cities?.map((city) => (
                                    // <option key={city?.id} value={city?.id}>{city?.name}</option>
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>

                        <h4 className='text-primary mt-4'>Education</h4>
                        <div className="col-md-3">
                            <label htmlFor="Schooling" className="form-label">Schooling</label>
                            <select className="form-select" id="Schooling" name="Schooling" onChange={handleInputChange}>
                                <option value="">Select Class</option>
                                <option value="SSC">SSC</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inter" className="form-label">Intermediate</label>
                            <select className="form-select" id="inter" name="inter" onChange={handleInputChange}>
                                <option value="">Select intermediate</option>
                                {inter.map((intermediate) => (
                                    <option key={intermediate.id} value={intermediate.id}>{intermediate.inter}</option>
                                ))}
                            </select>

                        </div>
                        <div className="col-md-3">
                            <label htmlFor="ug_name" className="form-label">UG</label>
                            <select className="form-select" id="ug_name" name="ug_name" onChange={handleInputChange}>
                                <option value="">Select UG</option>
                                {graduate.map((graduate) => {
                                    return <option key={graduate.id} value={graduate.id}>{graduate.ug_name}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="pg_name" className="form-label">PG</label>
                            <select className="form-select" id="pg_name" name="pg_name" onChange={handleInputChange}>
                                <option value="">Select PG</option>
                                {postGraduate.map((postGraduate) => {
                                    return <option key={postGraduate.id} value={postGraduate.id}>{postGraduate.pg_name}</option>
                                })}

                            </select>
                        </div>
                    </div>
                </div>
                <div className="text-center my-4">
                    {/* Submit Button */}
                    <button type="submit" className="btn btn-success px-5 btn-lg">Submit Job</button>
                    <button type="submit" className="btn ms-4">Cancel</button>
                </div>
            </form>
        </main>
    );
};


export default SubmitJob;
