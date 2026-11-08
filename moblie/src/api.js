const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3001";

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        `Não foi possível conectar à API em ${API_URL}. Verifique se o backend está iniciado e acessível.`
      );
    }
    throw error;
  }

  const text = await response.text();
  const result = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = result?.erro || "Não foi possível concluir a operação.";
    throw new Error(message);
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

export function listarContatosApoio(usuarioId = 1) {
  return request(`/contatos-apoio?usuario_id=${usuarioId}`);
}

export function criarContatoApoio(contato) {
  return request("/contatos-apoio", {
    method: "POST",
    body: JSON.stringify(contato),
  });
}

export function atualizarContatoApoio(id, contato) {
  return request(`/contatos-apoio/${id}`, {
    method: "PUT",
    body: JSON.stringify(contato),
  });
}

export function excluirContatoApoio(id, usuarioId = 1) {
  return request(`/contatos-apoio/${id}?usuario_id=${usuarioId}`, {
    method: "DELETE",
  });
}

export function listarAlertas() {
  return request("/alertas");
}

export function criarAlerta(alerta) {
  return request("/alertas", {
    method: "POST",
    body: JSON.stringify(alerta),
  });
}

export function atualizarStatusAlerta(id, status) {
  return request(`/alertas/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
