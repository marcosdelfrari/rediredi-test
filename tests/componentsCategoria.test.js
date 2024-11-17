import { mount } from "@vue/test-utils";
import CategoriaList from "@/components/CategoriaList.vue";
import CategoriaItem from "@/components/CategoriaItem.vue";
import CategoriaForm from "@/components/CategoriaForm.vue";
import vuetify from "@/plugins/vuetify";

describe("CategoriaList.vue", () => {
  it("deve renderizar os itens da categoria", () => {
    const wrapper = mount(CategoriaList, {
      global: {
        plugins: [vuetify],
      },
      propsData: {
        categories: [
          { id: 1, name: "Categoria 1" },
          { id: 2, name: "Categoria 2" },
        ],
      },
    });

    expect(wrapper.text()).toContain("Categoria 1");
    expect(wrapper.text()).toContain("Categoria 2");
  });

  it("deve emitir o evento delete quando um item for removido", async () => {
    const wrapper = mount(CategoriaList, {
      global: {
        plugins: [vuetify],
      },
      propsData: {
        categories: [
          { id: 1, name: "Categoria 1" },
          { id: 2, name: "Categoria 2" },
        ],
      },
    });

    const categoriaItem = wrapper.findAllComponents(CategoriaItem).at(0);
    await categoriaItem.vm.$emit("delete", 1);

    expect(wrapper.emitted().delete[0]).toEqual([1]);
  });

  it("deve emitir o evento rename quando um item for renomeado", async () => {
    const wrapper = mount(CategoriaList, {
      global: {
        plugins: [vuetify],
      },
      propsData: {
        categories: [
          { id: 1, name: "Categoria 1" },
          { id: 2, name: "Categoria 2" },
        ],
      },
    });

    const categoriaItem = wrapper.findAllComponents(CategoriaItem).at(1);
    await categoriaItem.vm.$emit("rename", {
      id: 2,
      name: "Categoria Renomeada",
    });

    expect(wrapper.emitted().rename[0]).toEqual([
      { id: 2, name: "Categoria Renomeada" },
    ]);
  });
});

describe("CategoriaForm.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(CategoriaForm);
  });

  it("deve desabilitar o botão quando o campo de entrada estiver vazio", () => {
    const button = wrapper.find("button");
    expect(button.classes()).not.toContain("active");
  });

  it("deve habilitar o botão quando o campo de entrada tiver valor", async () => {
    const input = wrapper.find("input");
    const button = wrapper.find("button");

    await input.setValue("Nova Categoria");

    expect(button.classes()).toContain("active");
    expect(button.element.disabled).toBe(false);
  });

  it('deve emitir o evento "submit" com o valor correto quando o botão for clicado', async () => {
    const input = wrapper.find("input");
    await input.setValue("Nova Categoria");

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(wrapper.emitted().submit).toBeTruthy();
    expect(wrapper.emitted().submit[0]).toEqual(["Nova Categoria"]);
  });

  it("deve limpar o campo de entrada após o envio", async () => {
    const input = wrapper.find("input");
    await input.setValue("Nova Categoria");

    const button = wrapper.find("button");
    await button.trigger("click");

    expect(input.element.value).toBe("");
  });
});
