import { StyleSheet, Text, Pressable, FlatList, Button, Alert, Keyboard } from "react-native";
import { useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import ThemedView from "../../components/ThemedView";
import {
  fetchReceipts,
  payReceiptBackend,
} from "./receiptsBackend";

export default function Receipts({ onBalanceUpdate }) {
  const [receipts, setReceipts] = useState([]);

  useFocusEffect(
    useCallback(() => {
      loadReceipts();
    }, [])
  );

  const loadReceipts = async () => {
    try {
      const data = await fetchReceipts();
      setReceipts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const payReceipt = async (id, cost) => {
    Keyboard.dismiss();

    try {
      const paid = await payReceiptBackend(id);

      Alert.alert("Betalning genomförd", `Kvitto #${id} är nu betalt.`);

      setReceipts(prev =>
        prev.map(r =>
          r.id === id ? { ...r, payment: cost } : r
        )
      );

      if (onBalanceUpdate) {
        onBalanceUpdate(prev => prev - paid);
      }
    } catch (err) {
      Alert.alert("Fel", err.message);
    }
  };

  const renderReceipt = ({ item }) => {
    const paid = item.payment >= item.cost;

    return (
      <Pressable style={styles.card}>
        <Text style={styles.cardTitle}>Kvitto #{item.id}</Text>
        <Text>Belopp: {item.cost} kr</Text>

        <Text style={[
          styles.status,
          { color: paid ? "#2e7d32" : "#c62828" }
        ]}>
          {paid ? "✔ Betald" : "⏳ Obetald"}
        </Text>

        {!paid && (
          <Button
            title={`Betala ${item.cost} kr`}
            onPress={() => payReceipt(item.id, item.cost)}
          />
        )}
      </Pressable>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <Text style={styles.title}>📄 Kvitton</Text>

      {receipts.length === 0
        ? <Text>Inga kvitton!</Text>
        : <FlatList
            data={receipts}
            keyExtractor={item => item.id.toString()}
            renderItem={renderReceipt}
          />
      }
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