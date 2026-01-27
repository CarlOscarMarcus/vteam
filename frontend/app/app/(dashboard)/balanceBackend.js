import { getToken } from "../../components/Token.jsx";

const backendURL = "192.168.32.7";

export async function fetchBalanceBackend() {
  const token = await getToken();

  const res = await fetch(`http://${backendURL}:3000/api/users/balance`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Kunde inte hämta saldo");
  }

  const data = await res.json();
  return data.balance;
}

export async function topUpBalanceBackend(amount) {
  const parsedAmount = parseFloat(amount);

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    throw new Error("Ange ett giltigt belopp att fylla på");
  }

  const token = await getToken();

  const res = await fetch(`http://${backendURL}:3000/api/users/balance/topup`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: parsedAmount }),
  });

  if (!res.ok) {
    throw new Error("Påfyllning misslyckades");
  }

  const data = await res.json();
  return data.balance;
}
