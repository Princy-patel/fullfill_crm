import React, { useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const initialValue = {
  isAuthentication: "WAITING",
  isSnackbar: false,
  snackbarMessage: "",
};

// const ActionType = {
//   SET_DATA: "SET_DATA",
//   OPEN_SNACKBAR: "OPEN_SNACKBAR",
//   CLOSE_SNACKBAR: "CLOSE_SNACKBAR",
//   SUCCESS_MESSAGE: "SUCCESS_MESSAGE",
//   FAILED_MESSAGE: "FAILED_MESSAGE",
// };

const reducer = function (state, action) {
  if (action.type === "SET_DATA") {
    return { ...state, isAuthentication: "Logged-in" };
  }

  if (action.type === "OPEN_SNACKBAR") {
    return { ...state, isSnackbar: true };
  }

  if (action.type === "CLOSE_SNACKBAR") {
    return { ...state, isSnackbar: false };
  }

  if (action.type === "SUCCESS_MESSAGE") {
    return { ...state, snackbarMessage: action.payload };
  }

  if (action.type === "FAILED_MESSAGE") {
    return { ...state, snackbarMessage: action.payload };
  }
};

function ProtectedRoute(props) {
  const [authentication, dispatch] = useReducer(reducer, initialValue);
  const navigate = useNavigate();

  const handleClick = () => {
    if (authentication.isAuthentication !== "WAITING") {
      dispatch({ type: "OPEN_SNACKBAR" });
    }
  };

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch({ type: "CLOSE_SNACKBAR" });
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const getData = JSON.parse(localStorage.getItem("loginInfo"));
  useEffect(() => {
    try {
      if (getData) {
        if (!getData.token) {
          handleClick();
          dispatch({
            type: "FAILED_MESSAGE",
            payload: "Login Failed",
          });
          navigate("/login");
        } else {
          handleClick();
          dispatch({
            type: "SUCCESS_MESSAGE",
            payload: "Login Successful",
          });
          dispatch({ type: "SET_DATA" });
        }
      } else {
        handleClick();
        dispatch({
          type: "FAILED_MESSAGE",
          payload: "Login Failed",
        });
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  if (authentication.isAuthentication === "WAITING") {
    return <div>Loading...</div>;
  }

  if (authentication.isAuthentication === "Logged-in") {
    return props.children;
  }

  return (
    <>
      <Snackbar
        open={authentication.isSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        message={authentication.snackbarMessage}
        action={action}
      />
    </>
  );
}

export default ProtectedRoute;
