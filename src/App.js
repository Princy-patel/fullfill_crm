import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Base from "./Common/Base";
import ProtectedRoute from "./Components/ProtectedRoute";
import Enquiries from "./Pages/Enquiries";
import { useState } from "react";
import SnackbarContext from "./Store/SnackbarContext";
import AddEnquiry from "./Pages/AddEnquiry";
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
      {
        path: "/add-enquiries",
        element: <AddEnquiry />,
      },
      {
        path: "/add-enquiries/:studentId",
        element: <AddEnquiry />,
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
    open: false,
    message: "",
  });

  return (
    <div className="flex">
      <SnackbarContext.Provider value={{ snack, setSnack }}>
        <RouterProvider router={router} />
        <SnackbarComponent />
      </SnackbarContext.Provider>
    </div>
  );
}

export default App;
