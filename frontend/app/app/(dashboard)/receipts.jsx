// app/(dashboard)/receipts.jsx
import { StyleSheet, Text, Pressable, FlatList, Button, Alert, Keyboard } from "react-native";
import { useEffect, useState } from "react";
import { getToken } from "../../components/Token.jsx";
import ThemedView from "../../components/ThemedView";

const backendURL = "192.168.32.7";

export default function Receipts({ onBalanceUpdate }) {
  const [receipts, setReceipts] = useState([]);

  useEffect(() => {
    loadReceipts();
  }, []);

  const loadReceipts = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`http://${backendURL}:3000/api/receipts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setReceipts(data);
    } catch (err) {
      console.error("Failed to load receipts", err);
    }
  };

  const payReceipt = async (id) => {
    Keyboard.dismiss(); // Stänger tangentbordet om öppet
    try {
      const token = await getToken();
      const res = await fetch(`http://${backendURL}:3000/api/receipts/${id}/pay`, {
        method: "POST",
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Betalning misslyckades");
      }

      const data = await res.json();

      Alert.alert("Betalning genomförd", `Kvitto #${id} är nu betalt.`);

      // Uppdatera kvitton i state
      setReceipts((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, payment: r.cost } : r
        )
      );

      // Uppdatera saldo i förälder / global state om callback finns
      if (onBalanceUpdate) {
        onBalanceUpdate(prev => prev - data.paid);
      }

    } catch (err) {
      Alert.alert("Fel", err.message);
    }
  };

  const renderReceipt = ({ item }) => {
    const remaining = item.cost - item.payment;
    const paid = remaining <= 0;

    return (
      <Pressable style={styles.card}>
        <Text style={styles.cardTitle}>Kvitto #{item.id}</Text>
        <Text>Belopp: {item.cost} kr</Text>
        <Text>Betalt: {item.payment} kr</Text>
        {!paid && <Text>Återstående: {remaining} kr</Text>}
        <Text style={[styles.status, { color: paid ? "#2e7d32" : "#c62828" }]}>
          {paid ? "✔ Betald" : "⏳ Obetald / Delvis betald"}
        </Text>
        {!paid && (
          <Button title={`Betala ${remaining} kr`} onPress={() => payReceipt(item.id)} />
        )}
      </Pressable>
    );
  };

  const sortedReceipts = [...receipts].sort((a, b) => (a.payment < a.cost ? -1 : 1));

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>📄 Kvitton</Text>
      {sortedReceipts.length === 0 ? (
        <Text>Inga kvitton!</Text>
      ) : (
        <FlatList
          data={sortedReceipts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderReceipt}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  card: { backgroundColor: "#f5f5f5", padding: 16, borderRadius: 12, marginBottom: 12 },
  cardTitle: { fontWeight: "bold", fontSize: 16, marginBottom: 6 },
  status: { marginTop: 8, fontWeight: "bold" },
});
