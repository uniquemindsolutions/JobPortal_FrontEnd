import React from 'react'
import './submitJobs.scss'

const SubmitJob = () => {
    return (
        <main className='mt-4'>
            <h4>Post a New Job</h4>

            <div className="custom-card">
                <h3 className='text-primary'>Job Details</h3>

                <div className="row mb-3">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="JobTitle" className="form-label">Job Title*</label>
                        <input type="text" className="form-control" name="JobTitle" id="JobTitle" placeholder="Ui Developer" />
                    </div>

                    <div className="col-md-12 mb-3">
                        <label htmlFor="JobDescription" className="form-label">Job Description*</label>
                        <textarea className="form-control" name="JobDescription" id="JobDescription" rows={5} cols={20} />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="JobCategory" className="form-label">Job Category</label>
                        <select className="form-select" name="JobCategory" id="JobCategory">
                            <option value="">Ui Developer</option>
                            <option value="">React</option>
                            <option value="">Angular</option>
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="JobType" className="form-label">Job Type</label>
                        <select className="form-select" name="JobType" id="JobType">
                            <option value="">Full Time</option>
                            <option value="">Part Time</option>
                            <option value="">Hourly-Contract</option>
                            <option value="">Fixed-Price</option>
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="Salary" className="form-label">Salary</label>
                        <select className="form-select" name="Salary" id="Salary">
                            <option value="">Monthly</option>
                            <option value="">Weekly</option>
                        </select>
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="minSalary" className="form-label">Min</label>
                        <input type="text" className="form-control" name="minSalary" id="minSalary" placeholder="Min" />
                    </div>
                    <div className="col-md-3 mb-3">
                        <label htmlFor="maxSalary" className="form-label">Max</label>
                        <input type="text" className="form-control" name="maxSalary" id="maxSalary" placeholder="Max" />
                    </div>
                </div>

                <h3 className="text-primary mt-5">Skills & Experience</h3>
                <div className="row">
                    <div className="col-md-12 mb-3">
                        <label htmlFor="maxSalary" className="form-label">Skills*</label>
                        <input type="text" className="form-control" name="maxSalary" id="maxSalary" placeholder="Add Skills" />

                        <div className='mt-3 skills-btns'>
                            <button className="btn-skills">Design</button>
                            <button className="btn-skills">UI</button>
                            <button className="btn-skills">Digital</button>
                            <button className="btn-skills">Graphics</button>
                            <button className="btn-skills">Developer</button>
                        </div>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="Experience" className="form-label">Experience*</label>
                        <select className="form-select" name="Experience" id="Experience">
                            <option value="">Expert</option>
                            <option value="">Intermediate</option>
                            <option value="">No-Experience</option>
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="Location" className="form-label">Location* </label>
                        <select className="form-select" name="Location" id="Location">
                            <option value="">Hyderabad TS</option>
                            <option value="">Mubai MH</option>
                            <option value="">Dehli DL</option>
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="Industry" className="form-label">Industry* </label>
                        <select className="form-select" name="Industry" id="Industry">
                            <option value="">IT</option>
                            <option value="">Marcketing</option>
                            <option value="">Industrial</option>
                        </select>
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="Industry" className="form-label">English Fluency </label>
                        <select className="form-select" name="Industry" id="Industry">
                            <option value="">Basic</option>
                            <option value="">Medium</option>
                            <option value="">Excellent</option>
                        </select>
                    </div>

                    <h3 className="text-primary mt-5">File Attachment</h3>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="formFile" className="form-label">Upload File </label>
                        <input className="form-control" name='formFile' type="file" id="formFile"/>
                    </div>

                    <h3 className="text-primary mt-5">Address & Location</h3>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="formFile" className="form-label">Address* </label>
                        <input className="form-control" type="text" id="Address"/>
                    </div>

                    <div className="col-md-4 mb-3">
                        <label htmlFor="Industry" className="form-label">Country*</label>
                        <select className="form-select" name="Industry" id="Industry">
                            <option value="">India</option>
                            <option value="">USA</option>
                            <option value="">UK</option>
                        </select>
                    </div>

                    <div className="col-md-4 mb-3">
                    <label htmlFor="Industry" className="form-label">City*</label>
                        <select className="form-select" name="Industry" id="Industry">
                            <option value="">Hyderabad</option>
                            <option value="">Mumbai</option>
                            <option value="">Chennai</option>
                        </select>
                    </div>

                    <div className="col-md-4 mb-3">
                    <label htmlFor="Industry" className="form-label">State*</label>
                        <select className="form-select" name="Industry" id="Industry">
                            <option value="">TS</option>
                            <option value="">MH</option>
                            <option value="">CN</option>
                        </select>
                    </div>
                    <div className="col-md-12 mb-3">
                        <label htmlFor="MapLocation" className="form-label">Map Location </label>
                        <input className="form-control" name='MapLocation' type="text" id="MapLocation"/>
                    </div>
                </div>  
             </div>
             <div className="mt-5  text-center">
                <button type="submit" className="btn btn-success btn-lg px-5">Submit</button>
                <button type="submit" className="btn btn-lg ms-4">Cancel</button>
            </div>
            <br />
        </main>
    )
}

export default SubmitJob