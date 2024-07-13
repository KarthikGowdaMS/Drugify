import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import BASE_URL from '../config';
import { AuthContext } from '../context/logincontext';
import { UsernameContext } from '../context/usernamecontext';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Profile.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Profile() {
  const [data, setData] = useState(null);
  const [drugs, setDrugs] = useState(null);
  const [greeting, setGreeting] = useState('');
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { username, setUsername } = useContext(UsernameContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const userResponse = await axios.get(BASE_URL + '/auth/user', {
          withCredentials: true,
        });

        setIsLoggedIn(userResponse.data.isLoggedIn);

        if (userResponse.data.isLoggedIn) {
          const dataResponse = await axios.get(`${BASE_URL}/auth/profile`, {
            withCredentials: true,
          });
          console.log(dataResponse.data);
          setData(dataResponse.data.user);
          const drugsResponse = await axios.get(`${BASE_URL}/drug`, {
            withCredentials: true,
          });
          console.log(drugsResponse.data);
          setDrugs(drugsResponse.data);
        }
      } catch (error) {
        setUsername('');
        setIsLoggedIn(false);
        navigate('/login');
      }
    }

    fetchData();
  }, [isLoggedIn, setIsLoggedIn, username, setUsername, navigate]);

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      setGreeting('Good Morning');
    } else if (hours < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }
  }, []);


  return (
    <div className="container mt-5 py-8">
      <div className="card mb-5">
        <div className="card-body">
          <h1 className="card-title text-center">
            {' '}
            {greeting}, {username}
          </h1>
          <hr />
          <h4 className="text-center m-3">Personal Details</h4>
          {data ? (
            <div className="profile-data">
              <div className="mb-3">
                <ul className="list-group">
                  <li className="list-group-item">
                   <strong>Name: </strong> {data.name || 'No Data'}
                  </li>
                  <li className="list-group-item">
                    <strong>Email: </strong> {data.email || 'No Data'}
                  </li>
                  <li className="list-group-item">
                    <strong>Age: </strong> {data.age || 'No Data'}
                  </li>
                  <li className="list-group-item">
                    <strong>Mobile: </strong> {data.mobile || 'No Data'}
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-center">Loading Profile.... </p>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h4 className="card-title text-center m-3">Your Drugs</h4>
          <ul className="list-group">
          {drugs ? (
        drugs.length > 0 ? (
          drugs.map((drug, drugIndex) => (
            <div key={drugIndex}>
              <div className="drug-data list-group">
                <li className="list-group-item">
                  <strong>Name: </strong> {drug.name}
                </li>
                <li className="list-group-item">
                  <strong>Description: </strong> {drug.description}
                </li>
                <li className="list-group-item">
                  <strong>Ingredients: </strong> {drug.ingredients.join(', ')}
                </li>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No Data</p>
        )
      ) : (
        <p className="text-center">Loading Drugs.... </p>
      )}
          </ul>
        </div>
      </div>
    </div>
  );
}
