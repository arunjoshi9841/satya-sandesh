import "antd/dist/antd.css";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import Authorized from "./app/components/auth/Authorized";
import store from "./app/store";
import Firebase from "./app/firebase";
import * as serviceWorker from "./serviceWorker";
import "./styles/tailwind.css";
Firebase();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Authorized>
            <App />
      </Authorized>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
