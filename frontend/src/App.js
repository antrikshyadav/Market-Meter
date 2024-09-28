import LandingPage from "./components/Landingpage";
import LoginPage from "./components/LoginPage";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./components/SignupPage";
import Dashboard from "./components/DashboardPage"; // Import dashboard (you can add later)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />{" "}
        {/* Add a dashboard page */}
      </Routes>
    </Router>
  );
}

export default App;
