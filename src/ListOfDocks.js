/**Show list of docks with visual clue */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ListOfDocks.css";
import Button from "@mui/material/Button";
import MyMap from "./Map";

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

  const docks = dockOptions.map((dock) => {
    return {
      position: { lat: parseFloat(dock.lat), lng: parseFloat(dock.lon) },
      name: dock.name,
    };
  });

  return (
    <>
      <div className="grid">
        <aside>
          <h3>Choose A Greener Dock to Earn More Eco Points</h3>
          <form onSubmit={handleSubmit} onChange={handleChange}>
            {dockOptions.map((dock, index) => {
              return (
                <div
                  key={index}
                  className={index < 3 ? "Docks_Green" : "Docks"}
                >
                  <input
                    type="radio"
                    id={index}
                    name="dock"
                    value={[
                      dock.id,
                      dock.name,
                      parseFloat(dock.occupancy).toFixed(2),
                      dock.lat,
                      dock.lon,
                      dock.numBikes,
                    ]}
                  ></input>
                  &nbsp; &nbsp;
                  <label htmlFor={dock.name}>
                    {dock.name}
                    &nbsp; &nbsp;
                    <span className="material-icons">directions_bike</span>
                    &nbsp;&nbsp;
                    {parseFloat(dock.occupancy).toFixed(2)}
                  </label>
                  <br></br>
                </div>
              );
            })}

            <br></br>
            <Button
              onClick={handleSubmit}
              variant="contained"
              className="Docks_Button"
            >
              Next
            </Button>
          </form>
        </aside>
        <article>
          <MyMap docks={docks} />
        </article>
      </div>
    </>
  );
}

export default ListOfDocks;
