<script setup>
const props = defineProps({
  visible: Boolean,
  message: String,
  title: String,
});

const emit = defineEmits(["confirm", "cancel"]);
</script>

<template>
  <div v-if="visible" class="dialog-backdrop">
    <div class="dialog-box">
      <img src="@/assets/warning.png" alt="" />
      <div class="content">
        <h1>{{ title }}</h1>
        <p>{{ message }}</p>
      </div>
      <div class="buttons">
        <button class="close" @click="$emit('cancel')">Não</button>
        <button class="check" @click="$emit('confirm')">Sim</button>
      </div>
    </div>
  </div>
</template>

<style>
img {
  width: 80px;
  height: 80px;
}
h1 {
  color: #31436f;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin: 0;
}

p {
  margin: 0;
  padding: 5px 0;
  color: #586893;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
}
.buttons {
  display: flex;
  gap: 8px;
}
.buttons button {
  width: 100%;
  height: 44px;
}

.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #29354fcf;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-box {
  background: white;
  padding: 20px;
  margin: 0 20px;
  border-radius: 24px;
  text-align: center;
}
.content {
  text-align: left;
  margin: 20px 0;
}

.check {
  background-color: #f24f82;
  border-radius: 100px;

  color: #fff;
  border: none;
  cursor: pointer;
}

.close {
  background-color: #ffe2eb;
  border-radius: 100px;

  color: #f24f82;
  border: none;
  cursor: pointer;
}
</style>
