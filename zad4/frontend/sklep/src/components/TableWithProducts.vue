<template>
  <div class="TableWithProducts">
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Opis</th>
          <th>Cena</th>
          <th>Waga</th>
          <th>Id_kategoria</th>
          <th>Kup</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products_copy_table" :key="product.idProdukt">
          <td>{{ product.nazwa }}</td>
          <td>{{ product.opis }}</td>
          <td>{{ product.cena_jednostkowa }}</td>
          <td>{{ product.waga_jednostkowa }}</td>
          <td>{{ product.nazwa_kategorii }}</td>
          <td>
            <button
              class="btn btn-success" @click="addToCart(product)"
              :class="{ 'btn-secondary': product.isBought }" >
              {{ product.isBought ? 'Kupiono' : 'Kup' }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="form-group row">
      <button
        class="btn btn-success col-sm-12"
        type="button"
        @click="doOrder"
      >
        Złoż zamówienie
      </button>
      <div>
        <component :is="OrderForm"></component>
      </div>
    </div>
  </div>
</template>

<script>
import OrderForm from "@/components/OrderForm.vue";
export default {
  name: "TableWithProducts",
  props: {
    products: Array, // Tablica produktów od App
  },
  components: {
    OrderForm,
  },
  data() {
    return {
      products_copy_table: [],
      products_ordered: [],
    };
  },
  mounted() {
    this.emitter.on("filteredProducts", (data) => {
      this.products_copy_table = data;
    });
  },
  methods: {
    async loadData() {
      try {
        this.products_copy_table = this.products;
      } catch (error) {
        console.error("Błąd: ", error);
      }
    },
    addToCart(ordered_product) {
      ordered_product.isBought = !ordered_product.isBought;
      if (ordered_product.isBought) {
        this.products_ordered.push(ordered_product);
      }
      if (!ordered_product.isBought) {
        this.products_ordered = this.products_ordered.filter(
          (item) => item !== ordered_product
        );
      }
    },
    doOrder() {
      this.emitter.emit("orderedProducts", this.products_ordered);
      //this.$router.push({ name: "OrderForm" });
    },
  },
  // Watch prop 'products' for changes
  watch: {
    products: {
      immediate: true, // Handle initial value
      deep: true, // Watch for changes inside the array
      handler(newProducts) {
        if (newProducts.length > 0) {
          this.loadData();
        }
      },
    },
  },
};
</script>

<style scoped>
.table {
  text-align: center;
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  border-radius: 10px;
}

.table th {
  background-color: #343a40; /* Dark gray background for table headers */
  color: #fff; /* Header text color */
  font-weight: bold;
}

.table th,
.table td {
  padding: 10px;
}

.btn-success {
  color: #fff;
  padding: 5px 15px;
  cursor: pointer;
}

.btn-secondary {
  background-color: #6c757d; /* Secondary color for "Kupiono" buttons */
}

.btn-success:hover {
  background-color: #218838; /* Darker green on hover */
}

/* Style the "Złoż zamówienie" button */
.form-group button {
  background-color: #28a745;
  color: #fff;
  border-radius: 50px;
  padding: 10px;
  transition: background-color 0.5s;

}

.form-group button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}

</style>
