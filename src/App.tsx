import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './login';
import Dashboard from './Admin/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Admin';
import MyProfile from './Admin/MyProfile';
import SavedCandidate from './Admin/SavedCandidate';
import MyJobs from './Admin/MyJobs';
import Messages from './Admin/Messages';
import SubmitJob from './Admin/SubmitJob';
import AccountSetting from './Admin/AccountSetting';
import RegisterAdmin from './Register';
import Candidates from './Admin/Candidates';
import SeekerDashboard from './JobSeeker/SeekerDashboard';
import ViewJobs from './Admin/ViewJobs';
import JobSeekerAdmin from './JobSeeker';
import ViewJobDetails from './JobSeeker/SeekerDashboard/ViewJobDetails';
import Profiles from './JobSeeker/Profile';
import AppliedJobs from './JobSeeker/AppliedJobs';
import SavedJobs from './JobSeeker/SavedJobs';
import Setting from './JobSeeker/Settings';
import ChangePassword from './JobSeeker/ChangePassword';





// const publicRoutes = [
//   { path: '/', component: Admin },
//   { path: 'dashboard', component: Dashboard },
//   { path: 'myprofile', component: MyProfile },
//   { path: 'sumitjobs', component: SubmitJobs },
// ]

function App() {

  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Admin />} />
          {publicRoutes.map(({ path, component: Component }) => (
            <Route key={'path-' + path} path={path} element={<Component />} />
          ))}
        </Routes>
      </BrowserRouter> */}

      <Router>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<RegisterAdmin />} />
          <Route path="/" element={<Admin />}>
            <Route path="dashboard" index element={<Dashboard />} />
            <Route path="myprofile/" element={<MyProfile />} />
            <Route path="saved-candidate" element={<SavedCandidate />} />
            <Route path="my-jobs" element={<MyJobs />} />
            <Route path="messages" element={<Messages />} />
            <Route path="submit-job/" element={<SubmitJob />} />
            <Route path="submit-job/:id/:mode/" element={<SubmitJob />} />
            <Route path="account-setting" element={<AccountSetting />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="my-jobs/view-jobs" element={<ViewJobs />} />
          </Route>

          <Route>
            <Route path='' element={<JobSeekerAdmin/>}>
              <Route path='seeker-dashboard' element={<SeekerDashboard/>}/>
              <Route path='/view-job-details/:jobId' element={<ViewJobDetails/>}/>
              <Route path='profile' element={<Profiles/>}/>
              <Route path='applied-jobs' element={<AppliedJobs/>}/>
              <Route path='saved-jobs' element={<SavedJobs saveJobsData={[]} />}/>
              <Route path='settings' element={<Setting/>}/>
              <Route path='change-password' element={<ChangePassword/>}/>
            </Route>
          </Route>
        </Routes>
      </Router>      
    </>
  );
}

export default App;
