// screens/reservada/SobreTela.js — tela "Sobre o App" acessada pelo Drawer
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { sair } from "../../store/authSlice";

export default function SobreTela() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  function sairDaArea() {
    dispatch(sair());
    // Volta para a raiz da navegação Stack (tela de clima)
    navigation.navigate("DisfarceStack");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.icon}>🌸</Text>
        <Text style={styles.title}>Sobre este Aplicativo</Text>
        <Text style={styles.subtitle}>Projeto Integrador — Apoio à Mulher</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>O que é este app?</Text>
          <Text style={styles.text}>
            Por fora, o Weather Now parece um simples aplicativo de previsão do tempo.
            Por dentro, é uma ferramenta segura e discreta para que mulheres em situação
            de violência possam registrar ocorrências e acessar contatos de emergência.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como funciona o acesso?</Text>
          <Text style={styles.text}>
            Toque 5 vezes na cidade "Londrina" na tela de clima para abrir a entrada
            protegida. Digite o PIN de 4 dígitos para entrar na área reservada.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacidade</Text>
          <Text style={styles.text}>
            Nenhum dado é enviado para terceiros. Todos os registros ficam armazenados
            localmente no banco de dados configurado pelo grupo. Não há rastreamento,
            anúncios ou compartilhamento de informações.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipe</Text>
          <Text style={styles.text}>
            Projeto desenvolvido por estudantes do curso de Análise e Desenvolvimento
            de Sistemas como trabalho acadêmico do Projeto Integrador — 2º Semestre 2026.
          </Text>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={sairDaArea}
          style={styles.sairBtn}
        >
          <Text style={styles.sairText}>Sair da Área Reservada</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#07111f",
  },
  scroll: {
    padding: 24,
    paddingBottom: 40,
  },
  icon: {
    fontSize: 48,
    textAlign: "center",
    marginBottom: 12,
  },
  title: {
    color: "#f4f7ff",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    color: "#79e3d1",
    fontSize: 13,
    textAlign: "center",
    marginBottom: 28,
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: "#111e31",
    borderColor: "#1d2d44",
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#79e3d1",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  text: {
    color: "#a5b4cc",
    fontSize: 14,
    lineHeight: 22,
  },
  sairBtn: {
    backgroundColor: "#1a0a0a",
    borderColor: "#ff9c9c55",
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 14,
  },
  sairText: {
    color: "#ff9c9c",
    fontSize: 15,
    fontWeight: "600",
  },
});
