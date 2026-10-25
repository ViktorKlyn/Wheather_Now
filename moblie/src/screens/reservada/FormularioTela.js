// screens/reservada/FormularioTela.js — formulário de nova/editar ocorrência (Stack)
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addOcorrencia, editOcorrencia } from "../../store/ocorrenciasSlice";

const hoje = () => {
  const d = new Date();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${mm}-${dd}`;
};

export default function FormularioTela() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { carregando, erro } = useSelector((s) => s.ocorrencias);

  const ocorrencia = route.params?.ocorrencia ?? null;

  const [data, setData] = useState(ocorrencia?.data?.slice(0, 10) ?? hoje());
  const [descricao, setDescricao] = useState(ocorrencia?.descricao ?? "");
  const [usuarioId, setUsuarioId] = useState(String(ocorrencia?.usuario_id ?? 1));

  async function salvar() {
    const dados = {
      data,
      descricao: descricao.trim(),
      usuario_id: Number(usuarioId),
    };

    let resultado;
    if (ocorrencia) {
      resultado = await dispatch(editOcorrencia({ id: ocorrencia.id, dados }));
    } else {
      resultado = await dispatch(addOcorrencia(dados));
    }

    // Se não teve erro, volta para a lista
    if (!resultado.error) {
      navigation.goBack();
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.caption}>{ocorrencia ? "EDITAR REGISTRO" : "NOVO REGISTRO"}</Text>
          <Text style={styles.title}>
            {ocorrencia ? "Atualizar Ocorrência" : "Registrar Ocorrência"}
          </Text>
          <Text style={styles.subtitle}>
            Suas informações são armazenadas com segurança e visíveis apenas para você.
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Data</Text>
          <TextInput
            accessibilityLabel="Data da ocorrência no formato AAAA-MM-DD"
            onChangeText={setData}
            placeholder="AAAA-MM-DD"
            placeholderTextColor="#30425d"
            style={styles.input}
            value={data}
          />

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            accessibilityLabel="Descrição detalhada da ocorrência"
            multiline
            numberOfLines={5}
            onChangeText={setDescricao}
            placeholder="Descreva o que aconteceu com o máximo de detalhes possível…"
            placeholderTextColor="#30425d"
            style={[styles.input, styles.multiline]}
            textAlignVertical="top"
            value={descricao}
          />

          <Text style={styles.label}>ID da Usuária</Text>
          <TextInput
            accessibilityLabel="Identificador da usuária"
            keyboardType="number-pad"
            onChangeText={setUsuarioId}
            style={styles.input}
            value={usuarioId}
          />

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          {carregando ? (
            <ActivityIndicator color="#79e3d1" style={{ marginTop: 24 }} />
          ) : (
            <>
              <Pressable
                accessibilityRole="button"
                onPress={salvar}
                style={styles.button}
              >
                <Text style={styles.buttonText}>
                  {ocorrencia ? "Salvar alterações" : "Registrar"}
                </Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                onPress={() => navigation.goBack()}
                style={[styles.button, styles.secondaryButton]}
              >
                <Text style={styles.secondaryText}>Cancelar</Text>
              </Pressable>
            </>
          )}
        </View>
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
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  caption: {
    color: "#79e3d1",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 6,
  },
  title: {
    color: "#f4f7ff",
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    color: "#6b7fa0",
    fontSize: 13,
    lineHeight: 20,
  },
  form: {
    backgroundColor: "#111e31",
    borderColor: "#1d2d44",
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
  },
  label: {
    color: "#a5b4cc",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.5,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#0b1525",
    borderColor: "#30425d",
    borderRadius: 12,
    borderWidth: 1,
    color: "#f4f7ff",
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  multiline: {
    minHeight: 120,
  },
  erro: {
    color: "#ff9c9c",
    fontSize: 13,
    marginTop: 12,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#79e3d1",
    borderRadius: 14,
    marginTop: 20,
    paddingVertical: 14,
  },
  buttonText: {
    color: "#071a25",
    fontSize: 16,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "#1d2d44",
    marginTop: 10,
  },
  secondaryText: {
    color: "#dce5f4",
    fontSize: 16,
    fontWeight: "600",
  },
});
