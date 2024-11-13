<template>
  <Navbar title="Categorias" />
  <div class="container">
    <h1>Organize seu catálogo com categorias e subcategorias</h1>
    <p>
      Ao usar as categorias e subcategorias do catálogo, você ajuda seus
      clientes a encontrarem os produtos desejados
    </p>
    <CategoriaOptions />
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  padding: 16px;
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
</style>
