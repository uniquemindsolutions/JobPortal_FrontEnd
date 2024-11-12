import React, { useState } from 'react'

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

    const [itSkills, setItSkills] = useState([
        { id: 1, skill: 'HTML', version: '5', lastUsed: '-', experience: '8 Years' },
        { id: 2, skill: 'React', version: '-', lastUsed: '-', experience: '-' },
    ]);
    const [Skills, setSkills] = useState({
        IT_Skills: '',
        version: '',
        last_used: '',
        experience: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkillId, setCurrentSkillId] = useState(null);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewSkill({ ...newSkill, [name]: value })

    }
    const [newSkill, setNewSkill] = useState<ITSkill>({ skill: '', version: '', lastUsed: '', experience: '', id: 0 });

    const handleAddSkill = () => {
        if (!newSkill.skill) return; // Don't add empty skill
        setItSkills([...itSkills, { ...newSkill, id: itSkills.length + 1 }]);
        setNewSkill({ skill: '', version: '', lastUsed: '', experience: '', id: 0 }); // Clear form
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

    return (
        <main>
            <div className="card-header fw-bold">
                <span><i className="bi bi-gear text-secondary me-2"></i> Skills </span>  <button className="bi bi-pencil-square float-end btn  py-0" data-bs-toggle="modal" data-bs-target="#addSkillSet"></button></div>
            <div className="card-body">
                <div className="skill-section">
                    {/* Skills Header */}
                    <div className="skills-header">
                        <h6>Skills</h6>
                    </div>

                    {/* Skills List */}
                    <div className="skills-list">
                        {['Photoshop', 'Bootstrap', 'Jquery', 'Javascript', 'SCSS', 'HTML5', 'CSS3', 'Angular', 'React'].map((skill, index) => (
                            <div key={index} className="skill-item">{skill}</div>
                        ))}
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
                                {itSkills.map((skill) => (
                                    <tr key={skill.id}>
                                        <td>{skill.skill}</td>
                                        <td>{skill.version}</td>
                                        <td>{skill.lastUsed}</td>
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
                        <button className="btn btn-outline-success btn-sm ">
                            <i className="bi bi-plus-circle"></i> Add Skill
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
                            {/* skill start */}
                            <form action="">
                                {/* Add/Edit Skill Form */}
                                <div className="add-skill-form">
                                    <div className="mb-3">
                                        <label>IT Skill</label>
                                        <input
                                            type="text"
                                            name="skill"
                                            value={newSkill.skill}
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
                                            value={newSkill.version}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Version"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label>Last Used</label>
                                        <input
                                            type="text"
                                            name="lastUsed"
                                            value={newSkill.lastUsed}
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
                                            value={newSkill.experience}
                                            onChange={handleChange}
                                            className="form-control"
                                            placeholder="Experience (e.g., 2 years)"
                                        />
                                    </div>

                                    <div className="add-btn">
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
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Skills