// historik över kundens resor
import React, { Component }  from 'react';
import { useEffect, useState, useCallback } from "react";
import { useAuth } from '../context';


const API_URL = import.meta.env.VITE_API_URL;

export default function History() {
  const { token } = useAuth();
  const [history, setHistory] = useState([]);



  const loadHistory = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Kunde inte hämta historik");

      const data = await res.json();
      setHistory(data);
    } catch (err) {
      console.error("Failed to load history", err);
      alert(err.message);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    loadHistory();
  }, [token, loadHistory]);
  
  // Sortera senaste resan först
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  return (
    <main style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>📄 Historik över dina resor</h1>

      {sortedHistory.length === 0 ? (
        <p>Ingen historik!</p>
      ) : (
        sortedHistory.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#f5f5f5",
              padding: "16px",
              borderRadius: "12px",
              marginBottom: "12px",
            }}
          >
            <h2 style={{ margin: 0, marginBottom: "6px" }}>Resa #{item.id}</h2>
            <p>Datum: {new Date(item.date).toLocaleString("sv-SE")}</p>
            <p>Start: {item.start_location}</p>
            <p>Slut: {item.end_location}</p>
          </div>
        ))
      )}
    </main>
  );
}