import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import Spinner from './Spinner';

function CountryDetails({}) {
  const { id } = useParams();
  const [country, setCountry] = useState();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    (async () => {
			try{
				setIsLoading(true);
				const data = await fetch(
					`https://ih-countries-api.herokuapp.com/countries/${id}`,
					{signal:signal}
				);
				const json = await data.json();
	
				let borders = [];
				for (const border of json.borders) {
					const country = await fetch(
						`https://ih-countries-api.herokuapp.com/countries/${border}`,
						{signal:signal}
					);
					const json = await country.json();
					borders.push(json);
				}
				console.log('JSON', json);
				setCountry({ ...json, borders });
				setIsLoading(false);

			}catch(e){
				if(e.name === "AbortError"){
					console.dir(e)
				}
			}
    })();

    return () => {
      controller.abort();
    };
  }, [id]);

  const renderBorders = () => {
    return country.borders.map((border) => {
      return (
        <li>
          <Link to={`/${border.alpha3Code}`}>{border.name.common}</Link>
        </li>
      );
    });
  };

  return (
    <div className="col-7">
      {!isLoading ? (
        <>
          {country && (
            <>
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
              ></img>
              <h1>{country.name.common}</h1>
              <table className="table">
                <thead></thead>
                <tbody>
                  <tr>
                    <td style={{ width: '30%' }}>Capital</td>
                    <td>{country.capital[0]}</td>
                  </tr>
                  <tr>
                    <td>Area</td>
                    <td>
                      {country.area} km
                      <sup>2</sup>
                    </td>
                  </tr>
                  <tr>
                    <td>Borders</td>
                    <td>
                      <ul>{renderBorders()}</ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default CountryDetails;
