// screens/reservada/SOSTela.js — tela SOS (Tab 2)
import { useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { criarAlerta } from "../../api";

const CONTATOS_EMERGENCIA = [
  { nome: "Ligue 180", numero: "180", descricao: "Central de Atendimento à Mulher" },
  { nome: "SAMU", numero: "192", descricao: "Serviço de Atendimento Móvel de Urgência" },
  { nome: "Polícia Militar", numero: "190", descricao: "Emergência policial" },
  { nome: "Bombeiros", numero: "193", descricao: "Emergências e resgates" },
  { nome: "Disque 100", numero: "100", descricao: "Direitos Humanos" },
];

const DEMO_USER_ID = 1;

export default function SOSTela() {
  const [enviando, setEnviando] = useState(false);

  function ligar(numero) {
    Linking.openURL(`tel:${numero}`);
  }

  async function dispararSOS() {
    if (enviando) return;

    const confirmar = await new Promise((resolve) => {
      Alert.alert(
        "Confirmar alerta demonstrativo",
        "Este alerta será registrado no protótipo para simulação acadêmica. Não será enviado para autoridades reais.",
        [
          { text: "Cancelar", style: "cancel", onPress: () => resolve(false) },
          { text: "Enviar alerta", onPress: () => resolve(true) },
        ]
      );
    });

    if (!confirmar) return;

    setEnviando(true);

    let latitude = -23.5505;
    let longitude = -46.6333;
    let simulada = true;

    try {
      const geolocation = globalThis.navigator?.geolocation;
      if (geolocation) {
        const pos = await new Promise((resolve, reject) => {
          geolocation.getCurrentPosition(resolve, reject, {
            timeout: 5000,
            enableHighAccuracy: true,
          });
        });

        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;
        simulada = false;
      }
    } catch {
      latitude = -23.5505;
      longitude = -46.6333;
      simulada = true;
    }

    try {
      await criarAlerta({
        usuario_id: DEMO_USER_ID,
        latitude,
        longitude,
        data_hora: new Date().toISOString(),
        status: "PENDENTE",
        tipo_alerta: "SOS",
        localizacao_simulada: simulada,
      });

      Alert.alert(
        "Alerta registrado",
        simulada
          ? "Alerta demonstrativo enviado com coordenadas fictícias."
          : "Alerta demonstrativo enviado com sua localização atual."
      );
    } catch (err) {
      Alert.alert("Erro ao registrar alerta", err.message || "Não foi possível enviar o alerta.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.sosIcon}>🆘</Text>
        <Text style={styles.title}>Ajuda Imediata</Text>
        <Text style={styles.subtitle}>
          Toque em qualquer número abaixo para ligar diretamente.
          Você não está sozinha.
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        disabled={enviando}
        onPress={dispararSOS}
        style={[styles.sosButton, enviando && styles.sosButtonDisabled]}
      >
        <Text style={styles.sosButtonText}>
          {enviando ? "Registrando alerta..." : "Enviar SOS demonstrativo"}
        </Text>
      </Pressable>

      <View style={styles.lista}>
        {CONTATOS_EMERGENCIA.map((contato) => (
          <Pressable
            key={contato.numero}
            accessibilityRole="button"
            accessibilityLabel={`Ligar para ${contato.nome} — ${contato.numero}`}
            onPress={() => ligar(contato.numero)}
            style={({ pressed }) => [
              styles.card,
              pressed && styles.cardPressed,
            ]}
          >
            <View style={styles.cardInfo}>
              <Text style={styles.cardNome}>{contato.nome}</Text>
              <Text style={styles.cardDesc}>{contato.descricao}</Text>
            </View>
            <Text style={styles.cardNumero}>{contato.numero}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.aviso}>
        <Text style={styles.avisoTexto}>
          Se estiver em perigo imediato, ligue para 190 (Polícia) ou 192 (SAMU).
          O Ligue 180 funciona 24 horas, é gratuito e sigiloso.
        </Text>
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
    marginBottom: 24,
  },
  sosIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    color: "#f4f7ff",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#6b7fa0",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
  },
  sosButton: {
    backgroundColor: "#e56565",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 18,
  },
  sosButtonDisabled: {
    opacity: 0.7,
  },
  sosButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  lista: {
    gap: 10,
  },
  card: {
    backgroundColor: "#111e31",
    borderColor: "#1d2d44",
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  cardPressed: {
    backgroundColor: "#1d2d44",
  },
  cardInfo: {
    flex: 1,
  },
  cardNome: {
    color: "#f4f7ff",
    fontSize: 16,
    fontWeight: "700",
  },
  cardDesc: {
    color: "#6b7fa0",
    fontSize: 12,
    marginTop: 3,
  },
  cardNumero: {
    color: "#79e3d1",
    fontSize: 22,
    fontWeight: "700",
    marginLeft: 12,
  },
  aviso: {
    backgroundColor: "#1a0a0a",
    borderColor: "#ff9c9c33",
    borderRadius: 14,
    borderWidth: 1,
    marginTop: 20,
    padding: 14,
  },
  avisoTexto: {
    color: "#ff9c9c",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },
});
