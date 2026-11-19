// DadosTela.js — exibe exclusivamente estatísticas públicas agregadas.
import { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator, Pressable, SafeAreaView, ScrollView,
  StyleSheet, Text, TextInput, View,
} from "react-native";
import { listarIndicadores } from "../../api";
import SaidaRapidaButton from "../../navigation/SaidaRapidaButton";

export default function DadosTela() {
  const [dados, setDados] = useState(null);
  const [selecionada, setSelecionada] = useState("Paraná");
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  async function carregar() {
    setCarregando(true);
    setErro("");
    try {
      const resultado = await listarIndicadores();
      if (!Array.isArray(resultado.indicadores)) {
        throw new Error("Resposta de dados inválida.");
      }
      setDados(resultado);
    } catch (e) {
      setErro(e.message || "Falha ao obter indicadores.");
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  const indicador = useMemo(
    () => dados?.indicadores?.find((i) => i.uf === selecionada),
    [dados, selecionada]
  );
  const filtradas = useMemo(
    () => (dados?.indicadores || []).filter((i) =>
      i.uf.toLocaleLowerCase("pt-BR").includes(busca.toLocaleLowerCase("pt-BR"))
    ),
    [dados, busca]
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.top}>
          <Text style={styles.titulo}>Estatísticas públicas</Text>
          <SaidaRapidaButton />
        </View>
        <Text style={styles.subtitulo}>Estudo acadêmico sobre as taxas estaduais históricas de feminicídios — dados de 2025.</Text>

        <View style={styles.aviso}>
          <Text style={styles.avisoTitulo}>Não é uma avaliação de risco pessoal</Text>
          <Text style={styles.avisoTexto}>
            {dados?.aviso || "Estimativa estatística acadêmica sobre dados históricos agregados. NÃO avalia o risco individual e NÃO substitui atendimento profissional, policial ou jurídico."}
          </Text>
        </View>

        {carregando && <ActivityIndicator size="large" color="#79e3d1" />}
        {erro ? (
          <View style={styles.card}>
            <Text style={styles.erro}>{erro}</Text>
            <Pressable accessibilityRole="button" onPress={carregar} style={styles.refresh}>
              <Text style={styles.refreshTexto}>Tentar novamente</Text>
            </Pressable>
          </View>
        ) : null}
        {dados && (
          <>
            <Text style={styles.label}>Escolha uma unidade federativa</Text>
            <TextInput
              accessibilityLabel="Buscar estado" style={styles.input}
              placeholder="Buscar UF (ex.: Paraná)" placeholderTextColor="#6b7fa0"
              value={busca} onChangeText={setBusca}
            />
            <View style={styles.opcoes}>
              {filtradas.map((item) => (
                <Pressable key={item.uf} accessibilityRole="button"
                  accessibilityLabel={`Selecionar ${item.uf}`}
                  onPress={() => { setSelecionada(item.uf); setBusca(""); }}
                  style={[styles.uf, selecionada === item.uf && styles.ufAtiva]}>
                  <Text style={[styles.ufTexto, selecionada === item.uf && styles.ufAtivaTexto]}>{item.uf}</Text>
                </Pressable>
              ))}
              {filtradas.length === 0 && <Text style={styles.subtitulo}>Nenhuma UF encontrada.</Text>}
            </View>
            {indicador && (
              <View style={styles.card}>
                <Text style={styles.destaque}>{indicador.uf} — {indicador.ano}</Text>
                <Text style={styles.label}>Taxa observada de feminicídios</Text>
                <Text style={styles.numero}>{String(indicador.taxa_feminicidios_observada).replace(".", ",")}</Text>
                <Text style={styles.unidade}>por 100 mil mulheres — número registrado, NÃO previsão</Text>
                <Text style={styles.campo}>Registros de feminicídio: {indicador.feminicidios}</Text>
                <Text style={styles.campo}>Homicídios de mulheres: {indicador.homicidios_mulheres}</Text>
                <View style={styles.separador} />
                <Text style={styles.label}>Categoria gerada pelo modelo de Data Science</Text>
                <Text style={styles.categoria}>{indicador.categoria_estimada}</Text>
                <Text style={styles.nota}>Limiar didático de 1,5; classificação acadêmica de estatística estadual, sem valor para decisões individuais.</Text>
              </View>
            )}
            <Text style={styles.fonte}>Fonte: {dados.fonte}. Série pública agregada. O modelo pode errar; consulte o notebook para métricas e limitações.</Text>
            <Text style={styles.fonte}>Em uma emergência real, ligue 190. Para orientações e denúncias, Ligue 180.</Text>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#07111f" },
  container: { paddingHorizontal: 18, paddingVertical: 18, paddingBottom: 65 },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  titulo: { color: "#f4f7ff", fontWeight: "800", fontSize: 23, flexShrink: 1 },
  subtitulo: { color: "#a5b4cc", fontSize: 13, marginTop: 9, lineHeight: 20 },
  aviso: { backgroundColor: "#243047", borderColor: "#9ac2ee", borderWidth: 1, borderRadius: 12, padding: 14, marginTop: 16, marginBottom: 15 },
  avisoTitulo: { color: "#f4f7ff", fontWeight: "800", fontSize: 14, marginBottom: 6 },
  avisoTexto: { color: "#d5e3f6", fontSize: 13, lineHeight: 19 },
  label: { color: "#a5b4cc", fontSize: 13, fontWeight: "700", marginBottom: 8 },
  input: { backgroundColor: "#111e31", borderColor: "#3a4b67", borderWidth: 1, padding: 12, borderRadius: 10, color: "#fff", marginBottom: 13 },
  opcoes: { flexDirection: "row", flexWrap: "wrap", marginBottom: 18 },
  uf: { paddingHorizontal: 11, paddingVertical: 8, borderWidth: 1, borderRadius: 16, borderColor: "#364962", backgroundColor: "#111e31", marginRight: 6, marginBottom: 7 },
  ufAtiva: { backgroundColor: "#79e3d1", borderColor: "#79e3d1" },
  ufTexto: { color: "#d3dfef", fontSize: 12 },
  ufAtivaTexto: { color: "#07111f", fontWeight: "800" },
  card: { backgroundColor: "#111e31", borderColor: "#364962", borderRadius: 15, borderWidth: 1, padding: 20, marginBottom: 18 },
  destaque: { color: "#fff", fontSize: 20, fontWeight: "800", marginBottom: 16 },
  numero: { color: "#79e3d1", fontSize: 40, fontWeight: "800" },
  unidade: { color: "#a5b4cc", fontSize: 11, marginBottom: 18 },
  campo: { color: "#dce8fa", fontSize: 14, marginBottom: 7 },
  separador: { height: 1, backgroundColor: "#263750", marginVertical: 17 },
  categoria: { color: "#f4f7ff", fontSize: 18, fontWeight: "700", marginBottom: 10 },
  nota: { color: "#a5b4cc", fontSize: 12, lineHeight: 18 },
  fonte: { color: "#a5b4cc", fontSize: 12, lineHeight: 18, marginBottom: 10 },
  erro: { color: "#ff9c9c", fontSize: 13 },
  refresh: { backgroundColor: "#79e3d1", borderRadius: 10, padding: 10, marginTop: 12 },
  refreshTexto: { color: "#07111f", fontWeight: "800", textAlign: "center" },
});
