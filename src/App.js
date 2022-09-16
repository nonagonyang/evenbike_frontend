import React, { useState, useEffect } from "react";
import "./App.css";
import EvenBikeApi from "./api";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import Homepage from "./Homepage";
import Trip from "./Trip";
import Profile from "./Profile";
import SearchDocks from "./SearchDocks";
import SearchDocks2 from "./SearchDocks2";
import ListOfDocks from "./ListOfDocks";
import TripPreview from "./TripPreview";
import BikeQR from "./BikeQR";
import TripStart from "./TripStart";
import TripSummary from "./TripSummary";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import AutoComplete from "./AutoComplete";
import NotFound from "./NotFound";

/**MUI */
import NavigationTabs from "./Navigation2";
import SignIn from "./LoginForm2";
import SignUp from "./RegisterForm2";
import ComboBox from "./SearchDocks3";
import BasicStack from "./ListOfDocks2";
import ColorsTimeline from "./TripPreview2";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "evenbike-token";

function App() {
  const [dockOptions, setDockOptions] = useState([]);
  const [startDock, setStartDock] = useState("");
  const [endDock, setEndDock] = useState("");
  const [currentTrip, setCurrentTrip] = useState("");
  const [userTrips, setUserTrips] = useState([]);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [loggedinUser, setLoggedinUser] = useState("");
  const [tripOngoing, setTripOngoing] = useState(false);

  function useLocalStorage(key, firstValue = null) {
    const initialValue = localStorage.getItem(key) || firstValue;

    const [item, setItem] = useState(initialValue);

    useEffect(
      function setKeyInLocalStorage() {
        console.debug("hooks useLocalStorage useEffect", "item=", item);

        if (item === null) {
          localStorage.removeItem(key);
        } else {
          localStorage.setItem(key, item);
        }
      },
      [key, item]
    );

    return [item, setItem];
  }

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let username = loggedinUser;
            // put the token on the Api class so it can use it to call the API.
            EvenBikeApi.token = token;
            let currentUser = await EvenBikeApi.getUser(username);
            setCurrentUser(currentUser);
            setApplicationIds(new Set(currentUser.applications));
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        }
        setInfoLoaded(true);
      }

      // set infoLoaded to false while async getCurrentUser runs; once the
      // data is fetched (or even if an error happens!), this will be set back
      // to false to control the spinner.
      setInfoLoaded(false);
      getCurrentUser();
    },
    [token]
  );

  // const fetchUserData = async (loggedinUser) => {
  //   if (loggedinUser) {
  //     const user = await EvenBikeApi.getUser(loggedinUser);
  //     setCurrentUser(user);
  //   }
  // };
  // useEffect(() => {
  //   fetchUserData();
  // }, []);

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
    console.log("coord", coord, "type", type);
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
        {/* <Navigation token={token} logout={logout} loggedinUser={loggedinUser} /> */}
        <NavigationTabs
          token={token}
          logout={logout}
          loggedinUser={loggedinUser}
        />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/home" element={<Homepage token={token} />} />
          <Route path="/trip" element={<Trip />} />
          {/* <Route
            path="/register"
            element={<RegisterForm register={register} />}
          /> */}
          <Route path="/register" element={<SignUp register={register} />} />

          {/* <Route path="/login" element={<LoginForm login={login} />} /> */}
          <Route path="/login" element={<SignIn login={login} />} />

          <Route path="/logout" element={<Homepage />} />
          <Route path="/autocomplete" element={<AutoComplete />} />
          <Route
            path="/trip/select/:type"
            element={<SearchDocks2 getDockOptions={getDockOptions} />}
          />
          {/* <Route
            path="/trip/select/:type"
            element={<ComboBox getDockOptions={getDockOptions} />}
          /> */}

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
          {/* <Route
            path="/trip/docks/:type"
            element={
              <BasicStack
                dockOptions={dockOptions}
                updateStartDock={updateStartDock}
                updateEndDock={updateEndDock}
              />
            }
          /> */}
          {/* <Route
            path="/trip/preview"
            element={
              <TripPreview
                startDock={startDock}
                endDock={endDock}
                tripStart={tripStart}
                tripOngoing={tripOngoing}
              />
            }
          ></Route> */}
          <Route
            path="/trip/preview"
            element={
              <ColorsTimeline
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
