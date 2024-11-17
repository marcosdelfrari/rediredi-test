<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { fetchCategories } from "../services/categorias.js";

const categories = ref([]);
const router = useRouter();

const loadCategories = async () => {
  try {
    const data = await fetchCategories();
    categories.value = data;
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
  }
};

loadCategories();
</script>

<template>
  <div class="lines">
    <button
      class="option"
      v-if="categories.length > 0"
      @click="router.push('/categoria')"
    >
      <div class="title">
        <span> Categorias </span
        ><span class="count">{{ categories.length }}</span>
      </div>
      <span><v-icon class="arrow">mdi-chevron-right</v-icon></span>
    </button>
    <button
      class="option"
      v-if="categories.length > 0"
      @click="router.push('/subcategoriamock')"
    >
      <div class="title">Subcategorias</div>
      <span><v-icon class="arrow">mdi-chevron-right</v-icon></span>
    </button>

    <button
      class="criar"
      v-if="categories.length === 0"
      @click="router.push('/categoria')"
    >
      Criar categoria <v-icon>mdi-plus</v-icon>
    </button>
  </div>
</template>

<style scoped>
.lines {
  gap: 12px;
  display: flex;
  flex-direction: column;
}
.option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px !important;
  width: 100%;
  height: 56px;
  padding: 12px 16px;
  border-radius: 14px;
  background-color: #fff;
  border: 1px solid #dde2ef;
  color: #29354f;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
}
.count {
  background-color: #dde2ef;
  border-radius: 100px;
  width: 40px;
  padding: 2px 10px;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: #586893;
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
.arrow {
  color: #29354f;
  font-size: 16px !important;
}
.title {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
