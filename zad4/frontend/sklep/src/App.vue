
<template>
  <div id="App">
    <p  style="text-align: center;">Sklep internetowy</p>
    <FilterProducts :products="products" />
    <TableWithProducts :products="products"/>
    <OrderForm/>
  </div>
</template>


<script>
import axios from "axios"; // Dodaj import Axios
import TableWithProducts from "./components/TableWithProducts.vue";
import FilterProducts from "./components/FilterProducts.vue";
import OrderForm from "./components/OrderForm.vue";



export default {
  name: "App",
  data() {
    return {
      products: [],
    };
  },

  components: {
    FilterProducts,
    TableWithProducts,
    OrderForm,
  },

  methods: {
    getProducts() {
      axios
        .get("http://localhost:3000/products")
        .then((response) => {
          this.products = response.data;
          //alert(JSON.stringify("app"+this.products));
        })
        .catch((error) => {
          console.error("Błąd pobierania z bazy:", error);
        });
    },
  },

  mounted() {
    this.getProducts();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  margin: 50px;
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";

}
.table{
  text-align:center;
}
</style>