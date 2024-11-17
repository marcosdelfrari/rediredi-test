<script setup>
import { ref } from "vue";

const emit = defineEmits(["submit"]);

const categoryName = ref("");

const handleSubmit = () => {
  if (categoryName.value.trim()) {
    emit("submit", categoryName.value);
    categoryName.value = "";
  }
};
</script>

<template>
  <div>
    <input v-model="categoryName" placeholder="Crie uma categoria" />
    <button
      :class="{ active: categoryName.trim() !== '' }"
      @click="handleSubmit"
    >
      Criar
    </button>
  </div>
</template>

<style scoped>
div {
  display: flex;
  gap: 8px;
  width: 100%;
}

input {
  border: 1px solid #dde2ef;
  border-radius: 100px;
  padding: 12px 16px;
  font-size: 16px;
  line-height: 20px;
  color: #8693b4;
  width: 100%;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #008197;
  background-color: #fff;
  outline: none;
  color: #29354f;
}

button {
  background-color: #dde2ef;
  border-radius: 100px;
  padding: 12px 24px;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  transition: background-color 0.3s ease;
  cursor: not-allowed;
}

button.active {
  background-color: #f24f82;
  color: #fff;
  cursor: pointer;
}
</style>
