<template>
    <div class="FilterProducts">
<form>
      <div class="form-group row">
    <label class="col-sm-2" for="inputName">Nazwa</label>
    <div class="col-sm-6">
        <input type="text" id="inputName" class="form-control" placeholder="Podaj nazwę produktu">
    </div>
</div>

<div class="form-group row">
    <label class="col-sm-2" for="inputcategory">Kategoria:</label>
    <div class="col-sm-6">
        <input type="text" id="inputcategory" class="form-control" placeholder="Podaj kategorię">
    </div>
</div>
</form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FilterProducts',
    
    props: {
      products: Array // Tablica produktow
  },
  data() {
    return {
      products_copy :[]  // Declare the movies array in the data section
    };
  },
  mounted(){
    this.products_copy = this.products;
  },
  methods:{

    searchProducts() {
      // Przykładowa implementacja wyszukiwania filmów na podstawie kryteriów
      const filteredProducts = this.products_copy.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(this.inputName.toLowerCase());
        const categoryMatch = product.category.toLowerCase().includes(this.inputcategory.toLowerCase());
        return nameMatch && categoryMatch;
      });

      // Aktualizacja wyświetlanych filmów
      //const filteredMoviesStr = JSON.stringify(filteredMovies, null, 2);

      this.emitter.emit("filteredProducts", filteredProducts);
    }

  }

  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  