/**Show list of docks with visual clue */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ListOfDocks.css";

function ListOfDocks({ dockOptions, updateStartDock, updateEndDock }) {
  let navigate = useNavigate();
  let { type } = useParams();
  const [select, setSelect] = useState("");

  function handleChange(evt) {
    setSelect(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (type === "from") {
      updateStartDock(select);
      navigate(`/trip/select/to`);
    } else {
      updateEndDock(select);
      navigate("/trip/preview");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <label htmlFor="select">Select a Dock</label>
        <select name="select">
          {dockOptions.map((dock, index) => {
            return (
              <option
                key={dock.id}
                value={[
                  dock.id,
                  dock.name,
                  parseFloat(dock.occupancy).toFixed(2),
                  dock.lat,
                  dock.lon,
                  dock.numBikes,
                ]}
                className="dockOption"
              >
                {dock.name}
                {dock.numBikes} bikes available
                {parseFloat(dock.occupancy).toFixed(2)}
              </option>
            );
          })}
        </select>
        <button>Next</button>
      </form>
    </>
  );
}

export default ListOfDocks;
