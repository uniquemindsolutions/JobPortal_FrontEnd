import React, { useState, useEffect } from 'react';
import './submitJobs.scss';
import { json } from 'stream/consumers';

interface SubmitJob {
    job_title: string;
    number_of_positions: number;
    job_description: string;
    industry: number;
    job_category: number;
    job_type: string;
    salary: string;
    min_salary: number;
    max_salary: number;
    skills: string;
    experience: string;
    english_fluency: string;
    upload_file: File | null;
    address: string;
    map_location: string | null;
    country: number;
    state: number;
    city: number;
}

interface JobCategory {
    id: number;
    name: string;
}

interface Industry {
    id: number;
    name: string;
    industry:string;
}

interface Country {
    id: number;
    name: string;
}

interface State {
    id: number;
    name: string;
}

const SubmitJob = () => {
    const [industriesorg, setIndustries] = useState<any[]>([]);
    const [jobCategories, setJobCategories] = useState<JobCategory[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState([]);

    const [formData, setFormData] = useState<SubmitJob>({
        job_title: '',
        number_of_positions: 0,
        job_description: '',
        industry: 0,
        job_category: 0,
        job_type: '',
        salary: '',
        min_salary: 0,
        max_salary: 0,
        skills: '',
        experience: '',
        english_fluency: '',
        upload_file: null,
        address: '',
        map_location: '',
        country: 0,
        state: 0,
        city: 0,
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
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle file input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            upload_file: e.target.files ? e.target.files[0] : null
        });
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const submissionData = new FormData();
        Object.keys(formData).forEach(key => {
            submissionData.append(key, (formData as any)[key]);
        });

        try {
            const response = await fetch("http://127.0.0.1:8000/submitnewjob/", {
                method: "POST",
                body: submissionData,
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
    console.log("datachecking",industriesorg);


    const handleonchnagecountry = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        event.preventDefault();
        const country = event.target.value;
        console.log();
        // setSelectedCountry(country);
  const countid=1;
        fetch("http://127.0.0.1:8000/states/?countryid=2")
        .then(response => response.json())
        .then(data => {
            console.log("States:", data); // Log to check the data
            setStates(data);
        })
        .catch(error => console.error('Error fetching states:', error));

        
    };

    return (
        <main>
            <h4 className="mt-4">Submit a Job</h4>
            <form onSubmit={handleSubmit}>
                <div className="custom-card">
                    <h3 className='text-primary'>Job Details</h3>
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
                            <label htmlFor="number_of_positions" className="form-label">Number of Positions</label>
                            <input
                                type="number"
                                className="form-control"
                                name="number_of_positions"
                                value={formData.number_of_positions}
                                onChange={handleInputChange}
                                placeholder="10"
                                required
                            />
                        </div>
                        {/* Job Description */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="job_description" className="form-label">Job Description*</label>
                            <textarea
                                className="form-control"
                                name="job_description"
                                value={formData.job_description}
                                onChange={handleInputChange}
                                rows={5}
                                required
                            />
                        </div>
                        {/* Industry */}
                        <div className="col-md-5 mb-3">
                            <label htmlFor="industry" className="form-label">Industry*</label>

                            {/* {industriesorg} */}
                            
                            <select
                                className="form-select"
                                name="industry"
                                // value={formData.industry}
                                onChange={handleInputChange}
                                required
                            >

                                {/* <option value="">Select Industry</option>
                                {industries.map((industry:any[]) => (
                                    <option key={industry.id} value={industry.id}>
                                        {industry.name}
                                    </option>
                                ))} */}
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
                            <label htmlFor="job_category" className="form-label">Job Category*</label>
                            <select
                                className="form-select"
                                name="job_category"
                                value={formData.job_category}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Category</option>
                                {jobCategories.map((category) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-2 mb-3">
                            <label htmlFor="JobType" className="form-label">Job Type</label>
                            <select className="form-select" name="JobType" id="JobType">
                                <option value="">Full Time</option>
                                <option value="">Part Time</option>
                                <option value="">Hourly-Contract</option>
                                <option value="">Fixed-Price</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="Salary" className="form-label">Salary</label>
                            <select className="form-select" name="Salary" id="Salary">
                                <option value="">Monthly</option>
                                <option value="">Weekly</option>
                            </select>
                        </div>
                        {/* Min Salary */}
                        <div className="col-md-4 mb-3">
                            <label htmlFor="min_salary" className="form-label">Min Salary</label>
                            <input
                                type="number"
                                className="form-control"
                                name="min_salary"
                                value={formData.min_salary}
                                onChange={handleInputChange}
                                placeholder="Min Salary"
                            />
                        </div>

                        {/* Max Salary */}
                        <div className="col-md-4 mb-3">
                            <label htmlFor="max_salary" className="form-label">Max Salary</label>
                            <input
                                type="number"
                                className="form-control"
                                name="max_salary"
                                value={formData.max_salary}
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
                                value={formData.skills}
                                onChange={handleInputChange}
                                placeholder="Add Skills"
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="Experience" className="form-label">Experience*</label>
                            <select className="form-select" name="Experience" id="Experience">
                                <option value="">Expert</option>
                                <option value="">Intermediate</option>
                                <option value="">No-Experience</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="Location" className="form-label">Location* </label>
                            <select className="form-select" name="Location" id="Location">
                                <option value="">Hyderabad TS</option>
                                <option value="">Mubai MH</option>
                                <option value="">Dehli DL</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <label htmlFor="Industry" className="form-label">English Fluency </label>
                            <select className="form-select" name="Industry" id="Industry">
                                <option value="">Basic</option>
                                <option value="">Medium</option>
                                <option value="">Excellent</option>
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

                        {/* Address */}
                        <div className="col-md-12 mb-3">
                            <label htmlFor="address" className="form-label">Address*</label>
                            <input
                                type="text"
                                className="form-control"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Address"
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="country" className="form-label">Country*</label>
                            <select className="form-select" id="country" name="country" value={formData.country || 0} onChange={handleonchnagecountry} required>
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="state" className="form-label">State*</label>
                            <select className="form-select" id="state" name="state" value={formData.state || 0} onChange={handleInputChange} required>
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state.id} value={state.id}>{state.name}</option>
                                ))}
                            </select>
                        </div>
                        {/* Submit Button */}

                    </div>
                </div>
                <div className="text-center my-4">
                    <button type="submit" className="btn btn-success px-5 btn-lg">Submit Job</button>
                    <button type="submit" className="btn ms-4">Cancel</button>
                </div>
            </form>
        </main>
    );
};


export default SubmitJob;
