import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import theme from "./theme";
import { FirebaseAppProvider } from "reactfire";
const firebaseConfig = {
  apiKey: "AIzaSyA-Cqg2r7pjete1ArjQJRX-6fFMz3l2kho",
  authDomain: "album-competition.firebaseapp.com",
  databaseURL: "https://album-competition.firebaseio.com",
  projectId: "album-competition",
  storageBucket: "album-competition.appspot.com",
  messagingSenderId: "435650740550",
  appId: "1:435650740550:web:056c88f6b4244c902e6547",
  measurementId: "G-4014QYJSZV",
};

ReactDOM.render(
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {/* TODO: Put this suspense tag further down the component tree */}
      <App />
    </ThemeProvider>
  </FirebaseAppProvider>,
  document.querySelector("#root")
);
