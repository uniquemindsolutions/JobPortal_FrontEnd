import React, { useState } from 'react'
import Select from 'react-select';
import './candidates.scss'

const Candidates = () => {

    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [selectedExperience, setSelectedExperience] = useState<any>(null);

    const experienceOptions = [
        { value: '0-1', label: '0-1 years' },
        { value: '1+', label: '1+ years' },
        { value: '2+', label: '2+ years' },
        { value: '3+', label: '3+ years' },
        { value: '4+', label: '4+ years' },
        { value: '5+', label: '5+ years' },
        { value: '6+', label: '6+ years' },
        { value: '7+', label: '7+ years' },
        { value: '8+', label: '8+ years' },
        { value: '9+', label: '9+ years' },
        { value: '10+', label: '10+ years' },
    ];

    const handleSearch = () => {
        // Handle search logic here
        console.log('Search Query:', query);
        console.log('Experience:', selectedExperience);
        console.log('Location:', location);
    };
    return (
        <main>
            <div className="d-flex justify-content-between mt-4">
                <div><h4 className='pt-3'>Candidate List</h4></div>
                <div className="search-bar-container d-flex align-items-center">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Ui Developer,"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <div className="divider" />
                    <Select
                        className="select-experience"
                        options={experienceOptions}
                        placeholder="Select experience"
                        value={selectedExperience}
                        onChange={setSelectedExperience}
                    />
                    <div className="divider" />
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Hyderabad, TS"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <button className="btn btn-primary search-button" onClick={handleSearch}>
                        <i className="bi bi-search me-2"></i> Search
                    </button>
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
                            <i className="bi bi-eye"></i> View Details
                        </button>
                        <button className="btn btn-light">
                            <i className="bi bi-floppy"></i> Save
                        </button>
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
                            <i className="bi bi-eye"></i> View Details
                        </button>
                        <button className="btn btn-light">
                            <i className="bi bi-floppy"></i> Save
                        </button>
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
                            <i className="bi bi-eye"></i> View Details
                        </button>
                        <button className="btn btn-light">
                            <i className="bi bi-floppy"></i> Save
                        </button>
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
                            <i className="bi bi-eye"></i> View Details
                        </button>
                        <button className="btn btn-light">
                            <i className="bi bi-floppy"></i> Save
                        </button>
                    </div>
                </div>
            </div>


        </main>
    )
}

export default Candidates