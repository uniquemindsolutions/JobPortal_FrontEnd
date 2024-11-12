import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface PersonDetails {
    length: number;
    gender: string;
    data_of_birth: string;
    marital_status: string;
    category: string;
    Have_you_taken_a_career_break: string;
    resident_status: string;
    work_permit_for_USA: string;
    work_permit_for_other_country: string;
    Nationality: string;
    i_am_specially_abled: boolean;
}
interface Country {
    id: number;
    name: string;
}

const PersonalDetails = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [countries, setCountries] = useState<Country[]>([]);

    const [getPersonDetais, setGetPersonDetais] = useState<PersonDetails | null>(null);
    const [postPersonDetais, setPostPersonDetais] = useState<PersonDetails>({
        length: 0,
        gender: '',
        data_of_birth: '',
        marital_status: '',
        category: '',
        Have_you_taken_a_career_break: '',
        resident_status: '',
        work_permit_for_USA: '',
        work_permit_for_other_country: '',
        Nationality: '',
        i_am_specially_abled: false,
    });
    const [updatePersonDetais, setUpdatePersonDetais] = useState<any>({
        gender: "",
        date_of_birth: "",
        Have_you_taken_a_career_break: "",
        resident_status: "",
        work_permit_for_USA: "",
        work_permit_for_other_country: "",
        Nationality: "",
        i_am_specially_abled: false,
    });

    useEffect(() => {
        presonGetMethod();
        // handlePeronalGet();
        handleUpdatepersonalDetails(0);


        const fetchCountry = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/Countries/');
                setCountries(response.data);  // Set the fetched users to state
            } catch (err) {
                setError('Failed to fetch Countries');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        fetchCountry();
        
    }, [])



    // personal details start
    const presonGetMethod = async () => {
        setLoading(true);
        try {
            const res_personal_get = await axios.get("http://127.0.0.1:8000/user/PersonDetails/1/");
            const personal_list: PersonDetails = res_personal_get.data;
            setGetPersonDetais(personal_list);
            console.log("personal data list ===", personal_list);
        } catch (error) {
            setError("personal data not found");
        } finally {
            setLoading(false);
        }
    };

    const handleInputPersonalDetails = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setPostPersonDetais({ ...postPersonDetais, [e.target.name]: e.target.value })
    }


    const handlePersonalFormPostData = async (e: any) => {
        e.preventDefault();
        try {
            const res_personal_post = await axios.post("http://127.0.0.1:8000/user/PersonDetails/", postPersonDetais)
            const personal_list_post = res_personal_post.data;
            setPostPersonDetais(personal_list_post.data)
            console.log("personal data ===", personal_list_post)
        } catch (error) {
            setError("personal data not found")
        }
    }

    const handleUpdatepersonalDetails = async (userId: any) => {

        try {

            const updatePersonalDetails = {
                gender: updatePersonDetais.gender,
                date_of_birth: updatePersonDetais.date_of_birth,
                Have_you_taken_a_career_break: updatePersonDetais.Have_you_taken_a_career_break,
                resident_status: updatePersonDetais.resident_status,
                work_permit_for_USA: updatePersonDetais.work_permit_for_USA,
                work_permit_for_other_country: updatePersonDetais.work_permit_for_other_country,
                Nationality: updatePersonDetais.Nationality,
                i_am_specially_abled: updatePersonDetais.i_am_specially_abled // Fix the boolean assignment
            };

            const res_personal_update = await axios.put(`http://127.0.0.1:8000/user/PersonDetails/1/`, updatePersonalDetails);

            const personal_list_update = res_personal_update.data;
            setUpdatePersonDetais(personal_list_update); // Assuming the API returns the updated data
            console.log("personal data ===", personal_list_update.title);
        } catch (error) {
            setError("Error: data not found");
            console.error(error);
        }
    };
    // personal details end

    
    return (
        <main>
            <div className="card-header fw-bold">
                <span><i className="bi bi-person-vcard text-secondary me-2"></i> Personal Details </span>
                <button className="bi bi-pencil-square float-end btn  py-0" data-bs-toggle="modal" data-bs-target="#addPersonalDetails"></button></div>
            <div className="card-body">
                <ul className='list-unstyled profile-sec'>
                    {getPersonDetais && (
                        <>
                            <li className='lt-blue-c'>Gender: {getPersonDetais.gender}</li>
                            <li>Date of Birth: <b>{getPersonDetais.data_of_birth}</b></li>
                            <li>Marital Status: <b>{getPersonDetais.marital_status}</b></li>
                            <li>Have you taken a career break?: <b>{getPersonDetais.Have_you_taken_a_career_break ? 'Yes' : 'No'}</b></li>
                            <li>Work Permit for USA: <b>{getPersonDetais.work_permit_for_USA ? 'Yes' : 'No'}</b></li>
                            <li>Nationality: <b>{getPersonDetais.Nationality}</b></li>
                            <li>Specially abled: <b>{getPersonDetais.i_am_specially_abled ? 'Yes' : 'No'}</b></li>
                            <li>Add Resident Status: <b>{getPersonDetais.resident_status}</b></li>
                            <li>Add Work Permit for Other Country: <b>{getPersonDetais.work_permit_for_other_country}</b></li>
                        </>
                    )}
                </ul>
            </div>

            <div className="modal fade" id="addPersonalDetails" aria-labelledby="addPersonalDetails" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addPersonalDetails">Personal Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handlePersonalFormPostData}>
                            <div className="modal-body">
                                {/* personal details start */}
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label me-3">Gender: </label>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    id="Male"
                                                    value={updatePersonDetais.Male}
                                                    checked={postPersonDetais?.gender === 'Male'}
                                                    onChange={handleInputPersonalDetails}
                                                />
                                                <label className="form-check-label" htmlFor="Male">Male</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    id="Female"
                                                    value={updatePersonDetais.Female}
                                                    checked={postPersonDetais?.gender === 'Female'}
                                                    onChange={handleInputPersonalDetails}
                                                />
                                                <label className="form-check-label" htmlFor="Female">Female</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="gender"
                                                    id="Others"
                                                    value={updatePersonDetais.Others}
                                                    checked={postPersonDetais?.gender === 'Others'}
                                                    onChange={handleInputPersonalDetails}
                                                />
                                                <label className="form-check-label" htmlFor="Others">Others</label>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="yearOfBirth" className="form-label">Date Of Birth</label>
                                        <input type="date" className='form-control'
                                            id='data_of_birth'
                                            name='data_of_birth'
                                            value={updatePersonDetais.data_of_birth}
                                            onChange={handleInputPersonalDetails} />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="category" className="form-label">Marital status</label>
                                        <select className="form-select" id="category" value={updatePersonDetais.marital_status} onChange={handleInputPersonalDetails}>
                                            <option value="">Select</option>
                                            <option value="OC">Single</option>
                                            <option value="General">Married</option>
                                            <option value="Divorced">Divorced</option>
                                            <option value="Widowed">Widowed</option>
                                            <option value="Separated">Separated</option>
                                            <option value="partnered">In a Relationship/Partnered</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label className="form-label">Have you taken a career break?</label>
                                        <div className="d-flex">
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="Have_you_taken_a_career_break" id="Have_you_taken_a_career_break"
                                                    // value="Yes"
                                                    value={updatePersonDetais.Yes}
                                                    onChange={handleInputPersonalDetails} />
                                                <label className="form-check-label" htmlFor="Have_you_taken_a_career_break">Yes</label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="Have_you_taken_a_career_break" id="Have_you_taken_a_career_break"
                                                    value={updatePersonDetais.No}
                                                    onChange={handleInputPersonalDetails} />
                                                <label className="form-check-label" htmlFor="Have_you_taken_a_career_break">No</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="residentStatus" className="form-label">Resident Status</label>
                                        <select className="form-select" id="resident_status" value={updatePersonDetais.resident_status} onChange={handleInputPersonalDetails} name='resident_status'>
                                            <option>Select</option>
                                            {/* Add resident status options */}
                                            {countries.map((country) => (
                                                <option key={country.id} value={country.id}>{country.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="workPermitUSA" className="form-label">Work Permit For USA</label>
                                        <select className="form-select" id="work_permit_for_USA" name='work_permit_for_USA'
                                            value={updatePersonDetais.work_permit_for_USA} onChange={handleInputPersonalDetails}>
                                            <option>Select</option>
                                            <option value="Green Card holder">Green Card holder</option>
                                            <option value="Have L1 Visa">Have L1 Visa</option>
                                            <option value="US Citizen">US Citizen</option>
                                            <option value="TN Permit Holder">TN Permit Holder</option>
                                            <option value="Have H1 Visa">Have H1 Visa</option>
                                            <option value="I  have Work Authorization">I  have Work Authorization</option>
                                            <option value="Authorized to work in the US">Authorized to work in the US</option>
                                            <option value="No US Work authorization">No US Work authorization</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="workPermitOther" className="form-label">Work Permit For Other Country</label>
                                        <select className="form-select" id="work_permit_for_other_country" value={updatePersonDetais.work_permit_for_other_country} onChange={handleInputPersonalDetails} name='work_permit_for_other_country'>
                                            <option>Select</option>
                                            {countries.map((country) => (
                                                <option key={country.id} value={country.id}>{country.name}</option>
                                            ))}
                                            {/* <option value="Yes">Yes</option>
                                            <option value="No">No</option> */}
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="nationality" className="form-label">Nationality</label>
                                        <select className="form-select" id="Nationality" value={updatePersonDetais.Nationality} onChange={handleInputPersonalDetails} name='Nationality'>
                                            <option>Select Nationality</option>
                                            {/* Add more nationality options */}
                                            {countries.map((country) => (
                                                <option key={country.id} value={country.id}>{country.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="mb-3 mt-4 form-check">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="i_am_specially_abled"
                                                name="i_am_specially_abled"
                                                value={updatePersonDetais.i_am_specially_abled}
                                                onChange={handleInputPersonalDetails}
                                                checked={postPersonDetais?.i_am_specially_abled || false}  // Use optional chaining with a default value
                                            />

                                            <label className="form-check-label" htmlFor="i_am_specially_abled">I am specially abled</label>
                                        </div>
                                    </div>

                                </div>

                                {/* personal details end */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default PersonalDetails;