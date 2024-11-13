<template>
  <header class="navbar">
    <!-- Condicionalmente exibe o botão de voltar se a rota não for "/" -->
    <button v-if="!isHomeRoute" @click="goToHome" class="back-button" icon>
      <v-icon>mdi-arrow-left</v-icon>
    </button>
    <!-- Exibe o título da página -->
    <h1>{{ title }}</h1>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

// Definindo a prop 'title'
const props = defineProps({
  title: {
    type: String,
    default: "Categorias", // Título padrão
  },
});

// Obtém a rota atual
const route = useRoute();
const router = useRouter();

// Verifica se a rota é a página inicial ("/")
const isHomeRoute = route.path === "/";

// Função para navegar para a página inicial
const goToHome = () => {
  router.push("/"); // Navegação programática para a página inicial
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
