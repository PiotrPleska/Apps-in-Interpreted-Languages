const axios = require('axios');

//PRODUKT
//1. GET app_url/products - zwraca wszystkie produkty
// axios.get('http://localhost:3000/products')
//     .then(response => {
//         console.log('Odpowiedź z serwera:', response.data);
//     })
//     .catch(error => {
//         console.error('Błąd:', error);
//     });

// 2. GET app_url/products/id - zwraca dane produktu o konkretnym identyfikatorze
// axios.get('http://localhost:3000/products/1')
//     .then(response => {
//         console.log('Odpowiedź z serwera:', response.data);
//     })
//     .catch(error => {
//         console.error('Błąd:', error);
//     });


// 3.POST app_url/products - dodaje produkt do bazy (parametry w ciele żądania)
// const newProduct = {
//     nazwa: 'Nowy Produkt',
//     opis: 'To jest przykladowy nowy produkt',
//     cena_jednostkowa: 2.99,
//     waga_jednostkowa: 1,
//     Kategoria_idKategoria: 1
// };
// axios.post('http://localhost:3000/products', JSON.stringify(newProduct), {
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//     .then(response => {
//         console.log('Dodano nowy produkt:', response.data);
//     })
//     .catch(error => {
//         console.error('Błąd:', error.response.data);
//     });

// 4.PUT app_url/products/id - aktualizuje produkt o konkretnym identyfikatorze, pozostałe parametry produktu w ciele żądania. Można też zrobić PUT app_url/products ze wszystkimi parametrami w ciele żądania.
// const updateProduct = {
//     nazwa: 'Zaktualizowany produkt'
// }
// axios.put('http://localhost:3000/products/1', JSON.stringify(updateProduct), {
//     headers: {
//         'Content-Type': 'application/json',
//     },
// }).then(response => {
//     console.log('Zaktualizowano produkt:', response.data);
// })
//     .catch(error => {
//         console.error('Błąd:', error.response.data);
//     });

// KATEGORIE
// 1.GET app_url/categories - zwraca wszystkie kategorie
// axios.get('http://localhost:3000/categories')
//     .then(response => {
//         console.log('Odpowiedź z serwera:', response.data);
//     })
//     .catch(error => {
//         console.error('Błąd:', error);
//     });


// ZAMOWIENIA
// 1.GET app_url/orders - zwraca wszystkie zamówienia
axios.get('http://localhost:3000/orders')
    .then(response => {
        console.log('Odpowiedź z serwera:', response.data);
    })
    .catch(error => {
        console.error('Błąd:', error);
    });

// 2.POST app_url/orders - dodaje zamówienie (parametry w ciele żądania)
// 3.PATCH app_url/orders/id - zmiana stanu zamówienia o podanym identyfikatorze, dane w formacie JSON PATCH. Dopuszczalne są inne warianty, np. PUT app_url/orders/id z nowym stanem i pozostałymi parametrami zamówienia w ciele żądania.
// 4.GET app_url/orders/status/id - pobranie zamówień z określonym stanem

// STAN ZAMOWIENIA
// 1.GET app_url/status - zwraca wszystkie możliwe stany zamówienia
// axios.get('http://localhost:3000/status')
//     .then(response => {
//         console.log('Odpowiedź z serwera:', response.data);
//     })
//     .catch(error => {
//         console.error('Błąd:', error);
//     });