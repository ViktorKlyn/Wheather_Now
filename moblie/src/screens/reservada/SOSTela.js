// screens/reservada/SOSTela.js — tela SOS (Tab 2)
import { useRef, useState } from "react";
import {
  Alert,
  Linking,
  Pressable,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import { criarAlerta } from "../../api";
import SaidaRapidaButton from "../../navigation/SaidaRapidaButton";

const CONTATOS_EMERGENCIA = [
  { nome: "Ligue 180", numero: "180", descricao: "Central de Atendimento à Mulher" },
  { nome: "SAMU", numero: "192", descricao: "Serviço de Atendimento Móvel de Urgência" },
  { nome: "Polícia Militar", numero: "190", descricao: "Emergência policial" },
  { nome: "Bombeiros", numero: "193", descricao: "Emergências e resgates" },
  { nome: "Disque 100", numero: "100", descricao: "Direitos Humanos" },
];

const COORDENADAS_DEMONSTRACAO = {
  latitude: -23.5505,
  longitude: -46.6333,
};

export default function SOSTela() {
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const envioEmAndamento = useRef(false);

  function ligar(numero) {
    Linking.openURL(`tel:${numero}`);
  }

  function confirmarEnvio() {
    const texto =
      "Este alerta será registrado apenas no protótipo acadêmico. Nada será enviado para autoridades ou serviços reais de emergência.";

    if (Platform.OS === "web") {
      return Promise.resolve(globalThis.confirm(texto));
    }

    return new Promise((resolve) => {
      Alert.alert("Confirmar alerta demonstrativo", texto, [
        { text: "Cancelar", style: "cancel", onPress: () => resolve(false) },
        { text: "Registrar", onPress: () => resolve(true) },
      ]);
    });
  }

  async function obterLocalizacao() {
    const permissao = await Location.requestForegroundPermissionsAsync();
    if (permissao.status !== "granted") {
      return {
        ...COORDENADAS_DEMONSTRACAO,
        simulada: true,
        motivo: "Permissão de localização negada; foram usadas coordenadas fictícias.",
      };
    }

    let timer;
    try {
      const posicao = await Promise.race([
        Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        }),
        new Promise((_, reject) => {
          timer = setTimeout(
            () => reject(new Error("Tempo limite ao obter localização.")),
            10000
          );
        }),
      ]);
      return {
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
        simulada: false,
        motivo: "",
      };
    } finally {
      clearTimeout(timer);
    }
  }

  async function dispararSOS() {
    if (envioEmAndamento.current) return;
    envioEmAndamento.current = true;
    setEnviando(true);
    setMensagem("");

    try {
      if (!(await confirmarEnvio())) return;

      let localizacao;
      try {
        localizacao = await obterLocalizacao();
      } catch {
        localizacao = {
          ...COORDENADAS_DEMONSTRACAO,
          simulada: true,
          motivo: "Não foi possível obter a localização; foram usadas coordenadas fictícias.",
        };
      }

      await criarAlerta({
        latitude: localizacao.latitude,
        longitude: localizacao.longitude,
        data_hora: new Date().toISOString(),
        status: "PENDENTE",
        tipo_alerta: "SOS",
        localizacao_simulada: localizacao.simulada,
      });

      setMensagem(
        localizacao.simulada
          ? `Alerta demonstrativo registrado. ${localizacao.motivo}`
          : "Alerta demonstrativo registrado com sua localização atual."
      );
    } catch (err) {
      setMensagem(
        `Erro ao registrar alerta: ${err.message || "não foi possível concluir a operação."}`
      );
    } finally {
      envioEmAndamento.current = false;
      setEnviando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.quickExit}>
        <SaidaRapidaButton />
      </View>
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
      {mensagem ? (
        <Text accessibilityRole="alert" style={styles.mensagem}>
          {mensagem}
        </Text>
      ) : null}

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
  quickExit: {
    alignItems: "flex-end",
    marginBottom: 8,
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
  mensagem: {
    color: "#dce5f4",
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 14,
    textAlign: "center",
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
