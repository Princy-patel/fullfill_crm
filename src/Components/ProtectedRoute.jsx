import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SnackbarContext from "../Store/SnackbarContext";

function ProtectedRoute(props) {
  const { setSnack } = useContext(SnackbarContext);

  const navigate = useNavigate();

  useEffect(() => {
    let localData = localStorage.getItem("loginInfo");

    if (!localData) {
      setSnack({ open: true, message: "Please enter correct details" });
      navigate("/login");
      return;
    } else {
      localData = JSON.parse(localData);
      if (!localData.msg) {
        setSnack({ open: true, message: "Please check again" });
        navigate("/login");
      }
    }
  }, []);

  return props.children;
}

export default ProtectedRoute;
