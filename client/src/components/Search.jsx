// src/components/SearchPage.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DrugForm from './DrugForm';
import DrugInfo from './DrugInfo';
import BASE_URL from '../config';
import '../css/Search.css';
import { AuthContext } from '../context/logincontext';
import { UsernameContext } from '../context/usernamecontext';
const SearchPage = () => {
  const [drug, setDrug] = useState(null);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Step 1: Add isLoading state
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { username, setUsername } = useContext(UsernameContext);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await axios.get(`${BASE_URL}/auth/user`, {
          withCredentials: true,
        });
        setUsername(user.data.username);
        setIsLoggedIn(user.data.isLoggedIn);
      } catch (error) {
        console.error('Error fetching user information', error);
      }
    }
    fetchData();
  }, [setIsLoggedIn, setUsername]);

  const handleSearch = async (drugName) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/search/drug/${drugName}`, {
        withCredentials: true,
      });
      console.log(response.data);
      setDrug(response.data.response);
      setMessage('');
    } catch (error) {
      console.error('Error fetching the drug information', error);
      setMessage('Drug Information not found');
      setDrug(null);
    } finally {
      setIsLoading(false); // Step 3: Set loading to false once search is complete
    }
  };

  return (
    <div className="container py-8 mt-5">
      <h1 className="text-center title">Know Your Drug</h1>
      <DrugForm onSearch={handleSearch} isSearching={isLoading} />
      {isLoading ? (
        <p className="text-center text-lg">Searching...</p>
      ) : (
        <DrugInfo drug={drug} message={message} />
      )}
    </div>
  );
};

export default SearchPage;
