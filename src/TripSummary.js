function TripSummary({ currentTrip }) {
  return (
    <>
      <h2>TripSummary Page</h2>
      <ul>
        <li>id:{currentTrip.id}</li>
        <li>From:{currentTrip.start_dock.split(",")[1]}</li>
        <li>Start Time:{currentTrip.start_time}</li>
        <li>To:{currentTrip.end_dock.split(",")[1]}</li>
        <li>End Time{currentTrip.end_time}</li>
        <li>Distance{currentTrip.distance} km</li>
        <li>Duration{currentTrip.duration}</li>
        <li>Eco Points{currentTrip.eco_points}</li>
        <li>Active Points{currentTrip.active_points}</li>
      </ul>
    </>
  );
}

export default TripSummary;
