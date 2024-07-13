import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '../context/logincontext';
import { UsernameProvider } from '../context/usernamecontext';
import Login from './Login';
import Signup from './Signup';
import Landing from './Landing';
import AddAdditionalData from './AddAdditionalData';
import Profile from './Profile';
import Search from './Search';
import Header from './Header';
import { Alert } from './Alert';
import AddDrug from './AddDrug';
import SearchHistory from './SearchHistory';

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
            <Header />
            <Alert alert={alert} />
            <Routes>
              <Route exact path="/" element={<Landing />} />
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
              <Route
                exact
                path="/search"
                element={<Search showAlert={showAlert} />}
              />

              <Route
                exact
                path="/search/history"
                element={<SearchHistory showAlert={showAlert} />}
              />

              <Route
                exact
                path="/profile"
                element={<Profile showAlert={showAlert} />}
              />
              <Route
                exact
                path="/addAccountData"
                element={<AddAdditionalData showAlert={showAlert} />}
              />
              <Route
                exact
                path="/drug/add"
                element={<AddDrug showAlert={showAlert} />}
              />
            </Routes>
          </UsernameProvider>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
