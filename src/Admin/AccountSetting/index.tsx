import React from 'react'

const AccountSetting = () => {
    return (
        <main>
            <h4 className='mt-4'>Account Settings </h4>
            <div className="custom-card">
                <h3 className='text-primary'>Edit & Update</h3>
                <div className="row mb-3">
                    <div className="col-md-6 col-lg-6 mb-3">
                        <label htmlFor="fname" className="form-label">First Name</label>
                        <input type='number' className="form-control" name="fname" id="fname" />
                    </div>
                    <div className="col-md-6 col-lg-6 mb-3">
                        <label htmlFor="lname" className="form-label">Last Name</label>
                        <select className="form-select" name="lname" id="lname">
                            <option value="">Hyderabad</option>
                        </select>
                    </div>
                    <div className="col-md-6 col-lg-6 mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type='number' className="form-control" name="email" id="email" />

                    </div>
                    <div className="col-md-6 col-lg-6 mb-3">
                        <label htmlFor="phone" className="form-label">Phone </label>
                        <select className="form-select" name="phone" id="phone">
                            <option value="">Hyderabad</option>
                        </select>
                    </div>
                </div>
                <div className="mt-4  text-center">
                    <button type="submit" className="btn btn-success btn-lg px-5">Save</button>
                    <button type="submit" className="btn btn-lg ms-4">Cancel</button>
                </div>
            </div>

            <div className="custom-card my-4">
                <h3 className='text-primary'>Change Password</h3>
                <div className="row mb-3">
                    <div className="col-md-6 col-lg-4 mb-3">
                        <label htmlFor="OldPassword" className="form-label">Old Password</label>
                        <input type='password' className="form-control" name="OldPassword" id="OldPassword" />
                    </div>
                    <div className="col-md-6 col-lg-4 mb-3">
                        <label htmlFor="NewPassword" className="form-label">New Password</label>
                        <input type='password' className="form-control" name="NewPassword" id="NewPassword" />
                    </div>
                    <div className="col-md-6 col-lg-4 mb-3">
                        <label htmlFor="ConfirmPassword" className="form-label">Confirm Password</label>
                        <input type='password' className="form-control" name="ConfirmPassword" id="ConfirmPassword" />
                    </div>

                </div>
                <div className="mt-4  text-center">
                    <button type="submit" className="btn btn-success btn-lg px-5">Save & Update</button>
                    <button type="submit" className="btn btn-lg ms-4">Cancel</button>
                </div>
            </div>

        </main>
    )
}

export default AccountSetting