<script setup>
import CategoriaItem from "./CategoriaItem.vue";

const props = defineProps({
  categories: Array,
});

const emit = defineEmits(["delete", "rename"]);

const handleDelete = (id) => {
  emit("delete", id);
};

const handleRename = (payload) => {
  emit("rename", payload);
};
</script>

<template>
  <div>
    <CategoriaItem
      v-for="category in categories"
      :key="category.id"
      :category="category"
      @delete="handleDelete"
      @rename="handleRename"
    />
  </div>
</template>
