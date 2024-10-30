import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './sideMenu.scss'

const SideMenu = () => {
    // const [isMenuOpen, setIsMenuOpen] = useState(true);

    // const toggleMenu = () => {
    //     setIsMenuOpen(!isMenuOpen);
    // };
    // interface SidebarProps {
    //     isVisible: boolean;
    // }


    // const [isSidebarVisible, setIsSidebarVisible] = useState<boolean>(true);

    // const toggleSidebar = () => {
    //     setIsSidebarVisible(!isSidebarVisible);
    // };

    // interface SidebarProps {
    //     isSidebarVisible: boolean;
    // }

    const [activeLink, setActiveLink] = useState('dashboard');
    const [profileImage, setProfileImage] = useState<string | null>(null)

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            const imgUrl = URL.createObjectURL(file)
            setProfileImage(imgUrl)
        }

    }


    return (
        <main className='side-main'>
            {/* <div className={` bg-dark text-white ${isSidebarVisible ? 'show' : 'hide'}`}
                style={{ width: isSidebarVisible ? '250px' : '0' }}> */}
            <div>
                
                <div className="comp-logo-sec text-center pt-2">
                    {/* <input type="file" className='amdin-pic' accept='image/*' onChange={handleImageUpload} /> */}
                    <img src={profileImage || window.location.origin + '/images/default-logo.png'} className='comp-logo' />
                    
                    <h6 className="px-2 mt-3">Unique Maind Solutions</h6>
                </div>
                <ul className="list-unstyled p-3">
                    <li className="">
                        <Link to="dashboard" className={`nav-link ${activeLink === 'dashboard' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('dashboard')}><i className="bi bi-speedometer2"></i> Dashboard</Link>
                    </li>
                    <li className="">
                        <Link to="myprofile" className={`nav-link ${activeLink === 'myprofile' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('myprofile')}><i className="bi bi-person"></i> My Profile</Link>
                    </li>
                    <li className="">
                        <Link to="my-jobs" className={`nav-link ${activeLink === 'my-jobs' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('my-jobs')}><i className="bi bi-person-vcard"></i> My Jobs </Link>
                    </li>
                    {/* <li className="">
                        <Link to="messages" className={`nav-link ${activeLink === 'messages' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('messages')}><i className="bi bi-chat-left-text"></i> Messages </Link>
                    </li> */}
                    <li className="">
                        <Link to="submit-job" className={`nav-link ${activeLink === 'submit-job' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('submit-job')}><i className="bi bi-send-check"></i> Submit Job </Link>
                    </li>
                    {/* <li className="">
                        <Link to="posted-job" className={`nav-link ${activeLink === 'posted-job' ? 'active' : ''}`}
                        onClick={() => handleLinkClick('posted-job')}><i className="bi bi-send-check"></i> Posted Jobs </Link>
                    </li> */}
                    <li className="">
                        <Link to="candidates" className={`nav-link ${activeLink === 'candidates' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('candidates')}><i className="bi bi-floppy"></i> Candidates </Link>
                    </li>
                    <li className="">
                        <Link to="saved-candidate" className={`nav-link ${activeLink === 'saved-candidate' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('saved-candidate')}><i className="bi bi-floppy"></i> Saved Candidate </Link>
                    </li>
                    <li className="">
                        <Link to="account-setting" className={`nav-link ${activeLink === 'account-setting' ? 'active' : ''}`}
                            onClick={() => handleLinkClick('account-setting')}><i className="bi bi-gear"></i> Account Settings </Link>
                    </li>
                </ul>
            </div>
        </main>
    )
}

export default SideMenu;