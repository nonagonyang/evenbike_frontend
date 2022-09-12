import { useNavigate } from "react-router-dom";
function TripStart({ currentTrip, endDock, tripEnd, updateCurrentTrip }) {
  let navigate = useNavigate();
  async function handleTripEnd(evt) {
    evt.preventDefault();

    if (currentTrip) {
      const endTime = new Date().toLocaleString();
      await tripEnd(endDock, endTime, currentTrip.id);
      navigate("/trip/summary");
    }
  }
  return (
    <>
      <h2>TripStart Page</h2>
      {currentTrip ? (
        <ul>
          <li>Your Trip has started</li>
          <li>{currentTrip.id}</li>
          <li>{currentTrip.start_dock}</li>
          <li>{currentTrip.start_time}</li>
        </ul>
      ) : (
        ""
      )}

      <button onClick={handleTripEnd}>End the Trip</button>
    </>
  );
}

export default TripStart;
