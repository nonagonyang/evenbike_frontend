import { NavLink } from "react-router-dom";

function Navigation({ token, logout, loggedinUser }) {
  function handleClick(evt) {
    evt.preventDefault();
    logout();
  }

  return (
    <>
      {/* <h2>Navigation Component Token: {token}</h2> */}
      <div>
        {token ? (
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/trip/select/from">
                Plan A Trip
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            <li>Welcome {loggedinUser}!</li>
            <li>
              <NavLink className="nav-link" to="/" onClick={handleClick}>
                Logout
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </>
  );
}

export default Navigation;
