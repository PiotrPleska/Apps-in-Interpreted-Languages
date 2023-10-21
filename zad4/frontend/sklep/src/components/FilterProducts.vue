<template>
    <div class="FilterProducts">
    </div>
  </template>
  
  <script>
  export default {
    name: 'FilterProducts',
    props: {
      msg: String
    },
    
    data() {
      return {
        products: [], // Tablica produktow
      };
    },
  
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  