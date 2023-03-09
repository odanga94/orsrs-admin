import "./Auth.css";

import React, { useState } from "react";
import { Paper, TextField, Button, CircularProgress } from "@mui/material";
import { useDispatch } from 'react-redux';
import { useTheme } from "@emotion/react";

import logo from "../../assets/logo.png";
import * as authActions from '../../store/actions/user/auth';
import { checkValidity } from "../../shared/utility";

/* const useStyles = makeStyles((theme) => ({
    
    paper: {
        textAlign: 'center'
    },
    inputContainer: {
        marginTop: 10,
        marginBottom: 20
    },
    button: {
        backgroundColor: theme.palette.secondary.light,
        color: "white",
        marginTop: 20
    },
    spinner: {
        color: theme.palette.secondary.main
    }
})); */

export default function Auth() {
  const [logInLoading, setLogInLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();

  const theme = useTheme();

  const dispatch = useDispatch();

  // const classes = useStyles();

  const logIn = async () => {
    let formError = false;
    if (!checkValidity(email, { isEmail: true })) {
      setEmailError(true);
      formError = true;
    }
    if (!checkValidity(password, { minLength: 6 })) {
      setPasswordError(true);
      formError = true;
    }
    if (formError) {
      return;
    }
    setLogInLoading(true);
    try {
            await dispatch(authActions.logIn(email, password));
            setLogInLoading(false);
        } catch (err) {
            console.log(err);
            setLogInLoading(false);
            alert(err.message);
        }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          "& > *": {
            padding: theme.spacing(3),
          },
          margin: theme.spacing(10),
          width: "50%",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "#f9f9f9"
        }}
      >
        <div>
          <img src={logo} alt="Logo" height={200} />
        </div>
        {logInLoading ? (
          <CircularProgress sx={{color: theme.palette.secondary.light}} />
        ) : (
          <form noValidate autoComplete="off" style={{marginTop: -30}}>
            <div /* className= {classes.inputContainer} */>
              <TextField
                error={emailError}
                required
                id="outlined-required"
                label="Email"
                variant="outlined"
                style={{ width: "70%", marginTop: 20, marginBottom: 20 }}
                value={email}
                onChange={(event) => {
                  setEmailError();
                  setEmail(event.target.value);
                }}
                helperText={emailError ? "Please enter a valid email." : ""}
              />
            </div>
            <div /* className=/* {classes.inputContainer} */>
              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                style={{ width: "70%", marginTop: 10, marginBottom: 40 }}
                value={password}
                onChange={(event) => {
                  setPasswordError();
                  setPassword(event.target.value);
                }}
                helperText={
                  passwordError
                    ? "Password must be at least 6 characters long."
                    : ""
                }
                error={passwordError}
              />
            </div>
            <Button
              variant="contained"
              /* classes={{ root: classes.button }} */
              sx={{
                width: "50%",
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2),
              }}
              onClick={logIn}
            >
              LOG IN
            </Button>
          </form>
        )}
      </Paper>
    </div>
  );
}
