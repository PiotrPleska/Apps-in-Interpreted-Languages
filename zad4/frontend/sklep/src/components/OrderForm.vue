<template>
  <div class="OrderForm">
    <h2 class="text-center">Wpisz dane, aby zrealizować zamówienie</h2>

    <table class="table table-bordered table-hover responsive-table">
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Liczba sztuk</th>
          <th>Łączna cena</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in order" :key="product.idProdukt">
          <td>{{ product.nazwa }}</td>
          <td>
            <button class="quantity-button" @click="increaseQuantity(product)">+</button>
            {{ product.liczba_sztuk }}
            <button class="quantity-button" @click="decreaseQuantity(product)">-</button>
          </td>
          <td>{{ product.cena_jednostkowa * product.liczba_sztuk }}</td>
        </tr>
      </tbody>
    </table>

    <div class="alert alert-info text-center">
      Łączna cena zamówienia: {{ this.finalPrice }}
    </div>

    <form>
      <div class="form-group row justify-content-center">
        <label class="col-sm-2 col-form-label" for="input_name">Imię</label>
        <div class="col-sm-3">
          <input class="form-control" type="text" id="input_name" v-model="input_name">
        </div>
      </div>
      <div class="form-group row justify-content-center">
        <label class="col-sm-2" for="email">E-mail</label>
        <div class="col-sm-3">
          <input class="form-control" type="email" id="email" v-model="email">
        </div>
      </div>
      <div class="form-group row justify-content-center">
        <label class="col-sm-2" for="telefon_number">Telefon</label>
        <div class="col-sm-3">
          <input class="form-control" type="text" id="telefon_number" v-model="telefon_number">
        </div>
      </div>
      <button class="col-sm-12 btn btn-primary" type="button" @click="doMyOrder">Zamów</button>
    </form>
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
        if(product.liczba_sztuk>0){
          product.liczba_sztuk -= 1;
        }
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

<style scoped>


.table {
  text-align: center;
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

.table th {
  background-color: #343a40; /* Dark gray background for table headers */
  color: #fff; /* Header text color */
  font-weight: bold;
}

.table th,
.table td {
  padding: 10px;
}

.quantity-button {
  background-color: #28a745;
  color: #fff;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 5px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.quantity-button:hover {
  background-color: #343a40;
}

.alert-info {
  background-color: #343a40; /* Teal background for the info alert */
  color: #fff;
  border-radius: 10px;
}

.form-control {
  border: 2px solid #ced4da;
  padding: 5px;
  border-radius: 5px;
}

.btn-primary {
  background-color: #28a745;
  color: #fff;
  padding: 10px;
  cursor: pointer;
  border-radius: 50px;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #0056b3;
}
</style>
