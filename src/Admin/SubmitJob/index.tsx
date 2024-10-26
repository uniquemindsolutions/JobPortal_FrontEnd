import React, { useState, useEffect } from 'react';
import './submitJobs.scss';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { text } from 'stream/consumers';
import { colors } from 'react-select/dist/declarations/src/theme';


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
    industry: number;
    job_category: number;
    job_type: string;
    city_location: number;
    max_salary: string;
    min_salary: string;
    salary_type: string;
    skills: string;
    state: number;
    // upload_file: File | null;
    about_company: string;
    work_mode: string;
    ssc: string;
    intermediate: number;
    ug_course: number;
    pg_course: number;
}

interface JobCategory {
    id: number;
    job_category: string;
}

interface Industry {
    id: number;
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
interface city_location {
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
    const { id, mode } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [methodType, seteditmethod] = useState(false);
    const [getsubmitjob, setGetSubmit] = useState<any[]>([]);
    const [industriesorg, setIndustries] = useState<any[]>([]);
    const [jobcategoriesorg, setJobCategories] = useState<any[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<city[]>([]);
    const [citys, setCitys] = useState<city_location[]>([]);
    const [inter, setInter] = useState<inter[]>([]);
    const [graduate, setGraduate] = useState<graduate[]>([]);
    const [postGraduate, setPostGraduate] = useState<postGraduate[]>([]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [fileUpload, setFile] = useState<any | null>(null);
    const [link, setLink] = useState<string>();
    // const [error, setError] = useState('');


    const [errors, setErrors] = useState({
        job_title: '',
        number_of_positions: '',
        industry: '',
        fetchError: '' // Add an error field for fetching job data
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
        industry: 0,
        job_category: 0,
        job_type: '',
        city_location: 0,
        max_salary: '',
        min_salary: '',
        salary_type: '',
        skills: '',
        state: 0,
        // upload_file: null,
        about_company: '',
        work_mode: '',
        ssc: '',
        intermediate: 0,
        ug_course: 0,
        pg_course: 0,
    });
    const validateForm = () => {
        const newErrors: any = {};

        // Check if job title is required and has a minimum length
        if (!formData.job_title) {
            newErrors.job_title = "Job Title is required";
        } else if (formData.job_title.length < 3) {
            newErrors.job_title = "Job Title must be at least 3 characters long";
        }

        // Check if number of positions is required and is a positive integer
        if (!formData.number_of_positions) {
            newErrors.number_of_positions = "Number of positions is required";
        } else if (!/^[1-9]\d*$/.test(formData.number_of_positions)) { // Regular expression for positive integers
            newErrors.number_of_positions = "Number of positions must be a positive integer";
        }

        // Check if industry is required and has a minimum length
        if (!formData.industry) {
            newErrors.industry = "Industry is required";
        }
        // Add more validations for other fields if necessary

        setErrors(newErrors);
        // If no errors, return true
        return Object.keys(newErrors).length === 0;
    };

    // Fetch industries, job categories, countries, states, and cities
    useEffect(() => {
        if (mode === '1' || mode === '2') {
            seteditmethod(true);
        }
        if (mode === '1') {
            setIsDisabled(true);
        }
        console.log("Mode:", mode); // Log the current mode
        setIsEditing(mode === "1"); // Set editing state based on mode
        if (id) {
            fetch(`http://127.0.0.1:8000/submitnewjob/${id}/`)
                .then(response => response.json())
                .then(data => {
                    console.log("Submit job details:", data);
                    setGetSubmit(data);
                    if (Object.keys(data).length > 0) {
                        console.log(data, "copyobject ======")
                        Object.entries(data).forEach(([key, value]) => {
                            console.log("Key and Value:", key, value);
                            setFormData((formData) => ({
                                ...formData,
                                [key]: value, // Dynamically update the key based on input name
                            })); console.log(formData, "Form Data Latest...");
                            setLink(data.upload_file);


                        });
                        console.log("Latest form data =", formData);
                    }
                })
                .catch(error => console.error("Error fetching job details:", error));
        }
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
        if (mode === '1' || mode === '2') {
            fetch("http://127.0.0.1:8000/states/")
                .then(response => response.json())
                .then(data => {
                    console.log("States:", data); // Log to check the data
                    setStates(data);
                })
                .catch(error => console.error('Error fetching states:', error));
            // Fetch cities
            fetch("http://127.0.0.1:8000/cities/")
                .then(response => response.json())
                .then(data => {
                    console.log("My Cities:", data); // Log to check the data
                    setCities(data);
                })
                .catch(error => console.error('Error fetching cities:', error));
        }
        fetch("http://127.0.0.1:8000/cities/")
            .then(response => response.json())
            .then(data => {
                console.log("My Cities:", data); // Log to check the data
                setCitys(data);
            })
            .catch(error => console.error('Error fetching cities:', error));
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
    }, [id, mode]);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        console.log(name, "name value test ======", value)
        setFormData({
            ...formData, [name]: value
        });
        console.log(e.target, "evet test ======", formData)
        if (name === "created_date") {
            const formattedDate = value.split('T')[0]; // Convert from ISO 8601 to yyyy-MM-dd
            setFormData({
                ...formData,
                [name]: formattedDate
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleEditorChange = (value: any) => {
        setFormData((formData) => ({
            ...formData,
            job_description: value,
        }));
    };
    const aboutCompanyHandleEditorChange = (value: string) => {
        setFormData((formData) => ({
            ...formData,
            about_company: value,
        }));
    };

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            alert("Hi")

            setFile(e.target.files[0]);


            //  console.log(fileUpload,"newfile",e.target.files[0]);
            // const newfile = new FormData();

            // if (fileUpload) { // Check if fileUpload is not null
            //     newfile.append('file', e.target.files[0]);
            // } else {
            //     console.error("No file selected for upload.");
            // }

            console.log(fileUpload, "newfile");
            // formData.append("file",file)
            // setFormData({
            //     ...formData,
            //     upload_file: e.target.files[0], // Capture the first selected file
            // });
            // console.log(formData,"File Checking...");
        } else {
            // setFormData({
            //     ...formData,
            //     upload_file: null, // Clear if no file selected
            // });
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            // If validation fails, just return to prevent submission
            console.error("Form validation failed.");
            return; // or handle the error display accordingly
        }
        const apiUrl = isEditing ? `http://127.0.0.1:8000/submitnewjob/${id}/` : `http://127.0.0.1:8000/submitnewjob/`;
        console.log(apiUrl, 'submited data=====')
        const submissionData = new FormData();



        if (fileUpload) {
            submissionData.append('upload_file', fileUpload);


        } else {
            console.log(submissionData, "newfile", fileUpload);
        }

        console.log(submissionData, "submissionData.....");


        Object.keys(formData).forEach(key => {
            submissionData.append(key, (formData as any)[key]);
        });




        // const payload = {
        //     "job_title": formData.job_title,
        //     "number_of_positions": formData.number_of_positions,
        //     "job_description": formData.job_description,
        //     "address": formData.address,
        //     "city": formData.city,
        //     "created_date": formData.created_date ? formData.created_date.split('T')[0] : "",
        //     "country": formData.country,
        //     "english_fluency": formData.english_fluency,
        //     "upload_file": fileUpload,
        //     "experience": formData.experience,
        //     "industry": formData.industry,
        //     "job_category": formData.job_category,
        //     "job_type": formData.job_type,
        //     "city_location": formData.city_location,
        //     "max_salary": formData.max_salary,
        //     "min_salary": formData.min_salary,
        //     "salary_type": formData.salary_type,
        //     "skills": formData.skills,
        //     "state": formData.state,
        //     "about_company": formData.about_company,
        //     "work_mode": formData.work_mode,
        //     "ssc": formData.ssc,
        //     "intermediate": formData.intermediate,
        //     "ug_course": formData.ug_course,
        //     "pg_course": formData.pg_course
        // }
        try {
            if (methodType) {
                // Update the job with a PUT request
                // fetch(`http://127.0.0.1:8000/submitnewjob/${id}/`, {
                //     method: 'PUT',
                //     headers: {
                //         'Content-Type': 'Mulitpart/form-data',
                //     },
                //     // body: JSON.stringify(submissionData),  // Send updated form data
                //     body:submissionData
                // })
                //     .then((response) => response.json())
                //     .then((data) => {
                //         console.log("Job updated successfully:", data);
                //         setFormData(data);
                //         alert("Job updated successfully");
                //     })
                //     .catch((error) => console.error("Error updating job:", error));

                try {
                    const response = await axios.put(`http://127.0.0.1:8000/submitnewjob/${id}/`, submissionData, {
                        headers: {
                            'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
                        },
                    });

                    console.log('Job updated successfully:', response.data);
                } catch (error) {
                    console.error('Error uploading file:', error);
                }


            } else {
                // Create a new job with a POST request
                // const response = await fetch("http://127.0.0.1:8000/submit-jobs/", {
                //     method: "POST",
                //     body:submissionData,
                //     // body: JSON.stringify(payload),
                //     // headers: {
                //     //     'Content-Type': 'application/json',
                //     // },
                //     headers: {
                //        'Content-Type': 'multipart/form-data',
                //     },
                // });

                try {
                    const response = await axios.post('http://127.0.0.1:8000/submitnewjob/', submissionData, {
                        headers: {
                            'Content-Type': 'multipart/form-data', // Ensure the content type is set correctly
                        },
                    });

                    console.log('File uploaded successfully:', response.data);
                } catch (error) {
                    console.error('Error uploading file:', error);
                }

                // if (response.ok) {
                //     const result = await response.json();
                //     alert("Job Created Sucessfully");
                //     console.log("Job submitted successfully:", result);
                //     setFormData({
                //         job_title: '',
                //         number_of_positions: '',
                //         created_date: '',
                //         job_description: '',
                //         address: '',
                //         city: 0,
                //         country: 0,
                //         english_fluency: '',
                //         experience: '',
                //         industry: 0,
                //         job_category: 0,
                //         job_type: '',
                //         city_location: 0,
                //         max_salary: '',
                //         min_salary: '',
                //         salary_type: '',
                //         skills: '',
                //         state: 0,
                //         upload_file: null,
                //         about_company: '',
                //         work_mode: '',
                //         ssc: '',
                //         intermediate: 0,
                //         ug_course: 0,
                //         pg_course: 0,
                //     });
                // } else {
                // }
                // console.error("Error submitting job:", response.statusText);
            }
        } catch (error) {
            console.error("Error submitting job:", error);
        }
    };
    console.log("datachecking", industriesorg);
    const handleonchangecountry = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        console.log('Submitting form:', formData);
        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });
        const countryId = e.target.options.selectedIndex;
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
                            {/* {formData.upload_file} */}
                            <input
                                type="text"
                                className="form-control"
                                name="job_title"
                                value={formData.job_title || ""}  // Handle empty case
                                onChange={handleInputChange}
                                disabled={isEditing}
                                placeholder="UI Developer"
                                required
                            />
                            {errors.job_title && <span className="text-danger">{errors.job_title}</span>}
                        </div>
                        {/* Number of Positions */}
                        <div className="col-md-3 mb-3">
                            <label htmlFor="number_of_positions" className="form-label">Number of Positions*</label>
                            <input
                                type="number"
                                className="form-control"
                                name="number_of_positions"
                                value={formData.number_of_positions || ""}  // Handle empty case
                                onChange={handleInputChange}
                                disabled={isEditing}
                                placeholder="e.g., 5"
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
                                value={formData.created_date ? formData.created_date.split('T')[0] : ""}
                                onChange={handleInputChange}
                                disabled={isEditing}
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
                                readOnly={isEditing}
                            />
                        </div>

                        {/* Industry */}
                        <div className="col-md-5 mb-3">
                            <label htmlFor="industry" className="form-label">Industry*</label>
                            <select
                                className="form-select"
                                value={formData.industry}
                                id="industry"
                                name="industry"
                                onChange={handleInputChange}
                                disabled={isEditing}
                                required
                            >
                                <option value="">Select industry</option>
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
                            <select className="form-select" value={formData.job_category || ""} id="job_category" name="job_category"
                                onChange={handleInputChange}
                                disabled={isEditing}
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
                            <select
                                className="form-select"
                                name="job_type" // Correctly bind this to "job_type"
                                id="job_type"
                                value={formData.job_type || ""}  // Handle empty case
                                onChange={handleInputChange} // Update the job_type field in formData
                                disabled={isEditing}
                            >
                                <option value="">Select Job Type</option>
                                <option value="Full Time">Full Time</option>
                                <option value="Part Time">Part Time</option>
                                <option value="Hourly-Contract">Hourly-Contract</option>
                                <option value="Fixed-Price">Fixed-Price</option>
                            </select>
                        </div>

                        <div className="col-md-4 col-lg-3 mb-3">
                            <label htmlFor="work_mode" className="form-label">Work Mode</label>
                            <select className="form-select" name="work_mode" id="work_mode" disabled={isEditing}
                                value={formData.work_mode || ""}  // Handle empty case
                                onChange={handleInputChange}
                            >
                                <option value="">Select work mode</option>
                                <option value="Work from office">Work from Office</option>
                                <option value="Work from Home">Work from Home</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div className="col-md-4 col-lg-3 col-lg-3 mb-3">
                            <label htmlFor="salary_type" className="form-label">Salary Type</label>
                            <select className="form-select" name="salary_type" id="salary_type"
                                value={formData.salary_type || ""}  // Handle empty case
                                onChange={handleInputChange}
                                disabled={isEditing}>
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
                                value={formData.min_salary || ""}
                                className="form-control"
                                id="min_salary"
                                name="min_salary"
                                onChange={handleInputChange}
                                disabled={isEditing}
                                placeholder="Min Salary"
                            />
                        </div>

                        {/* Max Salary */}
                        <div className="col-md-4 col-lg-3 mb-3">
                            <label htmlFor="max_salary" className="form-label">Max Salary</label>
                            <input
                                type="number"
                                className="form-control"
                                value={formData.max_salary || ""}
                                id="max_salary"
                                name="max_salary"
                                onChange={handleInputChange}
                                disabled={isEditing}
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
                                value={formData.skills || ""}
                                name="skills"
                                onChange={handleInputChange}
                                disabled={isEditing}
                                placeholder="Add Skills"
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="Experience" className="form-label">Experience</label>
                            <select className="form-select" value={formData.experience || ""} name="experience" id="Experience"
                                onChange={handleInputChange}
                                disabled={isEditing}>
                                <option value="">Select Experience</option>
                                <option value="Expert">Expert</option>
                                <option value="Medium">Medium</option>
                                <option value="Fresher">Fresher</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="city_location" className="form-label">Job Location</label>
                            <select className="form-select" name="city_location" id="city_location"
                                value={formData.city_location || ""}
                                onChange={handleInputChange}
                                disabled={isEditing}>
                                <option value="">Select Location</option>
                                {citys.map((ctys) => (
                                    <option key={ctys.id} value={ctys.id}>{ctys.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="EnglishFluency" className="form-label">English Fluency </label>
                            <select className="form-select" value={formData.english_fluency || ""} name="english_fluency" id="EnglishFluency"
                                onChange={handleInputChange}
                                disabled={isEditing}>
                                <option value="">Select English Fluency</option>
                                <option value="Basic">Basic</option>
                                <option value="Medium">Medium</option>
                                <option value="Excellent">Excellent</option>
                            </select>
                        </div>
                        {/* Upload File */}
                        <div className="col-md-10 mb-3">
                            <label htmlFor="upload_file" className="form-label">File Attachment</label>
                            <input
                                className="form-control"
                                type="file"
                                id="upload_file"
                                name="upload_file"
                                onChange={handleFileChange}
                                disabled={isEditing}
                            />
                            {link && (
                                <div>
                                    <a
                                        href={link}
                                        download="downloaded-file.ext" // Set the desired file name and extension here
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ color: 'black', textDecoration: 'none' }}                                        
                                    >
                                        Download
                                    </a>
                                </div>
                            )}
                        </div>
                        <div className="col-md-2 mb-3">
                            <label htmlFor="job_status" className="form-label">Job Status </label>
                            <select className="form-select" name="job_status" id="job_status"
                                onChange={handleInputChange}>
                                <option value="">Select Staus</option>
                                <option value="Basic">Active</option>
                                <option value="Medium">In Active</option>
                                <option value="Excellent">Expired</option>
                            </select>
                        </div>

                        <h4 className='text-primary mt-4'>Company Info</h4>
                        <div className="col-md-12 mb-3">
                            <label htmlFor="address" className="form-label">About Company</label>
                            {/* <textarea className='form-control' name="about_company" id="about_company" onChange={handleInputChange}></textarea> */}
                            <ReactQuill
                                theme="snow"
                                value={formData.about_company || ""}
                                // name="job_description"
                                onChange={aboutCompanyHandleEditorChange}
                                modules={modules}
                                placeholder="Enter about company"
                                readOnly={isEditing}
                            />
                        </div>
                        {/* Address */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                value={formData.address || ""}
                                className="form-control"
                                name="address"
                                onChange={handleInputChange}
                                disabled={isEditing}
                                placeholder="Address"
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="country" className="form-label">Country</label>
                            <select className="form-select" value={formData.country || ""} id="country" name="country"
                                onChange={handleonchangecountry}
                                disabled={isEditing}
                            >
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="state" className="form-label">State</label>
                            <select className="form-select" value={formData.state || ""} id="state" name="state"
                                onChange={handleonchangestate}
                                disabled={isEditing}
                            >
                                <option value="">Select State</option>
                                {states?.map((state) => (
                                    <option key={state.id} value={state.id}>{state.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="city" className="form-label">City</label>
                            <select className="form-select" value={formData.city || ""} id="city" name="city"
                                onChange={handleInputChange}
                                disabled={isEditing}
                            >
                                <option value="">Select City</option>
                                {cities?.map((city) => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>

                        <h4 className='text-primary mt-4'>Education</h4>
                        <div className="col-md-3">
                            <label htmlFor="Schooling" className="form-label">Schooling</label>
                            <select className="form-select" value={formData.ssc || ""} id="ssc" name="ssc"
                                onChange={handleInputChange}
                                disabled={isEditing}>
                                <option value="">Select Class</option>
                                <option value="SSC">SSC</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inter" className="form-label">Intermediate</label>
                            <select className="form-select" value={formData.intermediate || ""} id="intermediate" name="intermediate"
                                onChange={handleInputChange}
                                disabled={isEditing}>
                                <option value="">Select intermediate</option>
                                {inter.map((intermediate) => {
                                    return <option key={intermediate.id} value={intermediate.id}>{intermediate.inter}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="ug_course" className="form-label">UG</label>
                            <select className="form-select" value={formData.ug_course || ""} id="ug_course" name="ug_course"
                                onChange={handleInputChange}
                                disabled={isEditing}
                            >
                                <option value="">Select UG</option>
                                {graduate.map((graduate) => {
                                    return <option key={graduate.id} value={graduate.id}>{graduate.ug_name}</option>
                                })}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="pg_course" className="form-label">PG</label>
                            <select className="form-select" value={formData.pg_course || ""} id="pg_course" name="pg_course"
                                onChange={handleInputChange}
                                disabled={isEditing}
                            >
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
                    <button
                        type="submit"
                        className="btn btn-success px-5 btn-lg"
                        disabled={isDisabled}  // Button is disabled if the URL matches
                    >
                        Submit Job
                    </button>
                    <button type="submit" className="btn ms-4">Cancel</button>
                </div>
            </form>
        </main >
    );
};


export default SubmitJob;

