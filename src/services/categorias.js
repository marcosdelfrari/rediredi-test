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
    const response = await fetch(url, { method: "GET", headers });

    if (!response.ok) {
      throw new Error(`Erro ao buscar categorias: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Dados das categorias:", data);

    return data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    throw error;
  }
}

export async function updateCategoryChildren(category) {
  const url = `${API_URL}/${category.id}`;
  const headers = {
    Authorization: `Basic ${API_KEY}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  const body = JSON.stringify(category);

  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error("Erro ao editar categoria");
    }

    return await response.json();
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
  const body = JSON.stringify(category);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error("Erro ao adicionar categoria");
    }
    return await response.json();
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
  const body = JSON.stringify(category);
  try {
    const response = await fetch(url, {
      method: "PATCH",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error("Erro ao editar categoria");
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao editar categoria:", error);
    throw error;
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
    const response = await fetch(urlWithParams, {
      method: "DELETE",
      headers,
    });

    if (response.status === 204) {
      return { success: true, message: "Categoria excluída com sucesso." };
    }

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Erro ao deletar categoria: ${errorMessage}`);
    }

    return await response.json();
  } catch (error) {
    console.error(
      `Erro ao deletar categoria da API (Status: ${
        error.status || "desconhecido"
      }):`,
      error.message
    );
    throw error;
  }
}
