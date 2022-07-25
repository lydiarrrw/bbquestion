import React, { useState } from "react";
import axios from "axios";

export default function Location() {
  const [location, updateLocation] = useState([]);
  const [locationChoice, updateLocationChoice] = useState([]);
  const [weather, updateWeather] = useState([]);
  // const [favePlaces, updateFavePlaces] = useState([]);
  const [windWeather, updateWindWeather] = useState("?");
  const [uvWeather, updateUvWeather] = useState("");
  const [rainWeather, updateRainWeather] = useState("");
  const [isActive, setActive] = useState(false);

  function getLocation(searchValue) {
    axios
      .get(
        `https://api.weatherapi.com/v1/search.json?key=${process.env.weather_api}&q=${searchValue}`
      )
      .then((resp) => {
        updateLocationChoice(resp.data);
      });
  }

  function locationList(locationSelect) {
    // get items from object in an array
    // push those to an array
    for (var i = 0; i < locationSelect.length; i++) {
      locationsListArray.push(locationSelect[i].name);
    }
    return locationsListArray;
  }

  let locationsListArray = [];
  function locationList(locationSelect) {
    // get items from object in an array
    // push those to an array
    for (var i = 0; i < locationSelect.length; i++) {
      locationsListArray.push(locationSelect[i].name);
    }
    return locationsListArray;
  }

  function timeToBbq(windSpeed, uv, rain) {
    if (windSpeed >= "20") {
      updateWindWeather("No");
    } else {
      updateWindWeather("Yes");
    }

    if (uv >= "3") {
      updateUvWeather("");
    } else {
      updateUvWeather("Don't forget suncream");
    }

    if (rain >= "1") {
      updateRainWeather("Take an umbrella");
    } else {
      updateRainWeather("");
    }
  }

  function inputClick(text) {
    getLocation(text);
    setActive(false);
  }

  function chooseLocation(place) {
    //api get for weather in that location/display weather
    //clear get location .. and input .. clear to do
    axios
      .get(
        `https://api.weatherapi.com/v1/current.json?key=${process.env.weather_api}&q=${place}&aqi=no`
      )
      .then(({ data }) => {
        updateLocation(data.location);
        updateWeather(data.current);
        timeToBbq(weather.wind_kph, weather.uv, weather.precip_mm);
        setActive(true);
      });
  }

  //set array and place to empty
  locationList(locationChoice);

  return (
    <section className="location">
      {/* <button>Celsius</button>
      <button>Farenheit</button> */}
      <input
        onChange={(event) => inputClick(event.target.value)}
        placeholder="Start typing your location here..."
      ></input>
      <ul className={isActive ? "location-choices-empty" : "location-choices"}>
        {locationsListArray.map((place) => {
          return (
            <li
              key={place}
              onClick={(event) => chooseLocation(event.target.innerText)}
              className="location-button"
            >
              <button>{place}</button>
            </li>
          );
        })}
      </ul>
      <h2 className="location-name">{location.name}</h2>
      <h3>{windWeather}</h3>
      <div className="weather-info">
        <p className={isActive ? "weather-temperature" : null}>
          Temperature: {weather.feelslike_c}
        </p>
        <p>{uvWeather}</p>
        <p>{rainWeather}</p>
      </div>
    </section>
  );
}
