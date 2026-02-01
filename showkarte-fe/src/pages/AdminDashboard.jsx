import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/adminApi";
import { getUserFromToken } from "../utils/auth";

export default function AdminDashboard() {
  const user = getUserFromToken();

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminDashboard()
      .then(res => setStats(res.data))
      .catch(err => {
        console.error(err);
        setError("Failed to load dashboard");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome Admin: {user?.email}</h1>

      <p>Total Users: {stats.totalUsers}</p>
      <p>Total Theatre Owners: {stats.totalTheatreOwners}</p>
      <p>Total Organizers: {stats.totalOrganizers}</p>
    </div>
  );
}
