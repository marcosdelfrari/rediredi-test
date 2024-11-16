<script setup>
import { ref } from "vue";

const props = defineProps({
  categoryId: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["addSubcategory"]);

const newSubcategoryName = ref("");
const isCreating = ref(false);
const addSubcategory = () => {
  if (newSubcategoryName.value.trim()) {
    emit("addSubcategory", newSubcategoryName.value);
    resetState();
  }
};

const startCreating = () => {
  isCreating.value = true;
};

const cancel = () => {
  resetState();
};

const resetState = () => {
  isCreating.value = false;
  newSubcategoryName.value = "";
};
</script>

<template>
  <div>
    <div v-if="!isCreating" @click="startCreating" class="item">
      <button>Adicionar subcategoria</button>
      <v-icon>mdi-plus</v-icon>
    </div>

    <div v-else class="item-input">
      <input v-model="newSubcategoryName" placeholder="Nome da subcategoria" />
      <div class="buttons">
        <button class="close" @click="cancel">
          <v-icon>mdi-close</v-icon>
        </button>
        <button class="check" @click="addSubcategory">
          <v-icon>mdi-check</v-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 52px;
  border: none;
  padding: 12px 16px;
  border-radius: 14px;
  background-color: #f3f3f5;
  position: relative;
  color: #29354f;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
}

.item button {
  width: 100%;
  text-align: left;
  color: #f24f82;
}

.item i {
  color: #f24f82;
}

.item-input {
  display: flex;
  height: 52px;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px !important;
  width: 100%;
  padding: 12px 16px;
  border-radius: 14px;
  background-color: #fff;
  border: 1px solid #008197;
  color: #29354f;
}

.buttons {
  display: flex;
  gap: 8px;
}
input {
  color: #29354f;
  outline: none;
  width: 100%;
  font-size: 16px;
  transition: border 0.3s ease;
  caret-color: #29354f;
}

input:focus {
  animation: caret-blink 1s step-end infinite;
}

@keyframes caret-blink {
  50% {
    caret-color: transparent;
  }
}

.check {
  background-color: #f24f82;
  border-radius: 100px;
  width: 36px;
  height: 36px;
  color: #fff;
  border: none;
  cursor: pointer;
}

.close {
  background-color: #ffe2eb;
  border-radius: 100px;
  width: 36px;
  height: 36px;
  color: #f24f82;
  border: none;
  cursor: pointer;
}
</style>
