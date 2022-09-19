import { useNavigate } from "react-router-dom";
import bike from "./bike.jpg";
import "./Homepage.css";

function Homepage({ token }) {
  let navigate = useNavigate();
  function handleClick() {
    if (token) {
      navigate("/trip/select/from");
    } else {
      navigate("/login");
    }
  }
  return (
    <>
      <div className="landing-page">
        <div className="container">
          <div className="header-area">
            <div className="logo">
              <b>EvenBike</b>
            </div>
          </div>
          <div className="info">
            <h1>Greener Public Bike</h1>
            <p>
              Most public bikes have to be redistributed by trucks in the
              evening. Join us to help redistribute public bikes without using
              trucks.
            </p>
            <button onClick={handleClick}>Plan A Trip</button>
          </div>
          <div className="image">
            <img src={bike} alt=""></img>
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
