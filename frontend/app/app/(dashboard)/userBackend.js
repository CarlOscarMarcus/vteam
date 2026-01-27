import { getToken } from "../../components/Token.jsx";

// Cornelias dator
const backendURL = "192.168.32.7";

// min dator
// const backendURL = "192.168.68.107";

export async function fetchCurrentUser() {
  const token = await getToken();

  if (!token) {
    throw new Error("Ingen token");
  }

  const res = await fetch(`http://${backendURL}:3000/api/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Kunde inte hämta användaren.");
  }

  return res.json();
}
