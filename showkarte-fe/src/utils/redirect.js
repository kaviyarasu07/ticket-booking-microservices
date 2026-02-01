export function redirectByRole(role, navigate) {
  if (role === "ADMIN") navigate("/admin");
  else if (role === "ORGANIZER") navigate("/organizer");
  else if (role === "THEATER") navigate("/theater");
  else navigate("/");
}
