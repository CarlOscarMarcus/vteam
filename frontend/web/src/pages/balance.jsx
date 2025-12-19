import { useEffect, useState } from "react";
import { useAuth } from "../context/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Balance() {
  const { token } = useAuth();
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (!token) return;
    fetchBalance();
  }, [token]);

  const fetchBalance = async () => {
    try {
      const res = await fetch(`${API_URL}/api/users/balance`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Kunde inte hämta saldo");

      const data = await res.json();
      setBalance(data.balance);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const topUpBalance = async () => {
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
        alert("Ange ett giltigt belopp (större än 0)");
        return;
    }

    try {
        const res = await fetch(`${API_URL}/api/users/balance/topup`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: parsedAmount }),
        });

        if (!res.ok) throw new Error("Påfyllning misslyckades");

        const data = await res.json();
        setBalance(data.balance);
        setAmount("");
        alert(`Ditt nya saldo är ${data.balance} kr`);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
    };


  return (
    <main>
      <h1>💰 Ditt saldo</h1>
      <p>
        <strong>{balance} kr</strong>
      </p>

      <label htmlFor="amount">Fyll på saldo</label>
      <br />

      <input
        id="amount"
        type="number"
        placeholder="Belopp i kr"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        min="0"
      />
      <br /><br />

      <button className="button-link" onClick={topUpBalance}>
        Fyll på
      </button>
    </main>
  );
}
