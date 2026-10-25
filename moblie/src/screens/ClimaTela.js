// screens/ClimaTela.js — tela de disfarce (previsão do tempo)
import { useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TOQUES_NECESSARIOS = 5;

export default function ClimaTela() {
  const navigation = useNavigation();
  const [toques, setToques] = useState(0);

  function tocarCidade() {
    const novoTotal = toques + 1;
    if (novoTotal >= TOQUES_NECESSARIOS) {
      setToques(0);
      // Navega para a tela de PIN (Stack sobre o Tab)
      navigation.navigate("Pin");
    } else {
      setToques(novoTotal);
    }
  }

  // Dados fictícios de previsão — disfarce do aplicativo
  const previsao = [
    { dia: "Seg", icon: "☀️", max: 28, min: 18 },
    { dia: "Ter", icon: "⛅", max: 25, min: 17 },
    { dia: "Qua", icon: "🌧️", max: 20, min: 14 },
    { dia: "Qui", icon: "🌤️", max: 24, min: 16 },
    { dia: "Sex", icon: "☀️", max: 29, min: 19 },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.caption}>PREVISÃO DO TEMPO</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Toque cinco vezes para acessar a área protegida"
          onPress={tocarCidade}
        >
          <Text style={styles.city}>Londrina</Text>
        </Pressable>
        <Text style={styles.state}>Paraná, Brasil</Text>
      </View>

      <View style={styles.main}>
        <Text style={styles.weatherIcon}>☁️</Text>
        <Text style={styles.temperature}>22°</Text>
        <Text style={styles.condition}>Parcialmente nublado</Text>
        <Text style={styles.details}>Máx. 25°  ·  Mín. 18°  ·  Umidade 72%</Text>
      </View>

      <View style={styles.forecast}>
        <Text style={styles.forecastTitle}>Próximos dias</Text>
        <View style={styles.forecastRow}>
          {previsao.map((item) => (
            <View key={item.dia} style={styles.forecastItem}>
              <Text style={styles.forecastDay}>{item.dia}</Text>
              <Text style={styles.forecastIcon}>{item.icon}</Text>
              <Text style={styles.forecastMax}>{item.max}°</Text>
              <Text style={styles.forecastMin}>{item.min}°</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.extras}>
        <View style={styles.extraCard}>
          <Text style={styles.extraLabel}>💨  Vento</Text>
          <Text style={styles.extraValue}>14 km/h</Text>
        </View>
        <View style={styles.extraCard}>
          <Text style={styles.extraLabel}>💧  Chuva</Text>
          <Text style={styles.extraValue}>12%</Text>
        </View>
        <View style={styles.extraCard}>
          <Text style={styles.extraLabel}>👁  Visib.</Text>
          <Text style={styles.extraValue}>10 km</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#07111f",
    padding: 20,
  },
  header: {
    alignItems: "center",
    paddingTop: 16,
  },
  caption: {
    color: "#a5b4cc",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 8,
  },
  city: {
    color: "#f4f7ff",
    fontSize: 30,
    fontWeight: "700",
  },
  state: {
    color: "#6b7fa0",
    fontSize: 14,
    marginTop: 4,
  },
  main: {
    alignItems: "center",
    paddingVertical: 32,
  },
  weatherIcon: {
    fontSize: 72,
  },
  temperature: {
    color: "#f4f7ff",
    fontSize: 86,
    fontWeight: "200",
    lineHeight: 90,
  },
  condition: {
    color: "#dce5f4",
    fontSize: 18,
    marginTop: 8,
  },
  details: {
    color: "#6b7fa0",
    fontSize: 13,
    marginTop: 8,
  },
  forecast: {
    backgroundColor: "#111e31",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },
  forecastTitle: {
    color: "#a5b4cc",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 12,
  },
  forecastRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  forecastItem: {
    alignItems: "center",
  },
  forecastDay: {
    color: "#6b7fa0",
    fontSize: 12,
    fontWeight: "600",
  },
  forecastIcon: {
    fontSize: 22,
    marginVertical: 4,
  },
  forecastMax: {
    color: "#f4f7ff",
    fontSize: 14,
    fontWeight: "600",
  },
  forecastMin: {
    color: "#6b7fa0",
    fontSize: 13,
  },
  extras: {
    flexDirection: "row",
    gap: 10,
  },
  extraCard: {
    flex: 1,
    backgroundColor: "#111e31",
    borderRadius: 14,
    padding: 14,
    alignItems: "center",
  },
  extraLabel: {
    color: "#6b7fa0",
    fontSize: 12,
    marginBottom: 6,
  },
  extraValue: {
    color: "#f4f7ff",
    fontSize: 16,
    fontWeight: "600",
  },
});
