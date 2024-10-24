import React from 'react'

const Setting = () => {
    return (
        <main>
            <h5 className='mt-4'>Settings</h5>
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
                    <div className="col-6 col-md-3 mb-4">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="appliedJobs" defaultChecked />
                            <label className="form-check-label" htmlFor="appliedJobs">
                                Applied Jobs <i className="bi bi-info-circle"></i>
                            </label>
                        </div>
                    </div>
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
                    <div className="col-6 col-md-3 mb-4">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="pendingTest" />
                            <label className="form-check-label" htmlFor="pendingTest">
                                Pending Test <i className="bi bi-info-circle"></i>
                            </label>
                        </div>
                    </div>
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
                    <div className="col-6 col-md-3 mb-4">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="educational" defaultChecked />
                            <label className="form-check-label" htmlFor="educational">
                                Educational - Learn & Grow <i className="bi bi-info-circle"></i>
                            </label>
                        </div>
                    </div>
                    {/* Add more notification items here as per the image */}


                </div>

                <h5 className='mt-4'>Account Settings</h5>
                <hr />
                <div className="row">
                    <div className="col-6 col-md-4 mb-4">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="HideProfile" defaultChecked />
                            <label className="form-check-label" htmlFor="HideProfile">
                            Hide Profile from every recruiter <i className="bi bi-info-circle"></i>
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
        </main>
    )
}

export default Setting