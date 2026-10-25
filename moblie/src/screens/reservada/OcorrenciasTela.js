// screens/reservada/OcorrenciasTela.js — lista de ocorrências (Tab 1)
import { useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchOcorrencias, removeOcorrencia } from "../../store/ocorrenciasSlice";

export default function OcorrenciasTela() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { lista, carregando, erro } = useSelector((s) => s.ocorrencias);

  useEffect(() => {
    dispatch(fetchOcorrencias());
  }, [dispatch]);

  function confirmarExclusao(id) {
    Alert.alert("Excluir ocorrência", "Deseja remover este registro permanentemente?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => dispatch(removeOcorrencia(id)),
      },
    ]);
  }

  function renderItem({ item }) {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.data}>{String(item.data).slice(0, 10)}</Text>
          <Text style={styles.userId}>Usuária #{item.usuario_id}</Text>
        </View>
        <Text style={styles.descricao}>{item.descricao}</Text>
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate("Formulario", { ocorrencia: item })}
            style={styles.actionBtn}
          >
            <Text style={styles.editText}>✏️  Editar</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            onPress={() => confirmarExclusao(item.id)}
            style={styles.actionBtn}
          >
            <Text style={styles.deleteText}>🗑️  Excluir</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Ocorrências</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate("Formulario", { ocorrencia: null })}
          style={styles.addBtn}
        >
          <Text style={styles.addText}>+ Nova</Text>
        </Pressable>
      </View>

      {carregando && <ActivityIndicator color="#79e3d1" style={{ marginTop: 32 }} />}
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <FlatList
        data={lista}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          !carregando && (
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyText}>Nenhuma ocorrência cadastrada ainda.</Text>
              <Text style={styles.emptyHint}>Toque em "+ Nova" para adicionar.</Text>
            </View>
          )
        }
        onRefresh={() => dispatch(fetchOcorrencias())}
        refreshing={carregando}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#07111f",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
  },
  title: {
    color: "#f4f7ff",
    fontSize: 26,
    fontWeight: "700",
  },
  addBtn: {
    backgroundColor: "#79e3d1",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addText: {
    color: "#071a25",
    fontWeight: "700",
    fontSize: 14,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: "#111e31",
    borderColor: "#1d2d44",
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 12,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  data: {
    color: "#79e3d1",
    fontSize: 13,
    fontWeight: "600",
  },
  userId: {
    color: "#6b7fa0",
    fontSize: 12,
  },
  descricao: {
    color: "#dce5f4",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    borderTopColor: "#1d2d44",
    borderTopWidth: 1,
    paddingTop: 10,
    gap: 20,
  },
  actionBtn: {
    paddingVertical: 4,
  },
  editText: {
    color: "#79e3d1",
    fontWeight: "600",
    fontSize: 13,
  },
  deleteText: {
    color: "#ff9c9c",
    fontWeight: "600",
    fontSize: 13,
  },
  erro: {
    color: "#ff9c9c",
    textAlign: "center",
    marginTop: 16,
    fontSize: 13,
  },
  empty: {
    alignItems: "center",
    marginTop: 60,
    padding: 24,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyText: {
    color: "#a5b4cc",
    fontSize: 16,
    textAlign: "center",
  },
  emptyHint: {
    color: "#6b7fa0",
    fontSize: 13,
    marginTop: 8,
  },
});
