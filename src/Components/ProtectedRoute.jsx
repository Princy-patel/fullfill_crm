import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SnackbarContext from "./Store/SnackbarContext";
import SnackbarComponent from "./SnackbarComponent";
import { type } from "@testing-library/user-event/dist/type";

const initialValue = {
  isAuthentication: "WAITING",
  isSnackbar: false,
  snackbarMessage: "",
};

const reducer = function (state, action) {
  if (action.type === "SET_DATA") {
    return { ...state, isAuthentication: "Logged-in" };
  }

  if (action.type === "OPEN_SNACKBAR") {
    return { ...state, isSnackbar: action.payload };
  }
};

function ProtectedRoute(props) {
  const [authentication, dispatch] = useReducer(reducer, initialValue);

  const navigate = useNavigate();

  useEffect(() => {
    const localData = localStorage.getItem("loginInfo");
    if (localData) {
      if (!localData.token) {
        dispatch({ type: "OPEN_SNACKBAR", payload: true });
        console.log(authentication);
        navigate("/login");
      } else {
        dispatch({ type: "OPEN_SNACKBAR", payload: true });
        console.log(authentication);
        dispatch({ type: "SET_DATA" });
      }
    } else {
      dispatch({ type: "OPEN_SNACKBAR", payload: true });
      console.log(authentication);
      navigate("/login");
    }
  }, [navigate, authentication]);

  if (authentication.isAuthentication === "WAITING") {
    return <div>Loading...</div>;
  }

  if (authentication.isAuthentication === "Logged-in") {
    return props.children;
  }

  if (authentication.isSnackbar) {
    console.log("Hello");
    dispatch({ type: "OPEN_SNACKBAR" });
    return <SnackbarComponent initialValue="Hello" />;
  }
}

export default ProtectedRoute;
