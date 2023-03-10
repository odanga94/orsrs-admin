import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { auth as firebaseAuth } from "firebase";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";

import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import AppBar from "./components/Navigation/AppBar/AppBar";
import SideDrawer from "./components/Navigation/SideDrawer/SideDrawer";
import Auth from "./containers/Auth/Auth";
import Tickets from "./containers/Tickets/Tickets";
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

function App(props) {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  // console.log(props);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await firebaseAuth().onAuthStateChanged(
          (user) => {
            if (user) {
              //console.log(user, 'Auth state is preserved in firebase');
              dispatch({ type: authActions.LOGIN, userId: user.uid });
              //navigate to home
            } else {
              console.log("hmmm, where is my user?");
              // navigate to auth
            }
          },
          (error) => {
            throw new Error(error);
            //return error;
          }
        );
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        alert(err.message);
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, [dispatch]);

  const navigate = (routeName) => {
    if (routeName === 'Home') {
      props.history.push('/');
    } /* else if (routeName === 'Pros') {
      props.history.push('/pros');
    } */ else if (routeName === 'Log Out') {
      dispatch(authActions.logOut());
    } /* else if (routeName === 'Settings') {
      props.history.push('/settings');
    } */
  }

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Redirect to="/auth" />
    </Switch>
  );

  if (userId) {
    routes = (
      <Switch>
        {/* <Route path="/orders/:clientId/:orderId" component={OrderDetails} />  */}
        <Route path="/tickets" component={Tickets} />
        <Route exact path="/" component={Tickets} />
        {/* <Route path="/pros/:proId" component={ProDetails} /> 
        <Route path="/pros" component={Pros} />
        <Route path="/settings" component={Settings} />
        <Route exact path="/" component={Orders} /> */}
        <Redirect to="/" />
      </Switch>
    );
  }

  if (isLoading) {
    return <div></div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <AppBar toggleSideDrawer={() => setSideDrawerOpen(true)} />
        <SideDrawer
          open={sideDrawerOpen}
          closeDrawer={() => setSideDrawerOpen(false)}
          activeRoute={props.location.pathname}
          navigateHandler={navigate}
        />
        {routes}
      </div>
    </ThemeProvider>
  );
}

export default withRouter(App);
