import React, { useEffect, useState } from 'react';

interface MyProfile {
    id: number;
    photo: File | null;
    employee_Name: string | null;
    website: string;
    email: string | null;
    company_size: number;
    founded_date: string;
    category: string | null;
    phone_number: string; // Changed to string to accommodate phone formats
    about_company: string | null;
    address: string | null;
    country: number;
    state: number;
    city: number;
    zip_code: number;
    map_location: string | null;
}

interface MyProfileResponse {
    success: boolean;
    message: string;
}

const MyProfile = () => {
    const [profileFormData, setProfileFormData] = useState<MyProfile>({
        id: 0,
        photo: null,
        employee_Name: '',
        website: '',
        email: '',
        company_size: 0,
        founded_date: '',
        category: '',
        phone_number: '',
        about_company: '',
        address: '',
        country: 0,
        state: 0,
        city: 0,
        zip_code: 0,
        map_location: ''
    });

    const [countries, setCountries] = useState<any[]>([]);
    const [states, setStates] = useState<any[]>([]);
    const [cities, setCities] = useState<any[]>([]);
    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch countries, states, cities and profile data on component mount
    useEffect(() => {
        fetch('http://127.0.0.1:8000/countries/')
            .then((response) => response.json())
            .then((data) => setCountries(data))
            .catch((error) => console.error("Error fetching countries:", error));

        // Fetch profile data
        fetch('http://127.0.0.1:8000/myprofile/') // Adjust the endpoint if necessary
            .then((response) => response.json())
            .then((data: MyProfile) => {
                setProfileFormData(data);
                // Fetch states and cities based on the profile's country and state
                fetchStates(data.country);
                fetchCities(data.state);
            })
            .catch((error) => console.error("Error fetching profile data:", error));
    }, []);

    const fetchStates = (countryId: number) => {
        fetch(`http://127.0.0.1:8000/states/`)
            .then((response) => response.json())
            .then((data) => setStates(data))
            .catch((error) => console.error("Error fetching states:", error));
    };

    const fetchCities = (stateId: number) => {
        fetch(`http://127.0.0.1:8000/cities/`)
            .then((response) => response.json())
            .then((data) => setCities(data))
            .catch((error) => console.error("Error fetching cities:", error));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileFormData((prevData) => ({
            ...prevData,
            [name]: value || '' // Ensure the value is never undefined
        }));

        // Fetch states when country changes
        if (name === 'country') {
            fetchStates(Number(value));
            setProfileFormData((prevData) => ({
                ...prevData,
                state: 0, // Reset state and city when country changes
                city: 0
            }));
        }

        // Fetch cities when state changes
        if (name === 'state') {
            fetchCities(Number(value));
            setProfileFormData((prevData) => ({
                ...prevData,
                city: 0 // Reset city when state changes
            }));
        }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null; // Get the first selected file or null if none
        setProfileFormData((prevData) => ({
            ...prevData,
            photo: file, // Update the photo in the state
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData();
        Object.entries(profileFormData).forEach(([key, value]) => {
            if (value !== null) {
                formData.append(key, value);
            }
        });
        const payload = {
            "country": 1,
            "state": 1,
            "city": 1,
            "employee_name": "Vamshi",
            "website": "https://www.google.com",
            "email": "vamshi@gmail.com",
            "company_size": 10,
            "category": "IT",
            "phone_number": "949977003",
            "about_company":"It is a startup",
            "address": "Hyderabad",
            "zip_code": 502110
        }

        fetch('http://127.0.0.1:8000/myprofile/', {
            method: 'POST',
            // body: formData, // Send FormData instead of JSON
            body:JSON.stringify(payload),
            headers:{
            'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then((data) => {
                        throw new Error(data.message || 'Profile registration failed.');
                    });
                }
                return response.json();
            })
            .then((data: MyProfileResponse) => {
                setResponseMessage(data.message);
                setProfileFormData({
                    id: 0,
                    photo: null,
                    employee_Name: '',
                    website: '',
                    email: '',
                    company_size: 0,
                    founded_date: '',
                    category: '',
                    phone_number: '',
                    about_company: '',
                    address: '',
                    country: 0,
                    state: 0,
                    city: 0,
                    zip_code: 0,
                    map_location: ''
                });
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <main>
            <h4 className="mt-4">My Profile</h4>
            <form onSubmit={handleSubmit}>
                <div className="custom-card">
                    <div className="d-flex mb-3">
                        <div className="d-flex align-items-center">
                            <img
                                className="admin-pic"
                                src={
                                    typeof profileFormData.photo === 'string'
                                        ? profileFormData.photo
                                        : profileFormData.photo
                                            ? URL.createObjectURL(profileFormData.photo)
                                            : window.location.origin + '/images/avtar-pic.avif'
                                }
                                style={{ width: '60px', height: '60px' }}
                                alt="Profile"
                            />

                            <div className="ms-3">
                                <button className="file_button_container btn btn-success me-3">
                                    Upload new photo
                                    <input type="file" onChange={handleFileChange} />
                                </button>

                                <button className="btn btn-outline-danger btn-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="employee_Name" className="form-label">Employer Name*</label>
                            <input type="text" className="form-control" id="employee_Name" name="employee_Name" value={profileFormData.employee_Name || ''} onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="website" className="form-label">Website*</label>
                            <input type="url" className="form-control" id="website" name="website" value={profileFormData.website || ''} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email*</label>
                            <input type="email" className="form-control" id="email" name="email" value={profileFormData.email || ''} onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="companySize" className="form-label">Company Size*</label>
                            <input type="number" className="form-control" id="companySize" name="company_size" value={profileFormData.company_size || 0} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="foundedDate" className="form-label">Founded Date*</label>
                            <input type="date" className="form-control" id="foundedDate" name="founded_date" value={profileFormData.founded_date || ''} onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="category" className="form-label">Category*</label>
                            <input type="text" className="form-control" id="category" name="category" value={profileFormData.category || ''} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number*</label>
                            <input type="tel" className="form-control" id="phoneNumber" name="phone_number" value={profileFormData.phone_number || ''} onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="aboutCompany" className="form-label">About Company*</label>
                            <textarea className="form-control" id="aboutCompany" name="about_company" value={profileFormData.about_company || ''} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="address" className="form-label">Address*</label>
                            <input type="text" className="form-control" id="address" name="address" value={profileFormData.address || ''} onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="country" className="form-label">Country*</label>
                            <select className="form-select" id="country" name="country" value={profileFormData.country || 0} onChange={handleInputChange} required>
                                <option value="">Select Country</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>{country.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="state" className="form-label">State*</label>
                            <select className="form-select" id="state" name="state" value={profileFormData.state || 0} onChange={handleInputChange} required>
                                <option value="">Select State</option>
                                {states.map((state) => (
                                    <option key={state.id} value={state.id}>{state.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-4">
                            <label htmlFor="city" className="form-label">City*</label>
                            <select className="form-select" id="city" name="city" value={profileFormData.city || 0} onChange={handleInputChange} required>
                                <option value="">Select City</option>
                                {cities.map((city) => (
                                    <option key={city.id} value={city.id}>{city.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="zipCode" className="form-label">Zip Code*</label>
                            <input type="number" className="form-control" id="zipCode" name="zip_code" value={profileFormData.zip_code || 0} onChange={handleInputChange} required />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="mapLocation" className="form-label">Map Location*</label>
                            <input type="text" className="form-control" id="mapLocation" name="map_location" value={profileFormData.map_location || ''} onChange={handleInputChange} required />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Save Profile</button>
                </div>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p className="text-danger">{error}</p>}
            {responseMessage && <p className="text-success">{responseMessage}</p>}
        </main>
    );
};

export default MyProfile;
