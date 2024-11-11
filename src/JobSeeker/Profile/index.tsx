import React, { useEffect, useState } from 'react'
import './profile.scss'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { url } from 'inspector';

interface ITSkill {
    id: number;
    skill: string;
    version: string;
    lastUsed: string;
    experience: string;
}
interface Country {
    id: number;
    name: string;

}
interface City {
    id: number;
    name: string;
    state: string;
}
interface UserProfile {
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    noticeperiod: string;
    current_location: number;
    preferred_location: number;
}
interface Workexperience {
    current_job_title: string;
    company_name: string;
    is_cuurent_company: boolean;
    state_date: string;
    end_date: string;
    work_space: string;
    employment_type: string;
    current_salary: string;
    description: string;
}
interface Qualification {
    id: number;
    name: string;
}
interface Specialization {
    id: number;
    qualification: string;
    name: string;
}
interface Institute {
    id: number;
    institute_name: string;
}
interface Education_Details {
    qualification: string;
    specialization: string;
    institute: string;
    grading_system: string;
    marks: string;
    passing_year: string;
    passing_year_temp: Date;
    education_type: string;
}
interface PreferredDepartmentFunction {
    id: number
    preferred_departement_name: string;
}
interface PreferredJobTitle {
    id: number
    preferredjobtitle: string;
}
interface Job_Preferences {
    preferred_department_function: number;
    preferred_job_title: string;
    job_type: string;
    employee_type: string;
    prefreed_workplace: string;
    preferred_location: string;
    what_are_you_currently_looking_for: string;
}
interface Skills {
    IT_Skills: string;
    version: string;
    last_used: string;
    experience: string;
}
interface Projects {
    id: any;
    title: string;
    url: string;
    start_date: string;
    end_date: string;
    details_of_project: string;
}
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
interface Language {
    id: number;
    Languange_name: string;
}
interface Language_Page {
    languange: string;
    proficiency: string;
}
interface Email_Push_Notifications {
    daily_new_jobs: boolean;
    applied_jobs: boolean;
    follow_up_credited: boolean;
    follow_up_used: boolean;
    pending_test: boolean;
    promotional: boolean;
    chat_notifications: boolean;
    educational_notifications: boolean;
}
interface Industry {
    id: number;
    industry: string;
}

interface Account_settings {
    hide_profile_from_recruiters: boolean;
    deactivate_account: boolean;
}
const Profiles = () => {
    const { id } = useParams();
    const [itSkills, setItSkills] = useState([
        { id: 1, skill: 'HTML', version: '5', lastUsed: '-', experience: '8 Years' },
        { id: 2, skill: 'React', version: '-', lastUsed: '-', experience: '-' },
    ]);
    // const [personalFormData, setPersonalFormData] = useState<PersonDetails>();
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

    const [imageUrl, setImageUrl] = useState('')
    const [cities, setCities] = useState<City[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [newSkill, setNewSkill] = useState<ITSkill>({ skill: '', version: '', lastUsed: '', experience: '', id: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [currentSkillId, setCurrentSkillId] = useState(null);
    const [userprofileFormdata, setUserProfileFormdata] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        total_experience: '',
        notice_period: '',
        current_location: 0,
        preferred_location: 0
    });
    const [fileUpload, setFile] = useState<any | null>(null);
    const [Workexperience, setWorkexperience] = useState({
        current_job_title: '',
        company_name: '',
        is_cuurent_company: '',
        state_date: '',
        end_date: '',
        work_space: '',
        employment_type: '',
        current_salary: '',
        description: ''
    });
    const [Qualification, SetQualification] = useState<Qualification[]>([]);
    const [Specialization, SetSpecialization] = useState<Specialization[]>([]);
    const [Institute, SetInstitute] = useState<Institute[]>([]);
    const [EducationDetails, SetEducationDetails] = useState({
        qualification: '',
        specialization: '',
        institute: '',
        grading_system: '',
        marks: '',
        passing_year: '',
        passing_year_temp: '',
        education_type: ''
    });

    const [PreferredDepartmentFunction, setPreferredDepartmentFunction] = useState<PreferredDepartmentFunction[]>([]);
    const [PreferredJobTitle, setPreferredJobTitle] = useState<PreferredJobTitle[]>([]);

    const [getJobPreferences, setGetJobPreferences] = useState<Job_Preferences | null>(null);
    const [Job_Preferences, setJob_Preferences] = useState({
        preferred_department_function: '',
        preferred_job_title: '',
        job_type: '',
        employee_type: '',
        prefreed_workplace: '',
        preferred_location: '',
        what_are_you_currently_looking_for: ''
    });
    const [Skills, setSkills] = useState({
        IT_Skills: '',
        version: '',
        last_used: '',
        experience: ''
    });
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
    const [PersonDetails, setPersonDetails] = useState({
        gender: '',
        date_of_birth: '',
        category: '',
        Have_you_taken_a_career_break: '',
        resident_status: '',
        work_permit_for_USA: '',
        work_permit_for_other_country: '',
        Nationality: '',
        i_am_specially_abled: false
    });
    const [languange, SetLanguage] = useState<Language[]>([]);;
    const [Language_Page, SetLanguagePage] = useState({
        languange: '',
        proficiency: ''
    });
    const [Email_Push_Notifications, SetEmail_Push_Notifications] = useState({
        daily_new_jobs: false,
        applied_jobs: false,
        follow_up_credited: false,
        follow_up_used: false,
        pending_test: false,
        promotional: false,
        chat_notifications: false,
        educational_notifications: false
    });
    const [Account_settings, setAccountSetting] = useState({
        hide_profile_from_recruiters: false,
        deactivate_account: false,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [industry, setIndustry] = useState<Industry[]>([]);
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewSkill({ ...newSkill, [name]: value })

    }
    const [workExpData, setWorkExpData] = useState([]);
    const [eduUpdate, setEduUpdate] = useState([]);

    useEffect(() => {
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
        fetchCities();
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
        const qualifications = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/Qualification/');
                SetQualification(response.data);  // Set the fetched users to state
            } catch (err) {
                setError('Failed to fetch Qualification');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        qualifications();
        const Specialization = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/Specialization/');
                SetSpecialization(response.data);  // Set the fetched users to state
            } catch (err) {
                setError('Failed to fetch Specialization');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        Specialization();
        const Institute = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/Institute/');
                SetInstitute(response.data);  // Set the fetched users to state
            } catch (err) {
                setError('Failed to fetch Institute');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        Institute();
        const PreferredDepartmentFunction = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/PreferredDepartmentFunction/');
                setPreferredDepartmentFunction(response.data);  // Set the fetched users to state
            } catch (err) {
                setError('Failed to fetch PreferredDepartmentFunction');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        PreferredDepartmentFunction();

        const PreferredJobTitle = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/PreferredJobTitle/');
                setPreferredJobTitle(response.data);  // Set the fetched users to state
            } catch (err) {
                setError('Failed to fetch PreferredJobTitle');
            } finally {
                setLoading(false);  // Stop loading
            }
        };
        PreferredJobTitle();
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
        Languange();

        workExperiance();
        educationPutData();
        workExpUpdated();
        handleIndustry();
        fetchProfileImage();
        presonGetMethod();
        handlePeronalGet();
        handleUpdatepersonalDetails(0);
        projectGetMethod();
        jobPreferencesGet();
      
    }, []);
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

    // Handle deleting a skill
    const handleDeleteSkill = (id: any) => {
        setItSkills(itSkills.filter((skill) => skill.id !== id));
    };


    // user profile start

    const handlePersonalDetails = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents page reload on form submit
        const formData = new FormData();
        for (const key in userprofileFormdata) {
            formData.append(key, userprofileFormdata[key as keyof typeof userprofileFormdata] as string);
        }

        try {
            // Make POST request to the API endpoint
            const response = await axios.post(
                "http://127.0.0.1:8000/user/Userprofile/", formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            setMessage("User created successfully!");
            alert('profile created successfully!');
            console.log(response.data);
        } catch (err) {
            setError('Failed to create user');
            console.error(err);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            console.log(fileUpload, "profile pic ====");
        }
    }

    const uploadImage = async () => {
        if (!fileUpload) return;  // Don't proceed if no image is selected

        const formData = new FormData();
        formData.append("image", fileUpload);

        try {
            // Send POST request to upload image to server
            const response = await axios.post("http://127.0.0.1:8000/user/Userprofile/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setImageUrl(response.data.imageUrl);  // Update image URL after successful upload
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const fetchProfileImage = async () => {
        try {
            const response = await axios.get("/api/profile-image");
            setImageUrl(response.data.imageUrl); // Use default if no image is found
        } catch (error) {
            console.error("Error fetching profile image:", error);
            setImageUrl(imageUrl);  // Fallback to default image on error
        }
    };

    // const handleFileChangelogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         setFilelogo(e.target.files[0]);
    //          console.log(fileUpload, "newfile");         
    //     } else {
    //         // setFormData({
    //         //     ...formData,
    //         //     upload_file: null, // Clear if no file selected
    //         // });
    //     }
    // };

    const handleForm1Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserProfileFormdata(userprofileFormdata => ({
            ...userprofileFormdata,
            [name]: value,
        }));
    }

    const handleIndustry = async () => {
        try {
            const res_industry = await axios.get("http://127.0.0.1:8000/industry/")
            const industry_list = res_industry.data;
            setIndustry(industry_list)
        } catch (error) {
            setError("Not found Industry")
        }
    }

    const handlePeronalGet = async () => {
        setLoading(true);
        try {
            const res_personal_details = await axios.get("http://127.0.0.1:8000/user/Userprofile/")
            const personal_details_list = res_personal_details.data
            setUserProfileFormdata(personal_details_list)
        } catch (error) {
            setError("Personal dat not found")
        }
    }

    // user profile end

    // work experiance start 
    const handleWorkExp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents page reload on form submit
        const formData = new FormData();
        for (const key in Workexperience) {
            formData.append(key, Workexperience[key as keyof typeof Workexperience] as string);
        }

        try {
            // Make POST request to the API endpoint
            const response = await axios.post(
                "http://127.0.0.1:8000/user/Workexperience/",
                formData,
            );
            setMessage("Workexperience Created sucessfully");
            alert('Workexperience created successfully!');
            console.log(response.data);
        } catch (err) {
            setError('Failed to create Workexperience');
            console.error(err);
        }
    };

    const workExperiance = async () => {
        setLoading(true)
        try {
            const res_work_exp = await axios.get('http://127.0.0.1:8000/user/Workexperience/')
            const work_exp_data = res_work_exp.data;
            setWorkExpData(work_exp_data)
            setMessage(message)

        } catch (error) {
            setError("Data not found")
        } finally {
            setLoading(false)
        }
    }

    const workExpUpdated = async () => {
        try {
            const res_work_exp_put = await axios.put('http://127.0.0.1:8000/user/Workexperience/1/', workExpData)
            setMessage(res_work_exp_put.data)
        } catch (error) {
            setError("Work experiance not updated")
        }
    }
    // work experiance end 

    const educationPutData = async () => {
        //     try {
        //         const response = await axios.put(
        //             "http://127.0.0.1:8000/user/EducationDetails/", FormData,
        //         );
        //         setMessage("EducationDetails Created sucessfully");
        //         console.log('education data put =====', response.data);
        //    }catch (err) {
        //     setError('Failed to create EducationDetails');
        //     console.error(err);
        // }
    }

    const handleForm3Submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents page reload on form submit
        const formData = new FormData();
        for (const key in Workexperience) {
            formData.append(key, Workexperience[key as keyof typeof Workexperience] as string);
        }

        try {
            // Make POST request to the API endpoint
            const response = await axios.post(
                "http://127.0.0.1:8000/user/EducationDetails/", formData,
            );
            setMessage("EducationDetails Created sucessfully");
            console.log(response.data);
        } catch (err) {
            setError('Failed to create EducationDetails');
            console.error(err);
        }
    };


    const handleForm2Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
        e.preventDefault();
        const { name, value } = e.target;
        setWorkexperience(Workexperience => ({
            ...Workexperience,
            [name]: value,
        }));
    }
    const handleForm3Change = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        SetEducationDetails(EducationDetails => ({
            ...EducationDetails,
            [name]: value,
        }));
    }



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

    //project start


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

    //Job Preferences start
    const jobPreferencesGet = async () => {
        setLoading(true);
        try {
            const res_jobPreferences = await axios.get(`http://127.0.0.1:8000/user/JobPreferences/2/`)
            const jobPreferences_list = res_jobPreferences.data;
            setGetJobPreferences(jobPreferences_list)
            console.log("Job Preferences data list1 ===", jobPreferences_list);
        } catch (error) {
            setError("Job Preferences data not found");
        }
    }
    const getDepartmentName = (departmentId: number) => {
        const department = PreferredDepartmentFunction.find(dept => dept.id === departmentId);
        return department ? department.preferred_departement_name : 'N/A';
    };

    const cityList = (cityId:any)=> {
        const cityListName = cities.find(cities => cities.id === cityId);
        return cityListName ? cityListName.name : 'N/A';
    }

    const PreferJobTitle = (jobId:any)=> {
        const jobTitile = PreferredJobTitle.find(jobTitleId => jobTitleId.id === jobId);
        return jobTitile ? jobTitile.preferredjobtitle : 'N/A';
    }

    //Job Preferences end

    return (
        <main>
            <div className=" mt-4">
                <h5>Profile</h5>
                <div className="custom-card">
                    <button
                        className="bi bi-pencil-square btn float-end position-absolute end-0"
                        data-bs-toggle="modal"
                        data-bs-target="#addProfile"
                        style={{ marginRight: '4%', marginTop: '-2%' }}
                        title='Edit'
                    ></button>
                    <div className="row">
                        <div className="col-sm-3 col-lg-3 text-center mb-3">
                            <h6>Profile picture</h6>
                            <img
                                className='profile-pic'
                                src={imageUrl || window.location.origin + '/images/avtar-pic.avif'}
                                alt="Profile pic"
                            />
                            {/* <label className="btn btn-outline-primary btn-sm">
                                <i className="fa fa-image"></i>Upload image
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    name="profile_photo"
                                    onChange={(e) => handleForm1Change(e)}
                                />
                            </label> */}
                        </div>
                        <div className="col-sm-9 col-lg-8 offset-lg-1">
                            <div className="row">
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="first_name" className="form-label">First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        placeholder='Shekhar'
                                        className="form-control"
                                        value={userprofileFormdata.first_name}
                                        onChange={handleForm1Change} readOnly
                                    />
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="last_name" className="form-label">Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        placeholder='Vadla'
                                        className="form-control"
                                        value={userprofileFormdata.last_name}
                                        onChange={handleForm1Change} readOnly
                                    />
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="email" className="form-label">Email ID</label>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder='test@gmail.com'
                                        className="form-control"
                                        value={userprofileFormdata.email}
                                        onChange={handleForm1Change} readOnly
                                    />
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="phone_number" className="form-label">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        placeholder='+91-9876543210'
                                        className="form-control"
                                        value={userprofileFormdata.phone_number}
                                        onChange={handleForm1Change} readOnly
                                    />
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label className="form-label">Resume</label>
                                    <input
                                        type="text"
                                        placeholder='shekhar-vadla-resume.pdf'
                                        className="form-control"
                                        onChange={handleForm1Change} readOnly
                                    />
                                    <button className='btn-sm btn'>Download</button>
                                </div>
                                <div className="col-sm-6 col-lg-6 mb-3">
                                    <label htmlFor="industry" className="form-label">Industry</label>
                                    <input
                                        type="text"
                                        placeholder='IT'
                                        className="form-control" readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card">
                        <div className="card-body bg-light">
                            <div className="row">
                                <div className="col-sm-4 col-lg-4 mb-3">
                                    <label htmlFor="current_location" className="form-label">Current Location</label>
                                    <input type="text" onChange={handleForm1Change} value={userprofileFormdata.current_location} name="current_location" className="form-control" readOnly />

                                    {/* <select
                                        name="current_location"
                                        className="form-control"
                                        value={userprofileFormdata.current_location}
                                        onChange={handleForm1Change}
                                    >
                                        <option value="">Select Location</option>
                                        {countries.map((country) => (
                                            <option key={country.id} value={country.id}>{country.name}</option>
                                        ))}
                                    </select> */}
                                </div>
                                <div className="col-sm-4 col-lg-4 mb-3">
                                    <label htmlFor="preferred_location" className="form-label">Preferred Locations</label>
                                    <input type="text" className="form-control" value={userprofileFormdata.preferred_location}
                                        onChange={handleForm1Change} readOnly />
                                    {/* <select
                                        name="preferred_location"
                                        className="form-control"
                                        value={userprofileFormdata.preferred_location}
                                        onChange={handleForm1Change}
                                        >
                                        <option value="">Select Preferred Location</option>
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                    </select> */}
                                </div>
                                <div className="col-sm-4 col-lg-4 mb-3">
                                    <label htmlFor="noticeperiod" className="form-label">Notice Period</label>
                                    <input type="text" value={userprofileFormdata.notice_period}
                                        onChange={handleForm1Change} className="form-control readOnly" />
                                    {/* <select
                                        name="noticeperiod"
                                        className="form-control"
                                        value={userprofileFormdata.notice_period}
                                        onChange={handleForm1Change}
                                    >
                                        <option value="">Select Notice Period</option>
                                        <option value="Immediately available">Immediately available</option>
                                        <option value="15 days">15 days</option>
                                        <option value="30 days">30 days</option>
                                        <option value="45 days">45 days</option>
                                        <option value="2 Months">2 Month</option>
                                        <option value="1 Months">3 Month</option>
                                    </select> */}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>


                <div className="custom-card mt-4">
                    <div className="emp-details mt-4">
                        <div className="card mb-3">
                            <div className="card-header fw-bold">
                                <span><i className="bi bi-duffle text-secondary me-2"></i> Work Experience</span>  <button className='btn btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#addWorkExperiance"> +Add</button></div>
                            <div className="card-body">
                                {workExpData.map((item: any, index: number) => (
                                    <ul className='list-unstyled profile-sec' key={index}>
                                        <li><span className='text-secondary'>Job Titile:</span> <span className='lt-blue-c'>{item.current_job_title}</span>
                                            <button className="bi bi-pencil-square float-end btn" data-bs-toggle="modal" data-bs-target="#addWorkExperiance"></button></li>
                                        <li><span className='text-secondary'>Company Name:</span> {item.company_name}</li>
                                        <li><span className='text-secondary'>Date:</span> {item.start_date.split('T')[0]} to {item.end_date.split('T')[0]} {item.is_company_name}</li>
                                        <li><span className='text-secondary'>Description:</span> {item.description}</li>
                                    </ul>
                                ))}


                                <ul className='list-unstyled profile-sec'>
                                    <li className='lt-blue-c'>Ui Designer And Developer <button className="bi bi-pencil-square float-end btn" data-bs-toggle="modal" data-bs-target="#addWorkExperiance"></button></li>
                                    <li>Vishist Business Solutions</li>
                                    <li>Feb 2022 to Oct 2022</li>
                                    <li>Annual salary : 200000</li>
                                    <li>Description</li>
                                </ul>

                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-header fw-bold">
                                <span><i className="bi bi-book text-secondary me-2"></i> Education Details </span>  <button className='btn btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#addEducation"> +Add</button></div>
                            <div className="card-body">
                                <ul className='list-unstyled profile-sec'>
                                    <li className='lt-blue-c'>B.Tech. <button className="bi bi-pencil-square float-end btn" data-bs-toggle="modal" data-bs-target="#addEducation"></button></li>
                                    <li>JNTU</li>
                                    <li>2023 (Full time)</li>
                                </ul>

                                <ul className='list-unstyled profile-sec'>
                                    <li className='lt-blue-c'>Intermediate (MPC) <button className="bi bi-pencil-square float-end btn" data-bs-toggle="modal" data-bs-target="#addEducation"></button></li>
                                    <li>Board of intermediate</li>
                                    <li>2019 (Full time)</li>
                                </ul>

                                <ul className='list-unstyled profile-sec'>
                                    <li className='lt-blue-c'>SSC <button className="bi bi-pencil-square float-end btn" data-bs-toggle="modal" data-bs-target="#addEducation"> </button></li>
                                    <li>SSC Board Telangana</li>
                                    <li>2017 (Full time)</li>
                                </ul>

                            </div>
                        </div>

                        <div className="card mb-3">
                            <div className="card-header fw-bold">
                                <span><i className="bi bi-card-checklist text-secondary me-2"></i> Job Preferences </span>  <button className="bi bi-pencil-square float-end btn  py-0" data-bs-toggle="modal" data-bs-target="#addJobPreferences"></button></div>
                            <div className="card-body">
                                {getJobPreferences && (
                                    <ul className='list-unstyled profile-sec'>
                                        <li className='lt-blue-c'>
                                            Preferred Department: {getDepartmentName(getJobPreferences.preferred_department_function)}
                                        </li>
                                        <li><span className='text-secondary'>Preferred Location:</span> {cityList(getJobPreferences.preferred_location)}</li>
                                        <li><span className='text-secondary'>Add Preferred Job Title:</span> {PreferJobTitle(getJobPreferences.preferred_job_title)}</li>
                                        <li><span className='text-secondary'>Add Job Type:</span> {getJobPreferences.job_type}</li>
                                        <li><span className='text-secondary'>Add Employment Type:</span> {getJobPreferences.employee_type}</li>
                                        <li><span className='text-secondary'>Add Preferred Workplace:</span> {getJobPreferences.prefreed_workplace}</li>
                                        <li><span className='text-secondary'>Add What are you currently looking for?:</span>  {getJobPreferences.what_are_you_currently_looking_for}</li>
                                    </ul>
                                )}

                            </div>
                        </div>

                        <div className="card mb-3">
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
                        </div>

                        <div className="card mb-3">
                            <div className="card-header fw-bold">
                                <span><i className="bi bi-clipboard-data text-secondary me-2"></i> Projects </span> <button className='btn btn btn-success btn-sm float-end' data-bs-toggle="modal" data-bs-target="#addProjects"> +Add</button></div>
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
                        </div>

                        <div className="card mb-3">
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
                        </div>

                        <div className="card mb-3">
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
                        </div>
                    </div>

                </div>
            </div>


            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addWorkExperiance">
                Launch demo modal
            </button> */}
            <form onSubmit={handlePersonalDetails}>
                <div className="modal fade" id="addProfile" aria-labelledby="addProfileLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="addProfileLabel">Profile Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body py-0">
                                {/* education details start */}
                                <form className="education-form">
                                    <div className="row">
                                        <div className="col-sm-12 col-lg-12 mb-3">
                                            <label htmlFor="upload_ profile_image" className="form-label">Upload Profile Image </label>  <span className='float-end text-secondary'><small>(Upload a picture less than 100kb)</small></span>
                                            {/* <input type="file" className="form-control" id="profile_photo"
                                                name="profile_photo" onChange={handleFileChange} /> */}

                                            <div>
                                                <input type="file" id="profile_photo"
                                                    name="profile_photo" onChange={handleFileChange} />
                                                <button onClick={uploadImage}>Upload Image</button>
                                            </div>
                                        </div>


                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="first_name" className="form-label">First Name *</label>
                                                <input type="input" className="form-control" id="first_name" placeholder="Enter your First Name"
                                                    name="first_name" onChange={handleForm1Change} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                                <input type="input" className="form-control" id="last_name" placeholder="Enter your Last Name"
                                                    name="last_name" onChange={handleForm1Change} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="email" className="form-label">Email Id *</label>
                                                <input type="email" className="form-control" id="email" placeholder="Enter your Email id" name="email" onChange={handleForm1Change} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="phone_number" className="form-label">Phone Number *</label>
                                                <input type="number" className="form-control" id="phone_number" maxLength={10} placeholder="Enter your phone no." name="phone_number" onChange={handleForm1Change} />
                                            </div>
                                        </div>
                                        <div className="col-sm-6 col-lg-6 mb-3">
                                            <label htmlFor="upload_resume" className="form-label">Upload Resume</label>
                                            <input type="file"
                                                className="form-control"
                                                id="resume"
                                                name="resume"
                                                onChange={handleFileChange} />
                                            <span className='float-end text-secondary'><small>(Accepted format includes PDF, DOC & DOCX)</small></span>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="industry" className="form-label">Industry</label>

                                                <select className="form-select" id="total_experience" name="total_experience" onChange={handleIndustry}>
                                                    <option selected>Select Industry</option>
                                                    {industry && industry.length > 0 ? industry.map((ind: any, index: number) => (
                                                        <option key={index} value={ind.id}>
                                                            {ind.industry}
                                                        </option>
                                                    )) : (
                                                        <option value="">No industries available</option>
                                                    )}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="passingYear" className="form-label">Total Experience</label>
                                                <select className="form-select" id="total_experience" name="total_experience" onChange={handleForm1Change}>
                                                    <option selected>Select Years</option>
                                                    <option value="Fresher">Fresher</option>
                                                    <option value="Below 1 year">Below 1 year</option>
                                                    <option value="2 years">2 Years</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="passingYear" className="form-label"> </label>
                                                <select className="form-select mt-2">
                                                    <option selected>Select Months</option>
                                                    <option value="1 month">1 Month</option>
                                                    <option value="2 month">2 Month</option>
                                                    <option value="3 month">3 Month</option>
                                                    <option value="4 month">4 Month</option>
                                                    <option value="5 month">5 Month</option>
                                                    <option value="6 month">6 Month</option>
                                                    <option value="7 month">7 Month</option>
                                                    <option value="8 month">8 Month</option>
                                                    <option value="9 month">9 Month</option>
                                                    <option value="10 month">10 Month</option>
                                                    <option value="11 month">11 Month</option>
                                                    <option value="12 month">12 Month</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="passingYear" className="form-label">Current Location *</label>
                                                <select className="form-select" id="current_location" onChange={handleForm1Change} name="current_location">
                                                    <option selected>Select Current Location</option>
                                                    {/* <option >Hyderabad</option> */}
                                                    {countries.map((country) => (
                                                        <option key={country.id} value={country.id}>{country.name}</option>
                                                    ))}

                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="passingYear" className="form-label">Preferred Locations</label>
                                                <select className="form-select" id="preferred_location" onChange={handleForm1Change} name="preferred_location">
                                                    <option selected>Select Preferred Locations</option>
                                                    {/* <option>Bangalore</option> */}
                                                    {cities.map((city) => (
                                                        <option key={city.id} value={city.id}>{city.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="passingYear" className="form-label">Notice Period</label>
                                                <select className='form-select' onChange={handleForm1Change} id="notice_period" name="notice_period">
                                                    <option value="">Select Notice Period</option>
                                                    <option value="Immediately available">Immediately Available</option>
                                                    <option value="15 days">15 Days</option>
                                                    <option value="30 days">30 Days</option>
                                                    <option value="45 days">45 Days</option>
                                                    <option value="2 Months">2 Months</option>
                                                    <option value="3 Months">3 Months</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                {/* education details end */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="update-btn" data-bs-dismiss="modal">Update</button>
                                <button type="submit" data-bs-dismiss="modal" className="save-btn">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <form onSubmit={handleForm3Submit}>
                <div className="modal fade" id="addEducation" aria-labelledby="addEducationLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="addEducationLabel">Education Details</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* education details start */}
                                <form className="education-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="qualification" className="form-label">Qualification *</label>
                                                <select className="form-select" id="qualification" name='qualification' onChange={handleForm3Change}>
                                                    <option selected>Enter or select your qualification</option>
                                                    {Qualification.map((qualification) => {
                                                        return <option key={qualification.id} value={qualification.id}>{qualification.name}</option>
                                                    })}

                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="specialization" className="form-label">Specialization *</label>
                                                <select className="form-select" id="specialization" name='specialization' onChange={handleForm3Change}>
                                                    <option selected>Enter or select your specialization</option>
                                                    {/* Options for specializations */}
                                                    {Specialization.map((specialization) => {
                                                        return <option key={specialization.id} value={specialization.id}>{specialization.name}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label htmlFor="institute" className="form-label">Institute *</label>
                                                <select className="form-select" id="institute" name="institute" onChange={handleForm3Change}>
                                                    <option selected>Enter or select your institute</option>
                                                    {/* Options for institutes */}
                                                    {Institute.map((institute) => {
                                                        return <option key={institute.id} value={institute.id}>{institute.institute_name}</option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="gradingSystem" className="form-label">Grading system</label>
                                                <select className="form-select" id="grading_system" name='grading_system' onChange={handleForm3Change}>
                                                    <option selected>Enter or Select your Grading system</option>
                                                    <option value="Scale 10 Grading System">Scale 10 Grading System</option>
                                                    <option value="Scale 4 Grading System">Scale 4 Grading System</option>
                                                    <option value="% Marks out of 100">% Marks out of 100</option>
                                                    <option value="Course only required to pass">Course only required to pass</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="marks" className="form-label">Marks</label>
                                                <input type="number" className="form-control" id="marks" name='marks' placeholder="Enter your Marks" onChange={handleForm3Change} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="passingYear" className="form-label">Passing Year *</label>
                                                <input type="month" className='form-control' id="passing_year" name="passing_year" onChange={handleForm3Change} />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="mb-3">
                                                <label className="form-label">Education Type *</label>
                                                <div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="education_type" id="Full time" value="Full time" />
                                                        <label className="form-check-label" htmlFor="fullTime">Full time</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="education_type" id="Part time" value="Part time" />
                                                        <label className="form-check-label" htmlFor="partTime">Part time</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="education_type" id="Correspondence" value="Correspondence" />
                                                        <label className="form-check-label" htmlFor="correspondence">Correspondence</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                                {/* education details end */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <form onSubmit={handleWorkExp}>
                <div className="modal fade" id="addWorkExperiance" aria-labelledby="addWorkExperianceLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header bg-light">
                                <h5 className="modal-title" id="addWorkExperianceLabel">Work Experience</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/* work experiance start */}
                                <form className="job-form py-1">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="jobTitle" className="form-label">Current Job Title *</label>
                                                <input type="text" className="form-control" id="current_job_title" name='current_job_title' placeholder="Most recent job title"
                                                    onChange={handleForm2Change} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label htmlFor="companyName" className="form-label">Company Name *</label>
                                                <input type="text" className="form-control" id="company_name" placeholder="Most recent company" name='company_name' onChange={handleForm2Change} />
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Is This Your Current Company?</label>
                                                <div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="is_current_company" id="is_current_company" value="yes" onChange={handleForm2Change} />
                                                        <label className="form-check-label" htmlFor="currentCompanyYes">Yes</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="is_current_company" id="is_current_company" value="no" onChange={handleForm2Change} />
                                                        <label className="form-check-label" htmlFor="currentCompanyNo">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="mb-3 row">
                                                <div className="col">
                                                    <label htmlFor="startDateYear" className="form-label">Start Date</label>
                                                    <input type='date' className="form-control" id="start_date" name='start_date' onChange={handleForm2Change} />

                                                </div>
                                                <div className="col">
                                                    <label htmlFor="endDateMonth" className="form-label">End Date</label>
                                                    <input type='date' className="form-control" id="end_date" name='end_date' onChange={handleForm2Change} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="noticePeriod" className="form-label">Notice Period</label>
                                                <select className="form-select" id="noticePeriod" onChange={handleForm2Change}>
                                                    <option selected>Select your notice period</option>
                                                    {/* Options for notice period */}
                                                    <option value="Immediately available">Immediately Available</option>
                                                    <option value="15 days">15 Days</option>
                                                    <option value="30 days">30 Days</option>
                                                    <option value="45 days">45 Days</option>
                                                    <option value="2 Months">2 Months</option>
                                                    <option value="3 Months">3 Months</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Workplace</label>
                                                <div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="workplace" id="workplace" value="in_office" onChange={handleForm2Change} />
                                                        <label className="form-check-label" htmlFor="inOffice">In-Office</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="workplace" id="hybrid" value="hybrid" onChange={handleForm2Change} />
                                                        <label className="form-check-label" htmlFor="hybrid">Hybrid</label>
                                                    </div>
                                                    <div className="form-check form-check-inline">
                                                        <input className="form-check-input" type="radio" name="workplace" id="workFromHome" value="work_from_home" onChange={handleForm2Change} />
                                                        <label className="form-check-label" htmlFor="workFromHome">Work from home</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="mb-3">
                                                <label htmlFor="employmentType" className="form-label">Employment Type</label>
                                                <select className="form-select" id="employment_type" name='employment_type' onChange={handleForm2Change}>
                                                    <option selected>Select your employment type</option>
                                                    {/* Options for employment type */}
                                                    <option value="Full Time">Full Time</option>
                                                    <option value="Part Time">Part Time</option>
                                                    <option value="Internship">Internship</option>
                                                    <option value="Freelance">Freelance</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="mb-3 row">
                                                <div className="col">
                                                    <label htmlFor="salaryCurrency" className="form-label">Current Salary (Annually) *</label>
                                                    <select className="form-select" id="current_salary" name='current_salary' onChange={handleForm2Change}>
                                                        <option selected>Select a Current Salary</option>
                                                        {/* Other currency options */}
                                                        <option value="INR">Indian Rupee (INR)</option>
                                                        <option value="USD">US Dollar (USD)</option>
                                                        <option value="AED">UAE Dirham (AED)</option>
                                                    </select>
                                                </div>
                                                <div className="col">
                                                    <label htmlFor=""></label>
                                                    <input type="number" className="form-control" id="salary" placeholder="Enter your current salary" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="">
                                                <label htmlFor="description" className="form-label">Description</label>
                                                <textarea className="form-control" id="description" name='description' placeholder="Enter your description" onChange={handleForm2Change}></textarea>
                                                <small className="form-text text-muted">Max. 1000 characters</small>
                                            </div>
                                        </div>

                                    </div>
                                </form>
                                {/* work experiance end */}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" onClick={workExpUpdated} className="update-btn" data-bs-dismiss="modal">Update</button>
                                <button type="submit" data-bs-dismiss="modal" className="save-btn">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <div className="modal fade" id="addJobPreferences" aria-labelledby="addJobPreferencesLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addJobPreferencesLabel">Job Preferences</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* job prep start */}
                            <form className="job-preference-form">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="department" className="form-label">Preferred Department/Function</label>
                                            <select className="form-select" id="department" onChange={handleForm2Change}>
                                                <option>Select</option>
                                                {/* Options for departments */}
                                                {PreferredDepartmentFunction.map((preferreddepartmentfunction) => {
                                                    return <option key={preferreddepartmentfunction.id} value={preferreddepartmentfunction.id}>{preferreddepartmentfunction.preferred_departement_name}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label htmlFor="jobTitle" className="form-label">Preferred Job Title *</label>
                                            <select className="form-select" id="jobTitle" onChange={handleForm2Change}>
                                                <option>Select</option>
                                                {/* Options for job titles */}
                                                {PreferredJobTitle.map((preferredjobtitle) => {
                                                    return <option key={preferredjobtitle.id} value={preferredjobtitle.id}>{preferredjobtitle.preferredjobtitle}</option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Job Type</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jobType" id="permanent" value="Permanent" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="permanent">Permanent</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jobType" id="temporary" value="Temporary" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="temporary">Temporary/Contract</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="jobType" id="bothJobType" value="Both" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="bothJobType">Both</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Employment Type</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="employmentType" id="fullTime" value="Full time" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="fullTime">Full time</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="employmentType" id="partTime" value="Part time" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="partTime">Part time</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="employmentType" id="bothEmployment" value="Both" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="bothEmployment">Both</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Preferred Workplace</label>
                                    <div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="workplace" id="office" value="In-Office" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="office">In-Office</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="workplace" id="hybrid" value="Hybrid" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="hybrid">Hybrid</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="workplace" id="workFromHome" value="Work from home" onChange={handleForm2Change} />
                                            <label className="form-check-label" htmlFor="workFromHome">Work from home</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="location" className="form-label">Preferred Location *</label>
                                    <select className="form-select" id="location" onChange={handleForm2Change}>
                                        <option selected>Enter or select your preferred location</option>
                                        {/* Options for locations */}
                                        {cities.map((city) => (
                                            <option key={city.id} value={city.id}>{city.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="currentlyLookingFor" className="form-label">What are you currently looking for?</label>
                                    <select className="form-select" id="currentlyLookingFor" onChange={handleForm2Change}>
                                        <option selected>Select currently looking for</option>
                                        <option selected>Internship</option>
                                        <option selected>Job</option>
                                        {/* Options for what the user is currently looking for */}
                                    </select>
                                </div>
                            </form>
                            {/* job prep end */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="addSkillSet" aria-labelledby="addSkillSetLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-light">
                            <h5 className="modal-title" id="addSkillSetLabel">Job Preferences</h5>
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
    );
};

export default Profiles