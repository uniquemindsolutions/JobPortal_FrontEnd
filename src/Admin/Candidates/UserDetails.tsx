import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';


const UserDetails = ({ user, personalDels }: any) => {
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [designation, setDesignation] = useState<any>([])
    const [cities, setCities] = useState<any>([]);
    
    useEffect(() => {
        getDesignations();
        fetchCities();
    }, [])

    const getDesignations = async () => {
        try {
            const desigList = await axios.get('http://127.0.0.1:8000/jobcategory/')
            setDesignation(desigList.data)
        } catch {
            setError("No found jobs")
        }
    }

    const desigListData = (id: any) => {
        const desName = designation.find((des: any) => des.id === id)
        return desName ? desName.job_category : ''
    }

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

    const getCityList = (id: any) => {
        const cityList = cities.find((cty: any) => cty.id === id)
        return cityList ? cityList.name : ''
    }



    if (!user) {
        return <div className="p-4">Select a user to see details</div>;
    }



    return (
        <main>
            <div className="user-details p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className='d-flex'>
                        <img src={user.profile_photo} alt='user pic' className="user-img me-3" />
                        <span className='mt-3'>
                            <h6>{user.first_name} {user.last_name}</h6>
                            <div>
                                Exp: {user.total_experience}, {user.total_months},
                                <i className="bi bi-briefcase text-secondary ms-3"></i> {desigListData(user.industry)},
                                <i className="bi bi-geo-alt text-secondary ms-3"></i> {getCityList(user.current_location)}</div>
                            {/* <p className='mb-0 text-secondary'><span>Applied 5 days ago</span>,  <span>Hyderabad</span></p> */}
                        </span>
                    </div>
                    <div>
                        <button className="save-btn me-2">Interview</button>
                        <button className="update-btn">Reject</button>
                    </div>
                </div>

                <div className="user-info">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" data-bs-toggle="tab" href="#GeneralInformation">General Information</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#PersonalDetails">Personal Details</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-bs-toggle="tab" href="#Contacts">Contacts</a>
                        </li>
                    </ul>

                    <div className="tab-content  mt-4">
                        <div className="tab-pane container active" id="GeneralInformation">
                            <ul>
                                <li>Email: <span>{user.email}</span></li>
                                <li>Phone: <span>{user.phone_number}</span></li>
                                <li>Source: <span>{user.source}</span></li>
                            </ul>
                        </div>
                        <div className="tab-pane container fade" id="PersonalDetails">
                            {personalDels}
                            <ul>
                                <li><span className='text-secondary'>Gender:</span> {personalDels?.gender || 'Not Available'}</li>
                                {/* <li><span className='text-secondary'>Date of Birth:</span> {personaDetails.date_of_birth}</li> */}
                                <li><span className='text-secondary'></span></li>
                                <li><span className='text-secondary'></span></li>
                            </ul>
                        </div>
                        <div className="tab-pane container fade" id="Contacts">Contacts</div>
                    </div>




                </div>
            </div>
        </main>
    );
};

export default UserDetails;
