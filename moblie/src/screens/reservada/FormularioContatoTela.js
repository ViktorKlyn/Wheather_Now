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
import { addContato, editContato } from "../../store/contatosSlice";

export default function FormularioContatoTela() {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const { carregando, erro } = useSelector((state) => state.contatos);

  const contato = route.params?.contato ?? null;
  const [nome, setNome] = useState(contato?.nome ?? "");
  const [telefone, setTelefone] = useState(contato?.telefone ?? "");
  const [grauRelacionamento, setGrauRelacionamento] = useState(
    contato?.grau_relacionamento ?? ""
  );

  async function salvar() {
    const dados = {
      nome: nome.trim(),
      telefone: telefone.trim(),
      grau_relacionamento: grauRelacionamento.trim(),
      usuario_id: 1,
    };

    let resultado;
    if (contato) {
      resultado = await dispatch(editContato({ id: contato.id, dados }));
    } else {
      resultado = await dispatch(addContato(dados));
    }

    if (!resultado.error) {
      navigation.goBack();
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.caption}>{contato ? "EDITAR CONTATO" : "NOVO CONTATO"}</Text>
          <Text style={styles.title}>
            {contato ? "Atualizar Rede de Apoio" : "Cadastrar Contato de Confiança"}
          </Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            accessibilityLabel="Nome do contato"
            onChangeText={setNome}
            placeholder="Ex.: Mãe"
            placeholderTextColor="#30425d"
            style={styles.input}
            value={nome}
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            accessibilityLabel="Telefone do contato"
            keyboardType="phone-pad"
            onChangeText={setTelefone}
            placeholder="(11) 99999-9999"
            placeholderTextColor="#30425d"
            style={styles.input}
            value={telefone}
          />

          <Text style={styles.label}>Grau de relacionamento</Text>
          <TextInput
            accessibilityLabel="Grau de relacionamento"
            onChangeText={setGrauRelacionamento}
            placeholder="Família, amiga, vizinha..."
            placeholderTextColor="#30425d"
            style={styles.input}
            value={grauRelacionamento}
          />

          {erro ? <Text style={styles.erro}>{erro}</Text> : null}

          {carregando ? (
            <ActivityIndicator color="#79e3d1" style={{ marginTop: 24 }} />
          ) : (
            <>
              <Pressable accessibilityRole="button" onPress={salvar} style={styles.button}>
                <Text style={styles.buttonText}>{contato ? "Salvar alterações" : "Cadastrar"}</Text>
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
