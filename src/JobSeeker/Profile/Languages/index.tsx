import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Language {
    id: number;
    Languange_name: string;
}
interface Language_Page {
    languange: string;
    proficiency: string;
}
const Languages = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [languange, SetLanguage] = useState<Language[]>([]);;
    const [Language_Page, SetLanguagePage] = useState({
        languange: '',
        proficiency: ''
    });

    useEffect(()=>{
        Languange()
    },[]);

    const Languange = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/user/Languange/');
            SetLanguage(response.data);  // Set the fetched users to state
        } catch (err) {
            setError('Failed to fetch Languange');
        } finally {
            setLoading(false);  // Stop loading
        }
    };

    
    return (
        <main>
            <div className="card-header fw-bold">
                <span><i className="bi bi-megaphone text-secondary me-2"></i> Languages </span>
                <button className='btn btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#addLanguage"> +Add</button>
            </div>
            <div className="card-body">
                <ul className='list-unstyled profile-sec'>
                    <li className='lt-blue-c '>
                        <p className='mb-2'>English <button className="bi bi-pencil-square float-end btn  py-0" data-bs-toggle="modal" data-bs-target="#addLanguage"></button></p>
                        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                            <input type="checkbox" className="btn-check" id="btncheck1" />
                            <label className="btn btn-outline-primary" htmlFor="btncheck1">Read</label>

                            <input type="checkbox" className="btn-check" id="btncheck2" />
                            <label className="btn btn-outline-primary" htmlFor="btncheck2">Write</label>

                            <input type="checkbox" className="btn-check" id="btncheck3" />
                            <label className="btn btn-outline-primary" htmlFor="btncheck3">Speak</label>
                        </div>
                    </li>
                    <li className='mt-3'>
                        <p className='mb-2'>Telugu</p>
                        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                            <input type="checkbox" className="btn-check" id="btncheck22" />
                            <label className="btn btn-outline-primary" htmlFor="btncheck22">Read</label>

                            <input type="checkbox" className="btn-check" id="btncheck33" />
                            <label className="btn btn-outline-primary" htmlFor="btncheck33">Write</label>

                            <input type="checkbox" className="btn-check" id="btncheck44" />
                            <label className="btn btn-outline-primary" htmlFor="btncheck44">Speak</label>
                        </div>
                    </li>

                </ul>
            </div>

            <div className="modal fade" id="addLanguage" aria-labelledby="addLanguage" aria-hidden="true">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addLanguage">Language</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* language start */}
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="">Language </label>
                                        <select className='form-control'>
                                            {languange.map((language) => (
                                                <option key={language.id} value={language.id}>{language.Languange_name}</option>
                                            ))}
                                            {/* <option value="">English</option>
                                                <option value="">Hindi</option> */}
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="">Proficiency  </label>
                                        <select className='form-control'>
                                            <option value="">Expert</option>
                                            <option value="">Beginner</option>
                                            <option value="">Proficient</option>
                                        </select>
                                    </div>

                                    <div className="col-md-12 mt-4">
                                        <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                                            <input type="checkbox" className="btn-check" id="btncheck22pop" />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck22pop">Read</label>

                                            <input type="checkbox" className="btn-check" id="btncheck33pop" />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck33pop">Write</label>

                                            <input type="checkbox" className="btn-check" id="btncheck44pop" />
                                            <label className="btn btn-outline-primary" htmlFor="btncheck44pop">Speak</label>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            {/* language end */}
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

export default Languages