<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const categories = ref([]);

const router = useRouter();
const addCategory = (name) => {
  const newCategory = { id: Date.now(), name, hasChildren: false };
  categories.value.push(newCategory);
};
</script>

<template>
  <div class="lines">
    <button @click="router.push('/categoria')">Categorias</button>
    <button @click="router.push('/subcategoria')">Subcategorias</button>

    <button
      class="criar"
      v-if="categories.length === 0"
      @click="router.push('/categoria')"
    >
      Criar categoria <v-icon>mdi-plus</v-icon>
    </button>

    <div v-else>
      <button @click="router.push('/categoria')">Categorias</button>
      <button @click="router.push('/subcategoria')">Subcategorias</button>
    </div>
  </div>
</template>

<style scoped>
.lines {
  gap: 12px;
  display: flex;
  flex-direction: column;
}

.criar {
  width: 173px;
  height: 44px;
  background-color: #ffe2eb;
  color: #f24f82;
  border-radius: 100px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  border: none;
  cursor: pointer;
}
</style>
