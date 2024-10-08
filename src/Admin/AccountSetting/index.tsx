import axios from 'axios';
import React, { useState } from 'react'


interface accountSettingModel {
    firstname: string,
    lastname: string,
    email: any,
    phone_number: number,
    old_password: any,
    new_password: any,
    confirm_password: any,
}

const AccountSetting = () => {

    const [acountData, setAcountData] = useState<accountSettingModel>(
        {
            firstname: '',
            lastname: '',
            email: '',
            phone_number: 0,
            old_password: '',
            new_password: '',
            confirm_password: '',
        }
    );
    const [successMsg, setSuccessMsg] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setAcountData({ ...acountData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // accountsettings API call
            const proData = await axios.post('http://127.0.0.1:8000/accountsettings/', acountData);
            console.log('account api ====:', proData.data);

            // change-password API call
            const proPass = await axios.put('http://127.0.0.1:8000/change-password/', acountData);
            console.log('password api ====:', proPass.data);

            
            setSuccessMsg('Account setting successfully changed')
            setTimeout(()=>(
                setSuccessMsg('')
            ),4000)
            
        } catch (error) {
            console.error('Error submitting form:', error);
            // alert('Error submitting form to one or more APIs');
        }
    };



    return (
        <main>
            <h4 className='mt-4'>Account Settings </h4>

            <form action="" onSubmit={handleSubmit}>
                <div className="custom-card">
                    <h3 className='text-primary'>Edit & Update</h3>
                    <div className="row mb-3">
                        <div className="col-md-6 col-lg-6 mb-3">
                            <label htmlFor="firstname" className="form-label">First Name</label>
                            <input type='text' className="form-control" name="firstname" id="firstname" autoComplete='off'
                                value={acountData.firstname}
                                onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6 col-lg-6 mb-3">
                            <label htmlFor="lastname" className="form-label">Last Name</label>
                            <input type='text' className="form-control" name="lastname" id="lastname" autoComplete='off'
                                value={acountData.lastname}
                                onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6 col-lg-6 mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type='email' className="form-control" name="email" id="email" autoComplete='off'
                                value={acountData.email}
                                onChange={handleInputChange} />

                        </div>
                        <div className="col-md-6 col-lg-6 mb-3">
                            <label htmlFor="phone_number" className="form-label">Phone </label>
                            <input type='number' className="form-control" name="phone_number" id="phone_number"
                                autoComplete='off'
                                value={acountData.phone_number}
                                onChange={handleInputChange} />
                        </div>
                    </div>
                </div>

                <div className="custom-card my-4">
                    <h3 className='text-primary'>Change Password</h3>
                    <div className="row mb-3">
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="old_password" className="form-label">Old Password</label>
                            <input type='password' className="form-control" name="old_password" id="old_password" autoComplete='off'
                                value={acountData.old_password}
                                onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="new_password" className="form-label">New Password</label>
                            <input type='password' className="form-control" name="new_password" id="new_password"
                                value={acountData.new_password}
                                onChange={handleInputChange} />
                        </div>
                        <div className="col-md-6 col-lg-4 mb-3">
                            <label htmlFor="confirm_password" className="form-label">Confirm Password</label>
                            <input type='password' className="form-control" name="confirm_password" id="confirm_password"
                                value={acountData.confirm_password}
                                onChange={handleInputChange} />
                        </div>

                    </div>

                </div>
                <div className="mt-4 mb-5 text-center">
                    <div className='text-success mb-3'>{successMsg}</div>
                    <button type="submit" className="btn btn-success btn-lg px-5">Save & Update</button>
                    <button type="button" className="btn btn-lg ms-4">Cancel</button>
                </div>
            </form>
        </main>
    )
}

export default AccountSetting