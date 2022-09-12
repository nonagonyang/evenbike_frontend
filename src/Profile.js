import { useState } from "react";

function Profile({ loggedinUser, currentUser, userTrips, getTrips }) {
  const [show, setShow] = useState(false);
  function handleClick(evt) {
    if (!show) {
      evt.preventDefault();
      setShow(true);
      getTrips(loggedinUser);
    } else {
      setShow(false);
    }
  }
  return (
    <>
      <h2>Profile Page</h2>
      <p>Username: {loggedinUser}</p>
      <p>Eco_points:{currentUser.eco_points}</p>
      <p>Active_points:{currentUser.active_points}</p>
      <p>Total_points:{currentUser.total_points}</p>
      <h2>Trip History</h2>
      <button onClick={handleClick}>
        {show ? "Hide Trip History" : "Show Trip History"}
      </button>
      {show ? (
        <div>
          {userTrips.map((trip) => {
            return (
              <div key={trip.id}>
                <p>{trip.start_time}</p>
                <p>from: {trip.start_dock.split(",")[1]}</p>
                <p>to: {trip.end_dock.split(",")[1]}</p>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default Profile;
