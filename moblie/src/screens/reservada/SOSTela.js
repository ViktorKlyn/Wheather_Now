// screens/reservada/SOSTela.js — tela SOS (Tab 2)
import {
  Linking,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const CONTATOS_EMERGENCIA = [
  { nome: "Ligue 180", numero: "180", descricao: "Central de Atendimento à Mulher" },
  { nome: "SAMU", numero: "192", descricao: "Serviço de Atendimento Móvel de Urgência" },
  { nome: "Polícia Militar", numero: "190", descricao: "Emergência policial" },
  { nome: "Bombeiros", numero: "193", descricao: "Emergências e resgates" },
  { nome: "Disque 100", numero: "100", descricao: "Direitos Humanos" },
];

export default function SOSTela() {
  function ligar(numero) {
    Linking.openURL(`tel:${numero}`);
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
