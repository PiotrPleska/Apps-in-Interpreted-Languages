<template>
  <div class="FilterProducts">
    <form>
      <div class="form-group row">
        <label class="col-sm-2" for="inputName">Nazwa</label>
        <div class="col-sm-6">
          <input v-model="searchCriteria.name" type="text" id="inputName" class="form-control" placeholder="Podaj nazwę produktu">
        </div>
      </div>

      <div class="form-group row">
        <label class="col-sm-2" for="inputcategory">Kategoria:</label>
        <div class="col-sm-6">
          <input v-model="searchCriteria.category" type="text" id="inputcategory" class="form-control" placeholder="Podaj kategorię">
        </div>
      </div>
      <div class="form-group row">
        <button class="btn btn-info col-sm-6" type="button" @click="searchProducts">Szukaj</button>
        <button class="btn btn-secondary col-sm-6" type="button" @click="reset">Reset</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'FilterProducts',
  
  props: {
    products_copy_table: Array // Tablica produktów
  },
  data() {
    return {
      filtered_products: [],
      searchCriteria: {
        name: '',
        category: ''
      }
    };
  },
  
  methods: {
    async loadData() {
      this.filtered_products = this.products_copy_table;
    },
    
    searchProducts() {
      const filteredProducts = this.filtered_products.filter(product => {
        const nameMatch = product.nazwa.toLowerCase().includes(this.searchCriteria.name.toLowerCase());
        const categoryMatch = product.Kategoria_idKategoria.toLowerCase().includes(this.searchCriteria.category.toLowerCase());
        return nameMatch && categoryMatch;
      });

      this.$emit("filteredProducts", filteredProducts); // Emit the event here
    },

    reset() {
      this.filtered_products = this.products_copy_table;
      this.$emit("filteredProducts", this.filtered_products); // Emit the event here
    }
  },
 
  watch: {
    products_copy_table: {
      immediate: true, // Handle initial value
      deep: true, // Watch for changes inside the array
      handler(newProducts) {
        if (Array.isArray(newProducts) && newProducts.length > 0) {
          this.loadData();
        }
      }
    }
  }
}
</script>

<style scoped>
  
</style>
