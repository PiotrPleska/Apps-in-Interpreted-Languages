<template>
    <div class="OrderForm">
    </div>
  </template>
  
  <script>
  export default {
    name: 'OrderForm',
    props: {
      products : Array
    },
    
    data() {
      return {
        order: [], 
      };
    },
  
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  