"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

interface Country {
  flags: {
    svg: string;
  };
  name: {
    common: string;
    nativeName: { [key: string]: { official: string } };
  };
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld: string[];
  currencies: { [key: string]: { name: string } };
  languages: { [key: string]: string };
  borders: string[];
}

const CountryDetail = () => {
  const router = useRouter();
  const { code } = useParams();
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    if (code) {
      const fetchCountry = async () => {
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${code}`
        );
        setCountry(response.data[0]);
      };
      fetchCountry();
    }
  }, [code]);

  if (!country) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8">
      <button onClick={() => router.back()} className="mb-8 p-2 bg-gray-200 dark:bg-gray-800 rounded">
        Back
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <img
          src={country.flags.svg}
          alt={`${country.name.common} flag`}
          className="w-full h-64 object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold mb-4">{country.name.common}</h1>
          <p>Native Name: {Object.values(country.name.nativeName)[0].official}</p>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
          <p>Sub Region: {country.subregion}</p>
          <p>Capital: {country.capital.join(", ")}</p>
          <p>Top Level Domain: {country.tld.join(", ")}</p>
          <p>Currencies: {Object.values(country.currencies).map((currency) => currency.name).join(", ")}</p>
          <p>Languages: {Object.values(country.languages).join(", ")}</p>
          <p>Borders: {country.borders ? country.borders.join(", ") : "None"}</p>
        </div>
      </div>
    </div>
  );
};

export default CountryDetail;
