import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Countries from './components/Countries';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [countrie, setSearchCountry] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v3.1/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    const newCountries = countries.filter((element) => {
      const country = element.name.common.toLowerCase();
      return country.includes(countrie.toLowerCase());
    });
    setFilteredCountries(newCountries);
  }, [countrie, countries]);

  const searchCountry = (event) => {
    setSearchCountry(event.target.value);
  };

  return (
    <div>
      <Search country={countrie} search={searchCountry} />
      <Countries countries={filteredCountries} />
    </div>
  );
}

export default App;