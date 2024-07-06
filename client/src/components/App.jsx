import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/logincontext';
import { UsernameProvider } from '../context/usernamecontext';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import AddAdditionalData from './AddAdditionalData';
// import Profile from './Profile';
// import Header from './Header';
// import Dashboard from './Dashboard';
import {Alert} from './Alert';

function App() {
  const [alert, setalert] = useState(null);
  function showAlert(message, type) {
    setalert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  }

  return (
    <>
      <Router>
        <AuthProvider>
          <UsernameProvider>
            {/* <Header /> */}
            <Alert alert={alert} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exact
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
              {/* <Route exact path="/search" element={<Search />} /> */}
              {/* <Route exact path="/profile/:username" element={<Profile />} /> */}
              <Route
                exact
                path="/addAccountData"
                element={<AddAdditionalData showAlert={showAlert}/>}
              />
              
            </Routes>
          </UsernameProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
