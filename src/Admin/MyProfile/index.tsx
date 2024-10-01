import React, { useState } from 'react'


interface myProfile {
    photo: string;
    employee_Name: string,
    website: string;
    email: string;
    company_size: number;
    founded_date: string;
    category: string,
    phone_number: number;
    about_company: string;
    country: string;
    city: string;
    zip_code: number;
    state: string;
    map_location: string;
}



interface myProfileResponse {
    success: boolean;
    message: string;
}
const MyProfile = () => {
    const [profileFormData, setProfileFormData] = useState<myProfile>({
        photo: '',
        employee_Name: '',
        website: '',
        email: '',
        company_size: 0,
        founded_date: '',
        category: '',
        phone_number: 0,
        about_company: '',
        country: '',
        city: '',
        zip_code: 0,
        state: '',
        map_location: ''
    });


    const [responseMessage, setResponseMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedCountry, setSelectedCountry] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setProfileFormData({
            ...profileFormData,
            [name]: value
        });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(e.target.value); // Update the selected country in state
      };

    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/myprofile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileFormData) // Send form data to API
            });

            const result: myProfileResponse = await response.json();
            console.log("===== result", result)

            if (!response.ok) {
                throw new Error(result.message || ' Profile Registration failed.');
            }
            setResponseMessage(result.message);

        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <h4 className="mt-4">My Profile</h4>
            <form onSubmit={handleSubmit}>
                <div className="custom-card">
                    <div className="d-flex mb-3">
                        <div className="d-flex align-items-center">
                            <img className='amdin-pic' src={window.location.origin + '/images/avtar-pic.avif'} style={{ width: '60px', height: '60px' }} />
                            <div className="ms-3">
                                <button className="btn btn-success me-3">Upload new photo</button>
                                <button className="btn btn-outline-danger btn-sm">Delete</button>
                            </div>
                        </div>
                    </div>
                    <hr />

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="employee_Name" className="form-label">Employer Name*</label>
                            <input type="text" className="form-control" 
                                id="employee_Name" placeholder="John Doe"
                                name="employee_Name"
                                value={profileFormData.employee_Name}
                                onChange={handleInputChange}
                                required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="website" className="form-label">Website*</label>
                            <input type="url" className="form-control" id="website" placeholder="http://somename.com" name="website"
                            value={profileFormData.website}
                            onChange={handleInputChange}
                            required />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email*</label>
                            <input type="email" className="form-control" id="email" placeholder="companyinc@gmail.com" 
                                name="email"
                                value={profileFormData.email}
                                onChange={handleInputChange}
                                required />
                                 
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="companySize" className="form-label">Company Size*</label>
                            <input type="number" className="form-control" id="companySize" placeholder="700"  
                            name="company_size"
                            value={profileFormData.company_size}
                            onChange={handleInputChange}
                            required/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="foundedDate" className="form-label">Founded Date*</label>
                            <input type="date" className="form-control" id="foundedDate" 
                             name="founded_data"
                             value={profileFormData.founded_date}
                             onChange={handleInputChange}
                             required/>
                             
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="category" className="form-label">Category*</label>
                            <input type="text" className="form-control" id="category" placeholder="Account, Finance, Marketing" 
                            name="category"
                            value={profileFormData.category}
                            onChange={handleInputChange}
                            required/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number*</label>
                            <input type="tel" className="form-control" id="phoneNumber" placeholder="+880 01723801729" 
                            name="phone_number"
                            value={profileFormData.phone_number}
                            onChange={handleInputChange}
                            required/>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor="AboutCompany" className="form-label">About Company</label>
                            <textarea className="form-control" id="AboutCompany" rows={5} cols={20} 
                            name="about_company"
                            value={profileFormData.about_company}
                            // onChange={handleInputChange}
                            required/>
                        </div>
                    </div>

                </div>


                <div className="custom-card mt-4">
                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor="Address" className="form-label">Address*</label>
                            <textarea className='form-control' name="addr" id="addr" style={{ height: '60px' }}></textarea>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6 col-lg-3 mb-3">
                            <label htmlFor="Country" className="form-label">Country</label>
                            <select className="form-select" name="Country" id="Country">
                                <option value="">India</option>
                            </select>
                            {/* <select className="form-select" id="country"
                            name="country"
                            value={profileFormData.country}
                            onChange={handleInputChange}
                            required/>
                            {profileFormData.map( (ctry, index)=>(
                                    <option key={index} value={ctry.country}>{ctry.country}</option>
                                ))
                            }
                               
                            </select> */}
                        </div>
                        <div className="col-md-6 col-lg-3 mb-3">
                            <label htmlFor="State" className="form-label">State </label>
                            <select className="form-select" name="State" id="State">
                                <option value="">TS</option>
                            </select>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            
                            <select className="form-select" name="State" id="city">
                                <option value="">Hyderabad</option>
                            </select>
                        </div>
                        <div className="col-md-6 col-lg-3 mb-3">
                            <label htmlFor="ZipCode" className="form-label">Zip Code</label>
                            <input type='number' className="form-control" name="ZipCode" id="ZipCode" />

                        </div>
                        

                        <div className="col-md-12 mb-3">
                            <label htmlFor="MapLocation" className="form-label">Map Location</label>
                            <input type='number' className="form-control" name="MapLocation" id="MapLocation" />
                        </div>
                    </div>
                </div>

                <div className="mt-5  text-center">
                    <button type="submit" className="btn btn-success btn-lg px-5">Submit</button>
                    <button type="submit" className="btn btn-lg ms-4">Cancel</button>
                </div>
                <br />
            </form>

        </main>
    )
}

export default MyProfile