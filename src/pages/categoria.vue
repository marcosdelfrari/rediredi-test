<script setup>
import { ref, onMounted } from "vue";
import {
  fetchCategories,
  addCategory,
  editCategory,
  deleteCategoryFromApi,
} from "../services/categorias.js";

const categories = ref([]);
const categoryToDelete = ref(null);
const showConfirmDialog = ref(false);

const loadCategories = async () => {
  try {
    const loadedCategories = await fetchCategories();
    categories.value = loadedCategories;
  } catch (error) {
    console.error("Erro ao carregar as categorias:", error);
  }
};

const addCategoryToList = async (name) => {
  const newCategory = {
    id: Date.now(),
    name,
    children: [],
    hasChildren: false,
  };
  try {
    const addedCategory = await addCategory(newCategory);
    categories.value.push(addedCategory);
  } catch (error) {
    console.error("Erro ao adicionar categoria:", error);
  }
};

const confirmDelete = (id) => {
  categoryToDelete.value = id;
  showConfirmDialog.value = true;
};

const deleteCategory = async () => {
  try {
    await deleteCategoryFromApi(categoryToDelete.value);
    await loadCategories();
    showConfirmDialog.value = false;
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    alert(`Erro ao excluir categoria: ${error.message}`);
  }
};

const renameCategory = async ({ id, newName }) => {
  const category = categories.value.find((cat) => cat.id === id);
  if (category) {
    category.name = newName;
    try {
      await editCategory(category);
    } catch (error) {
      console.error("Erro ao editar categoria:", error);
    }
  }
};

onMounted(() => {
  loadCategories();
});
</script>

<template>
  <Navbar title="Categorias" />

  <div class="container">
    <CategoriaForm @submit="addCategoryToList" />
    <CategoriaList
      class="lines"
      :categories="categories"
      @delete="confirmDelete"
      @rename="renameCategory"
    />
    <ConfirmDialog
      :visible="showConfirmDialog"
      title="Deseja excluir a categoria?"
      message="Essa ação é irreversível."
      @confirm="deleteCategory"
      @cancel="() => (showConfirmDialog.value = false)"
    />
  </div>
</template>

<style scoped>
.container {
  padding: 16px;
}

.lines {
  gap: 12px;
  display: flex;
  flex-direction: column;
}
</style>
