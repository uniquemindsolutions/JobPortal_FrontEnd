import React from 'react'

const MyProfile = () => {
    return (
        <>
            <h4 className="mt-4">My Profile</h4>
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
                <form>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="employerName" className="form-label">Employer Name*</label>
                            <input type="text" className="form-control" id="employerName" placeholder="John Doe" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="website" className="form-label">Website*</label>
                            <input type="url" className="form-control" id="website" placeholder="http://somename.com" />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="email" className="form-label">Email*</label>
                            <input type="email" className="form-control" id="email" placeholder="companyinc@gmail.com" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="companySize" className="form-label">Company Size*</label>
                            <input type="number" className="form-control" id="companySize" placeholder="700" />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="foundedDate" className="form-label">Founded Date*</label>
                            <input type="date" className="form-control" id="foundedDate" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="category" className="form-label">Category*</label>
                            <input type="text" className="form-control" id="category" placeholder="Account, Finance, Marketing" />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="phoneNumber" className="form-label">Phone Number*</label>
                            <input type="tel" className="form-control" id="phoneNumber" placeholder="+880 01723801729" />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-12">
                            <label htmlFor="AboutCompany" className="form-label">About Company</label>
                            <textarea className="form-control" id="AboutCompany" rows={5} cols={20} />
                        </div>
                    </div>
                </form>
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
                    </div>
                    <div className="col-md-6 col-lg-3 mb-3">
                        <label htmlFor="Country" className="form-label">City</label>
                        <select className="form-select" name="Country" id="Country">
                            <option value="">Hyderabad</option>
                        </select>
                    </div>
                    <div className="col-md-6 col-lg-3 mb-3">
                        <label htmlFor="ZipCode" className="form-label">Zip Code</label>
                        <input type='number' className="form-control" name="ZipCode" id="ZipCode" />

                    </div>
                    <div className="col-md-6 col-lg-3 mb-3">
                        <label htmlFor="State" className="form-label">State </label>
                        <select className="form-select" name="State" id="State">
                            <option value="">Hyderabad</option>
                        </select>
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

        </>
    )
}

export default MyProfile