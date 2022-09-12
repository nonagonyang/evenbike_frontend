import { useNavigate } from "react-router-dom";

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
      <button onClick={handleSubmit}>Start Biking</button>
    </>
  );
}

export default BikeQR;
