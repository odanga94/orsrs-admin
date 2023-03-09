import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useDispatch, useSelector } from "react-redux";

import { logOut } from "../../../store/actions/user/auth";
// import { useTheme /*makeStyles*/ } from "@mui/material/styles";

/* const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: theme.palette.secondary.light,
  },
})); */

export default function ButtonAppBar(props) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const [tabValue, setTabValue] = useState(0);
  // const theme = useTheme();
  // const classes = useStyles();

  const handleChange = (event, newValue) => {
    // console.log("clicked");
    setTabValue(newValue);
    if (newValue === 0 && userId) {
      dispatch(logOut());
    }
  };

  function a11yProps(index) {
    return {
      id: `app-bar-tab-${index}`,
      "aria-controls": `app-bar-tab-${index}`,
    };
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={props.toggleSideDrawer}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online Railway Seat Reservation Seat System Admin
          </Typography>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="App Bar Tabs"
            // classes={{ indicator: classes.indicator }}
            indicatorColor="secondary"
            textColor="white"
          >
            <Tab
              label={userId ? "LOG OUT" : "LOG IN"}
              {...a11yProps(0)}
              sx={{ fontSize: 18 }}
              onClick = {(event) => handleChange(event, 0)}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
