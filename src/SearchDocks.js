/**Reuse this component for start and end */
/**Has Google Address Auto Complete feature */

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SearchDocks({ getDockOptions }) {
  let { type } = useParams();
  let navigate = useNavigate();
  const [search, setSearch] = useState("");
  const handleSubmit = (evt) => {
    evt.preventDefault();
    getDockOptions(search, type);
    setSearch("");
    navigate(`/trip/docks/${type}`);
  };

  const handleChange = (evt) => {
    setSearch(evt.target.value);
  };

  return (
    <>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <label htmlFor="search"> Search</label>
        <input type="text" name="search" placeholder="geo_coordinates"></input>
        <button>Next</button>
      </form>
    </>
  );
}

export default SearchDocks;
