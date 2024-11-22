import React, { useState } from 'react';

const ChangePassword = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <main>
            <h5 className='mt-4'>Change Password</h5>
            <div className="custom-card">
                <div className="password-change-section">
                    <div className="row">
                        {/* Current Password */}
                        <div className="col-12 col-md-6">
                            <div className="form-group password-input">
                                <label htmlFor="currentPassword">Current Password</label>
                                <div className="input-group">
                                    <input
                                        type={showCurrentPassword ? "text" : "password"}
                                        className="form-control w-75" id="currentPassword"
                                        placeholder="Enter current password" />
                                    <button className="btn btn-outline-secondary border px-3"
                                        type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                                        <i className={`bi ${showCurrentPassword ? "bi-unlock" : "bi-lock"}`}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        {/* New Password */}
                        <div className="col-12 col-md-6">
                            <div className="form-group password-input">
                                <label htmlFor="newPassword">New Password</label>
                                <div className="input-group">
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        className="form-control w-75" id="newPassword"
                                        placeholder="Enter a new password" />
                                    <button
                                        className="btn btn-outline-secondary border px-3 " type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}>
                                        <i className={`bi ${showNewPassword ? "bi-unlock" : "bi-lock"}`}></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="col-12 col-md-6">
                            <div className="form-group password-input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <div className="input-group">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="form-control w-75" id="confirmPassword"
                                        placeholder="Confirm your new password" />
                                    <button
                                        className="btn btn-outline-secondary border px-3" type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                        <i className={`bi ${showConfirmPassword ? "bi-unlock" : "bi-lock"}`}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="password-requirements mt-4">
                        <p>Use 8 or more characters with at least one uppercase letter, lowercase letter, number, and special character.</p>
                    </div>

                    <div className="text-center mt-4">
                        <button className='cancel-btn me-4'>Cancel</button>
                        <button className='save-btn'>Save</button>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ChangePassword