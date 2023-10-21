<template>
  <div class="TableWithProducts">
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
  mounted(){
    this.products_copy = this.products;
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
