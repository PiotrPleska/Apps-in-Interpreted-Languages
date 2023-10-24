
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
      getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Dodaj zero z przodu, jeśli miesiąc jest jednocyfrowy
    const day = String(now.getDate()).padStart(2, '0'); // Dodaj zero z przodu, jeśli dzień jest jednocyfrowy
    const hours = String(now.getHours()).padStart(2, '0'); // Dodaj zero z przodu, jeśli godzina jest jednocyfrowa
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Dodaj zero z przodu, jeśli minuta jest jednocyfrowa
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Dodaj zero z przodu, jeśli sekunda jest jednocyfrowa

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  },
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
      const namePattern = /^[A-Z][a-z]*([A-Z][a-z]*)*$/;
      if (!(namePattern.test(this.input_name))){
        alert("Nie spelnia wymogow imienia")
      }
      const phoneNumberPattern = /^[0-9]{9}$/;
      if(!phoneNumberPattern.test(this.telefon_number)){
        alert("zly numer telefonu")
      }
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if(!emailPattern.test(this.email)){
        alert("zly adres email")
      }
      let condition = (namePattern.test(this.input_name))&&  phoneNumberPattern.test(this.telefon_number) && (emailPattern.test(this.email))
      if(condition){
        
        const items1 = [];
      for (const product of this.order) {
        const item = {
    Produkt_idProdukt: product.idProdukt,
    ilosc: product.liczba_sztuk
  };
        items1.push(item);
      }
      // alert(items1)
      if (condition){
        const data = {
    data_zamowienia: this.getCurrentDateTime(),
    nazwa_uzytkownika: this.input_name,
    email: this.email,
    numer_telefonu: this.telefon_number,
    Stan_Zamowienia_idStan_Zamowienia: 1,
          items: items1
};
axios.post('http://localhost:3000/orders', data)
    .then(response => {
        console.log('Odpowiedź z serwera:', response.data);
    })
    .catch(error => {
        console.error('Błąd:', error);
    });
    }
      }

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
  