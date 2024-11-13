<script setup>
import { ref } from "vue";

const categories = ref([]);
const categoryToDelete = ref(null);
const showConfirmDialog = ref(false);

const addCategory = (name) => {
  // Exemplo: adicionar nova categoria na lista local (simula API)
  const newCategory = { id: Date.now(), name, hasChildren: false };
  categories.value.push(newCategory);
};

const confirmDelete = (id) => {
  categoryToDelete.value = id;
  showConfirmDialog.value = true;
};

const deleteCategory = () => {
  // Excluir localmente (simula API)
  categories.value = categories.value.filter(
    (category) => category.id !== categoryToDelete.value
  );
  showConfirmDialog.value = false;
};

const renameCategory = ({ id, newName }) => {
  // Renomear categoria localmente (simula API)
  const category = categories.value.find((cat) => cat.id === id);
  if (category) {
    category.name = newName;
  }
};

const closeDialog = () => {
  showConfirmDialog.value = false;
};
</script>

<template>
  <Navbar title="Categorias" />
  <div class="container">
    <CategoriaForm @submit="addCategory" />
    <CategoriaList
      class="lines"
      :categories="categories"
      @delete="confirmDelete"
      @rename="renameCategory"
    />
    <ConfirmDialog
      :visible="showConfirmDialog"
      title="Deseja excluir a categoria?"
      message="Essa ação é irreversível e implica na exclusão
das subcategorias vinculadas.
Os produtos ligados a essa categoria não
serão excluídos."
      @confirm="deleteCategory"
      @cancel="closeDialog"
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
