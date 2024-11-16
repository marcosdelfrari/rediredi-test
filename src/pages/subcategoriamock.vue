<script setup>
import { ref } from "vue";

const categories = ref([
  {
    id: 1,
    name: "Categoria 1",
    subcategories: [
      { id: 101, name: "Subcategoria 1.1" },
      { id: 102, name: "Subcategoria 1.2" },
    ],
  },
  {
    id: 2,
    name: "Categoria 2",
    subcategories: [
      { id: 201, name: "Subcategoria 2.1" },
      { id: 202, name: "Subcategoria 2.2" },
    ],
  },
]);

// Função para adicionar subcategoria
const addSubcategory = ({ categoryId, name }) => {
  const category = categories.value.find((cat) => cat.id === categoryId);
  if (category && name.trim()) {
    category.subcategories.push({
      id: Date.now(),
      name,
    });
  }
};

// Função para renomear subcategoria
const renameSubcategory = ({ id, newName }) => {
  // Encontrar a categoria correspondente
  categories.value.forEach((category) => {
    const subcategory = category.subcategories.find((sub) => sub.id === id);
    if (subcategory) {
      subcategory.name = newName; // Atualiza o nome da subcategoria
    }
  });
};
</script>

<template>
  <Navbar title="Subcategorias" />
  <div class="container">
    <h2>Adicione subcategorias abaixo das categorias</h2>

    <v-expansion-panels variant="accordion">
      <v-expansion-panel
        v-for="category in categories"
        :key="category.id"
        :title="category.name"
      >
        <template v-slot:text>
          <div v-if="category.subcategories.length">
            <ul>
              <SubCategoriaItem
                v-for="sub in category.subcategories"
                :key="sub.id"
                :id="sub.id"
                :name="sub.name"
                @rename="renameSubcategory"
              />
            </ul>
          </div>
          <div v-else>
            <p>Sem subcategorias.</p>
          </div>

          <!-- Formulário para criar nova subcategoria -->
          <CriarSubCategoria
            :categoryId="category.id"
            @addSubcategory="addSubcategory"
          />
        </template>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped>
.container {
  padding: 16px;
}

.v-expansion-panels {
  position: static !important;
  margin-top: 16px;
  gap: 12px;
}

.v-expansion-panel,
.v-expansion-panel--active,
.v-expansion-panel--after-active,
.v-expansion-panels--variant-accordion > :first-child:not(:last-child),
.v-expansion-panels--variant-accordion > :not(:first-child):not(:last-child),
.v-expansion-panels--variant-accordion > :last-child:not(:first-child) {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 56px;
  padding: 16px !important;
  border-radius: 16px !important;
  position: static !important;
  border: 1px solid #dde2ef;
  box-shadow: none !important;
  z-index: auto;
}

.lines {
  gap: 12px;
  display: flex;
  flex-direction: column;
}

h2 {
  color: #737f9c;
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
}
</style>
