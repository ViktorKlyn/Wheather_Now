const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.erro || "Não foi possível concluir a operação.");
  }
  return result;
}

export function listarOcorrencias() {
  return request("/ocorrencias");
}

export function criarOcorrencia(ocorrencia) {
  return request("/ocorrencias", {
    method: "POST",
    body: JSON.stringify(ocorrencia),
  });
}

export function atualizarOcorrencia(id, ocorrencia) {
  return request(`/ocorrencias/${id}`, {
    method: "PUT",
    body: JSON.stringify(ocorrencia),
  });
}

export function excluirOcorrencia(id) {
  return request(`/ocorrencias/${id}`, { method: "DELETE" });
}
