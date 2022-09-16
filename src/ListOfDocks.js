/**Show list of docks with visual clue */
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ListOfDocks.css";
import Button from "@mui/material/Button";

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
      <h3>Choose A Greener Dock to Earn More Eco Points</h3>
      <div className="Docks_Container">
        <form
          onSubmit={handleSubmit}
          onChange={handleChange}
          className="Docks_Form"
        >
          {dockOptions.map((dock, index) => {
            return (
              <div className={index < 3 ? "Docks_Green" : "Docks"} key={index}>
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
      </div>
    </>
  );
}

export default ListOfDocks;
