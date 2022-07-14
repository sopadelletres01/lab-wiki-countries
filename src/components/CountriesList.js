import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function CountriesList({ countries }) {
  console.log(countries);

  return (
    <div className="col-5" style={{ maxHeight: '90vh', overflow: 'scroll' }}>
      <div className="list-group">
        {countries &&
          countries.map((country) => {
            return (
              <Link
                style={{display: "flex",flexDirection:"column",alignItems:"center"}}
                key={country.alpha3Code}
                className="list-group-item list-group-item-action"
                to={`/${country.alpha3Code}`}
              >
                  <img
                  width={"auto"}
                  height={50}
                    src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                  ></img>
                  {country.name.common}
              </Link>
            );
          })}

        <Link
          className="list-group-item list-group-item-action active"
          to="/FRA"
        >
          🇫🇷 France
        </Link>
      </div>
    </div>
  );
}

export default CountriesList;
