import React from "react";
import { useRoutes, A } from "hookrouter";
import NotFoundPage from "./components/NoPageFound";
import routes from "./router";

function App() {
  const routeResult = useRoutes(routes);
  console.log(JSON.parse(localStorage.getItem("user")));
  return (
    <div>
      <A href="/">Home</A>
      <A href="/login">Login</A>
      <A href="/register">Register</A>
      {routeResult || <NotFoundPage />}
    </div>
  );
}

export default App;
