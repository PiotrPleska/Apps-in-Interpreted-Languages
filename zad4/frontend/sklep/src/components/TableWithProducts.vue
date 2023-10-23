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
        <tr v-for="product in products_copy_table" :key="product.idProdukt">
          <td>{{ product.nazwa }}</td>
          <td>{{ product.opis }}</td>
          <td>{{ product.cena_jednostkowa }}</td>
          <td>{{ product.waga_jednostkowa }}</td>
          <td>{{ product.nazwa_kategorii}}</td>
          <td>
            <button class="btn btn-success" @click="addToCart(product)">{{ product.isBought ? 'Kupiono' : 'Kup' }}</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class = "form-group row">
      <button class = "btn btn-success col-sm-12" type="button" @click="doOrder()">Zloz zamowienie</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableWithProducts',
    props: {
      products: Array // Tablica produktow od App
  },
  data() {
    return {
      products_copy_table :[],
      products_ordered:[]
    };
  },
  mounted(){
    this.emitter.on("filteredProducts", (data) => {
      this.products_copy_table = data;
  })
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
    if(ordered_product.isBought){
      this.products_ordered.push(ordered_product)
    }
    if(!ordered_product.isBought){
      this.products_ordered = this.products_ordered.filter(item => item !== ordered_product)
    }
  } ,
  doOrder() {
    window.open('', '_blank');
    this.emitter.emit("orderedProducts",this.products_ordered);
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
        }
      }
    }
  }

 

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
