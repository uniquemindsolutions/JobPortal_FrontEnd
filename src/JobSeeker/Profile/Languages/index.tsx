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
    const [getLanguage, setGetLanguage] = useState<any>([]);
    const [postLanguage, setPostLanguage] = useState<Language_Page>({
        languange: '',
        proficiency: ''
    });

    useEffect(() => {
        getMethLanguange();
    }, []);

    const getMethLanguange = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/user/Languange/1/');
            console.log(response.data); // Debug API response
            setGetLanguage(response.data);
        } catch (err) {
            setError('Failed to fetch Language');
        } finally {
            setLoading(false);
        }
    };

    const handleInputCheckbox = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setPostLanguage({ ...postLanguage, [name]: value });
    }

    const postMethLanguamge = async () => {
        try {
            const res_lang = await axios.post(`http://127.0.0.1:8000/user/Languange//`);
            const langData = res_lang.data;
            setPostLanguage(langData)
        } catch (error) {
            setError("Error: Language not posted");
        }
    }


    return (
        <main>
            <div className="card-header fw-bold">
                <span><i className="bi bi-megaphone text-secondary me-2"></i> Languages </span>
                <button className='btn btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#addLanguage"> +Add</button>
            </div>
            <div className="card-body">
                <ul className='list-unstyled profile-sec'>
                    {Array.isArray(getLanguage) && getLanguage.length > 0 ? (
                        getLanguage.map((lang: any, index: number) => (
                            <li className='lt-blue-c' key={index}>
                                <p className='mb-2 mt-3'>
                                    {lang.Languange_name}
                                    <button
                                        className="bi bi-pencil-square float-end btn py-0"
                                        data-bs-toggle="modal"
                                        data-bs-target="#addLanguage">
                                    </button>
                                </p>
                                <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                                    <input
                                        type="checkbox"
                                        name="Languange_name"
                                        value={lang.proficiency}
                                        className="btn-check"
                                        id={`btncheck1-${index}`}
                                    />
                                    <label
                                        className="btn btn-outline-primary"
                                        htmlFor={`btncheck1-${index}`}>
                                        Read
                                    </label>

                                    <input
                                        type="checkbox"
                                        name="Languange_name"
                                        value={lang.proficiency}
                                        className="btn-check"
                                        id={`btncheck2-${index}`}
                                    />
                                    <label
                                        className="btn btn-outline-primary"
                                        htmlFor={`btncheck2-${index}`}>
                                        Write
                                    </label>

                                    <input
                                        type="checkbox"
                                        name="Languange_name"
                                        value={lang.proficiency}
                                        className="btn-check"
                                        id={`btncheck3-${index}`}
                                    />
                                    <label
                                        className="btn btn-outline-primary"
                                        htmlFor={`btncheck3-${index}`}>
                                        Speak
                                    </label>
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No data found</p>
                    )}

                </ul>

                {/* <ul className='list-unstyled profile-sec'>
                    {getLanguage ? getLanguage.length > 0 && getLanguage.map((lang: any, index: number) => (
                        <li className='lt-blue-c' key={index}>
                            <p className='mb-2 mt-3'>{lang.Languange_name} <button className="bi bi-pencil-square float-end btn  py-0" data-bs-toggle="modal" data-bs-target="#addLanguage"></button></p>
                            <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                                <input type="checkbox" name='Languange_name' value={lang.proficiency} className="btn-check" id="btncheck1" />
                                <label className="btn btn-outline-primary" htmlFor="btncheck1">Read</label>

                                <input type="checkbox" name='Languange_name' value={lang.proficiency} className="btn-check" id="btncheck2" />
                                <label className="btn btn-outline-primary" htmlFor="btncheck2">Write</label>

                                <input type="checkbox" name='Languange_name' value={lang.proficiency} className="btn-check" id="btncheck3" />
                                <label className="btn btn-outline-primary" htmlFor="btncheck3">Speak</label>
                            </div>
                        </li>
                    )) : ("No data found")}
                </ul> */}
            </div>

            <div className="modal fade" id="addLanguage" aria-labelledby="addLanguage" aria-hidden="true">
                <div className="modal-dialog modal-md">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addLanguage">Language</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={postMethLanguamge}>
                            <div className="modal-body">
                                {/* language start */}
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor="">Language </label>
                                        <select className='form-control' name='Languange_name' onChange={handleInputCheckbox}>
                                            {/* {languange.map((language) => (
                                                <option key={language.id} value={language.id}>{language.Languange_name}</option>
                                            ))} */}
                                            <option value="English">English</option>
                                            <option value="Hindi">Hindi</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="">Proficiency  </label>
                                        <select className='form-control' name='Languange_name' onChange={handleInputCheckbox}>
                                            <option value="Beginner">Beginner</option>
                                            <option value="Proficient">Proficient</option>
                                            <option value="Expert">Expert</option>
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
                                {/* language end */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="cancel-btn me-3">Clear</button>
                                <button type="submit" className="save-btn" data-bs-dismiss="modal">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default Languages