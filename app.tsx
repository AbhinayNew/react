import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Login from '../Login/login.tsx';
import Register from '../Login/register.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDataList from './userData.tsx';
import UserInfo from './userInfo.tsx';
import './app.css';
import MyComponent from './fetchData.tsx';

function App() {
  return (
    <Router>
      <div className="full-screen">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="container">
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">

              <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
                    to="/sign-up">
                    Sign up
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
                    to="/sign-in">
                    Login
                  </NavLink>
                </li>
      
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
                    to="/userData">
                    UserData
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
                    to="/userInfo/:userId">
                    UserInfo
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink 
                    className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} 
                    to="/sampleTest">
                    UserFetch
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-6">
          <div className="auth-inner">
            <Routes>
            <Route path="/sign-up" element={<Register />} />
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
          
              <Route path="/userData" element={<UserDataList />} />
              <Route path="/userInfo/:userId" element={<UserInfo />} />
              <Route path="/sampleTest" element={<MyComponent />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
