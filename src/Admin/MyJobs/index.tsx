import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

interface City {
    id: number;
    name: string;
}
export interface myJobs {
    id: number;
    job_title: string;
    job_type: string;
    created_date: string;
    job_category: string;
    city: City;
    Applicants: number;
    job_status: string;
}

const MyJobs = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [myJobs, setMyJobs] = useState({

    })
    const [citys, setCitys] = useState<City[]>([]);

    useEffect(() => {
        fetch("https://uniquemindsolutions.com/usmjobportal/cities/")
            .then(response => response.json())
            .then(data => {
                console.log("Cities:", data); // Log to check the data
                setCitys(data); // Store the cities in state
            })
            .catch(error => console.error('Error fetching cities:', error));
        myJobsDetails();
    }, [])
    const getCityNameById = (id: number): string => {
        const city = citys.find((city: City) => city.id === id); // Ensure the type is specified
        return city ? city.name : "Unknown City"; // Return the city name or a default value
    };
    const myJobsDetails = async () => {
        try {
            const res = await axios.get<myJobs>('https://uniquemindsolutions.com/usmjobportal/submitnewjob/')
            setMyJobs(res.data)
            console.log('api testiing ====', res);
        }
        catch (error) {
            setError("Error fetching data")
        }
        finally {
            setLoading(false)
        }
    };
    return (
        <main className='mt-4'>

            <div className="d-flex justify-content-between">
                <div><h4>My Jobs</h4></div>
                <div className='text-end'>
                    <div className="d-flex">
                        <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill px-3">All</button>
                        <button type="button" className="btn btn-outline-secondary btn-sm rounded-pill px-3 ms-3">New </button>
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
            <div className="custom-card">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr className='bg-light '>
                                <th className='text-primary'>Title</th>
                                <th className='text-primary'>Job Created</th>
                                <th className='text-primary'>Applicants</th>
                                <th className='text-primary'>Status</th>
                                <th className='text-primary'>Action</th>
                            </tr>
                        </thead>
                        <tbody className="border-0">
                            {Array.isArray(myJobs) && myJobs.length > 0 ? (
                                myJobs.sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime()).map((items, index) =>
                                    <tr key={index}>
                                        <td>
                                            <div className="fw-bold">{items.job_title}</div>
                                            <div className="info1">{items.job_type}, {getCityNameById(items.city)} {/* Get city name using the utility function */}</div>
                                        </td>
                                        <td>{items.created_date.split('T')[0]}
                                        </td>
                                        <td>130 Applications</td>
                                        <td><span className='status-active me-2'></span>{items.job_status}</td>
                                        <td className='text-end'>
                                            <div className="dropdown">
                                                <button type="button" className="btn border-0" data-bs-toggle="dropdown">
                                                    <i className="bi bi-three-dots-vertical"></i>
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-end tbl-dropdown">
                                                    <li>
                                                        <Link to={`/submit-job/${items.id}/1`} className="dropdown-item">
                                                            <i className="bi bi-eye"></i> View Job</Link>
                                                    </li>
                                                    <li><a className="dropdown-item" href="#">
                                                        <i className="bi bi-share"></i> Share</a>
                                                    </li>
                                                    <Link to={`/submit-job/${items.id}/2`} className="dropdown-item">
                                                        <i className="bi bi-pencil-square"></i> Edit
                                                    </Link>

                                                    <li><a className="dropdown-item" href="#">
                                                        <i className="bi bi-trash"></i> Delete</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            ) : (
                                <p>No Data Available</p>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="pagination justify-content-center mt-4 mb-5">
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

export default MyJobs