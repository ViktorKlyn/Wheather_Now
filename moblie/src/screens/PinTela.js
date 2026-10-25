// screens/PinTela.js — tela de acesso via PIN (Stack navigation)
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { validarPin, limparErroAuth } from "../store/authSlice";

export default function PinTela() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { autenticado, erro } = useSelector((s) => s.auth);

  const [pinDigitado, setPinDigitado] = useState("");

  function tentarEntrar() {
    dispatch(validarPin(pinDigitado));
    setPinDigitado("");
  }

  // Quando autenticado, vai para a área reservada (substitui a pilha)
  if (autenticado) {
    navigation.replace("Reservada");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        <Text style={styles.lockIcon}>🔒</Text>
        <Text style={styles.title}>Área Protegida</Text>
        <Text style={styles.subtitle}>Digite o PIN de 4 dígitos para continuar.</Text>

        <TextInput
          accessibilityLabel="PIN de acesso"
          autoFocus
          keyboardType="number-pad"
          maxLength={4}
          onChangeText={(v) => {
            dispatch(limparErroAuth());
            setPinDigitado(v);
          }}
          onSubmitEditing={tentarEntrar}
          placeholder="• • • •"
          placeholderTextColor="#30425d"
          secureTextEntry
          style={styles.input}
          value={pinDigitado}
        />

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}

        <Pressable
          accessibilityRole="button"
          onPress={tentarEntrar}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.goBack()}
          style={[styles.button, styles.secondaryButton]}
        >
          <Text style={styles.secondaryText}>Cancelar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#07111f",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#111e31",
    borderColor: "#263750",
    borderRadius: 22,
    borderWidth: 1,
    padding: 28,
    alignItems: "center",
  },
  lockIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  title: {
    color: "#f4f7ff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6b7fa0",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#0b1525",
    borderColor: "#30425d",
    borderRadius: 14,
    borderWidth: 1,
    color: "#f4f7ff",
    fontSize: 24,
    letterSpacing: 8,
    marginBottom: 16,
    paddingHorizontal: 20,
    paddingVertical: 14,
    textAlign: "center",
    width: "100%",
  },
  erro: {
    color: "#ff9c9c",
    fontSize: 13,
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#79e3d1",
    borderRadius: 14,
    marginTop: 8,
    paddingVertical: 14,
    width: "100%",
  },
  buttonText: {
    color: "#071a25",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#1d2d44",
  },
  secondaryText: {
    color: "#dce5f4",
    fontSize: 16,
    fontWeight: "600",
  },
});
