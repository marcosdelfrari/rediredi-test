import axios from "axios";

const API_URL =
  "https://wpmh31abs3.execute-api.us-east-1.amazonaws.com/marcos/categories";
const API_KEY = "RdVKC5d30fXRpYmuEZadsYELaDGccex5";

export async function fetchCategories(parentCategoryId = "") {
  const url = parentCategoryId
    ? `${API_URL}?parentCategoryId=${parentCategoryId}`
    : API_URL;

  const headers = {
    Authorization: `Basic ${API_KEY}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.get(url, { headers });
    console.log("Dados das categorias:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(
        `Erro ao buscar categorias (Status: ${error.response.status}):`,
        error.response.data
      );
      throw new Error(
        `Erro ao buscar categorias: ${
          error.response.data || "Erro desconhecido"
        }`
      );
    } else if (error.request) {
      console.error("Erro de rede ao buscar categorias:", error.request);
      throw new Error("Erro de rede ao buscar categorias");
    } else {
      console.error("Erro desconhecido ao buscar categorias:", error.message);
      throw new Error("Erro desconhecido ao buscar categorias");
    }
  }
}

export async function updateCategoryChildren(category) {
  const url = `${API_URL}/${category.id}`;
  const headers = {
    Authorization: `Basic ${API_KEY}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.patch(url, category, { headers });
    return response.data;
  } catch (error) {
    console.error("Erro ao editar categoria:", error);
    throw error;
  }
}

export async function addCategory(category) {
  const url = API_URL;
  const headers = {
    Authorization: `Basic ${API_KEY}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.post(url, category, { headers });
    return response.data;
  } catch (error) {
    console.error("Erro ao adicionar categoria:", error);
    throw error;
  }
}

export async function editCategory(category) {
  const url = `${API_URL}/${category.id}`;
  const headers = {
    Authorization: `Basic ${API_KEY}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await axios.patch(url, category, { headers });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Erro com resposta da API (status e dados de erro disponíveis)
      console.error(
        `Erro ao editar categoria (Status: ${error.response.status}):`,
        error.response.data
      );
      throw new Error(
        `Erro ao editar categoria: ${
          error.response.data || "Erro desconhecido"
        }`
      );
    } else if (error.request) {
      // Erro de rede (sem resposta)
      console.error("Erro de rede ao editar categoria:", error.request);
      throw new Error("Erro de rede ao editar categoria");
    } else {
      // Qualquer outro erro
      console.error("Erro desconhecido ao editar categoria:", error.message);
      throw new Error("Erro desconhecido ao editar categoria");
    }
  }
}

export async function deleteCategoryFromApi(
  categoryId,
  forceDeleteTree = false
) {
  const url = `${API_URL}/${categoryId}`;
  const headers = {
    Authorization: `Basic ${API_KEY}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const urlWithParams = forceDeleteTree ? `${url}?forceDeleteTree=true` : url;

  try {
    const response = await axios.delete(urlWithParams, { headers });

    if (response.status === 204) {
      return { success: true, message: "Categoria excluída com sucesso." };
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      // Erro com resposta da API (status e dados de erro disponíveis)
      console.error(
        `Erro ao deletar categoria da API (Status: ${error.response.status}):`,
        error.response.data
      );
      throw new Error(
        `Erro ao deletar categoria (Status: ${error.response.status}): ${
          error.response.data || "Erro desconhecido"
        }`
      );
    } else if (error.request) {
      // Erro de rede (sem resposta)
      console.error("Erro de rede ao deletar categoria:", error.request);
      throw new Error("Erro de rede ao deletar categoria");
    } else {
      // Qualquer outro erro
      console.error("Erro desconhecido ao deletar categoria:", error.message);
      throw new Error("Erro desconhecido ao deletar categoria");
    }
  }
}
