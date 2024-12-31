import React, { useState, useEffect, useContext } from 'react'
import { ListGroup, Button } from 'react-bootstrap';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';


const UserList = ({ usersList, onSelectUser }: any) => {
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(true)
    const [candidatesGetData, setCandidatesGetData] = useState<any>([])
    const [designation, setDesignation] = useState<any>([])
    const [cities, setCities] = useState<any>([]);
    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        getDesignations();
        fetchCities();
    }, [])

    
    const getDesignations = async () => {
        try {
            const desigList = await axios.get('http://127.0.0.1:8000/jobcategory/')
            setDesignation(desigList.data)
        } catch {
            setError("No found jobs")
        }
    }

    const desigListData = (id: any) => {
        const desName = designation.find((des: any) => des.id === id)
        return desName ? desName.job_category : ''
    }

    const fetchCities = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/user/Cities/');
            setCities(response.data);  // Set the fetched users to state
        } catch (err) {
            setError('Failed to fetch Cities');
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    const getCityList = (id: any) => {
        const cityList = cities.find((cty: any) => cty.id === id)
        return cityList ? cityList.name : ''
    }

    return (
        <div className="list-group">

            {usersList && usersList?.map((user: any) => (
                <button
                    key={user.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => onSelectUser(user)}>
                    <div className="d-flex">
                        <img src={user.profile_photo} alt='profile pic' className="user-img" />
                        <div>
                            <h6 className='lt-blue-c'>{user.first_name} {user.last_name}</h6>
                            <p><small><i className="bi bi-briefcase text-secondary"></i> {desigListData(user.industry)}, <i className="bi bi-geo-alt text-secondary"></i> {getCityList(user.current_location)}</small></p>
                        </div>
                    </div>
                </button>
            ))}
            {/* {onclickcond && usersList &&
                <UserDetails  user={usersData}/>
            } */}

        </div>

    );
};

export default UserList