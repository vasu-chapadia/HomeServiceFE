import React, { useState, useEffect } from "react";
import { Dropdown } from "primereact/dropdown";
import { Country, State, City } from "country-state-city";

import "../styles/Dropdown.css";

/**
 * Use PrimeReact library for select country
 * Use country-state-city npm package for get all country state city data
 * Use navigator.geolocation for get current location
 */

const Autocomplete = () => {
  const [selectedCountry, setSelectedCountry] = useState(null); // selected value display on dropdown placeholder
  const [position, setPosition] = useState(null); // get current latitude and longitude
  const [currentLocation, setCurrentLocation] = useState(null); // we don't get fully match value that's why we use toFixed and get nearest value
  const [options, setOptions] = useState(null); // get option for nearest curent location value

  const Countrylist = Country.getAllCountries().map((i) => i);

  const Statelist = City.getAllCities().map((i) => i);

  useEffect(() => {
    setCurrentLocation(
      City.getAllCities().filter(
        (i) =>
          parseFloat(i.latitude).toFixed(1) ===
            parseFloat(position?.latitude).toFixed(1) &&
          parseFloat(i.longitude).toFixed(1) ===
            parseFloat(position?.longitude).toFixed(1)
      )
    );

    setOptions(getLocationOption(City.getAllCities()));

    position === null &&
      navigator.geolocation.getCurrentPosition((i) => {
        setPosition({
          latitude: i.coords.latitude,
          longitude: i.coords.longitude
        });
      });
  }, [position]);

  const getLocationOption = (options) => {
    return options.filter(
      (i) =>
        parseFloat(i.latitude).toFixed(0) ===
          parseFloat(position?.latitude).toFixed(0) &&
        parseFloat(i.longitude).toFixed(0) ===
          parseFloat(position?.longitude).toFixed(0)
    );
  };

  const onCountryChange = (e) => {
    setCurrentLocation(null);
    setSelectedCountry(e.value);
  };

  return (
    <div className="dropdown-demo">
      <div className="card">
        <Dropdown
          className="countrySearch"
          value={(currentLocation && currentLocation[0]) || selectedCountry}
          options={options || [...Countrylist, ...Statelist]}
          onChange={onCountryChange}
          virtualScrollerOptions={{ itemSize: 38 }}
          optionLabel="name"
          filter
          showClear
          filterBy="name"
          placeholder="Select Location"
        />
      </div>
    </div>
  );
};
export default Autocomplete;
