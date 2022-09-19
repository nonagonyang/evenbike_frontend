import * as React from "react";
import { useNavigate } from "react-router-dom";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const tabNameToIndex = {
  0: "home",
  1: "profile",
  2: "logout",
  3: "login",
  4: "register",
};

const indexToTabName = {
  home: 0,
  profile: 1,
  logout: 2,
  login: 3,
  register: 4,
};

function a11yProps(index) {
  return {
    id: `navigation-tab-${index}`,
    name: `${index}`,
    value: parseInt(`${index}`),
    label: `${tabNameToIndex[index]}`,
    "aria-controls": `navigation-tabpanel-${index}`,
  };
}

export default function NavTabs({ token, logout }) {
  const [selectedValue, setSelectedValue] = React.useState(
    indexToTabName[window.location.pathname.substring(1)]
  );
  let navigate = useNavigate();

  const handleChange = (event, newValue) => {
    navigate(`/${tabNameToIndex[parseInt(newValue)]}`);
    setSelectedValue(newValue);
  };

  function handleLogout(evt) {
    evt.preventDefault();
    logout();
    setSelectedValue(0);
    navigate("/home");
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {token ? (
          <Tabs
            value={false}
            onChange={handleChange}
            aria-label="navigation tabs"
            textColor="secondary"
          >
            <Tab {...a11yProps(0)} />
            <Tab {...a11yProps(1)} />
            <Tab {...a11yProps(2)} onClick={handleLogout} />
          </Tabs>
        ) : (
          <Tabs
            value={selectedValue}
            onChange={handleChange}
            aria-label="navigation tabs"
            textColor="secondary"
          >
            <Tab {...a11yProps(0)} />
            <Tab {...a11yProps(3)} />
            <Tab {...a11yProps(4)} />
          </Tabs>
        )}
      </Box>
    </Box>
  );
}
