import React, { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import AppBar from "./components/Navigation/AppBar/AppBar";
import SideDrawer from "./components/Navigation/SideDrawer/SideDrawer";
import Auth from "./containers/Auth/Auth";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function App() {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar toggleSideDrawer={() => setSideDrawerOpen(true)} />
        <SideDrawer
          open={sideDrawerOpen}
          closeDrawer={() => setSideDrawerOpen(false)}
          activeRoute={/* props.location.pathname */""}
          navigateHandler={/* navigate */() => {}}
        />
        <Auth />
      </div>
    </ThemeProvider>
  );
}

export default App;
