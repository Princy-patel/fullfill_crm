import React, { useContext, useReducer } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SnackbarContext from "../Store/SnackbarContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Fulfill CRM
      <span> {new Date().getFullYear()}</span>
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const initialData = {
  username: "",
  password: "",
  isDisabled: false,
};

const reducer = function (state, action) {
  if (action.type === "USER_NAME") {
    return { ...state, username: action.payload };
  }

  if (action.type === "PASSWORD") {
    return { ...state, password: action.payload };
  }

  if (action.type === "SUBMIT_FORM") {
    return { ...state, username: state.username, password: state.password };
  }

  if (action.type === "DISABLE_BUTTON" || action.type === "ENABLE_BUTTON") {
    return { ...state, isDisabled: action.payload };
  }
};

export default function Login() {
  const [formData, dispatch] = useReducer(reducer, initialData);
  const { setSnack } = useContext(SnackbarContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // dispatch({ type: "DISABLE_BUTTON", payload: true });

    const reqBody = {
      username: formData.username,
      password: formData.password,
    };

    if (formData.username.trim() !== "" && formData.password.trim() !== "") {
      const requestData = await fetch(
        "https://fulfilurdream.howtogetridofspiderveins.net/fulfillDream/api/user/login/",
        {
          method: "POST",
          body: JSON.stringify(reqBody),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      let loginData = await requestData.json();
      localStorage.setItem("loginInfo", JSON.stringify(loginData));
    } else {
      setSnack({ open: true, message: "Please fill the form" });
      return;
      // dispatch({ type: "ENABLE_BUTTON", payload: false });
    }

    let loginInfo = localStorage.getItem("loginInfo");
    if (loginInfo) loginInfo = JSON.parse(loginInfo);

    if (!loginInfo.msg) {
      setSnack({
        open: true,
        message: "Please check login details and try again",
      });
      return;
    }

    dispatch({ type: "SUBMIT_FORM" });
    setSnack({
      open: true,
      message: "Login Successful",
    });
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage:
              "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://source.unsplash.com/random?wallpapers)",
            flexDirection: "column",
          }}
          className="flex justify-center items-center"
        >
          <Box
            component="h1"
            className="text-6xl text-white font-extrabold my-2.5 text-blue-400"
          >
            Welcome to website
          </Box>
          <Box component="p" className="text-xl text-white my-2.5 font-bold">
            Login to continue access
          </Box>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e) =>
                  dispatch({ type: "USER_NAME", payload: e.target.value })
                }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) =>
                  dispatch({ type: "PASSWORD", payload: e.target.value })
                }
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // disabled={formData.isDisabled}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
