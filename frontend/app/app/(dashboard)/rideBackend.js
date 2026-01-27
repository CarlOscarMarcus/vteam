import { getToken } from "../../components/Token.jsx";

// Cornelias dator
const backendURL = "192.168.32.7";

// min dator
// const backendURL = "192.168.68.107";

export async function endRideBackend(scooterId) {
  const token = await getToken();

  const res = await fetch(`http://${backendURL}:3000/api/rent/end`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ scooterId }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Kunde inte avsluta resa");
  }

  return data.receipt;
}
