import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import React, { useEffect, useState } from 'react';

function App() {
  const [countries, setCountries] = useState();

  useEffect(() => {
    (async () => {
      const data = await fetch(
        'https://ih-countries-api.herokuapp.com/countries'
      );
      const json = await data.json();
      console.log('JSON', json);
      setCountries(json);
    })();

    return () => {};
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <div className="row">
          <CountriesList countries={countries} />
          <Routes>
            <Route path="/:id" element={<CountryDetails />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
export default App;
