import { useState } from "react";
import "./Profile.css";
import bike from "./bike.jpg";
import Walle from "./Walle.jpeg";

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
      <div className="content-profile-page">
        <div className="profile-user-page card">
          <div className="img-user-profile">
            <img className="profile-bgHome" src={bike} />
            <img className="avatar" src={Walle} alt="Universal Avatar" />
          </div>
          <button onClick={handleClick}>
            {show ? "Hide Trips" : "Show Trips"}
          </button>
          <div className="user-profile-data">
            <h1>{currentUser.username}</h1>
          </div>

          <ul className="data-user">
            <li>
              <a>
                <strong>{currentUser.eco_points}</strong>
                <span>Eco Points</span>
              </a>
            </li>
            <li>
              <a>
                <strong>{currentUser.active_points}</strong>
                <span>Active Points</span>
              </a>
            </li>
            <li>
              <a>
                <strong>{currentUser.overall_level}</strong>
                <span>Overall Level</span>
              </a>
            </li>
          </ul>

          <div className="img-user-profile">
            {/* <img class="profile-bgHome" src={bike} />
            <img class="avatar" src={Walle} alt="Universal Avatar" /> */}
            {show ? (
              <div>
                {userTrips.map((trip) => {
                  return (
                    <div key={trip.id} className="user-trip">
                      <strong>
                        {trip.start_time} --- {trip.end_time}
                      </strong>
                      <p>from: {trip.start_dock.split(",")[1]}</p>
                      &darr;
                      <p>to: {trip.end_dock.split(",")[1]}</p>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Profile;
