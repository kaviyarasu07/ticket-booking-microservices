import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      style={{
        width: "100%",                // ✅ FULL WIDTH
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 40px",
        backgroundColor: "#111",
        color: "white",
        boxSizing: "border-box",      // ✅ prevents overflow issues
      }}
    >
      <h2 style={{ margin: 0 }}>🎟️ ShowKarte</h2>

      <div>
        <Link
          to="/login"
          style={{ color: "white", marginRight: "20px", textDecoration: "none" }}
        >
          Login
        </Link>
        <Link
          to="/register"
          style={{ color: "white", textDecoration: "none" }}
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
