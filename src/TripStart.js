import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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
    <div className="TripStart-Container">
      <Box sx={{ width: "100%" }} className="box">
        {/* {currentTrip ? (
          <ul>
            <p>
              {currentTrip.start_time} Your Trip has started from{" "}
              {currentTrip.start_dock.split(",")[1]}
            </p>
          </ul>
        ) : (
          ""
        )} */}
        <LinearProgress />

        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert>Your trip has started!</Alert>
        </Stack>
        <Button size="small" onClick={handleTripEnd}>
          End the Trip
        </Button>
      </Box>
    </div>
  );
}

export default TripStart;
