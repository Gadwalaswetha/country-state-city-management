import React, { useState } from 'react';
import './App.css';
function App() {
  const initialData = [
    {
      name: 'United States',
      states: [
        { name: 'California', cities: ['Los Angeles', 'San Francisco', 'San Diego'] },
        { name: 'Texas', cities: ['Houston', 'Austin', 'Dallas'] },
        { name: 'New York', cities: ['New York City', 'Buffalo', 'Rochester'] },
      ],
    },
    {
      name: 'India',
      states: [
        { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur'] },
        { name: 'Karnataka', cities: ['Bengaluru', 'Mysuru', 'Mangalore'] },
        { name: 'Delhi', cities: ['New Delhi'] },
      ],
    },
  ];

  const [countries, setCountries] = useState(initialData);
  const [selectedCountryIndex, setSelectedCountryIndex] = useState(null);

  // Add Country
   const addCountry = () => {
    const countryName = prompt('Enter country name:');
    if (countryName) {
      setCountries([...countries, { name: countryName, states: [] }]);
    }
  };

  // Edit Country
  const editCountry = (countryIndex) => {
    const updatedName = prompt('Edit country name:', countries[countryIndex].name);
    if (updatedName) {
      if (window.confirm('Are you sure you want to update this country name?')) {
        const updatedCountries = [...countries];
        updatedCountries[countryIndex].name = updatedName;
        setCountries(updatedCountries);
      }
    }
  };

  // Delete Country
  const deleteCountry = (countryIndex) => {
    if (window.confirm('Are you sure you want to delete this country and all its states and cities?')) {
      const updatedCountries = [...countries];
      updatedCountries.splice(countryIndex, 1);
      setCountries(updatedCountries);
      setSelectedCountryIndex(null);
    }
  };

  // Add State
  const addState = () => {
    if (selectedCountryIndex !== null) {
      const stateName = prompt('Enter state name:');
      if (stateName) {
        const updatedCountries = [...countries];
        updatedCountries[selectedCountryIndex].states.push({ name: stateName, cities: [] });
        setCountries(updatedCountries);
      }
    } else {
      alert('Please select a country first!');
    }
  };

  // Edit State
  const editState = (stateIndex) => {
    const updatedName = prompt('Edit state name:', countries[selectedCountryIndex].states[stateIndex].name);
    if (updatedName) {
      if (window.confirm('Are you sure you want to update this state name?')) {
        const updatedCountries = [...countries];
        updatedCountries[selectedCountryIndex].states[stateIndex].name = updatedName;
        setCountries(updatedCountries);
      }
    }
  };

  // Delete State
  const deleteState = (stateIndex) => {
    if (window.confirm('Are you sure you want to delete this state and all its cities?')) {
      const updatedCountries = [...countries];
      updatedCountries[selectedCountryIndex].states.splice(stateIndex, 1);
      setCountries(updatedCountries);
    }
  };

  // Add City
  const addCity = (stateIndex) => {
    const cityName = prompt('Enter city name:');
    if (cityName) {
      const updatedCountries = [...countries];
      updatedCountries[selectedCountryIndex].states[stateIndex].cities.push(cityName);
      setCountries(updatedCountries);
    }
  };

  // Delete City
  const deleteCity = (stateIndex, cityIndex) => {
    if (window.confirm('Are you sure you want to delete this city?')) {
      const updatedCountries = [...countries];
      updatedCountries[selectedCountryIndex].states[stateIndex].cities.splice(cityIndex, 1);
      setCountries(updatedCountries);
    }
  };

  return (
    <div className="app-container">
      <h1 className="text-3xl font-bold text-center mb-6 text-white shadow-lg">🌍 Country, State, and City Management</h1>
      <button onClick={addCountry} className="btn-add-country">➕ Add Country</button>
      <div className="country-container">
        {countries.map((country, countryIndex) => (
          <div key={countryIndex} className="country-card">
            <h3 className="country-title">
              {country.name}
              <button onClick={() => editCountry(countryIndex)} className="btn-edit">Edit</button>
              <button onClick={() => deleteCountry(countryIndex)} className="btn-delete">Delete</button>
              <button onClick={() => setSelectedCountryIndex(countryIndex)} className="btn-manage">📍 Manage States</button>
            </h3>
            {selectedCountryIndex === countryIndex && (
              <div className="state-container">
                <button onClick={addState} className="btn-add-state">➕ Add State</button>

                {country.states.map((state, stateIndex) => (
                  <div key={stateIndex} className="state-card">
                    <h4 className="state-title">
                      {state.name}
                      <button onClick={() => editState(stateIndex)} className="btn-edit">Edit</button>
                      <button onClick={() => deleteState(stateIndex)} className="btn-delete">Delete</button>
                      <button onClick={() => addCity(stateIndex)} className="btn-add-city">➕ Add City</button>
                    </h4>
                    <ul className="city-list">
                      {state.cities.map((city, cityIndex) => (
                        <li key={cityIndex} className="city-item">
                          {city}
                          <button onClick={() => deleteCity(stateIndex, cityIndex)} className="btn-delete-city">🗑️</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
