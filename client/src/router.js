import React from "react";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

const routes = {
  "/": () => <Home />,
  "/login": () => <Login />,
  "/register": () => <Register />
};

export default routes;
