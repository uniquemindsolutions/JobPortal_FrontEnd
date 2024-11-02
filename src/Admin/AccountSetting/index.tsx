import axios from 'axios';
import React, { useState } from 'react';

interface accountSettingModel {
    firstname: string;
    lastname: string;
    email: string;
    phone_number: string;
}
interface changepasswordModel {
    old_password: string;
    new_password: string;
    confirm_password: string;
}

const AccountSetting = () => {
    const [acountData, setAcountData] = useState<accountSettingModel>({
        firstname: '',
        lastname: '',
        email: '',
        phone_number: ''
    });

    const [changepasswordData, setChangepasswordData] = useState<changepasswordModel>({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    // Handle input changes for both account data and password change data
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (['firstname', 'lastname', 'email', 'phone_number'].includes(name)) {
            setAcountData({ ...acountData, [name]: value });
        } else {
            setChangepasswordData({ ...changepasswordData, [name]: value });
        }
    };

    // Form validation
    const validateForm = () => {
        if (!acountData.firstname || !acountData.lastname) {
            setErrorMsg("First name and last name are required.");
            return false;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(acountData.email)) {
            setErrorMsg("Please enter a valid email address.");
            return false;
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(acountData.phone_number)) {
            setErrorMsg("Please enter a valid 10-digit phone number.");
            return false;
        }

        if (!changepasswordData.old_password || !changepasswordData.new_password || !changepasswordData.confirm_password) {
            setErrorMsg("All password fields are required.");
            return false;
        }

        if (changepasswordData.new_password.length < 6) {
            setErrorMsg("New password must be at least 6 characters long.");
            return false;
        }

        if (changepasswordData.new_password !== changepasswordData.confirm_password) {
            setErrorMsg("New password and confirm password do not match.");
            return false;
        }

        setErrorMsg('');
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            // accountsettings API call
            const proData = await axios.post('http://127.0.0.1:8000/accountsettings/', acountData);
            console.log('Account API response:', proData.data);

            // change-password API call
            const proPass = await axios.put('http://127.0.0.1:8000/change-password/', changepasswordData);
            console.log('Password API response:', proPass.data);

            setSuccessMsg('Account setting successfully changed');
            setTimeout(() => setSuccessMsg(''), 4000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMsg('Error submitting form. Please try again.');
        }
    };

    return (
        <main>
            <h4 className="mt-4">Account Settings</h4>
            <form onSubmit={handleSubmit}>
                {/* <div className="custom-card">
                    <h3 className="text-primary">Edit & Update</h3>
                    <div className="row mb-3">
                        <div className="col-md-6 col-lg-6 mb-3">
                            <label htmlFor="firstname" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="firstname"
                                id="firstname"
                                value={acountData.firstname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6 col-lg-6 mb-3">
                            <label htmlFor="lastname" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="lastname"
                                id="lastname"
                                value={acountData.lastname}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6 col-lg-6 mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                id="email"
                                value={acountData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6 col-lg-6 mb-3">
                            <label htmlFor="phone_number" className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                name="phone_number"
                                id="phone_number"
                                value={acountData.phone_number}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div> */}

                <div className="custom-card">
                    <h4>Email & Push Notifications</h4>
                    <hr />
                    <div className="row mt-4">
                        <div className="col-6 col-md-3 mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="dailyJobs" defaultChecked />
                                <label className="form-check-label" htmlFor="dailyJobs">
                                    Daily New Jobs <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
                        </div>
                        {/* <div className="col-6 col-md-3 mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="appliedJobs" defaultChecked />
                                <label className="form-check-label" htmlFor="appliedJobs">
                                    Applied Jobs <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
                        </div> */}
                        <div className="col-6 col-md-3 mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="followUpCredited" defaultChecked />
                                <label className="form-check-label" htmlFor="followUpCredited">
                                    Follow-up Credited <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="followUpUsed" defaultChecked />
                                <label className="form-check-label" htmlFor="followUpUsed">
                                    Follow-up Used <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
                        </div>
                        {/* <div className="col-6 col-md-3 mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="pendingTest" />
                                <label className="form-check-label" htmlFor="pendingTest">
                                    Pending Test <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
                        </div> */}
                        <div className="col-6 col-md-3 mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="promotional" defaultChecked />
                                <label className="form-check-label" htmlFor="promotional">
                                    Promotional <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="chatNotifications" defaultChecked />
                                <label className="form-check-label" htmlFor="chatNotifications">
                                    Chat Notifications <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
                        </div>
                        {/* <div className="col-6 col-md-3 mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="educational" defaultChecked />
                                <label className="form-check-label" htmlFor="educational">
                                    Educational - Learn & Grow <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
                        </div> */}
                        {/* Add more notification items here as per the image */}


                    </div>

                    <h5 className='mt-4'>Account Settings</h5>
                    <hr />
                    <div className="row">
                        <div className="col-6 col-md-4 mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="HideProfile" defaultChecked />
                                <label className="form-check-label" htmlFor="HideProfile">
                                    Hide Profile from every one <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
                        </div>
                        <div className="col-6 col-md-4 mb-4">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="DeactivateAccount" defaultChecked />
                                <label className="form-check-label" htmlFor="DeactivateAccount">
                                    Deactivate Account? <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
                        </div>
                        <div className="col-md-4"> <button className='btn btn-outline-danger'>Delete Account?</button> </div>
                    </div>
                </div>

                <div className="custom-card my-4">
                    <h4 className="text-primary mb-5">Change Password</h4>
                    <div className="row mb-3">
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="old_password" className="form-label">Old Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="old_password"
                                id="old_password"
                                value={changepasswordData.old_password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="new_password" className="form-label">New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="new_password"
                                id="new_password"
                                value={changepasswordData.new_password}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="confirm_password"
                                id="confirm_password"
                                value={changepasswordData.confirm_password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-4 mb-5 text-center">
                    {errorMsg && <div className="text-danger mb-3">{errorMsg}</div>}
                    {successMsg && <div className="text-success mb-3">{successMsg}</div>}
                    <button type="submit" className="btn btn-success btn-lg px-5">Save & Update</button>
                    <button type="button" className="btn btn-lg ms-4">Cancel</button>
                </div>
            </form>
        </main>
    );
};

export default AccountSetting;
