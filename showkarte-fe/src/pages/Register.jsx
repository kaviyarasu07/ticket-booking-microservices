import { registerUser } from "../api/authApi";
import { useState } from "react";


export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    mobile: "",
    password: "",
    role: "CONSUMER",
    dob: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await registerUser(formData);
    console.log("Registration success:", response.data);

    alert("Registration successful!");

    // later: redirect to login or dashboard
  } catch (error) {
    console.error("Registration failed:", error);

    alert(
      error.response?.data?.message ||
      "Registration failed. Please try again."
    );
  }
};


  return (
    <div style={pageStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Create Account
        </h2>

        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          name="mobile"
          placeholder="Mobile Number"
          value={formData.mobile}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="CONSUMER">Consumer</option>
          <option value="ORGANISER_EVENT">Event Organizer</option>
          <option value="ORGANISER_THEATRE">Theatre Owner</option>
        </select>

        <button type="submit" style={buttonStyle}>
          Register
        </button>
      </form>
    </div>
  );
}

/* ---------- styles ---------- */

const pageStyle = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#f5f5f5",
};

const formStyle = {
  width: "380px",
  padding: "24px",
  background: "white",
  borderRadius: "8px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "14px",
  borderRadius: "4px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#111",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  cursor: "pointer",
};
