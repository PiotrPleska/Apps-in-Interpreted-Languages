
<template>
  <div id="App">
    <h1 class="page-title">Sklep internetowy</h1>
    <FilterProducts :products="products" />
    <TableWithProducts :products="products"/>
    <OrderForm></OrderForm>
  </div>
</template>


<script>
import axios from "axios";
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
  }
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

.page-title {
  text-align: center; /* Center-align the text */
  font-size: 36px; /* Adjust the font size */
  font-weight: bold; /* Apply bold style */
  color:black; /* Set the color (blue in this case) */
  margin-top: 0px;
}


</style>