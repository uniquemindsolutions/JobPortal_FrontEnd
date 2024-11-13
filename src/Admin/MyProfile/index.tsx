import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Select from 'react-select';

interface MyProfile {
    id: number;
    company_logo: File | null;
    company_name: string;
    employee_name: string;
    website: string;
    headquarter_location: number;
    company_type: string | null;
    founded_date: string;
    company_size: number;
    email: string;
    phone_number: string;
    industry: number,
    functional_area: number,
    about_company: string | null;
    address: string | null;
    country: number;
    state: number;
    city: number;
    zip_code: number;
    map_location: string;
}
interface JobCategory {
    id: number;
    job_category: string;
}

interface Industry {
    id: number;
    industry: string;
}

const MyProfile = () => {
    const [profileFormData, setProfileFormData] = useState<MyProfile>({
        id: 0,
        company_logo: null,
        company_name: '',
        employee_name: '',
        website: '',
        headquarter_location: 0,
        company_type: '',
        founded_date: '',
        company_size: 0,
        email: '',
        phone_number: '',
        industry: 0,
        functional_area: 0,
        about_company: '',
        address: '',
        country: 0,
        state: 0,
        city: 0,
        zip_code: 0,
        map_location: ''
    });
    const { id } = useParams();
    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [getmyprofile, setMyprofile] = useState<any[]>([]);
    const [methodType, seteditmethod] = useState(false);
    const [industriesorg, setIndustries] = useState<any[]>([]);
    const [functional_areaorg, setfunctional_area] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    // Fetch countries, states, cities and profile data on component mount
    const [selectedExperience, setSelectedExperience] = useState<any>(null);
    const [selectedCompanyType, setSelectedCompanyType] = useState<any>(null);

    useEffect(() => {
        fetch(`https://uniquemindsolutions.com/usmjobportal/myprofile/43/`)
            .then(response => response.json())
            .then(data => {
                console.log("Submit myprofile:", data);
                setMyprofile(data);
                if (Object.keys(data).length > 0) {
                    console.log(data, "copyobject ======")
                    Object.entries(data).forEach(([key, value]) => {
                        console.log("Key and Value:", key, value);
                        setProfileFormData((profileFormData) => ({
                            ...profileFormData,
                            [key]: value, // Dynamically update the key based on input name
                        }));
                    });
                    console.log("Latest form data =", profileFormData);
                }
            })
            .catch(error => console.error("Error fetching job details:", error));
        fetch('https://uniquemindsolutions.com/usmjobportal/countries/')
            .then((response) => response.json())
            .then((data) => setCountries(data))
            .catch((error) => console.error("Error fetching countries:", error));
        fetch('https://uniquemindsolutions.com/usmjobportal/states/')
            .then((response) => response.json())
            .then((data) => setStates(data))
            .catch((error) => console.error("Error fetching states:", error));
        fetch('https://uniquemindsolutions.com/usmjobportal/cities/')
            .then((response) => response.json())
            .then((data) => setCities(data))
            .catch((error) => console.error("Error fetching cities:", error));

        fetch("https://uniquemindsolutions.com/usmjobportal/industry/")
            .then(response => response.json())
            .then(data => {
                console.log("Industries:", data); // Log to check the data
                setIndustries(data);
            })
            .catch(error => console.error('Error fetching industries:', error));

        fetch("https://uniquemindsolutions.com/usmjobportal/jobcategory/")
            .then(response => response.json())
            .then(data => {
                console.log("Functional_Area:", data); // Log to check th data
                setfunctional_area(data);
            })
            .catch(error => console.error('Error fetching setfunctional_area:', error));
    }, []);
    const handleEdit = () => {
        setIsEditing(!isEditing);
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> | any, actionMeta?: any) => {
        if (e && e.target) {
            // Handling standard HTML input elements
            const { name, value } = e.target;
            setProfileFormData({
                ...profileFormData,
                [name]: value,
            });
        } else if (actionMeta && actionMeta.name) {
            // Handling react-select input
            const { name } = actionMeta;
            const value = e ? e.value : null;
            setProfileFormData({
                ...profileFormData,
                [name]: value,
            });
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null; // Get the first selected file or null if none
        setProfileFormData({
            ...profileFormData,
            company_logo: file, // Update the photo in the state
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(profileFormData).forEach(key => {
            formData.append(key, (formData as any)[key]);
        })
        const payload = {
            "company_name": profileFormData.company_name,
            "company_logo": profileFormData.company_logo,
            "company_type": profileFormData.company_type,
            "country": profileFormData.country,
            "state": profileFormData.state,
            "city": profileFormData.city,
            "employee_name": profileFormData.employee_name,
            "website": profileFormData.website,
            "email": profileFormData.email,
            "company_size": profileFormData.company_size,
            "founded_date": profileFormData.founded_date,
            "industry": profileFormData.industry,
            "functional_area": profileFormData.functional_area,
            "phone_number": profileFormData.phone_number,
            "about_company": profileFormData.about_company,
            "address": profileFormData.address,
            "zip_code": profileFormData.zip_code,
            "map_location": profileFormData.map_location
        }
        try {
            if (methodType) {
                // Update the job with a PUT request
                const response = await fetch(`https://uniquemindsolutions.com/usmjobportal/myprofile/${id}/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload), // Send updated form data
                });

                if (!response.ok) {
                    throw new Error(`Failed to update profile. Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Profile updated successfully:", data);
                setProfileFormData(data);
                alert("Profile updated successfully!");
            } else {
                // Create a new job with a POST request
                const response = await fetch('https://uniquemindsolutions.com/usmjobportal/myprofile/', {
                    method: 'POST',
                    body: JSON.stringify(payload),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if (!response.ok) {
                    throw new Error(`Failed to create profile. Status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Profile created successfully:", data);
                setProfileFormData(data);
                alert("Profile created successfully!");

                // if (!response.ok) {
                //     const result = await response.json();
                //     alert("Profile Registration Success");
                //     setProfileFormData({
                //         id: 0,
                //         photo: null,
                //         employee_name: '',
                //         website: '',
                //         email: '',
                //         company_size: 0,
                //         founded_date: '',
                //         industry: 0,
                //         functional_area: 0,
                //         category: '',
                //         phone_number: '',
                //         about_company: '',
                //         address: '',
                //         country: 0,
                //         state: 0,
                //         city: 0,
                //         zip_code: 0,
                //         map_location: ''
                //     });

                // } else {
                // }
                // console.error("Error Myprofile:", response.statusText);
            }
        } catch (error) {
            console.error("Error Myprofile:", error);
        }
    };
    const handleonchangecountry = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        console.log('Submitting form:', profileFormData);
        const { name, value } = e.target;
        setProfileFormData({ ...profileFormData, [name]: value });
        const countryId = e.target.options.selectedIndex;
        fetch(`https://uniquemindsolutions.com/usmjobportal/states/?countryid=${countryId}`)
            .then(response => response.json())
            .then(data => {
                console.log("States:", data);
                setStates(data);
            })
            .catch(error => console.error('Error fetching states:', error));
    };

    const handleonchangestate = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setProfileFormData({ ...profileFormData, [name]: value });
        const stateId = e.target.options.selectedIndex;
        fetch(`https://uniquemindsolutions.com/usmjobportal/cities/?stateid=${stateId}`)
            .then(response => response.json())
            .then(data => {
                console.log("Cities:", data);
                setCities(data);
            })
            .catch(error => console.error('Error fetching cities:', error));
    }

    const HeadquarterLocation = [
        { value: 'TS', label: 'Telangana' },
        { value: 'HYD', label: 'Hyderabad' },
        { value: 'MH', label: 'Maharastra' },
        { value: 'MI', label: 'Mumbai' },
        { value: 'TN', label: 'Tamilnadu' },
        { value: 'KL', label: 'Kerala' },
        { value: 'KA', label: 'Karnataka' },
    ];
    const CompanyType = [
        { value: 'Private', label: 'Private' },
        { value: 'Public', label: 'Public' },
        { value: '', label: 'Govt' },
    ];

    return (
        <main>
            <h4 className="mt-4">My Profile </h4>
            <form onSubmit={handleSubmit}>
                <div className="custom-card">

                    {/* company profile start */}
                    <div className="row">
                        <div className="text-end">
                            <button type="submit" className="btn ms-4 lt-blue-c" onClick={handleEdit} title='Click to Edit Profile'>Edit <i className="bi bi-pencil-square"></i></button>
                        </div>
                        <div className="col-md-3">
                            <div className="mb-3">
                                <div className='border rounded d-flex justify-content-center align-items-center p-2' style={{ minHeight: '250px' }}>
                                    <img className="img-fluid rounded"
                                        src={
                                            typeof profileFormData.company_logo === 'string'
                                                ? profileFormData.company_logo
                                                : profileFormData.company_logo
                                                    ? URL.createObjectURL(profileFormData.company_logo)
                                                    : window.location.origin + '/images/default-logo.png'

                                        }
                                        style={{ height: 'auto' }} alt="Profile"
                                    />
                                </div>
                                {/* <button className="file_button_container btn btn-success me-3">
                                Upload new photo
                                <input type="file" onChange={handleFileChange} disabled={!isEditing} />
                            </button> */}
                                <label className="btn btn-outline-primary btn-sm">
                                    <i className="fa fa-image"></i>Upload logo<input type="file" onChange={handleFileChange} disabled={isEditing} style={{ display: 'none' }} name="image" />
                                </label>
                                <button className="btn btn-outline-warning btn-sm mx"><i className="bi bi-x-lg"></i></button>
                            </div>
                        </div>

                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="employee_Name" className="form-label">Company Name*</label>
                                    <input type="text" className="form-control" id='company_name' name='company_name' value={profileFormData.company_name} onChange={handleInputChange} disabled={isEditing} />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="employee_Name" className="form-label">Employer Name</label>
                                    <input type="text" className="form-control" id="employee_name" name="employee_name" value={profileFormData.employee_name || ''} onChange={handleInputChange} disabled={isEditing} required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <div className="">
                                        <label htmlFor="website" className="form-label">Website</label>
                                        <input type="url" className="form-control" id="website" name="website" value={profileFormData.website || ''} onChange={handleInputChange} disabled={isEditing} placeholder='Start with https:// or http:// or www.' />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="foundedDate" className="form-label">Headquarter Location</label>
                                    <select name="" id="" className='form-select' value={profileFormData.city}>
                                        <option value="">Select City</option>
                                        {cities?.map((city) => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                    </select>
                                    {/* <Select
                                        className="form-label"
                                        placeholder="Select experience"
                                        value={selectedExperience}
                                        onChange={setSelectedExperience}
                                    /> */}

                                </div>
                                <div className="col-md-5">
                                    <label htmlFor="foundedDate" className="form-label">Company Type*</label>
                                    <Select
                                        className="form-label"
                                        options={CompanyType}
                                        placeholder="Select Company Type"
                                        value={CompanyType.find(option => option.value === profileFormData.company_type) || null}
                                        onChange={(selectedOption) => {
                                            setProfileFormData({
                                                ...profileFormData,
                                                company_type: selectedOption ? selectedOption.value : null,
                                            });
                                        }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label htmlFor="foundedDate" className="form-label">Founded Date</label>
                                    <input type="date" className="form-control" id="foundedDate" name="founded_date" value={profileFormData.founded_date || ''} onChange={handleInputChange} disabled={isEditing} />
                                </div>

                                <div className="col-md-3 mb-3">
                                    <label htmlFor="companySize" className="form-label">Company Size</label>
                                    <input type="number" className="form-control" id="companySize" name="company_size" value={profileFormData.company_size || 0} onChange={handleInputChange} disabled={isEditing} />
                                </div>


                            </div>
                        </div>
                    </div>
                    {/* company profile end */}

                    <div className="row mb-3">
                        <div className="col-md-3 mb-3">
                            <label htmlFor="email" className="form-label">Email*</label>
                            <input type="email" className="form-control" id="email" name="email" value={profileFormData.email || ''} onChange={handleInputChange} disabled={isEditing} required />
                        </div>
                        <div className="col-md-3 mb-3">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number*</label>
                            <input type="tel" className="form-control" id="phoneNumber" name="phone_number" value={profileFormData.phone_number || ''} onChange={handleInputChange} disabled={isEditing} required />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="category" className="form-label">Industry*</label>
                            <select className='form-select' name="industry" id="industry" value={profileFormData.industry || ''} onChange={handleInputChange} disabled={isEditing}  >
                                <option value="">Select Industry</option>
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

                            {/* <Select
                                name="industry"
                                id="industry"
                                value={industriesorg.find(
                                    (ind) => ind.id === profileFormData.industry
                                ) || null} // Find the selected industry to display
                                onChange={(selectedOption, actionMeta) => handleInputChange(selectedOption, actionMeta)}
                                options={industriesorg.map((industry) => ({
                                    value: industry.id,
                                    label: industry.industry,
                                }))} // Use value/label for options in react-select
                                isDisabled={isEditing}
                            /> */}


                        </div>
                        <div className="col-md-3">
                            <label htmlFor="functional_area" className="form-label">Functional Area</label>
                            <select
                                className="form-select"
                                name="functional_area"
                                id="functional_area"
                                value={profileFormData.functional_area || ''}
                                onChange={handleInputChange}
                                disabled={isEditing}
                            >
                                <option value="">Select Functional Area</option>
                                {functional_areaorg && functional_areaorg.length > 0 ? (
                                    functional_areaorg.map((functional_area: JobCategory) => (
                                        <option key={functional_area.id} value={functional_area.id}>
                                            {functional_area.job_category}
                                        </option>
                                    ))
                                ) : (
                                    <option value="">No Functional Area</option>
                                )}
                            </select>
                        </div>

                    </div>

                    <div className="row mb-3">

                        <div className="col-md-12">
                            <label htmlFor="aboutCompany" className="form-label">About Company</label>
                            <textarea className="form-control" id="aboutCompany" name="about_company" value={profileFormData.about_company || ''} onChange={handleInputChange} disabled={isEditing} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-12 mb-3">
                            <label htmlFor="address" className="form-label">Address*</label>
                            <input type="text" className="form-control" id="address" name="address" value={profileFormData.address || ''} onChange={handleInputChange} disabled={isEditing} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="country" className="form-label">Country</label>
                            <select className="form-select" id="country" name="country" value={profileFormData.country || 0} onChange={handleonchangecountry} disabled={isEditing}   >
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="state" className="form-label">State</label>
                            <select className="form-select" value={profileFormData.state || ""} id="state" name="state"
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
                            <select className="form-select" value={profileFormData.city || ""} id="city" name="city"
                                onChange={handleInputChange}
                                disabled={isEditing}
                            >
                                <option value="">Select City</option>
                                {cities?.map((city) => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="zipCode" className="form-label">Zip Code</label>
                            <input type="number" className="form-control" id="zipCode" name="zip_code" value={profileFormData.zip_code || 0} onChange={handleInputChange} disabled={isEditing} />
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="mapLocation" className="form-label">Map Location</label>
                            <input type="text" className="form-control" id="mapLocation" name="map_location" value={profileFormData.map_location || ''} onChange={handleInputChange} disabled={isEditing} />
                        </div>
                    </div>

                </div>
                {/* <div className="text-center my-4">
                    <button type="submit" className="btn btn-success px-5 btn-lg">Save Profile</button>
                    <button type="submit" className="btn ms-4" onClick={handleEdit}>Cancel</button>
                </div> */}
                <div className="text-center my-4">
                    <button type="submit" className="btn btn-success px-5 btn-lg">Save</button>
                    <button type="submit" className="btn ms-4">Cancel</button>

                    {/* {!isEditing ? (
                        <button type="submit" className="btn ms-4" onClick={handleEdit}>Edit</button>
                    ) : (
                        <button type="submit" className="btn btn-success">Save</button>
                    )} */}
                </div>
            </form>
        </main>
    );
};

export default MyProfile;
