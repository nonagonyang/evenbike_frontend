import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

function BikeQR({ startDock, tripStart }) {
  let navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();
    const startTime = new Date().toLocaleString();
    await tripStart(startDock, startTime);
    navigate("/trip/start");
  }

  return (
    <>
      <p>link to public bike</p>
      <Button variant="contained" color="success" onClick={handleSubmit}>
        Start Cycling
      </Button>
    </>
  );
}

export default BikeQR;
