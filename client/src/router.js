import React from "react";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Cart from "./components/Cart";

const routes = {
  "/": () => <Home />,
  "/cart": () => <Cart />,
  "/login": () => <Login />,
  "/register": () => <Register />
};

export default routes;
