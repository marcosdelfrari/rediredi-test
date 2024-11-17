<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["delete", "rename"]);

const isRenaming = ref(false);
const newName = ref("");
const showPopover = ref(false);
const popoverRef = ref(null);

const togglePopover = () => {
  showPopover.value = !showPopover.value;
};
const startRenaming = () => {
  newName.value = props.name;
  isRenaming.value = true;
  showPopover.value = false;
  nextTick(() => {
    const inputElement = document.querySelector(".input");
    if (inputElement) {
      inputElement.focus();
    }
  });
};

const confirmRename = () => {
  if (newName.value.trim()) {
    emit("rename", { id: props.id, newName: newName.value });
    isRenaming.value = false;
  }
};

const confirmDelete = () => {
  emit("delete", props.id);
  showPopover.value = false;
};

const cancelRename = () => {
  isRenaming.value = false;
};

const handleClickOutside = (event) => {
  if (popoverRef.value && !popoverRef.value.contains(event.target)) {
    showPopover.value = false;
  }
};

onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<template>
  <li class="subcategoria-item">
    <div class="item" v-if="!isRenaming">
      <span>{{ name }}</span>
      <v-icon @click="togglePopover" v-if="!isRenaming"
        >mdi-dots-horizontal</v-icon
      >
    </div>

    <div v-else class="item renaming">
      <input v-model="newName" class="input" />
      <div class="buttons">
        <button class="close" @click="cancelRename">
          <v-icon>mdi-close</v-icon>
        </button>
        <button class="check" @click="confirmRename">
          <v-icon>mdi-check</v-icon>
        </button>
      </div>
    </div>

    <div ref="popoverRef" class="popover" v-if="showPopover && !isRenaming">
      <button @click="startRenaming">
        <v-icon>mdi-pencil-outline</v-icon> Renomear
      </button>
      <button @click="confirmDelete">
        <v-icon>mdi-trash-can-outline</v-icon> Excluir
      </button>
    </div>
  </li>
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

.subcategoria-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 14px;
  position: relative;
  color: #29354f;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
}

.item.renaming {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px !important;
  width: 100%;
  max-height: 52px;
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

.popover {
  max-width: 343px;
  min-width: 140px;
  border-radius: 12px;
  padding-right: 14px !important;
  position: absolute;
  top: 100%;
  right: 0;
  border: 1px solid #dde2ef;
  background-color: #fff;
  padding: 12px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  z-index: 10;
  box-shadow: rgba(0, 0, 0, 0.12) 8px 8px 20px 0px;
}

.popover > button {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  width: 140px;
  gap: 8px;
  background-color: transparent;
  border: none;
  color: #29354f;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
}

.popover > button > i {
  color: #f24f82;
}

.input {
  color: #29354f;
  outline: none;
  border-radius: 14px;
  width: 100%;
  font-size: 16px;
  transition: border 0.3s ease;
  caret-color: #29354f;
}

.input:focus {
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
