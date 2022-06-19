import { React, useEffect } from "react";
import { saveProfile } from "./redux/actions/authActions";
import RouteProvider from "./routes/RouteProvider";
import { Provider as ReduxProvider } from "react-redux"
import store from './redux/store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LOADING_INITIAL_FALSE } from "./redux/actions/actionTypes";

function App() {

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) store.dispatch({ type: LOADING_INITIAL_FALSE });
    else store.dispatch(saveProfile(token));
  }, []);


  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);


  return (
    <>
      <ToastContainer bodyStyle={{ fontFamily: "Source Sans Pro" }} />
      <ReduxProvider store={store}>
        <RouteProvider />
      </ReduxProvider>
    </>
  );
}

export default App;
