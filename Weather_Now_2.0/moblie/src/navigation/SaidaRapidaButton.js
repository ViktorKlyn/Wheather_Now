import { Pressable, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { sair } from "../store/authSlice";

export default function SaidaRapidaButton() {
  const dispatch = useDispatch();

  return (
    <Pressable
      accessibilityLabel="Saída rápida para o aplicativo de clima"
      accessibilityRole="button"
      onPress={() => dispatch(sair())}
      style={styles.button}
      testID="quick-exit"
    >
      <Text style={styles.label}>Sair</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1a0a0a",
    borderColor: "#ff9c9c55",
    borderRadius: 10,
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  label: {
    color: "#ff9c9c",
    fontSize: 13,
    fontWeight: "700",
  },
});
