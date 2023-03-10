import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import Button from '@mui/material/Button';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import LogOutIcon from "@mui/icons-material/ExitToApp";
import { useTheme } from "@emotion/react";

import Logo from "../../../assets/logo.png";

export default function TemporaryDrawer(props) {
  const theme = useTheme();

  const [state, setState] = React.useState({
    top: false,
    left: true,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Home", "Settings", "Log Out"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            divider
            onClick={() => props.navigateHandler(text)}
          >
            <ListItemButton
              selected={
                (text === "Home" && props.activeRoute === "/") ||
                (text === "Settings" && props.activeRoute === "/settings") ||
                (text === "Log Out" && props.activeRoute === "/auth")
              }
              sx={{
                color: (text === "Home" && props.activeRoute === "/") ||
                (text === "Settings" && props.activeRoute === "/settings") ||
                (text === "Log Out" && props.activeRoute === "/auth") ? theme.palette.secondary.main : ""
              }}
            >
              <ListItemIcon
                style={{
                  color:
                    (text === "Home" && props.activeRoute === "/") ||
                    (text === "Settings" &&
                      props.activeRoute === "/settings") ||
                    (text === "Log Out" && props.activeRoute === "/auth")
                      ? theme.palette.secondary.light
                      : "",
                }}
              >
                {index === 0 ? (
                  <HomeIcon />
                ) : index === 1 ? (
                  <SettingsIcon />
                ) : (
                  <LogOutIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          {/*           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
          <Drawer anchor={anchor} open={props.open} onClose={props.closeDrawer}>
            <img
              src={Logo}
              style={{ width: 175, alignSelf: "center", marginTop: 5 }}
              alt="Logo"
            />
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
