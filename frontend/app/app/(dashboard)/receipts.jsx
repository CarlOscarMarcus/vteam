import { View, Text, Pressable } from "react-native";
import { router } from "expo-router";
import ThemedView from "../../components/ThemedView";

export default function Receipts() {
  const receipts = [
    { id: 1, cost: 120, status: 0 },
    { id: 2, cost: 85, status: 1 },
  ];

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Kvitton</Text>

      {receipts.map(receipt => (
        <Pressable
          key={receipt.id}
          onPress={() =>
            router.push({
              pathname: "/pay-receipt",
              params: {
                id: receipt.id,
                cost: receipt.cost,
              },
            })
          }
        >
          <Text style={{ marginTop: 10 }}>
            Kvitto #{receipt.id} – {receipt.cost} kr –{" "}
            {receipt.status === 0 ? "Obetald" : "Betald"}
          </Text>
        </Pressable>
      ))}
    </ThemedView>
  );
}
