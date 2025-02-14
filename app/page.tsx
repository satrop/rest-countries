"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import "./globals.scss";
import { SingleValue } from "react-select";

const Select = dynamic(() => import("react-select"), { ssr: false });

interface Country {
  cca3: string;
  name: {
    common: string;
  };
  flags: {
    svg: string;
  };
  population: number;
  region: string;
  capital?: string[];
}

interface RegionOption {
  value: string;
  label: string;
}

const regionOptions: RegionOption[] = [
  { value: "", label: "Filter by Region" },
  { value: "Africa", label: "Africa" },
  { value: "Americas", label: "Americas" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
];

const Home = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [search, setSearch] = useState<string>("");
  const [region, setRegion] = useState<string>("");
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
    const fetchCountries = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const filteredCountries = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(search.toLowerCase()) &&
      (region ? country.region === region : true)
  );

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>

      <header className="mb-8 bg-color1 shadow-xl transition duration-300">
        <div className="container h-20 flex justify-between items-center max-w-[1280px] mx-auto">
          <h1 className="text-2xl font-bold">Where in the world?</h1>
          <button
            onClick={toggleDarkMode}
            className="light-dark-toggle flex items-center"
          >
            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.5532 11.815C8.66857 11.815 5.51929 8.92783 5.51929 5.36821C5.51929 4.0253 5.96679 2.78158 6.73143 1.75C3.69036 2.69515 1.5 5.33122 1.5 8.43807C1.5 12.3385 4.94929 15.5 9.20357 15.5C12.5929 15.5 15.4696 13.4932 16.5 10.7045C15.375 11.4048 14.0161 11.815 12.5532 11.815Z" fill="transparent" stroke="white" strokeWidth="1.25"/>
            </svg>

            <span className="ml-2">{darkMode ? "Dark Mode" : "Light Mode"}</span>
          </button>
        </div>
      </header>

      <div className="grid gap-8">

        <div className="container flex gap-4 justify-between items-center max-w-[1280px] mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search for a country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-color1 flex justify-center p-2 rounded w-full transition duration-300 pr-10"
            />
          </div>
          <Select
            value={regionOptions.find(option => option.value === region)}
            onChange={(newValue) => setRegion((newValue as SingleValue<RegionOption>)?.value || "")}
            options={regionOptions}
            className="w-full transition duration-300"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1280px] mx-auto">
          {filteredCountries.map((country) => (
            <Link href={`/country/${country.cca3}`} key={country.cca3} className="border p-4 rounded shadow hover:shadow-lg transition">
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="w-full h-32 object-cover mb-4"
              />
              <h2 className="text-lg font-bold">{country.name.common}</h2>
              <p className="">Population: {country.population.toLocaleString()}</p>
              <p className="">Region: {country.region}</p>
              <p className="">Capital: {country.capital ? country.capital.join(", ") : "N/A"}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
