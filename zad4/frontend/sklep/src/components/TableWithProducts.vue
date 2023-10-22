<template>
  <div class="TableWithProducts">

    <table class="table table-bordered table-hover responsive-table">
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
        <tr v-for="product in products_copy" :key="product.idProdukt">
          <td>{{ product.nazwa }}</td>
          <td>{{ product.opis }}</td>
          <td>{{ product.cena_jednostkowa }}</td>
          <td>{{ product.waga_jednostkowa }}</td>
          <td>{{ product.Kategoria_idKategoria }}</td>
          <td>
            <button class="btn" @click="addToCart(product)">Kup</button> 
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  name: 'TableWithProducts',
    props: {
      products: Array // Tablica produktow
  },
  data() {
    return {
      products_copy :[]  // Declare the movies array in the data section
    };
  },
  methods: {
    async loadData() {
      try {
        this.products_copy = this.products;
      } catch (error) {
        console.error("Błąd: ", error);
      }
    }
  },
  // Watch prop 'products' for changes
  watch: {
    products: {
      immediate: true, // Handle initial value
      deep: true, // Watch for changes inside the array
      handler(newProducts) {
        if (newProducts.length > 0) {
          this.loadData();
          // Uncomment the alert if needed
          // alert("table" + JSON.stringify(this.products_copy));
        }
      }
    }
  }

 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
