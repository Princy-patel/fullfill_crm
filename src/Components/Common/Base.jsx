import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function Base() {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default Base;
