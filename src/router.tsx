import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load components
const Register = React.lazy(() => import("./components/AuthenticationSection/Register"));
const Login = React.lazy(() => import("./components/AuthenticationSection/Login"));
const Dashboard = React.lazy(() => import("./components/Dashboard"));

function AppRouter() {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="h-[100vh] w-[100vw] flex justify-center items-center">
            <div className="loader"></div> {/* Loader centered using flexbox */}
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Register />} /> {/* Home is the Register page */}
          <Route path="/login" element={<Login />} />
          
          {/* Dashboard route with wildcard indicating subroutes */}
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRouter;
