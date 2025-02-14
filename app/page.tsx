"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import dynamic from "next/dynamic";
import "./globals.scss";
import { SingleValue } from "react-select";
import Search from "./components/Search/Search";

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
      <div className="grid gap-8">
        <div className="container flex gap-4 justify-between items-center max-w-[1280px] mx-auto h-[46px] lg:h-14">
          <Search search={search} setSearch={setSearch} darkMode={darkMode} />
          <Select
            value={regionOptions.find(option => option.value === region)}
            onChange={(newValue) => setRegion((newValue as SingleValue<RegionOption>)?.value || "")}
            options={regionOptions}
            className={`w-full transition duration-300 h-full max-w-[224px] custom-react-select ${darkMode ? "dark-mode" : "light-mode shadow-xl"}`}
            classNamePrefix="react-select"
            isSearchable={true}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1280px] mx-auto">
          {filteredCountries.map((country) => (
            <Link href={`/country/${country.cca3}`} key={country.cca3} className="rounded-[5px] overflow-hidden shadow hover:shadow-xl transition bg-color1">
              <img
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h2 className="text-lg font-bold mb-4">{country.name.common}</h2>
                <p className="">Population: {country.population.toLocaleString()}</p>
                <p className="">Region: {country.region}</p>
                <p className="">Capital: {country.capital ? country.capital.join(", ") : "N/A"}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
