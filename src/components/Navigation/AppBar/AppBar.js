import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// import { useTheme /*makeStyles*/ } from "@mui/material/styles";

/* const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: theme.palette.secondary.light,
  },
})); */

export default function ButtonAppBar() {
  // const theme = useTheme();
  // const classes = useStyles();

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
            sx={{ mr: 2}}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Online Railway Seat Reservation Seat System Admin
          </Typography>
          <Tabs
            value={0}
            // onChange={handleChange}
            aria-label="App Bar Tabs"
            // classes={{ indicator: classes.indicator }}
            indicatorColor="secondary"
            textColor="white"
          >
            <Tab
              /* label={userId ? "LOG OUT" : "LOG IN"} */ label="LOG IN"
              {...a11yProps(0)}
              sx={{ fontSize: 18 }}
            />
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
