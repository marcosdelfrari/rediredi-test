<template>
  <header class="navbar">
    <button v-if="!isHomeRoute" @click="goToHome" class="back-button" icon>
      <v-icon>mdi-arrow-left</v-icon>
    </button>
    <h1>{{ title }}</h1>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  title: {
    type: String,
    default: "Categorias",
  },
});

const route = useRoute();
const router = useRouter();

const isHomeRoute = route.path === "/";

const goToHome = () => {
  router.push("/");
};
</script>

<style scoped>
.navbar {
  background-color: white;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-bottom: 1px solid #f3f3f5;
}

.back-button {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  text-decoration: none;
  display: flex;
  align-items: center;
  color: #da3468;
  z-index: 10;
}

h1 {
  text-align: center;
  margin: 0;
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  color: #29354f;
}
</style>
