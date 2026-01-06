import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authApi";
import { saveToken, getUserFromToken } from "../utils/auth";
import { redirectByRole } from "../utils/redirect";
import "../styles.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "Male",
    email: "",
    mobile: "",
    password: "",
    role: "CONSUMER",
    dob: ""
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
      const response = await registerUser(form);

      const token = response.data.token;
      saveToken(token);

      // fallback-safe redirect
      const role = response.data.role || getUserFromToken()?.role;
      redirectByRole(role, navigate);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h2>Create Account</h2>

        {error && (
          <p className="text-muted" style={{ color: "#e11d48" }}>
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
          />

          <select
            className="select"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            className="input"
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            className="input"
            name="mobile"
            placeholder="Mobile Number"
            value={form.mobile}
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

          <select
            className="select"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            <option value="CONSUMER">User</option>
            <option value="EVENT_ORGANIZER">Event Organizer</option>
            <option value="THEATRE_OWNER">Theatre Owner</option>
          </select>

          <input
            className="input"
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
          />

          <button className="btn btn-primary" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-muted" style={{ textAlign: "center", marginTop: "12px" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#e11d48" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
