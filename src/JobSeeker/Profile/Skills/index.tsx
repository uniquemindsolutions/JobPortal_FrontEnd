import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CreatableSelect from "react-select/creatable";

// Define the type for the options
type OptionType = {
    value: string;
    label: string;
};
interface ITSkill {
    id: number;
    skill: string;
    version: string;
    lastUsed: string;
    experience: string;
}
interface Skills {
    IT_Skills: string;
    version: string;
    last_used: string;
    experience: string;
}



const Skills = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(""); // Success message state

    const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
    // const groupedOptions = [
    //     {
    //         label: "Frontend",
    //         options: [
    //             { value: "angular", label: "Angular" },
    //             { value: "bootstrap", label: "Bootstrap" },
    //             { value: "react", label: "React.js" },
    //             { value: "vue", label: "Vue.js" },
    //         ],
    //     },
    //     {
    //         label: "Backend",
    //         options: [
    //             { value: "django", label: "Django" },
    //             { value: "laravel", label: "Laravel" },
    //             { value: "nodejs", label: "Node.js" },
    //         ],
    //     },
    // ];

    const [itSkills, setItSkills] = useState([
        { id: 1, skill: 'HTML', version: '5', lastUsed: '-', experience: '8 Years' },
        { id: 2, skill: 'React', version: '-', lastUsed: '-', experience: '-' },
    ]);
    const [groupedOptions, setGroupedOptions] = useState<any>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkillId, setCurrentSkillId] = useState(null);
    const [getSkill, setGetSkill] = useState<any>([])
    const [newSkill, setNewSkill] = useState<any>(
        {
            id: 0,
            skills: '',
            version: '',
            last_used: '',
            experience: '',
        });

    const [addSkillBtn, setAddSkillBtn] = useState(true)
    const [slillSetGet, setSlillSetGet] = useState([])
    const [slillSetPost, setSlillSetPost] = useState<any>({
        id: '',
        skill_name: '',
    })

    useEffect(() => {
        getSkills();
        getMethodSkillSet();
    }, [])

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewSkill({ ...newSkill, [name]: value })
    }

    const getSkills = async () => {
        setLoading(true);
        try {
            const getSkillApi = await axios.get('http://127.0.0.1:8000/user/Skills/');
            setGetSkill(getSkillApi.data);
        } catch (error) {
            setError('Error: not found skills')
        }
    }

    const handleAddSkill = async (id: any) => {
        try {
            const postSkill = await axios.post(`http://127.0.0.1:8000/user/Skills/${id}/`, newSkill)
            setNewSkill(postSkill)
        } catch (error) {
            setError('Error: not added new skill')
        }

        // if (!newSkill.skill) return; // Don't add empty skill
        // setItSkills([...itSkills, { ...newSkill, id: itSkills.length + 1 }]);
        // setNewSkill({ skills: '', version: '', last_used: '', experience: '', id: 0 }); // Clear form
    };

    // Handle editing a skill
    const handleEditSkill = (id: number) => {
        const skillToEdit = itSkills.find((skill) => skill.id === id);

        // Check if skillToEdit is found
        if (skillToEdit) {
            setNewSkill(skillToEdit); // Set the skill to the form for editing
            setIsEditing(true);
            setCurrentSkillId(null); // Store the id of the skill being edited
        } else {
            console.error('Skill not found');
        }
    };
    // Handle saving an edited skill
    const handleSaveEdit = () => {
        // Check if the currentSkillId exists and there is a valid skill to save
        if (currentSkillId !== null) {
            setItSkills(
                itSkills.map((skill) =>
                    skill.id === currentSkillId ? { ...newSkill, id: currentSkillId } : skill
                )
            );
            // Clear the form and reset editing state
            setNewSkill({ skill: '', version: '', lastUsed: '', experience: '', id: 0 });
            setIsEditing(false);
            setCurrentSkillId(null);
        }
    };
    const handleDeleteSkill = (id: any) => {
        setItSkills(itSkills.filter((skill) => skill.id !== id));
    };

    const handleChangeMultiSelect = (newValue: any) => {
        setSelectedOptions(newValue);
        console.log("Selected Options:", newValue);
        setAddSkillBtn(false)
    };
    const handleCreate = (inputValue: string) => {
        const newOption = { value: inputValue.toLowerCase(), label: inputValue };
        setSelectedOptions((prev) => [...prev, newOption]);
        console.log("Custom Option Added:", newOption);
    };


    const getMethodSkillSet = async () => {
        setLoading(true);
        try {
            const response = await axios.get("http://127.0.0.1:8000/user/SkillSet/");
            const skillData = response.data;
            console.log('skillData ====', skillData)
            // Transform skills into grouped options
            const grouped = [
                {
                    label: "All Skills", // Single group label for all skills
                    options: skillData.map((skill: any) => ({
                        value: skill.id,        // Use `id` as the value
                        label: skill.skill_name // Use `skill_name` as the label
                    }))
                }
            ];

            // Update grouped options state
            setGroupedOptions(grouped);
        } catch (error) {
            setError("Skills not found");
        } finally {
            setLoading(false);
        }
    };

    // const handleChangeMultiSelect = (selected: any) => {
    //     setSelectedOptions(selected); // Update the selected options state
    // };

    const handleSaveSkills = async () => {
        try {
            setLoading(true);
            setSuccess("");
            setError("");

            // Prepare payload (send only skill IDs to the backend)
            const payload = {
                skills: selectedOptions.map((skill: any) => skill.value),
            };

            // Make API request to save selected skills
            const response = await axios.post("http://127.0.0.1:8000/user/SkillSet/", payload);

            if (response.status === 200) {
                setSuccess("Skills saved successfully!");
            } else {
                setError("Failed to save skills.");
            }
            setSlillSetGet(response.data)
        } catch (error) {
            console.error("Error saving skills:", error);
            setError("An error occurred while saving skills.");
        } finally {
            setLoading(false);
        }
    };

    const addSkillBtnHide = ()=>{
        setAddSkillBtn(false)
    }

    return (
        <main>
            <div className="card-header fw-bold">
                <span><i className="bi bi-gear text-secondary me-2"></i> Skills </span>  <button className="bi bi-pencil-square float-end btn  py-0" data-bs-toggle="modal" data-bs-target="#addSkillSet"></button></div>
            <div className="card-body">
                <div className="skill-section">
                    {/* Skills Header */}
                    <div className="skills-header">
                        <h6>
                            Skills 
                            { addSkillBtn ? <button onClick={addSkillBtnHide} title='Click to add Skills' data-bs-toggle="modal" data-bs-target="#addSkillSet" className='btn text-success ms-2'><i className="bi bi-plus-circle"></i></button> : ''}
                        </h6>
                    </div>

                    {/* Skills List */}
                    <div className="skills-list">
                        {/* {['Photoshop', 'Bootstrap', 'Jquery', 'Javascript', 'SCSS', 'HTML5', 'CSS3', 'Angular', 'React'].map((skill, index) => (
                            <div key={index} className="skill-item">{skill}</div>
                        ))} */}
                        {selectedOptions.length > 0 ? (
                            selectedOptions.map((skill: any, index: number) => (
                                <span key={index} className="skill-item">
                                    {skill.label}
                                </span>
                            ))
                        ) : (
                            <p>No skills selected</p>
                        )}

                        {slillSetGet}
                    </div>

                    <hr />
                    {/* IT Skills Table */}
                    <div className="it-skills-table table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>IT Skills</th>
                                    <th>Version</th>
                                    <th>Last Used</th>
                                    <th>Experience</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(getSkills) && getSkills.length > 0 && getSkills.map((skill: any, index: number) => (
                                    <tr key={index}>
                                        <td>{skill.skills}</td>
                                        <td>{skill.version}</td>
                                        <td>{skill.last_used}</td>
                                        <td>{skill.experience}</td>
                                        <td>
                                            <i
                                                className="bi bi-pencil-square text-primary"
                                                onClick={() => handleEditSkill(skill.id)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                            <i
                                                className="bi bi-trash text-danger ms-2"
                                                onClick={() => handleDeleteSkill(skill.id)}
                                                style={{ cursor: 'pointer' }}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Add Button */}
                    <div className="text-end">
                        <button className="btn btn-outline-success btn-sm " data-bs-toggle="modal" data-bs-target="#addSkillSet">
                            <i className="bi bi-plus-circle"></i> Add Skills
                        </button>
                    </div>
                </div>
            </div>


            <div className="modal fade" id="addSkillSet" aria-labelledby="addSkillSetLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addSkillSetLabel">Skills</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            <div className='mb-4'>
                                <h5>Select Your Skills</h5>

                                <div className="row">
                                    <div className="col-md-10">
                                        <CreatableSelect
                                            isMulti
                                            options={groupedOptions} // Use the grouped options
                                            value={selectedOptions}
                                            onChange={handleChangeMultiSelect}
                                            onCreateOption={handleCreate}
                                            placeholder="Select skills or add a custom skill"
                                            closeMenuOnSelect={false}
                                            formatGroupLabel={(data: any) => (
                                                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                                                    {data.label}
                                                </div>
                                            )}
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    padding: "5px",
                                                    borderColor: "#ddd",
                                                    boxShadow: "none",
                                                }),
                                                multiValue: (base) => ({
                                                    ...base,
                                                    backgroundColor: "#e4f3ff",
                                                }),
                                                multiValueLabel: (base) => ({
                                                    ...base,
                                                    color: "#007bff",
                                                }),
                                                multiValueRemove: (base) => ({
                                                    ...base,
                                                    color: "#007bff",
                                                    ":hover": {
                                                        backgroundColor: "#d1e9ff",
                                                        color: "#0056b3",
                                                    },
                                                }),
                                            }}
                                        />

                                    </div>
                                    <div className="col-md-2">
                                        <button onClick={handleSaveSkills} className='btn btn-outline-success' data-bs-dismiss="modal">Save</button>
                                    </div>
                                </div>

                            </div>

                            <hr />

                            {/* skill start */}
                            <form action="">
                                {/* Add/Edit Skill Form */}
                                <div className="add-skill-form">
                                    <h5>Skill Name</h5>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="skills"
                                            // value={newSkill.skills}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Skill name"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Version</label>
                                        <input
                                            type="text"
                                            name="version"
                                            // value={newSkill.version}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Version"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Last Used</label>
                                        <input
                                            type="text"
                                            name="last_used"
                                            // value={newSkill.last_used}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Last used date"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Experience</label>
                                        <input
                                            type="text"
                                            name="experience"
                                            // value={newSkill.experience}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Experience (e.g., 2 years)"
                                        />
                                    </div>

                                    <div className="add-btn text-end">
                                        {isEditing ? (
                                            <button className="btn btn-success" onClick={handleSaveEdit}>
                                                <i className="bi bi-check-circle"></i> Save Edit
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary" onClick={handleAddSkill}>
                                                <i className="bi bi-plus-circle"></i> Add Skill
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>
                            {/* skill end */}
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Skills