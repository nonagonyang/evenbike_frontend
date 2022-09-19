/**Reuse this component for start and end */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "./SearchDocks2.css";

function SearchDocks2({ getDockOptions }) {
  let { type } = useParams();
  let navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [coord, setCoord] = useState("");
  function handleChange(address) {
    setAddress(address);
  }
  function handleSelect(address) {
    setAddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => setCoord(latLng))
      .catch((error) => console.error("Error", error));
  }
  async function handleSubmit(evt) {
    evt.preventDefault();
    await getDockOptions(coord, type);
    setCoord("");
    navigate(`/trip/docks/${type}`);
  }

  return (
    <>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="SearchDocks_Container">
            <h2>Cycling {type}:</h2>
            <div className="SearchDocks_Search">
              <input
                {...getInputProps({
                  placeholder: "Search Places ...",
                  className: "SearchDocks_SearchInput",
                })}
              />
              <button
                className="SearchDocks_SearchButton"
                onClick={handleSubmit}
              >
                <span className="material-icons">search</span>
              </button>
            </div>

            <div className="SearchDocks_Dropdown_Containter">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
}

export default SearchDocks2;
