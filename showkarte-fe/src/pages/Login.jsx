import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authApi";
import { saveToken, getUserFromToken } from "../utils/auth";
import { redirectByRole } from "../utils/redirect";
import "../styles.css";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser(form);

      const token = response.data.token;
      saveToken(token);

      const user = getUserFromToken();
      redirectByRole(user?.role, navigate);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Login</h2>

        {error && (
          <p className="text-muted" style={{ color: "#e11d48" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
<Link to="/forgot-password" style={{ color: "#e11d48" }}>
  Forgot password?
</Link>

        <p className="text-muted" style={{ textAlign: "center", marginTop: "12px" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#e11d48" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
