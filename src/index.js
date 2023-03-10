import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { apps, initializeApp } from "firebase/app";

import ENV from "./ENV";
import authReducer from "./store/reducers/user/auth";
import ticketsReducer from "./store/reducers/tickets";

const firebaseConfig = {
  apiKey: ENV.apiKey,
  authDomain: "orsrs-9de02.firebaseapp.com",
  databaseURL: "https://orsrs-9de02-default-rtdb.firebaseio.com/",
  // storageBucket: "gs://jobo-3a84b.appspot.com"
};

if (!apps.length) {
  initializeApp(firebaseConfig);
}

const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  tickets: ticketsReducer,
  /* pros: prosReducer */
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<React.StrictMode>{app}</React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
