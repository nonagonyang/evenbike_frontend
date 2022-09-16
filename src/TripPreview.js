import { useNavigate, useParams } from "react-router-dom";

function TripPreview({ startDock, endDock, tripOngoing }) {
  let navigate = useNavigate();

  function calculateEcoPoints(startDock, endDock) {
    const startOccupancy = startDock.match(/[0-9]+$/);
    const endOccupancy = endDock.match(/[0-9]+$/);
    const num =
      parseFloat(startOccupancy[0]) - parseFloat(endOccupancy[0]) > 0
        ? parseFloat(startOccupancy[0]) - parseFloat(endOccupancy[0])
        : 0;
    return num;
  }

  return (
    <>
      <h3>Trip Preview</h3>
      <p>From: {startDock.split(",")[1]} </p>{" "}
      <button
        onClick={() => {
          navigate(`/trip/select/from`);
        }}
      >
        edit
      </button>
      <p>To: {endDock.split(",")[1]}</p>{" "}
      <button
        onClick={() => {
          navigate(`/trip/select/to`);
        }}
      >
        edit
      </button>
      <p>
        Eco_points:
        {startDock && endDock ? calculateEcoPoints(startDock, endDock) : ""}
      </p>
      <button
        onClick={() => {
          navigate("/trip/scan");
        }}
      >
        Scan a QR code to start the trip
      </button>
    </>
  );
}

export default TripPreview;
