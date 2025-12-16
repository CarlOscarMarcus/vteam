import { Text, Button, Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import ThemedView from "../../components/ThemedView";

export default function PayReceipt() {
  const { id, cost } = useLocalSearchParams();

  const pay = () => {
    Alert.alert(
      "Betalning genomförd",
      `Kvitto #${id} på ${cost} kr är nu betalt (simulerat).`
    );
    router.back();
  };

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Betala kvitto #{id}
      </Text>
      <Text>Belopp: {cost} kr</Text>

      <Button title="Betala" onPress={pay} />
    </ThemedView>
  );
}
