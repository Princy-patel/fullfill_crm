import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./Components/Pages/Login";
import Dashboard from "./Components/Pages/Dashboard";
import Base from "./Components/Common/Base";
import ProtectedRoute from "./Components/ProtectedRoute";
import Enquiries from "./Components/Pages/Enquiries";
import { ToastContainer } from 'react-toastify';

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
  return (
    <>
    <ToastContainer/>

      <RouterProvider router={router} />
    </>
  );
}

export default App;
