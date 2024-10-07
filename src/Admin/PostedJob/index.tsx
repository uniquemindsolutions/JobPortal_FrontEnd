import React from 'react'

const PostedJob = () => {
    return (
        <main>
            <div className="d-flex justify-content-between mt-4">
                <div><h4>My Posted Jobs</h4></div>
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
                <div className="d-flex align-items-center justify-content-between">
                    {/* Profile Image and Info */}
                    <div className="d-flex align-items-center">
                        <div className="position-relative me-3">
                            <img
                                src="https://via.placeholder.com/80"
                                alt="Profile"
                                className="rounded-circle"
                                style={{ width: '80px', height: '80px' }}
                            />
                            <span className="status-dot"></span>
                        </div>
                        <div>
                            <h5 className="mb-0">Julia Ark</h5>
                            <small className="text-muted">Graphic Designer</small>
                            <div className="d-flex align-items-center">
                                <span className="badge bg-light text-dark me-2">Digital</span>
                                <span className="badge bg-light text-dark me-2">Design</span>
                                <span className="badge bg-light text-dark me-2">UI</span>
                                <span className="badge bg-warning text-dark">2+</span>
                            </div>
                        </div>
                    </div>

                    {/* Salary and Location */}
                    <div className="">
                        <p className="mb-0 text-muted">Salary</p>
                        <strong>$30k-$50k/yr</strong>
                    </div>

                    <div className="">
                        <p className="mb-0 text-muted">Location</p>
                        <strong>California, US</strong>
                    </div>

                    {/* Tags and Actions */}


                    {/* Action Icons */}
                    <div className="d-flex align-items-center">
                        <button className="btn btn-light me-2">
                            <i className="bi bi-eye"></i>
                        </button>
                        <div className="dropdown">
                            <button
                                className="btn btn-link text-muted"
                                type="button"
                                // id={`dropdownMenuButton${index}`}
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                &#8942;
                            </button>
                            <ul className="dropdown-menu" >
                                <li>
                                    <a className="dropdown-item" href="#">View Job</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Archive</a>
                                </li>
                                <li>
                                    <a className="dropdown-item text-danger" href="#">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-card">
                <div className="d-flex align-items-center justify-content-between">
                    {/* Profile Image and Info */}
                    <div className="d-flex align-items-center">
                        <div className="position-relative me-3">
                            <img
                                src="https://via.placeholder.com/80"
                                alt="Profile"
                                className="rounded-circle"
                                style={{ width: '80px', height: '80px' }}
                            />
                            <span className="status-dot"></span>
                        </div>
                        <div>
                            <h5 className="mb-0">Julia Ark</h5>
                            <small className="text-muted">Graphic Designer</small>
                            <div className="d-flex align-items-center">
                                <span className="badge bg-light text-dark me-2">Digital</span>
                                <span className="badge bg-light text-dark me-2">Design</span>
                                <span className="badge bg-light text-dark me-2">UI</span>
                                <span className="badge bg-warning text-dark">2+</span>
                            </div>
                        </div>
                    </div>

                    {/* Salary and Location */}
                    <div className="">
                        <p className="mb-0 text-muted">Salary</p>
                        <strong>$30k-$50k/yr</strong>
                    </div>

                    <div className="">
                        <p className="mb-0 text-muted">Location</p>
                        <strong>California, US</strong>
                    </div>

                    {/* Tags and Actions */}


                    {/* Action Icons */}
                    <div className="d-flex align-items-center">
                        <button className="btn btn-light me-2">
                            <i className="bi bi-eye"></i>
                        </button>
                        <div className="dropdown">
                            <button
                                className="btn btn-link text-muted fw-bold"
                                type="button"
                                // id={`dropdownMenuButton${index}`}
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                &#8942;
                            </button>
                            <ul className="dropdown-menu" >
                                <li>
                                    <a className="dropdown-item" href="#">View Job</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Archive</a>
                                </li>
                                <li>
                                    <a className="dropdown-item text-danger" href="#">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-card">
                <div className="d-flex align-items-center justify-content-between">
                    {/* Profile Image and Info */}
                    <div className="d-flex align-items-center">
                        <div className="position-relative me-3">
                            <img
                                src="https://via.placeholder.com/80"
                                alt="Profile"
                                className="rounded-circle"
                                style={{ width: '80px', height: '80px' }}
                            />
                            <span className="status-dot"></span>
                        </div>
                        <div>
                            <h5 className="mb-0">Julia Ark</h5>
                            <small className="text-muted">Graphic Designer</small>
                            <div className="d-flex align-items-center">
                                <span className="badge bg-light text-dark me-2">Digital</span>
                                <span className="badge bg-light text-dark me-2">Design</span>
                                <span className="badge bg-light text-dark me-2">UI</span>
                                <span className="badge bg-warning text-dark">2+</span>
                            </div>
                        </div>
                    </div>

                    {/* Salary and Location */}
                    <div className="">
                        <p className="mb-0 text-muted">Salary</p>
                        <strong>$30k-$50k/yr</strong>
                    </div>

                    <div className="">
                        <p className="mb-0 text-muted">Location</p>
                        <strong>California, US</strong>
                    </div>

                    {/* Tags and Actions */}


                    {/* Action Icons */}
                    <div className="d-flex align-items-center">
                        <button className="btn btn-light me-2">
                            <i className="bi bi-eye"></i>
                        </button>
                        <div className="dropdown">
                            <button
                                className="btn btn-link text-muted fw-bold"
                                type="button"
                                // id={`dropdownMenuButton${index}`}
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                &#8942;
                            </button>
                            <ul className="dropdown-menu" >
                                <li>
                                    <a className="dropdown-item" href="#">View Job</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Archive</a>
                                </li>
                                <li>
                                    <a className="dropdown-item text-danger" href="#">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-card">
                <div className="d-flex align-items-center justify-content-between">
                    {/* Profile Image and Info */}
                    <div className="d-flex align-items-center">
                        <div className="position-relative me-3">
                            <img
                                src="https://via.placeholder.com/80"
                                alt="Profile"
                                className="rounded-circle"
                                style={{ width: '80px', height: '80px' }}
                            />
                            <span className="status-dot"></span>
                        </div>
                        <div>
                            <h5 className="mb-0">Julia Ark</h5>
                            <small className="text-muted">Graphic Designer</small>
                            <div className="d-flex align-items-center">
                                <span className="badge bg-light text-dark me-2">Digital</span>
                                <span className="badge bg-light text-dark me-2">Design</span>
                                <span className="badge bg-light text-dark me-2">UI</span>
                                <span className="badge bg-warning text-dark">2+</span>
                            </div>
                        </div>
                    </div>

                    {/* Salary and Location */}
                    <div className="">
                        <p className="mb-0 text-muted">Salary</p>
                        <strong>$30k-$50k/yr</strong>
                    </div>

                    <div className="">
                        <p className="mb-0 text-muted">Location</p>
                        <strong>California, US</strong>
                    </div>

                    {/* Tags and Actions */}


                    {/* Action Icons */}
                    <div className="d-flex align-items-center">
                        <button className="btn btn-light me-2">
                            <i className="bi bi-eye"></i>
                        </button>
                        <div className="dropdown">
                            <button
                                className="btn btn-link text-muted fw-bold"
                                type="button"
                                // id={`dropdownMenuButton${index}`}
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                &#8942;
                            </button>
                            <ul className="dropdown-menu" >
                                <li>
                                    <a className="dropdown-item" href="#">View Job</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Archive</a>
                                </li>
                                <li>
                                    <a className="dropdown-item text-danger" href="#">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile-card">
                <div className="d-flex align-items-center justify-content-between">
                    {/* Profile Image and Info */}
                    <div className="d-flex align-items-center">
                        <div className="position-relative me-3">
                            <img
                                src="https://via.placeholder.com/80"
                                alt="Profile"
                                className="rounded-circle"
                                style={{ width: '80px', height: '80px' }}
                            />
                            <span className="status-dot"></span>
                        </div>
                        <div>
                            <h5 className="mb-0">Julia Ark</h5>
                            <small className="text-muted">Graphic Designer</small>
                            <div className="d-flex align-items-center">
                                <span className="badge bg-light text-dark me-2">Digital</span>
                                <span className="badge bg-light text-dark me-2">Design</span>
                                <span className="badge bg-light text-dark me-2">UI</span>
                                <span className="badge bg-warning text-dark">2+</span>
                            </div>
                        </div>
                    </div>

                    {/* Salary and Location */}
                    <div className="">
                        <p className="mb-0 text-muted">Salary</p>
                        <strong>$30k-$50k/yr</strong>
                    </div>

                    <div className="">
                        <p className="mb-0 text-muted">Location</p>
                        <strong>California, US</strong>
                    </div>

                    {/* Tags and Actions */}


                    {/* Action Icons */}
                    <div className="d-flex align-items-center">
                        <button className="btn btn-light me-2">
                            <i className="bi bi-eye"></i>
                        </button>
                        <div className="dropdown">
                            <button
                                className="btn btn-link text-muted fw-bold"
                                type="button"
                                // id={`dropdownMenuButton${index}`}
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                &#8942;
                            </button>
                            <ul className="dropdown-menu" >
                                <li>
                                    <a className="dropdown-item" href="#">View Job</a>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">Archive</a>
                                </li>
                                <li>
                                    <a className="dropdown-item text-danger" href="#">Delete</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pagination justify-content-center">
                <ul className="pagination">
                    <li className="page-item disabled"><a className="page-link" href="#"><i className="bi bi-caret-left"></i></a></li>
                    <li className="page-item"><a className="page-link" href="#">1</a></li>
                    <li className="page-item"><a className="page-link" href="#">2</a></li>
                    <li className="page-item"><a className="page-link" href="#">3</a></li>
                    <li className="page-item"><a className="page-link" href="#"><i className="bi bi-caret-right"></i></a></li>
                </ul>
            </div>
        </main>
    )
}

export default PostedJob