import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  atualizarOcorrencia,
  criarOcorrencia,
  excluirOcorrencia,
  listarOcorrencias,
} from "./src/api";

const PIN_PADRAO = "1234";
const hoje = () => {
  const dataAtual = new Date();
  const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
  const dia = String(dataAtual.getDate()).padStart(2, "0");
  return `${dataAtual.getFullYear()}-${mes}-${dia}`;
};

export default function App() {
  const [tela, setTela] = useState("clima");
  const [toques, setToques] = useState(0);
  const [pin, setPin] = useState("");
  const [ocorrencias, setOcorrencias] = useState([]);
  const [ocorrenciaEditando, setOcorrenciaEditando] = useState(null);
  const [data, setData] = useState(hoje());
  const [descricao, setDescricao] = useState("");
  const [usuarioId, setUsuarioId] = useState("1");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  function tocarCidade() {
    if (toques >= 4) {
      setToques(0);
      setPin("");
      setErro("");
      setTela("pin");
      return;
    }
    setToques((quantidade) => quantidade + 1);
  }

  function validarPin() {
    if (pin === PIN_PADRAO) {
      setPin("");
      setErro("");
      setTela("menu");
    } else {
      setErro("PIN incorreto.");
      setPin("");
    }
  }

  async function abrirLista() {
    setTela("lista");
    setCarregando(true);
    setErro("");
    try {
      setOcorrencias(await listarOcorrencias());
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  function abrirFormulario(ocorrencia = null) {
    setOcorrenciaEditando(ocorrencia);
    setData(ocorrencia?.data?.slice(0, 10) || hoje());
    setDescricao(ocorrencia?.descricao || "");
    setUsuarioId(String(ocorrencia?.usuario_id ?? 1));
    setErro("");
    setTela("formulario");
  }

  async function salvarOcorrencia() {
    setCarregando(true);
    setErro("");
    try {
      const valores = {
        data,
        descricao: descricao.trim(),
        usuario_id: Number(usuarioId),
      };
      if (ocorrenciaEditando) {
        await atualizarOcorrencia(ocorrenciaEditando.id, valores);
      } else {
        await criarOcorrencia(valores);
      }
      setTela("menu");
    } catch (error) {
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  function confirmarExclusao(id) {
    Alert.alert("Excluir ocorrência", "Deseja excluir este registro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          setErro("");
          try {
            await excluirOcorrencia(id);
            setOcorrencias((lista) => lista.filter((item) => item.id !== id));
          } catch (error) {
            setErro(error.message);
          }
        },
      },
    ]);
  }

  function voltarAoMenu() {
    setErro("");
    setTela("menu");
  }

  function mostrarErro() {
    return erro ? <Text style={styles.error}>{erro}</Text> : null;
  }

  function botao(label, onPress, secondary = false) {
    return (
      <Pressable
        key={label}
        accessibilityRole="button"
        onPress={onPress}
        style={[styles.button, secondary && styles.secondaryButton]}
      >
        <Text style={[styles.buttonText, secondary && styles.secondaryText]}>
          {label}
        </Text>
      </Pressable>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.container}>
        {tela === "clima" && (
          <View style={styles.weather}>
            <Text style={styles.caption}>PREVISÃO DO TEMPO</Text>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Toque cinco vezes para abrir a área secreta"
              onPress={tocarCidade}
            >
              <Text style={styles.city}>Londrina</Text>
            </Pressable>
            <Text style={styles.weatherIcon}>☁️</Text>
            <Text style={styles.temperature}>22°</Text>
            <Text style={styles.condition}>Parcialmente nublado</Text>
            <Text style={styles.details}>Máx. 25°  ·  Mín. 18°</Text>
          </View>
        )}

        {tela === "pin" && (
          <View style={styles.card}>
            <Text style={styles.title}>Acesso reservado</Text>
            <Text style={styles.subtitle}>Digite seu PIN para continuar.</Text>
            <TextInput
              accessibilityLabel="PIN"
              autoFocus
              keyboardType="number-pad"
              maxLength={4}
              onChangeText={setPin}
              onSubmitEditing={validarPin}
              secureTextEntry
              style={styles.input}
              value={pin}
            />
            {mostrarErro()}
            {botao("Entrar", validarPin)}
            {botao("Voltar", () => setTela("clima"), true)}
          </View>
        )}

        {tela === "menu" && (
          <View style={styles.card}>
            <Text style={styles.caption}>ÁREA RESERVADA</Text>
            <Text style={styles.title}>Menu Secreto</Text>
            {mostrarErro()}
            {botao("Nova Ocorrência", () => abrirFormulario())}
            {botao("Lista de Ocorrências", abrirLista, true)}
            {botao("SOS", () =>
              Alert.alert("SOS", "Botão SOS acionado."),
            )}
            {botao("Voltar para o clima", () => setTela("clima"), true)}
          </View>
        )}

        {tela === "formulario" && (
          <View style={styles.card}>
            <Text style={styles.title}>
              {ocorrenciaEditando ? "Editar Ocorrência" : "Nova Ocorrência"}
            </Text>
            <Text style={styles.label}>Data (AAAA-MM-DD)</Text>
            <TextInput
              accessibilityLabel="Data da ocorrência"
              onChangeText={setData}
              placeholder="AAAA-MM-DD"
              placeholderTextColor="#8b9bb4"
              style={styles.input}
              value={data}
            />
            <Text style={styles.label}>Descrição</Text>
            <TextInput
              accessibilityLabel="Descrição da ocorrência"
              multiline
              onChangeText={setDescricao}
              placeholder="Descreva a ocorrência"
              placeholderTextColor="#8b9bb4"
              style={[styles.input, styles.multilineInput]}
              value={descricao}
            />
            <Text style={styles.label}>ID do usuário</Text>
            <TextInput
              accessibilityLabel="ID do usuário"
              keyboardType="number-pad"
              onChangeText={setUsuarioId}
              style={styles.input}
              value={usuarioId}
            />
            {mostrarErro()}
            {carregando ? (
              <ActivityIndicator color="#79e3d1" />
            ) : (
              botao("Salvar", salvarOcorrencia)
            )}
            {botao("Voltar ao menu", voltarAoMenu, true)}
          </View>
        )}

        {tela === "lista" && (
          <View style={styles.card}>
            <Text style={styles.title}>Ocorrências</Text>
            {carregando && <ActivityIndicator color="#79e3d1" />}
            {mostrarErro()}
            {!carregando && ocorrencias.length === 0 && (
              <Text style={styles.subtitle}>Nenhuma ocorrência cadastrada.</Text>
            )}
            {ocorrencias.map((item) => (
              <View key={item.id} style={styles.occurrence}>
                <Text style={styles.occurrenceDate}>
                  {String(item.data).slice(0, 10)}
                </Text>
                <Text style={styles.occurrenceDescription}>
                  {item.descricao}
                </Text>
                <Text style={styles.occurrenceDate}>
                  Usuário #{item.usuario_id}
                </Text>
                <View style={styles.actions}>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => abrirFormulario(item)}
                  >
                    <Text style={styles.actionText}>Editar</Text>
                  </Pressable>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => confirmarExclusao(item.id)}
                  >
                    <Text style={styles.deleteText}>Excluir</Text>
                  </Pressable>
                </View>
              </View>
            ))}
            {botao("Voltar ao menu", voltarAoMenu, true)}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#07111f",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  weather: {
    alignItems: "center",
    paddingVertical: 48,
  },
  caption: {
    color: "#a5b4cc",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 16,
  },
  city: {
    color: "#f4f7ff",
    fontSize: 27,
    fontWeight: "600",
  },
  weatherIcon: {
    fontSize: 76,
    marginTop: 42,
  },
  temperature: {
    color: "#f4f7ff",
    fontSize: 88,
    fontWeight: "300",
  },
  condition: {
    color: "#f4f7ff",
    fontSize: 19,
  },
  details: {
    color: "#a5b4cc",
    fontSize: 15,
    marginTop: 10,
  },
  card: {
    backgroundColor: "#111e31",
    borderColor: "#263750",
    borderRadius: 22,
    borderWidth: 1,
    padding: 22,
  },
  title: {
    color: "#f4f7ff",
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 12,
  },
  subtitle: {
    color: "#a5b4cc",
    fontSize: 15,
    marginBottom: 16,
  },
  label: {
    color: "#dce5f4",
    fontSize: 14,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: "#0b1525",
    borderColor: "#30425d",
    borderRadius: 12,
    borderWidth: 1,
    color: "#f4f7ff",
    fontSize: 17,
    marginBottom: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#79e3d1",
    borderRadius: 14,
    marginTop: 12,
    padding: 15,
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
    color: "#e3ebf7",
  },
  error: {
    color: "#ff9c9c",
    fontSize: 14,
    marginBottom: 8,
  },
  occurrence: {
    backgroundColor: "#0b1525",
    borderRadius: 14,
    marginTop: 12,
    padding: 14,
  },
  occurrenceDate: {
    color: "#a5b4cc",
    fontSize: 13,
  },
  occurrenceDescription: {
    color: "#f4f7ff",
    fontSize: 16,
    marginVertical: 8,
  },
  actions: {
    borderTopColor: "#263750",
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 24,
    marginTop: 12,
    paddingTop: 12,
  },
  actionText: {
    color: "#79e3d1",
    fontWeight: "600",
  },
  deleteText: {
    color: "#ff9c9c",
    fontWeight: "600",
  },
});
