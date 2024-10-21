import React from 'react'
import './ViewJobDetails.scss'

const ViewJobDetails = () => {
    return (
        <main>
            <h4 className='mt-4'>View Job Details</h4>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card job-card p-3">
                        <div className="row">
                            <div className="col-md-2 text-end">
                                <div className="company-logo">
                                    <a href="#">
                                        <img className='img-fluid' src={window.location.origin + '/images/techm-logo.jpg'} />
                                    </a>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <h5 className="job-title">Sr UX Designer</h5>
                                <p className="company-details">
                                    Tech Mahindra
                                </p>
                                <div className="job-info">
                                    <span className="experience">
                                        <i className="bi bi-duffle"></i> 6 - 9 years
                                    </span>
                                    <span className="salary">
                                        <i className="bi bi-currency-rupee"></i> Not Disclosed
                                    </span>
                                    <span className="location">
                                        <i className="bi bi-geo-alt"></i> Hyderabad
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom my-2"></div>
                        <div className="row">
                            <div className="col-md-7 pt-1">
                                <span className="job-meta">Posted: <strong>5 days ago</strong></span>
                                <span className="job-meta">Openings: <strong>2</strong></span>
                                <span className="job-meta">Applicants: <strong>82</strong></span>
                            </div>
                            <div className="col-md-5">
                                <div className="text-end">
                                    <button className="btn btn-outline-primary btn-save me-3">Save</button>
                                    <button className="btn btn-primary btn-apply">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* job details start */}
                    <div className="card p-4">
                        <h5 className="section-title">Job highlights</h5>
                        <ul className="job-highlights">
                            <li>Bachelor’s degree in computer science, Information Technology, Design, or a related field (preferred)</li>
                            <li>Minimum 5+ years of experience in UI development</li>
                            <li>Strong understanding of user experience (UX) principles, front-end development technologies, and a keen eye for design</li>
                            <li>Experience with front-end development frameworks (e.g., React, Angular, Vue.js) is a plus</li>
                        </ul>

                        

                        <h5 className="section-title">Job description</h5>
                        <p className="job-description-text">
                            The UI Engineer plays a key role in bringing digital products to life by designing and developing user interfaces (UIs) that are both visually appealing and user-friendly. Collaborates closely with designers, product managers, and engineers to translate design concepts into functional and interactive web or mobile applications. The role requires proficiency in UX principles, front-end technologies, and a keen eye for design.
                        </p>

                        <ul className="job-responsibilities">
                            <li>Collaborate with designers and product managers to understand user needs</li>
                            <li>Develop user interfaces using HTML, CSS, and JavaScript frameworks (e.g., React, Angular, Vue.js)</li>
                            <li>Ensure responsive design for seamless adaptation across devices</li>
                            <li>Optimize UI elements for performance and accessibility</li>
                            <li>Stay up-to-date with the latest UI design trends</li>
                        </ul>

                        <ul>
                            <li><label htmlFor="">Role:</label> <span>Software Compliance - License Management</span></li>
                            <li><label htmlFor="">Industry Type:</label> <span>IT Services & Consulting</span></li>
                            <li><label htmlFor="">Department:</label> <span>IT & Information Security</span></li>
                            <li><label htmlFor="">Employment Type:</label> <span> Full Time, Permanent</span></li>
                            <li><label htmlFor="">Role Category:</label> <span> IT Infrastructure Services</span></li>
                        </ul>
                         
 
                        <h5 className="section-title">Education</h5>
                        <ul>
                            <li><label htmlFor="">UG:</label> <span> Any Graduate</span></li>
                        </ul>

                        <h5 className="section-title">Key Skills</h5>
                        <div className="key-skills">
                            <span className="key-skills-name">Angular</span>
                            <span className="key-skills-name">ReactJS</span>
                            <span className="key-skills-name">JavaScript</span>
                            <span className="key-skills-name">AEM</span>
                        </div>
                    </div>

                    <div className="card p-4 my-3">
                        <h5 className="section-title">About Company</h5>
                        <p>
                        The UI Engineer plays a key role in bringing digital products to life by designing and developing user interfaces (UIs) that are both visually appealing and user-friendly. Collaborates closely with designers, product managers, and engineers to translate design concepts into functional and interactive web or mobile applications.
                        </p>
                    </div>
                    {/* job details end */}
                </div>
                <div className="col-lg-4">
                    <a href='#' className="card job-card p-3 text-decoration-none">
                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="job-title">Sr UX Designer</h5>
                                <p className="company-details">
                                    Tech Mahindra
                                </p>
                                <div className="job-info">
                                    <span className="experience">
                                        <i className="bi bi-duffle"></i> 6 - 9 years
                                    </span>
                                    <span className="salary">
                                        <i className="bi bi-currency-rupee"></i> Not Disclosed
                                    </span>
                                    <span className="location">
                                        <i className="bi bi-geo-alt"></i> Hyderabad
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom my-2"></div>
                        <div className="row">
                            <div className="col-md-12 pt-1">
                                <span className="job-meta">Posted: <strong>5 days ago</strong></span>
                                <span className="job-meta">Openings: <strong>2</strong></span>
                                <span className="job-meta">Applicants: <strong>82</strong></span>
                            </div>
                        </div>
                    </a>
                    <a href='#' className="card job-card p-3 text-decoration-none">
                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="job-title">Sr UX Designer</h5>
                                <p className="company-details">
                                    Tech Mahindra
                                </p>
                                <div className="job-info">
                                    <span className="experience">
                                        <i className="bi bi-duffle"></i> 6 - 9 years
                                    </span>
                                    <span className="salary">
                                        <i className="bi bi-currency-rupee"></i> Not Disclosed
                                    </span>
                                    <span className="location">
                                        <i className="bi bi-geo-alt"></i> Hyderabad
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom my-2"></div>
                        <div className="row">
                            <div className="col-md-12 pt-1">
                                <span className="job-meta">Posted: <strong>5 days ago</strong></span>
                                <span className="job-meta">Openings: <strong>2</strong></span>
                                <span className="job-meta">Applicants: <strong>82</strong></span>
                            </div>
                        </div>
                    </a>
                    <a href='#' className="card job-card p-3 text-decoration-none">
                        <div className="row">
                            <div className="col-md-12">
                                <h5 className="job-title">Sr UX Designer</h5>
                                <p className="company-details">
                                    Tech Mahindra
                                </p>
                                <div className="job-info">
                                    <span className="experience">
                                        <i className="bi bi-duffle"></i> 6 - 9 years
                                    </span>
                                    <span className="salary">
                                        <i className="bi bi-currency-rupee"></i> Not Disclosed
                                    </span>
                                    <span className="location">
                                        <i className="bi bi-geo-alt"></i> Hyderabad
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="border-bottom my-2"></div>
                        <div className="row">
                            <div className="col-md-12 pt-1">
                                <span className="job-meta">Posted: <strong>5 days ago</strong></span>
                                <span className="job-meta">Openings: <strong>2</strong></span>
                                <span className="job-meta">Applicants: <strong>82</strong></span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </main>
    )
}

export default ViewJobDetails