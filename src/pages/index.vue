<template>
  <Navbar title="Categorias" />
  <div class="container">
    <div class="info">
      <h1>Organize seu catálogo com categorias e subcategorias</h1>
      <p>
        Ao usar as categorias e subcategorias do catálogo, você ajuda seus
        clientes a encontrarem os produtos desejados
      </p>
    </div>
    <CategoriaOptions />
  </div>
</template>

<script setup></script>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  padding: 0;
  color: #586893;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
}
</style>
