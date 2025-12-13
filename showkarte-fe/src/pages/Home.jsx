import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />

      {/* HERO SECTION */}
      <section
        style={{
          height: "calc(100vh - 64px)", // full screen minus navbar
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>
          Welcome to ShowKarte 🎬
        </h1>

        <p style={{ fontSize: "20px", marginBottom: "32px", color: "#555" }}>
          Book movies, events & live shows effortlessly
        </p>

        <button
          style={{
            padding: "14px 28px",
            fontSize: "18px",
            backgroundColor: "#111",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Explore Events
        </button>
      </section>
    </div>
  );
}
