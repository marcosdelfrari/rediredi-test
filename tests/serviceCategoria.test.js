import { describe, it, expect, vi } from "vitest";
import {
  addCategory,
  editCategory,
  deleteCategoryFromApi,
} from "../src/services/categorias.js";

global.fetch = vi.fn();

beforeEach(() => {
  vi.restoreAllMocks();
});

const API_URL =
  "https://wpmh31abs3.execute-api.us-east-1.amazonaws.com/marcos/categories";
const API_KEY = "RdVKC5d30fXRpYmuEZadsYELaDGccex5";

describe("Serviço de Edição de Categoria", () => {
  it("deve fazer a requisição PATCH corretamente", async () => {
    const mockCategory = { id: 1, name: "Categoria Atualizada" };
    const mockResponse = { id: 1, name: "Categoria Atualizada" };

    fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await editCategory(mockCategory);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/${mockCategory.id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Basic ${API_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(mockCategory),
    });
    expect(result).toEqual(mockResponse);
  });

  it("deve lançar erro se a resposta não for OK", async () => {
    const mockCategory = { id: 1, name: "Categoria Atualizada" };

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
    });

    await expect(editCategory(mockCategory)).rejects.toThrow(
      "Erro ao editar categoria"
    );
  });

  it("deve lançar erro se houver falha de rede", async () => {
    const mockCategory = { id: 1, name: "Categoria Atualizada" };

    fetch.mockRejectedValueOnce(new Error("Falha de rede"));

    await expect(editCategory(mockCategory)).rejects.toThrow("Falha de rede");
  });
});

describe("Serviço de Categorias", () => {
  it("deve adicionar uma nova categoria", async () => {
    const mockCategory = { id: 1, name: "Nova Categoria" };
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCategory),
      })
    );

    const response = await addCategory(mockCategory);

    expect(response).toEqual(mockCategory);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://wpmh31abs3.execute-api.us-east-1.amazonaws.com/marcos/categories",
      expect.any(Object)
    );
  });
});

describe("Serviço de Exclusão de Categoria", () => {
  it("deve fazer a requisição DELETE corretamente", async () => {
    const categoryId = 1;
    const mockResponse = {
      success: true,
      message: "Categoria excluída com sucesso.",
    };

    fetch.mockResolvedValueOnce({
      status: 204,
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await deleteCategoryFromApi(categoryId);
    expect(fetch).toHaveBeenCalledWith(`${API_URL}/${categoryId}`, {
      method: "DELETE",
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

    fetch.mockResolvedValueOnce({
      status: 204,
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await deleteCategoryFromApi(categoryId, true);
    expect(fetch).toHaveBeenCalledWith(
      `${API_URL}/${categoryId}?forceDeleteTree=true`,
      {
        method: "DELETE",
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
    const categoryId = 1;

    fetch.mockResolvedValueOnce({
      status: 400,
      ok: false,
      text: () => Promise.resolve("Erro ao excluir categoria"),
    });

    await expect(deleteCategoryFromApi(categoryId)).rejects.toThrow(
      "Erro ao deletar categoria: Erro ao excluir categoria"
    );
  });

  it("deve lançar erro se a resposta for um erro de rede", async () => {
    const categoryId = 1;

    fetch.mockRejectedValueOnce(new Error("Falha de rede"));

    await expect(deleteCategoryFromApi(categoryId)).rejects.toThrow(
      "Falha de rede"
    );
  });

  it("deve retornar sucesso se a categoria for deletada com sucesso", async () => {
    const categoryId = 1;
    const mockResponse = {
      success: true,
      message: "Categoria excluída com sucesso.",
    };

    fetch.mockResolvedValueOnce({
      status: 204,
      ok: true,
      json: () => Promise.resolve(mockResponse),
    });

    const result = await deleteCategoryFromApi(categoryId);
    expect(result).toEqual(mockResponse);
  });
});
