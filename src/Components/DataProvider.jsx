import React, { useEffect, useState } from "react";
import DataContext from "./Store/DataContext";
import { useNavigate } from "react-router-dom";

function DataProvider({ children }) {
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localInfo = localStorage.getItem("loginInfo");

    if (localInfo) {
      setResponse(JSON.parse(localInfo));
    } else {
      navigate("/");
    }
  }, []);
  return (
    <DataContext.Provider value={{ response }}>{children}</DataContext.Provider>
  );
}

export default DataProvider;
