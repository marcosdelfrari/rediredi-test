import { describe, it, expect, vi } from "vitest";
import {
  addCategory,
  editCategory,
  deleteCategoryFromApi,
} from "../src/services/categorias.js";
import axios from "axios";

vi.mock("axios");

const API_URL =
  "https://wpmh31abs3.execute-api.us-east-1.amazonaws.com/marcos/categories";
const API_KEY = "RdVKC5d30fXRpYmuEZadsYELaDGccex5";

describe("Serviço de Edição de Categoria", () => {
  it("deve fazer a requisição PATCH corretamente", async () => {
    const mockCategory = { id: 1, name: "Categoria Atualizada" };
    const mockResponse = { id: 1, name: "Categoria Atualizada" };

    axios.patch.mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await editCategory(mockCategory);

    expect(axios.patch).toHaveBeenCalledWith(
      `${API_URL}/${mockCategory.id}`,
      mockCategory,
      {
        headers: {
          Authorization: `Basic ${API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("deve lançar erro se a resposta não for OK", async () => {
    const mockCategory = { id: 1, name: "Categoria Atualizada" };

    axios.patch.mockRejectedValueOnce({
      response: { status: 400, data: "Erro ao editar categoria" },
    });

    await expect(editCategory(mockCategory)).rejects.toThrow(
      "Erro ao editar categoria"
    );
  });
});

describe("Serviço de Categorias", () => {
  it("deve adicionar uma nova categoria", async () => {
    const mockCategory = { id: 1, name: "Nova Categoria" };
    const mockResponse = mockCategory;

    axios.post.mockResolvedValueOnce({
      data: mockResponse,
    });

    const response = await addCategory(mockCategory);

    expect(response).toEqual(mockResponse);
    expect(axios.post).toHaveBeenCalledWith(API_URL, mockCategory, {
      headers: {
        Authorization: `Basic ${API_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  });
});

describe("Serviço de Exclusão de Categoria", () => {
  it("deve fazer a requisição DELETE corretamente", async () => {
    const categoryId = 1;
    const mockResponse = {
      success: true,
      message: "Categoria excluída com sucesso.",
    };

    axios.delete.mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await deleteCategoryFromApi(categoryId);

    expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/${categoryId}`, {
      headers: {
        Authorization: `Basic ${API_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    expect(result).toEqual(mockResponse);
  });

  it("deve incluir o parâmetro forceDeleteTree se for true", async () => {
    const categoryId = 1;
    const mockResponse = {
      success: true,
      message: "Categoria excluída com sucesso.",
    };

    axios.delete.mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await deleteCategoryFromApi(categoryId, true);

    expect(axios.delete).toHaveBeenCalledWith(
      `${API_URL}/${categoryId}?forceDeleteTree=true`,
      {
        headers: {
          Authorization: `Basic ${API_KEY}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("deve retornar sucesso se a categoria for deletada com sucesso", async () => {
    const categoryId = 1;
    const mockResponse = {
      success: true,
      message: "Categoria excluída com sucesso.",
    };

    axios.delete.mockResolvedValueOnce({
      data: mockResponse,
    });

    const result = await deleteCategoryFromApi(categoryId);

    expect(result).toEqual(mockResponse);
  });
});
