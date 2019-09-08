import React from "react";
import { useRoutes } from "hookrouter";
import NotFoundPage from "./components/NoPageFound";
import Navbar from "./components/Navbar";
import routes from "./router";

function App() {
  const routeResult = useRoutes(routes);
  return (
    <div>
      <Navbar />
      {routeResult || <NotFoundPage />}
    </div>
  );
}

export default App;
