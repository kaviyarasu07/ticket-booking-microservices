export function redirectByRole(role, navigate) {
  if (role === "EVENT_ORGANIZER") {
    navigate("/organizer", { replace: true });
  } else if (role === "THEATRE_OWNER") {
    navigate("/theatre", { replace: true });
  } else {
    navigate("/", { replace: true }); // CONSUMER
  }
}
