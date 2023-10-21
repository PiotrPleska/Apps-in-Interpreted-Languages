<template>
  <p>Sklep internetowy</p>
  <div id ="App">
    <TableWithProducts :products="products"/>
    <FilterProducts :products="products"/>
    <OrderForm/>
  </div>
</template>

<script>
import FilterProducts from './components/FilterProducts.vue';
import TableWithProducts from './components/TableWithProducts.vue'
import OrderForm from  './components/OrderForm.vue'
const axios = require('axios');

export default {
  name: 'App',
  
  data() {
    return {
      products: [] 
    };
  },

  components: {
    TableWithProducts,
    FilterProducts,
    OrderForm
},
mounted(){
  this.getProducts();
},
methods:{
getProducts(){
axios.get('http://localhost:3000/products')
     .then(response => {
         this.products = response.data;
         alert(this.products);
     })
     .catch(error => {
         console.error('Błąd:', error);
     });
}
},
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
