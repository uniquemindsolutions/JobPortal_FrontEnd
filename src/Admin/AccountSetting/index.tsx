import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface EmailandPushNotificationsModel {
    daily_new_jobs: boolean;
    follow_up_credited: boolean;
    follow_up_used: boolean;    
    promotional: boolean;
    chat_notifications: boolean;
}
interface accountSettingModel {
    hide_profile_from_recruiters: boolean;
    deactivate_account: boolean;
}
interface changepasswordModel {
    old_password: string;
    new_password: string;
    confirm_password: string;
}

const AccountSetting = () => {
    const { id } = useParams();
    const [EmailandPushNotificationsData, setEmailandPushNotificationsData] = useState<EmailandPushNotificationsModel>({
        daily_new_jobs: false,
        follow_up_credited: false,
        follow_up_used: false,
        promotional: false,
        chat_notifications: false

    });
    const [accountData, setAcountData] = useState<accountSettingModel>({
        hide_profile_from_recruiters: false,
        deactivate_account: false
    });

    const [changepasswordData, setChangepasswordData] = useState<changepasswordModel>({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;  // Extract name and value from the event target
        setChangepasswordData({
            ...changepasswordData,
            [name]: value  // Use the name as the key and value for the input
        });
    };
    useEffect(() => {
        const fetchEmailData = async () => {
                try {
                    // Make API call using the dynamic `id`
                    const emailResponse = await axios.get(`http://127.0.0.1:8000/user/Emailpushnotification/1/`);
                    console.log("Email Response: ", emailResponse.data);
            
                    // Assuming the response has the same shape as the state, update the state with the response data
                    setEmailandPushNotificationsData({
                      daily_new_jobs: emailResponse.data.daily_new_jobs,
                      follow_up_credited: emailResponse.data.follow_up_credited,
                      follow_up_used: emailResponse.data.follow_up_used,
                      promotional: emailResponse.data.promotional,
                      chat_notifications: emailResponse.data.chat_notifications,
                    });
                  } catch (error) {
                    console.error('Error fetching email data:', error);
                  }
            
          };
      
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/accountsettings/1/');
                console.log('Account API Response....', response.data);

                // Assuming the API returns the structure you expect
                setAcountData({
                    hide_profile_from_recruiters: response.data.hide_profile_from_recruiters,
                    deactivate_account: response.data.deactivate_account,
                });
            } catch (error) {
                console.error('Error fetching account settings:', error);
            }
        };
        fetchData();
        fetchEmailData();
    }, [id]);


    // Handle input changes for both account data and password change data
    const handleEmailPushNotificationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;
        setEmailandPushNotificationsData((prevData) => ({
            ...prevData,
            [id]: checked,
        }));
    };
    const handleAccountSettingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { id, checked } = event.target;
        setAcountData((prevData) => ({
            ...prevData,
            [id]: checked,
        }));
    };
    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // accountsettings API call
            const proData = await axios.post('http://127.0.0.1:8000/accountsettings/', accountData);
            console.log('Account API response:', proData.data);
            const emaildata = await axios.post('http://127.0.0.1:8000/user/Emailpushnotification/', EmailandPushNotificationsData);
            console.log('Eamil push notification data:', emaildata.data);
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
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="daily_new_jobs"
                                    checked={EmailandPushNotificationsData.daily_new_jobs}
                                    onChange={handleEmailPushNotificationChange}
                                />
                                <label className="form-check-label" htmlFor="daily_new_jobs">
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
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="follow_up_credited"
                                    checked={EmailandPushNotificationsData.follow_up_credited}
                                    onChange={handleEmailPushNotificationChange}
                                />
                                <label className="form-check-label" htmlFor="follow_up_credited">
                                    Follow-up Credited <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 mb-4">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="follow_up_used"
                                    checked={EmailandPushNotificationsData.follow_up_used}
                                    onChange={handleEmailPushNotificationChange}
                                />
                                <label className="form-check-label" htmlFor="follow_up_used">
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
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="promotional"
                                    checked={EmailandPushNotificationsData.promotional}
                                    onChange={handleEmailPushNotificationChange}
                                />
                                <label className="form-check-label" htmlFor="promotional">
                                    Promotional <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 mb-4">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="chat_notifications"
                                    checked={EmailandPushNotificationsData.chat_notifications}
                                    onChange={handleEmailPushNotificationChange}
                                />
                                <label className="form-check-label" htmlFor="chat_notifications">
                                    Chat Notifications <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
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



                    <h4>Account Settings</h4>
                    <hr />
                    <div className="row mt-4">
                        <div className="col-6 col-md-3 mb-4">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="hide_profile_from_recruiters"
                                    checked={accountData.hide_profile_from_recruiters}
                                    onChange={handleAccountSettingChange}
                                />
                                <label className="form-check-label" htmlFor="hide_profile_from_recruiters">
                                    Hide Profile from Recruiters <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
                        </div>
                        <div className="col-6 col-md-3 mb-4">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="deactivate_account"
                                    checked={accountData.deactivate_account}
                                    onChange={handleAccountSettingChange}
                                />
                                <label className="form-check-label" htmlFor="deactivate_account">
                                    Deactivate Account <i className="bi bi-info-circle"></i>
                                </label>
                            </div>
                           <button className='btn btn-outline-danger'>Delete Account?</button>
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
                </div>

                <div className="mt-4 mb-5 text-center">
                    {errorMsg && <div className="text-danger mb-3">{errorMsg}</div>}
                    {successMsg && <div className="text-success mb-3">{successMsg}</div>}
                    <button type="submit" className="btn btn-success btn-lg px-5">Save & Update</button>
                    <button type="button" className="btn btn-lg ms-4">Cancel</button>
                </div>
            </form >
        </main >
    );
};

export default AccountSetting;
