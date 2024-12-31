import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import './candidates.scss'
import UserList from './UserList';
import UserDetails from './UserDetails';
import axios from 'axios';


const Candidates = () => {
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState('');
    const [location, setLocation] = useState('');
    const [selectedExperience, setSelectedExperience] = useState<any>(null);

    const [candidatesGetData, setCandidatesGetData] = useState([])
    const [personalDetailsGet, setPersonalDetailsGet] = useState<any>([])

    
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

    useEffect(()=>{
        getCandidatesList();
        getPersonalDetails();
    }, [])

    const getCandidatesList = async () => {
        setLoading(true)
        try {
            const res = await axios.get('http://127.0.0.1:8000/user/Userprofile/');
            setCandidatesGetData(res.data)
            console.log('candidate list ==== parent', res)
        } catch {
            setError('No data found')
        }
    }

     const getPersonalDetails = async () => {
        setLoading(true);
        try {
            const resData = await axios.get('http://127.0.0.1:8000/user/PersonDetails/')
            setPersonalDetailsGet(resData.data)
            console.log("getPersonalDetails ===",resData)
        } catch {
            setError('no data found')
        }
    }

    const handleSearch = () => {
        // Handle search logic here
        console.log('Search Query:', query);
        console.log('Experience:', selectedExperience);
        console.log('Location:', location);
    };

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedPersonalDetls, setSelectedPersonalDetls] = useState(null);

    const handleUserSelect = (user: any, personalDels:any) => {
        setSelectedUser(user);
        setSelectedPersonalDetls(personalDels);
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
                        <UserList usersList={candidatesGetData} personaDetails={personalDetailsGet} onSelectUser={handleUserSelect} />
                    </div>

                    {/* Details Section */}
                    <div className="col-md-8">
                        <UserDetails user={selectedUser} personalDels={selectedPersonalDetls}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Candidates;