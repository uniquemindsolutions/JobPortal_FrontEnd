import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Projects {
    id: any;
    title: string;
    url: string;
    start_date: string;
    end_date: string;
    details_of_project: string;
}
const Projects = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [projectsData, setProjectsData] = useState<any>({
        id: '',
        title: '',
        url: '',
        start_date: '',
        end_date: '',
        details_of_project: ''
    });
    const [projectsDataEdit, setEditProjectsData] = useState<any | null>(null);
    const [projectsCreate, setProjectsCreate] = useState<Projects | any>({
        id: '',
        title: '',
        url: '',
        start_date: '',
        end_date: '',
        details_of_project: ''
    });
    const [updateBtn, setUpdateBtn] = useState(false);


    useEffect(() => {
        projectGetMethod();
    }, []);

    const projectGetMethod = async () => {
        setLoading(true);
        try {
            const res_project_get = await axios.get(`http://127.0.0.1:8000/user/Projects/`);
            const project_list = res_project_get.data;
            console.log("Project data list ===", project_list);

            if (Array.isArray(project_list) && project_list.length > 0) {
                setProjectsData(res_project_get.data); // Set the first project if array is not empty
            } else {
                console.error("No Projects data found");
            }
        } catch (error) {
            console.error("Error fetching project data:", error);
            setError("Project data not found");
        } finally {
            setLoading(false);
        }
    };

    const handleInputProjects = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setProjectsCreate({ ...projectsCreate, [name]: value })
    }

    const handleSubmitProjectPostMethod = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://127.0.0.1:8000/user/Projects/`, projectsCreate);
            // setProjectsCreate(projectsCreate)
            console.log("API Response:", response.data); // Log response here
            // Handle response, e.g., add project to state or show success message
        } catch (error) {
            console.error("API Error:", error); // Log any errors
        }
    };
    const projectpostnew = async () => {
        setUpdateBtn(false)
    };

    const handleEditProjects = async (id: number) => {
        setUpdateBtn(true)
        setLoading(true);
        try {
            const res_project_edit = await axios.get(`http://127.0.0.1:8000/user/Projects/${id}/`);
            const projectdataEdit = res_project_edit.data;
            setEditProjectsData(projectdataEdit);
            console.log("Projectdata", res_project_edit)
            if (Object.keys(projectdataEdit).length > 0) {

                Object.entries(projectdataEdit).forEach(([key, value]) => {

                    setProjectsCreate((projectdata: any) => ({
                        ...projectdata,
                        [key]: value, // Dynamically update the key based on input name
                    }));
                });
            }
            console.log("projectsCreateformdata ====", projectsCreate);
        } catch (error) {
            setError("personal data not found");
        } finally {
            setLoading(false);
        }
    };

    const updateProjects = async (id: number) => {
        try {
            console.log("Updating project with ID:", id);
            const payLoadProjects = {
                id: projectsCreate.id,
                title: projectsCreate.title,
                url: projectsCreate.url,
                start_date: projectsCreate.start_date,
                end_date: projectsCreate.end_date,
                details_of_project: projectsCreate.details_of_project,
            }

            console.log("payLoadProjects ===:", payLoadProjects);
            const put_response = await axios.post(`http://127.0.0.1:8000/user/Projects/`, payLoadProjects);
            const result = put_response.data;
            // alert("Hi")
            // const put_data=put_response.;
            console.log("projectlist", projectsData);

            const dataobj = Array.isArray(projectsData);
            if (dataobj) {
                const updatedUsers = projectsData?.map(user =>
                    user.id === result.id ? result : user
                );

                console.log(updatedUsers, "updatedUsers");
                setProjectsData(updatedUsers);
            };
        } catch (error) {
            console.error("Error submitting project:", error);
            alert("Failed to submit the project");
        }
    }

    const handleClearForm = () => {
        setProjectsCreate({
            id: '',
            title: '',
            url: '',
            start_date: '',
            end_date: '',
            details_of_project: ''
        });
    };

    const handleDeleteProject = async (id: any) => {
        try {
            alert("Item deleted");
            // Proceed with delete request if ID is valid
            await axios.delete(`http://127.0.0.1:8000/user/Projects/${id}/`);
            setProjectsData((prevItems: any) =>
                Array.isArray(prevItems) ? prevItems.filter(item => item.id !== id) : []
            );
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Failed to delete the item");
        }
    };
    //project end
    return (
        <main>
            <div className="card-header fw-bold">
                <span><i className="bi bi-clipboard-data text-secondary me-2"></i> Projects </span> <button className='btn btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#addProjects"> +Add</button>
            </div>
            <div className="card-body">

                {Array.isArray(projectsData) ? (
                    projectsData.map((item: any) => (
                        <ul key={item.id} className="list-unstyled">
                            <li className="lt-blue-c">
                                <span className='text-secondary'>Project Name:</span> {item.title}
                                <button onClick={() => handleEditProjects(item.id)}
                                    className="bi bi-pencil-square float-end btn py-0"
                                    data-bs-toggle="modal"
                                    data-bs-target="#addProjects"
                                ></button>
                            </li>
                            <li>
                                <span className='text-secondary'>Url:</span> <a href={item.url || "#"} className="text-decoration-none">
                                    {item.url || "No URL provided"}
                                </a>
                            </li>
                            <li>
                                <span className='text-secondary'>Start Date:</span> <span>{item.start_date.split('T')[0]}</span> to <span className='text-secondary'>End Date</span> <span>{item.end_date.split('T')[0]}</span>
                            </li>
                            <li>
                                <span className='text-secondary'>Description: </span>{item.details_of_project || "No description available"}
                            </li>
                        </ul>
                    ))
                ) : projectsData ? (
                    <ul className="list-unstyled">
                        <li className="lt-blue-c">
                            Project Name: {projectsData.title}
                            <button
                                className="bi bi-pencil-square float-end btn py-0"
                                data-bs-toggle="modal"
                                data-bs-target="#addProjects"
                            ></button>
                        </li>
                        <li>
                            Url: <a href={projectsData.url || "#"} className="text-decoration-none">
                                {projectsData.url || "No URL provided"}
                            </a>
                        </li>
                        <li>
                            Start Date: <span>{projectsData.start_date.split('T')[0]}</span> to End Date <span>{projectsData.end_date.split('T')[0]}</span>
                        </li>
                        <li>
                            Description: {projectsData.details_of_project || "No description available"}
                        </li>
                    </ul>
                ) : (
                    <p>No Projects Available</p>
                )}

            </div>


            <div className="modal fade" id="addProjects" aria-labelledby="addProjectsLabel" aria-hidden="true">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addProjectsLabel">Projects</h5>
                            <button type="button" onClick={() => projectpostnew()} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleSubmitProjectPostMethod} className="">
                            <div className="modal-body">
                                {/* projects start */}
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">
                                                Title <span className="text-danger">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="title"
                                                name="title"  // Add name attribute here
                                                placeholder="Enter your title"
                                                value={projectsCreate.title}
                                                onChange={handleInputProjects}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label htmlFor="url" className="form-label">URL</label>
                                            <input
                                                type="url"
                                                className="form-control"
                                                id="url"
                                                name="url"  // Add name attribute here
                                                placeholder="Enter your URL"
                                                value={projectsCreate.url}
                                                onChange={handleInputProjects}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">Start Date</label>
                                            <div className="d-flex">
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="start_date"
                                                    name="start_date"  // Add name attribute here
                                                    placeholder="Month"
                                                    value={projectsCreate.start_date}
                                                    onChange={handleInputProjects}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="mb-3">
                                            <label className="form-label">End Date</label>
                                            <div className="d-flex">
                                                <input
                                                    type="date"
                                                    className="form-control"
                                                    id="end_date"
                                                    name="end_date"  // Add name attribute here
                                                    placeholder="Month"
                                                    value={projectsCreate.end_date}
                                                    onChange={handleInputProjects}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="mb-3">
                                            <label htmlFor="details_of_project" className="form-label">Details of Projects</label>
                                            <textarea
                                                className="form-control"
                                                id="details_of_project"
                                                name="details_of_project"  // Add name attribute here
                                                placeholder="Enter your project detail"
                                                style={{ minHeight: '100px' }}
                                                value={projectsCreate.details_of_project}
                                                onChange={handleInputProjects}
                                            ></textarea>
                                            <div className="form-text">Max. 1000/1000 Characters</div>
                                        </div>
                                    </div>

                                </div>
                                {/* projects end */}
                            </div>
                            <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
                                {/*  */}
                                <button type="button" onClick={() => handleDeleteProject(projectsCreate.id)} className="btn btn-outline-danger btn-sm" data-bs-dismiss="modal"><i className="bi bi-trash3"></i></button>
                                <span>
                                    <button type="button" onClick={handleClearForm} className="cancel-btn me-3">Cancel</button>
                                    {updateBtn ? (
                                        <button type="button" className="update-btn me-3" data-bs-dismiss="modal" onClick={() => updateProjects(projectsCreate.id)}>Update</button>
                                    ) : (
                                        " "
                                    )}
                                    <button type="submit" data-bs-dismiss="modal" className="save-btn">Save</button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Projects;