import React, { useState, useEffect } from 'react';
import './submitJobs.scss';
import { json } from 'stream/consumers';

interface SubmitJob {
    job_title: string;
    number_of_positions: number;
    job_description: string;
    industry: string;
    job_category: string;
    job_type: string;
    salary_type: string;
    min_salary: number;
    max_salary: number;
    skills: string;
    experience: string;
    english_fluency: string;
    upload_file: File | null;
    address: string;
    map_location: string | null;
    country: string;
    state: string;
    city: string;
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
}
interface city {
    id: number;
    name: string;
}

const SubmitJob = () => {
    const [industriesorg, setIndustries] = useState<any[]>([]);
    const [jobcategoriesorg, setJobCategories] = useState<any[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<city[]>([]);

    const [formData, setFormData] = useState<SubmitJob>({
        job_title: '',
        number_of_positions: 1,
        job_description: '',
        industry: '',
        job_category: '',
        job_type: '',
        salary_type: '',
        min_salary: 0,
        max_salary: 0,
        skills: '',
        experience: '',
        english_fluency: '',
        upload_file: null,
        address: '',
        map_location: '',
        country: '',
        state: '',
        city: '',
    });

    // Fetch industries, job categories, countries, states, and cities
    useEffect(() => {
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


        // Fetch cities
        fetch("http://127.0.0.1:8000/cities/")
            .then(response => response.json())
            .then(data => {
                console.log("Cities:", data); // Log to check the data
                setCities(data);
            })
            .catch(error => console.error('Error fetching cities:', error));
    }, []);

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        const { name, value } = e.target;
        console.log(name, "name value test ======", value)
        setFormData({
            ...formData, [name]: value
        });
        console.log(e.target, "evet test ======", formData)
    };

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
            "job_title": "Software Developer",
            "number_of_positions": "100",
            "job_description": "It is a software job",
            "address": "1-10-71/14/23 Venkat rao nager colony Medak",
            "city": 1,
            "country": 1,
            "english_fluency": "Basic",
            "experience": "Expert",
            "industry": {
                "industry": "IT"
            },
            "job_category": {
                "job_category": "Mobile Developer"
            },
            "job_type": "Part Time",
            "map_location": "Imphal",
            "max_salary": "20000",
            "min_salary": "10000",
            "salary": "Monthly",
            "skills": "Java, python,c programming ",
            "state": 2,
            "upload_file": null,
            "about_company": "It is a starupcompany",
            "work_mode": "Hybrid"
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


    const handleonchnagecountry = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        const { name, value } = e.target;
        setFormData({
            ...formData, [name]: value
        });

        const countryId = e.target.options.selectedIndex;
        const stateId = e.target.options.selectedIndex;
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

        fetch(`http://127.0.0.1:8000/cities/?stateid=${stateId}`)
        .then(response => response.json())
        .then(data => {
            console.log("cities:", data); // Log to check the data
            setStates(data);
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
                        <div className="col-md-8 mb-3">
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
                        </div>
                        {/* Number of Positions */}
                        <div className="col-md-4 mb-3">
                            <label htmlFor="number_of_positions" className="form-label">Number of Positions*</label>
                            <input
                                type="number"
                                className="form-control"
                                name="number_of_positions"
                                onChange={handleInputChange}
                                placeholder="10"
                                required
                            />
                        </div>
                        {/* Job Description */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="job_description" className="form-label">Job Description</label>
                            <textarea
                                className="form-control"
                                name="job_description"
                                onChange={handleInputChange}
                                rows={5}
                            />
                        </div>
                        {/* Industry */}
                        <div className="col-md-5 mb-3">
                            <label htmlFor="industry" className="form-label">Industry*</label>
                            <select
                                className="form-select"
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
                                <option value="Full-Time">Full Time</option>
                                <option value="Part-Time">Part Time</option>
                                <option value="Hourly-Contract">Hourly-Contract</option>
                                <option value="Fixed-Price">Fixed-Price</option>
                            </select>
                        </div>
                        <div className="col-md-4 col-lg-3 mb-3">
                            <label htmlFor="Salary" className="form-label">Work Mode</label>
                            <select className="form-select" name="salary_type" id="Salary" onChange={handleInputChange}>
                                <option value="Work-from-Office">Select work mode</option>
                                <option value="Work-from-Office">Work from Office</option>
                                <option value="Work-from-Home">Work from Home</option>
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                            </select>
                        </div>
                        <div className="col-md-4 col-lg-3 col-lg-3 mb-3">
                            <label htmlFor="Salary" className="form-label">Salary Type</label>
                            <select className="form-select" name="salary_type" id="Salary" onChange={handleInputChange}>
                                <option value="">Salary type</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Weekly">Weekly</option>
                            </select>
                        </div>
                        {/* Min Salary */}
                        <div className="col-md-4 col-lg-3 mb-3">
                            <label htmlFor="min_salary" className="form-label">Min Salary</label>
                            <input
                                type="number"
                                className="form-control"
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
                                name="max_salary"
                                onChange={handleInputChange}
                                placeholder="Max Salary"
                            />
                        </div>
                        {/* Skills */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="skills" className="form-label">Skills*</label>
                            <input
                                type="text"
                                className="form-control"
                                name="skills"
                                onChange={handleInputChange}
                                placeholder="Add Skills"
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="Experience" className="form-label">Experience*</label>
                            <select className="form-select" name="experience" id="Experience" onChange={handleInputChange}>
                                <option value="">Select Experience</option>
                                <option value="Expert">Expert</option>
                                <option value="Medium">Medium</option>
                                <option value="Fresher">Fresher</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="Location" className="form-label">Location* </label>
                            <select className="form-select" name="map_location" id="Location" onChange={handleInputChange}>
                                <option value="">Select Location</option>
                                {cities.map((cty) => (
                                    <option key={cty.id} value={cty.id}>{cty.name}</option>
                                ))}
                            </select>
                        </div>

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
                            <textarea className='form-control' name="about_company" id="about_company"></textarea>
                        </div>
                        {/* Address */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="address" className="form-label">Address*</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                onChange={handleInputChange}
                                placeholder="Address"
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="country" className="form-label">Country</label>
                            <select className="form-select" id="country" name="country" onChange={handleonchnagecountry}>
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="state" className="form-label">State</label>
                            <select className="form-select" id="state" name="state" onChange={handleInputChange}>
                                <option value="">Select State</option>
                                {states?.map((state) => (
                                    <option key={state?.id} value={state?.id}>{state?.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="city" className="form-label">City</label>
                            <select className="form-select" id="city" name="city" onChange={handleInputChange}>
                                <option value="">Select city</option>
                                {cities?.map((city) => (
                                    <option key={city?.id} value={city?.id}>{city?.name}</option>
                                ))}
                            </select>
                        </div>
                        
                        <h4 className='text-primary mt-4'>Education</h4>
                        <div className="col-md-3">
                            <label htmlFor="Schooling" className="form-label">Schooling</label>
                            <select className="form-select" id="Schooling" name="Schooling"  onChange={handleInputChange}>
                                <option value="">Select Class</option>
                                <option value="SSC">SSC</option> 
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inter" className="form-label">Intermediate</label>
                            <select className="form-select" id="inter" name="inter"  onChange={handleInputChange}>
                                <option value="">Select inter</option>
                                <option value="Any-Inter">Any Inter</option>
                                <option value="MPC">MPC</option>
                                <option value="CEC">CEC</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="ug" className="form-label">UG</label>
                            <select className="form-select" id="ug" name="ug" onChange={handleInputChange}>
                                <option value="">Select UG</option>
                                <option value="Any-Graduate">Any Graduate</option>
                                <option value="">B Sc</option>
                                <option value="">B Com</option>
                                <option value="">BA</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="inter" className="form-label">PG</label>
                            <select className="form-select" id="inter" name="inter" onChange={handleInputChange}>
                                <option value="">Select PG</option>
                                <option value="">Any Postgraduate</option>
                                <option value="">MBA</option>
                                <option value="">MCA</option>
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
