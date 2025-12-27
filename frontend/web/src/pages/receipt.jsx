import { useEffect, useState } from "react";
import { useAuth } from "../context/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Receipts({ onBalanceUpdate }) {
  const { token } = useAuth();
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    if (!token) return;
    loadReceipts();
  }, [token]);

  const loadReceipts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/receipts`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Kunde inte hämta kvitton");

      const data = await res.json();
      setReceipts(data);
    } catch (err) {
      console.error("Failed to load receipts", err);
      alert(err.message);
    }
  };

  const payReceipt = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/receipts/${id}/pay`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Betalning misslyckades");
      }

      const data = await res.json();

      alert(`Kvitto #${id} är nu betalt.`);

      // Uppdatera kvitton i state
      setReceipts((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, payment: r.cost } : r
        )
      );

      // Uppdatera saldo i förälder / global state om callback finns
      if (onBalanceUpdate) {
        onBalanceUpdate((prev) => prev - data.paid);
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const sortedReceipts = [...receipts].sort((a, b) =>
    a.payment < a.cost ? -1 : 1
  );

  return (
    <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>📄 Kvitton</h1>
      {sortedReceipts.length === 0 ? (
        <p>Inga kvitton!</p>
      ) : (
        sortedReceipts.map((item) => {
          const remaining = item.cost - item.payment;
          const paid = remaining <= 0;

          return (
            <div
              key={item.id}
              style={{
                backgroundColor: "#f5f5f5",
                padding: "16px",
                borderRadius: "12px",
                marginBottom: "12px",
              }}
            >
              <h2 style={{ margin: 0, marginBottom: "6px" }}>Kvitto #{item.id}</h2>
              <p>Belopp: {item.cost} kr</p>
              <p>Betalt: {item.payment} kr</p>
              {!paid && <p>Återstående: {remaining} kr</p>}
              <p style={{ marginTop: "8px", fontWeight: "bold", color: paid ? "#2e7d32" : "#c62828" }}>
                {paid ? "✔ Betald" : "⏳ Obetald / Delvis betald"}
              </p>
              {!paid && (
                <button
                  className="button-link"
                  onClick={() => payReceipt(item.id)}
                >
                  Betala {remaining} kr
                </button>
              )}
            </div>
          );
        })
      )}
    </main>
  );
}
