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
            <Route path="myprofile" element={<MyProfile />} />
            <Route path="saved-candidate" element={<SavedCandidate />} />
            <Route path="my-jobs" element={<MyJobs />} />
            <Route path="messages" element={<Messages />} />
            <Route path="submit-job" element={<SubmitJob />} />
            <Route path="account-setting" element={<AccountSetting />} />
            <Route path="candidates" element={<Candidates />} />
            <Route path="my-jobs/view-jobs" element={<ViewJobs />} />
          </Route>

          <Route>
            <Route path='/seeker-dashboard' element={<SeekerDashboard/>}/>
          </Route>
        </Routes>
      </Router>      
    </>
  );
}

export default App;
