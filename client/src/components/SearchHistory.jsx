// src/components/SearchHistory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DrugInfo from './DrugInfo'; // Adjust the import path as necessary
import BASE_URL from '../config';
import '../css/Search.css';
const SearchHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/search/history`,
          {withCredentials:true}
        );
        console.log(response.data.results)
        setHistory(response.data.results);
      } catch (error) {
        console.error("Error fetching search history", error);
      }
      finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className='container mt-5 py-8'>
      <h1 className='text-center mb-5 title'>Search History</h1>
      {loading ? (
      <p className='text-center'>Loading...</p>
    ) : history.length > 0 ? (
      history.map((item, index) => (
        <DrugInfo key={index} drug={item} />
      ))
    ) : (
      <p className='text-center'>No Data</p>
    )}
    </div>
  );
};

export default SearchHistory;
