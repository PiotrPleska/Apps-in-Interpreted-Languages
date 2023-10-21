<template>
  <p>Sklep internetowy</p>
  <div id ="App">
    <TableWithProducts/>
    <FilterProducts/>
    <OrderForm/>
  </div>
</template>

<script>
import FilterProducts from './components/FilterProducts.vue';
import TableWithProducts from './components/TableWithProducts.vue'
import OrderForm from  './components/OrderForm.vue'

export default {
  name: 'App',
  
  data() {
    return {
      movies: []  // Declare the movies array in the data section
    };
  },

  components: {
    TableWithProducts,
    FilterProducts,
    OrderForm
}
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
