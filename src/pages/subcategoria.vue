<script setup>
import { ref, onMounted } from "vue";
import {
  fetchCategories,
  updateCategoryChildren,
} from "../services/categorias.js";

const categories = ref([]);

const loadCategories = async () => {
  try {
    const data = await fetchCategories();
    categories.value = data;
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
  }
};

const addSubcategoryToCategory = async (categoryId, subcategoryName) => {
  const category = categories.value.find((cat) => cat.id === categoryId);

  if (category) {
    category.children = category.children || [];

    category.children.push(subcategoryName);
    category.hasChildren = true;

    try {
      await updateCategoryChildren(category);
    } catch (error) {
      console.error("Erro ao editar subcategoria:", error);
    }
  } else {
    console.error("Categoria não encontrada com o ID:", categoryId);
  }
};

onMounted(() => {
  loadCategories();
});
</script>

<template>
  <Navbar title="Subcategorias" />
  <div class="container">
    <h2>Adicione ou gerencie subcategorias abaixo das categorias</h2>

    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="category in categories"
        :key="category.id"
        :title="category.name"
      >
        <template v-slot:text>
          <div v-if="category.children && category.children.length">
            <ul>
              <SubCategoriaItem
                v-for="sub in category.children"
                :key="sub.id"
                :id="sub.id"
                :name="sub.name"
              />
            </ul>
          </div>
          <div v-else>
            <p>Sem subcategorias.</p>
          </div>
          <CriarSubCategoria
            :categoryId="category.id"
            @addSubcategory="
              (name) => addSubcategoryToCategory(category.id, name)
            "
          />
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped>
.container {
  padding: 16px;
}

.v-expansion-panels {
  position: static !important;
  margin-top: 16px;
  gap: 12px;
}

.v-expansion-panel,
.v-expansion-panel--active,
.v-expansion-panel--after-active,
.v-expansion-panels--variant-accordion > :first-child:not(:last-child),
.v-expansion-panels--variant-accordion > :not(:first-child):not(:last-child),
.v-expansion-panels--variant-accordion > :last-child:not(:first-child) {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 56px;
  padding: 16px !important;
  border-radius: 16px !important;
  position: static !important;
  border: 1px solid #dde2ef;
  box-shadow: none !important;
  z-index: auto;
}

.lines {
  gap: 12px;
  display: flex;
  flex-direction: column;
}

h2 {
  color: #737f9c;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
}
</style>
