import React, { useState, useEffect } from "react";
import "./App.css";
import EvenBikeApi from "./api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Homepage from "./Homepage";
import Profile from "./Profile";
import SearchDocks from "./SearchDocks";
import ListOfDocks from "./ListOfDocks";
import TripPreview from "./TripPreview";
import BikeQR from "./BikeQR";
import TripStart from "./TripStart";
import TripSummary from "./TripSummary";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

function App() {
  const [dockOptions, setDockOptions] = useState([]);
  const [startDock, setStartDock] = useState("");
  const [endDock, setEndDock] = useState("");
  const [currentTrip, setCurrentTrip] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [userTrips, setUserTrips] = useState([]);
  const [token, setToken] = useState(EvenBikeApi.token);
  const [loggedinUser, setLoggedinUser] = useState("");
  const [tripOngoing, setTripOngoing] = useState(false);

  const fetchUserData = async (loggedinUser) => {
    if (loggedinUser) {
      const user = await EvenBikeApi.getUser(loggedinUser);
      setCurrentUser(user);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  async function login(userInfo) {
    const token = await EvenBikeApi.login(userInfo);
    if (token) {
      EvenBikeApi.token = token;
      setToken(token);
      setLoggedinUser(userInfo["username"]);
      return token;
    }
  }

  async function register(userInfo) {
    const token = await EvenBikeApi.register(userInfo);
    if (token) {
      EvenBikeApi.token = token;
      setToken(token);
      setLoggedinUser(userInfo["username"]);
    }

    return token;
  }

  async function logout() {
    EvenBikeApi.token = null;
    setToken(null);
    setLoggedinUser("");
  }

  async function getDockOptions(coord, type) {
    const docks = await EvenBikeApi.getDockOptions(coord, type);
    setDockOptions(docks);
  }

  function updateStartDock(from) {
    setStartDock(from);
  }
  function updateEndDock(to) {
    setEndDock(to);
  }

  async function tripStart(startDock, startTime) {
    const trip = await EvenBikeApi.startTrip(startDock, startTime);
    setCurrentTrip(trip);
    setTripOngoing(true);
  }

  async function tripEnd(endDock, endTime, tripId) {
    const { trip, user } = await EvenBikeApi.endTrip(endDock, endTime, tripId);
    setCurrentTrip(trip);
    setCurrentUser(user);
    setTripOngoing(false);
  }
  async function getTrips(username) {
    const trips = await EvenBikeApi.getTrips(username);
    setUserTrips(trips);
    console.log("app.js", trips);
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation token={token} logout={logout} loggedinUser={loggedinUser} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route
            path="/register"
            element={<RegisterForm register={register} />}
          />
          <Route path="/login" element={<LoginForm login={login} />} />
          <Route
            path="/trip/select/:type"
            element={<SearchDocks getDockOptions={getDockOptions} />}
          />
          <Route
            path="/trip/docks/:type"
            element={
              <ListOfDocks
                dockOptions={dockOptions}
                updateStartDock={updateStartDock}
                updateEndDock={updateEndDock}
              />
            }
          />
          <Route
            path="/trip/preview"
            element={
              <TripPreview
                startDock={startDock}
                endDock={endDock}
                tripStart={tripStart}
                tripOngoing={tripOngoing}
              />
            }
          ></Route>
          <Route
            path="/trip/scan"
            element={
              <BikeQR
                startDock={startDock}
                endDock={endDock}
                tripStart={tripStart}
              />
            }
          ></Route>
          <Route
            path="/trip/start"
            element={
              <TripStart
                currentTrip={currentTrip}
                tripEnd={tripEnd}
                endDock={endDock}
              />
            }
          ></Route>
          <Route
            path="/trip/summary"
            element={<TripSummary currentTrip={currentTrip} />}
          ></Route>
          <Route
            path="/profile"
            element={
              <Profile
                loggedinUser={loggedinUser}
                currentUser={currentUser}
                userTrips={userTrips}
                getTrips={getTrips}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
