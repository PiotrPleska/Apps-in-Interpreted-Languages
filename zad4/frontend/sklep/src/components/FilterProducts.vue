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
      products_copy: Array // Tablica produktow
  },
  data() {
    return {
      filtered_products :[]  
    };
  },
  mounted(){
    alert("helo")
    this.filtered_products = this.products_copy;
    alert("filtrowanie"+JSON.stringify(this.filtered_products))
  },
  methods:{

    searchProducts() {
      // Przykładowa implementacja wyszukiwania filmów na podstawie kryteriów
      const filteredProducts = this.filtered_products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(this.inputName.toLowerCase());
        const categoryMatch = product.category.toLowerCase().includes(this.inputcategory.toLowerCase());
        return nameMatch && categoryMatch;
      });

      this.emitter.emit("filteredProducts", filteredProducts);
    }

  }

  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  