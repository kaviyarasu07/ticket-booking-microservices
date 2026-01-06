import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken, logout } from "../utils/auth";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/");
  };

  return (
    <div style={styles.header}>
      <span style={styles.logo}>ShowKarte</span>

      <div style={styles.right}>
        {/* NOT logged in */}
        {!user && (
          <>
            <Link to="/login">
              <button style={styles.button}>Login</button>
            </Link>
            <Link to="/register">
              <button style={styles.primaryButton}>Sign Up</button>
            </Link>
          </>
        )}

        {/* Logged in */}
        {user && (
          <>
            <button style={styles.iconButton} title="User">
              👤
            </button>
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    background: "#1976d2",
    color: "#fff",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  button: {
    background: "#fff",
    color: "#1976d2",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
  },
  primaryButton: {
    background: "#e11d48",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer",
  },
  iconButton: {
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#fff",
  },
};
