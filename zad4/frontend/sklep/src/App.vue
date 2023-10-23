
   <template>
  <div id="App">
    <p>Sklep internetowy</p>
    <FilterProducts :products="products" />
    <TableWithProducts :products="products"/>
    <OrderForm />
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
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>