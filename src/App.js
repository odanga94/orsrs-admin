import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from 'react-redux';
import { auth as firebaseAuth } from 'firebase';

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import AppBar from "./components/Navigation/AppBar/AppBar";
import SideDrawer from "./components/Navigation/SideDrawer/SideDrawer";
import Auth from "./containers/Auth/Auth";
import * as authActions from "./store/actions/user/auth";

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
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector(state => state.auth.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await firebaseAuth().onAuthStateChanged(user => {
          if (user) {
            //console.log(user, 'Auth state is preserved in firebase');
            dispatch({ type: authActions.LOGIN, userId: user.uid });
            //navigate to home
          } else {
            console.log('hmmm, where is my user?');
            // navigate to auth
          }
        }, error => {
          throw new Error(error);
          //return error;
        });
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        alert(err.message);
        setIsLoading(false);
      }
    }
    checkAuthStatus();
  }, [dispatch]);

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
