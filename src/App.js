import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/Pages/Dashboard";
import Base from "./Components/Common/Base";
import ProtectedRoute from "./Components/ProtectedRoute";
import Enquiries from "./Components/Pages/Enquiries";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import SnackbarContext from "./Components/Store/SnackbarContext";
import SnackbarComponent from "./Components/SnackbarComponent";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Base />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/enquiries",
        element: <Enquiries />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const [snack, setSnack] = useState({
    message: "",
    open: false,
  });
  return (
    <>
      <SnackbarContext.Provider value={{ snack, setSnack }}>
          <ToastContainer />
          <RouterProvider router={router} />
      </SnackbarContext.Provider>
    </>
  );
}

export default App;
