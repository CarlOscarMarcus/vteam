import { getToken } from "../../components/Token";

const backendURL = "192.168.32.7";

export async function fetchReceipts() {
  const token = await getToken();

  const res = await fetch(`http://${backendURL}:3000/api/receipts`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Kunde inte hämta kvitton");
  }

  return res.json();
}

export async function payReceiptBackend(id) {
  const token = await getToken();

  const res = await fetch(
    `http://${backendURL}:3000/api/receipts/${id}/pay`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Betalning misslyckades");
  }

  const data = await res.json();
  return data.paid;
}
