import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/Pages/Dashboard";
import Base from "./Common/Base";
import ProtectedRoute from "./Components/ProtectedRoute";
import Enquiries from "./Components/Pages/Enquiries";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import SnackbarContext from "./Components/Store/SnackbarContext";
import AddEnquiry from "./Components/Pages/AddEnquiry";
import DataProvider from "./Components/DataProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <DataProvider>
        <ProtectedRoute>
          <Base />
        </ProtectedRoute>
      </DataProvider>
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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  return (
    <div className="flex">
      {/* <SnackbarContext.Provider> */}
        <RouterProvider router={router} />
      {/* </SnackbarContext.Provider> */}
    </div>
  );
}

export default App;
