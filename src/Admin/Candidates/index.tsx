import React, { useState } from 'react'
import Select from 'react-select';
import './candidates.scss'
import UserList from './UserList';
import UserDetails from './UserDetails';

const candidates = [
    {
        id: 1,
        name: "Alexander Christopher",
        role: "UI UX design Lead",
        source: "Linkedin",
        appliedDate: "5 days ago",
        tags: ["UI", "UX"],
        email: "alex.christopher@gmail.com",
        phone: "+91 1234567890",
        social: ["linkedin", "twitter", "github"],
        image: "https://via.placeholder.com/50",
    },
    {
        id: 2,
        name: "Ramakrishna Pisarla",
        role: "UI UX design Lead",
        source: "Linkedin",
        appliedDate: "5 days ago",
        tags: ["UI", "UX", "Design"],
        email: "ramakrishna.pesarla@gmail.com",
        phone: "+91 9948118962",
        social: ["linkedin", "facebook", "google"],
        image: "https://via.placeholder.com/50",
    },
    // Add more candidates as needed
];
const Candidates = () => {

    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [selectedExperience, setSelectedExperience] = useState<any>(null);

    const [selectedCandidate, setSelectedCandidate] = useState(candidates[1]);
    
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

    const [selectedUser, setSelectedUser] = useState(null);

    const users = [
        { id: 1, location:'Hyderabad', name: 'Alexander Christopher', role: 'UI UX design Lead', email: 'alexander@gmail.com', phone: '+1234567890', source: 'Linkedin', profilePic: 'https://randomuser.me/api/portraits/men/1.jpg', appliedFrom: 'Linkedin' },
        { id: 2, location:'Hyderabad', name: 'Joshua Matthew', role: 'Python developer', email: 'joshua@gmail.com', phone: '+1234567891', source: 'Linkedin', profilePic: 'https://randomuser.me/api/portraits/men/2.jpg', appliedFrom: 'Linkedin' },
        { id: 1, location:'Hyderabad', name: 'Alexander Christopher', role: 'Java Developer', email: 'alexander@gmail.com', phone: '+1234567890', source: 'Linkedin', profilePic: 'https://randomuser.me/api/portraits/men/1.jpg', appliedFrom: 'Linkedin' },
        { id: 2, location:'Hyderabad', name: 'Joshua Matthew', role: 'UI UX design Lead', email: 'joshua@gmail.com', phone: '+1234567891', source: 'Linkedin', profilePic: 'https://randomuser.me/api/portraits/men/2.jpg', appliedFrom: 'Linkedin' },
        { id: 1, location:'Hyderabad', name: 'Alexander Christopher', role: 'UI UX design Lead', email: 'alexander@gmail.com', phone: '+1234567890', source: 'Linkedin', profilePic: 'https://randomuser.me/api/portraits/men/1.jpg', appliedFrom: 'Linkedin' },
        { id: 2, location:'Hyderabad', name: 'Joshua Matthew', role: 'UI UX design Lead', email: 'joshua@gmail.com', phone: '+1234567891', source: 'Linkedin', profilePic: 'https://randomuser.me/api/portraits/men/2.jpg', appliedFrom: 'Linkedin' },
        // Add more users as needed
    ];

    const handleUserSelect = (user: any) => {
        setSelectedUser(user);
    };
    return (
        <main>
            <div className="row d-flex justify-content-between mt-4">
                <div className="col-lg-5"> <div><h4 className='pt-3'>Candidate List</h4></div></div>
                <div className="col-lg-7 search-bar">
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
                        <button className="search-button" onClick={handleSearch}>
                            <i className="bi bi-search me-2"></i> Search
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="candidate-card p-0 mt-4">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-md-4">
                        <UserList users={users} onSelectUser={handleUserSelect} />

                        {/* <ul className="list-group">
                            {candidates.map((candidate) => (
                                <li
                                    key={candidate.id}
                                    className={`list-group-item d-flex align-items-center ${selectedCandidate.id === candidate.id ? "active" : ""
                                        }`}
                                    onClick={() => setSelectedCandidate(candidate)}
                                >
                                    <input
                                        type="checkbox"
                                        className="form-check-input me-2"
                                    />
                                    <img
                                        src={candidate.image}
                                        alt={candidate.name}
                                        className="rounded-circle me-3"
                                        width="50"
                                        height="50"
                                    />
                                    <div>
                                        <h6 className="mb-0">{candidate.name}</h6>
                                        <small>{candidate.role}</small>
                                        <br />
                                        <small>{`Applied ${candidate.appliedDate} from ${candidate.source}`}</small>
                                    </div>
                                </li>
                            ))}
                        </ul> */}
                    </div>

                    {/* Details Section */}
                    <div className="col-md-8">
                        <UserDetails user={selectedUser} />

                        {/* {selectedCandidate && (
                            <>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5>{selectedCandidate.name}</h5>
                                        <p>{selectedCandidate.role}</p>
                                        <small>{`Applied ${selectedCandidate.appliedDate} from ${selectedCandidate.source}`}</small>
                                    </div>
                                    <div>
                                        <button className="btn btn-primary me-2">Interview</button>
                                        <button className="btn btn-danger">Reject</button>
                                    </div>
                                </div>

                                <ul className="nav nav-tabs mt-3">
                                    <li className="nav-item">
                                        <a className="nav-link active" href="#">
                                            Overview
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            Activities
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            Emails
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="#">
                                            My Files
                                        </a>
                                    </li>
                                </ul>

                                <div className="mt-4">
                                    <h6>General Information</h6>
                                    <div>
                                        <strong>Tags: </strong>
                                        {selectedCandidate.tags.map((tag, idx) => (
                                            <span key={idx} className="badge bg-primary me-2">
                                                {tag} 
                                            </span>
                                        ))}
                                        <button className="btn btn-link btn-sm">+ Add</button>
                                    </div>

                                    <div>
                                        <strong>Email Address: </strong>
                                        {selectedCandidate.email}
                                    </div>

                                    <div>
                                        <strong>Phone Number: </strong>
                                        {selectedCandidate.phone}
                                    </div>

                                    <div>
                                        <strong>Sources: </strong>
                                        {selectedCandidate.source}
                                    </div>

                                    <div className="mt-3">
                                        <strong>Social Media: </strong>
                                        {selectedCandidate.social.map((platform, idx) => (
                                            <i
                                                key={idx}
                                                className={`bi bi-${platform} me-2`}
                                                style={{ fontSize: "1.2rem" }}
                                            ></i>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )} */}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Candidates;