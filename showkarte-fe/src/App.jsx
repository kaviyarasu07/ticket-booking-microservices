import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import TheatreDashboard from "./pages/TheatreDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboards (routing fix later) */}
        <Route path="/organizer" element={<OrganizerDashboard />} />
        <Route path="/theatre" element={<TheatreDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
