
<template>
    <div class="OrderForm">

      <table class="table table-bordered table-hover responsive-table">
      <thead>
      <tr>
        <th>Nazwa</th>
        <th>Liczba_sztuk</th>
        <th>Laczna_cena</th>
      </tr>
      </thead>
      <tbody>
        <tr v-for="product in order" :key="product.idProdukt">
          <td>{{ product.nazwa }}</td>
          <td>
            <button @click="increaseQuantity(product)">+</button>
            {{ product.liczba_sztuk }}
            <button @click="decreaseQuantity(product)">-</button>
          </td>
          <td>{{ product.cena_jednostkowa*product.liczba_sztuk }}</td>
        </tr>
      </tbody>
    </table>
    <div class="alert alert-info">
      Laczna cena zamowienia: {{ this.finalPrice }}
    </div>

<P>Wpisz dane by zrealizowac zamowienie</P>
<div class="form-group row">
    <form class="form">
        <div class="form-group">
            <label class="col-sm-1 col-form-label" for="input_name" >Imie</label>
            <input class="col-sm-3" type="text" id="input_name" v-model="input_name">
        </div>
        <div class="form-group">
            <label class="col-sm-1" for="email">E-mail</label>
            <input class="col-sm-3" type="email" id="email" v-model="email">
        </div>
        <div class="form-group">
            <label class="col-sm-1" for="telefon_number">Telefon</label>
            <input class="col-sm-3" type="text" id="telefon_number" v-model = "telefon_number">
        </div>
        <button class="btn btn-primary" type="button" @click="doMyOrder()">Zamów</button>
    </form>
</div>

    </div>
  </template>
  
  <script>
  const axios = require('axios');
  export default {
    name: 'OrderForm',
    
    data() {
      return {
        order: [], 
        finalPrice: 0,
      };
    },
    methods:{
      increaseQuantity(product) {
        product.liczba_sztuk += 1;
        this.calculateOrderPrice()
      },
      decreaseQuantity(product) {
        product.liczba_sztuk -= 1;
        this.calculateOrderPrice()
      },
    calculateOrderPrice(){
      let price = 0;
      for( let i = 0; i < this.order.length; i++){
        price += this.order[i].liczba_sztuk*this.order[i].cena_jednostkowa;
      }
      this.finalPrice=price;
    },
    doMyOrder() {
      if(this.input_name == "") {
        alert("puste imie")
      }
      const phoneNumberPattern = /^[0-9]{9}$/;
      if(!phoneNumberPattern.test(this.telefon_number)){
        alert("zly numer telefonu")
      }
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if(!emailPattern.test(this.email)){
        alert("zly adres email")
      }
      const data = {
    data_zamowienia: '2023-10-20 12:30:00',
    nazwa_uzytkownika: 'John Doe',
    email: 'john@example.com',
    numer_telefonu: '123-456-789',
    Stan_Zamowienia_idStan_Zamowienia: 1,
    items: [
        { Produkt_idProdukt: 1, ilosc: 3 },
        { Produkt_idProdukt: 2, ilosc: 2 },
    ],
};

axios.post('http://localhost:3000/orders', data)
    .then(response => {
        console.log('Odpowiedź z serwera:', response.data);
    })
    .catch(error => {
        console.error('Błąd:', error);
    });
    }
  },
    mounted(){
      this.emitter.on("orderedProducts", (data) => {
        this.order = data.map(product => ({ ...product, liczba_sztuk: 1 }))
        this.calculateOrderPrice();
  })
    }
}
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  
  </style>
  