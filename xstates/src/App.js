// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [stateDisabled, setStateDisabled] = useState(true);
  const [cityDisabled, setCityDisabled] = useState(true);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch('https://crio-location-selector.onrender.com/countries');
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchStates = async (countryName) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/states`);
      const data = await response.json();
      setStates(data);
      setStateDisabled(false); // Enable state dropdown after fetching states
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async (countryName, stateName) => {
    try {
      const response = await fetch(`https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`);
      const data = await response.json();
      setCities(data);
      setCityDisabled(false); // Enable city dropdown after fetching cities
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCountryChange = (event) => {
    const countryName = event.target.value;
    setSelectedCountry(countryName);
    setSelectedState('');
    setSelectedCity('');
    setStateDisabled(true); // Disable state dropdown when changing country
    setCityDisabled(true); // Disable city dropdown when changing country
    fetchStates(countryName);
  };

  const handleStateChange = (event) => {
    const stateName = event.target.value;
    setSelectedState(stateName);
    setSelectedCity('');
    setCityDisabled(true); // Disable city dropdown when changing state
    fetchCities(selectedCountry, stateName);
  };

  const handleCityChange = (event) => {
    const cityName = event.target.value;
    setSelectedCity(cityName);
  };

  return (
    <div className="container">
      <h1>Select Location</h1>
      <div className="dropdown-container">
        <select value={selectedCountry} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <select value={selectedState} onChange={handleStateChange} disabled={stateDisabled}>
          <option value="" disabled>Select State</option>
          {states.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        <select value={selectedCity} onChange={handleCityChange} disabled={cityDisabled}>
          <option value="" disabled>Select City</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>
      {selectedCity && (
        <p><strong className="bold">You selected {selectedCity}</strong>, {selectedState}, {selectedCountry}</p>
      )}
    </div>
  );
}

export default App;
