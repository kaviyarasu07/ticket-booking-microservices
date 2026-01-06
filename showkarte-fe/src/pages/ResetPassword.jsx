import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../services/authApi";
import "../styles.css";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Prevent direct access without email verification
    if (!email) {
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        email,
        newPassword: password
      });

      // Password updated → back to login
      navigate("/login");

    } catch (err) {
      setError(
        err.response?.data || "Failed to reset password"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Reset Password</h2>

        <p className="text-muted">
          Create a new password for your account
        </p>

        {error && (
          <p className="text-muted" style={{ color: "#e11d48" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            className="input"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
