import React from 'react'

const ViewJobs = () => {
    return (
        <main>
            <div className="d-flex justify-content-between mt-4">
                <div><h4>View Job Details</h4></div>
                <div className='text-end'>
                    <div className="d-flex">
                        <div className="dropdown ms-3">
                            <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill px-3" data-bs-toggle="dropdown">
                                Short by
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end tbl-dropdown">
                                <li>
                                    <a className="dropdown-item" href="#">  Active</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#"> Pedding</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#"> Expaired</a>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-card">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3 py-4">
                        <div className="card">
                            <div className="card-header fw-bold text-primary">Ui Developer</div>
                            <div className="card-body">
                                <div className="row mb-3">
                                    <div className="col-5">Job category</div>
                                    <div className="col-7">: </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Job type</div>
                                    <div className="col-7">: </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Salary type</div>
                                    <div className="col-7">: </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Min salary</div>
                                    <div className="col-7">: </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">max salary</div>
                                    <div className="col-7">: </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Experience</div>
                                    <div className="col-7">: </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Location</div>
                                    <div className="col-7">: </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Industry</div>
                                    <div className="col-7">: </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">English fluency</div>
                                    <div className="col-7">: </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Address</div>
                                    <div className="col-7">: </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Country</div>
                                    <div className="col-7">: </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">State</div>
                                    <div className="col-7">: </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">City</div>
                                    <div className="col-7">: </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-5">Education</div>
                                    <div className="col-7">: </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default ViewJobs;
