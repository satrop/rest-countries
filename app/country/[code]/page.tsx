"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import "../../globals.scss";

import LeftArrow from "../../components/svgIcons/LeftArrowIcon";

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
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDarkMode = localStorage.getItem("darkMode") === "true";
      setDarkMode(savedDarkMode);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      return newMode;
    });
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

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
    <div className={`min-h-screen px-10 ${darkMode ? "dark" : ""}`}>

      <div className="grid gap-8 max-w-[1280px] mx-auto">

        <button onClick={() => router.back()} className="mb-8 p-2 bg-color1 rounded-[5px] flex items-center gap-2 mr-auto">
        <LeftArrow />
        Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-11 md:gap-36">
          <img
            src={country.flags.svg}
            alt={`${country.name.common} flag`}
            className="w-full h-auto object-cover overflow-hidden rounded-[10px]"
          />
          <div>
            <h1 className="text-[22px] md:text-[32px] font-extrabold mb-4 md:mb-6">{country.name.common}</h1>
            <div className="info grid grid-cols-1 md:grid-cols-2 gap-x-24">
              <section className="grid gap-y-2 mt-8 md:mt-0">
                <p><b>Native Name:</b> {Object.values(country.name.nativeName)[0].official}</p>
                <p><b>Population:</b> {country.population.toLocaleString()}</p>
                <p><b>Region:</b> {country.region}</p>
                <p><b>Sub Region:</b> {country.subregion}</p>
                <p><b>Capital:</b> {country.capital.join(", ")}</p>
              </section>
              <section className="grid gap-y-2 mt-8 md:mt-0">
                <p><b>Top Level Domain:</b> {country.tld.join(", ")}</p>
                <p><b>Currencies:</b> {Object.values(country.currencies).map((currency) => currency.name).join(", ")}</p>
                <p><b>Languages:</b> {Object.values(country.languages).join(", ")}</p>
              </section>
              <section className="flex flex-col md:flex-row md:items-center md:col-span-2 mt-[68px]">
                <b>Borders:</b>
                {country.borders ? (
                    <ul className="flex flex-wrap gap-[10px] mt-2 md:mt-0 md:ml-4">
                      {country.borders.map((border, index) => (
                        <li className="bg-color1 py-[5px] px-7 text-sm " key={index}>{border}</li>
                      ))}
                    </ul>
                  ) : "None"}

              </section>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CountryDetail;
