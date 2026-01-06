import { useState } from "react";
import { Search } from "lucide-react";
import Header from "../components/Header";
import "../styles.css";

export default function LandingPage() {
  const [city, setCity] = useState("Chennai");
  const [category, setCategory] = useState("MOVIES");

  const items = [
    { id: 1, title: "Leo", type: "MOVIES" },
    { id: 2, title: "Jailer", type: "MOVIES" },
    { id: 3, title: "AR Rahman Live Concert", type: "EVENTS" },
    { id: 4, title: "Standup Comedy Night", type: "EVENTS" }
  ];

  return (
    <>
      <Header />

      <div className="container">
        {/* Search Section */}
        <div style={{ marginBottom: "32px" }}>
          <h2>Discover Movies & Events</h2>
          <p className="text-muted">
            Browse shows happening in your city
          </p>

          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <input
              className="input"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />

            <select
              className="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="MOVIES">Movies</option>
              <option value="EVENTS">Events</option>
            </select>

            <input
              className="input"
              placeholder="Search by name"
            />

            <button className="btn btn-primary">
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Listing */}
        <h3>{category} in {city}</h3>

        <div className="grid">
          {items
            .filter(i => i.type === category)
            .map(item => (
              <div key={item.id} className="card">
                <div className="card-img" />
                <div className="card-body">{item.title}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
