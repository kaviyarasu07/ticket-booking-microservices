import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authApi";
import "../styles.css";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await forgotPassword({ email });

      // Email verified → go to reset password
      navigate("/reset-password", { state: { email } });

    } catch (err) {
      setError(
        err.response?.data || "Email not registered"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Forgot Password</h2>

        <p className="text-muted">
          Enter your registered email address
        </p>

        {error && (
          <p className="text-muted" style={{ color: "#e11d48" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
}
