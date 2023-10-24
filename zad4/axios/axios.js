const axios = require('axios');

//PRODUKT
// 1. GET app_url/products - zwraca wszystkie produkty
axios.get('http://localhost:3000/products')
    .then(response => {
        console.log('Odpowiedź z serwera:', response.data);
    })
    .catch(error => {
        console.error('Błąd:', error);
    });

// 2. GET app_url/products/id - zwraca dane produktu o konkretnym identyfikatorze
axios.get('http://localhost:3000/products/1')
    .then(response => {
        console.log('Odpowiedź z serwera:', response.data);
    })
    .catch(error => {
        console.error('Błąd:', error);
    });


// 3.POST app_url/products - dodaje produkt do bazy (parametry w ciele żądania)
const newProduct = {
    nazwa: 'Nowszy Produkt',
    opis: 'To jest przykladowy nowy produkt',
    cena_jednostkowa: 1.99,
    waga_jednostkowa: 0.5,
    Kategoria_idKategoria: 15
};
axios.post('http://localhost:3000/products', JSON.stringify(newProduct), {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        console.log('Dodano nowy produkt:', response.data);
    })
    .catch(error => {
        console.error('Błąd:', error.response.data);
    });

// 4.PUT app_url/products/id - aktualizuje produkt o konkretnym identyfikatorze, pozostałe parametry produktu w ciele żądania. Można też zrobić PUT app_url/products ze wszystkimi parametrami w ciele żądania.
const updateProduct = {
    nazwa: 'Zaktualizowany produkt'
}
axios.put('http://localhost:3000/products/1', JSON.stringify(updateProduct), {
    headers: {
        'Content-Type': 'application/json',
    },
}).then(response => {
    console.log('Zaktualizowano produkt:', response.data);
})
    .catch(error => {
        console.error('Błąd:', error.response.data);
    });

// KATEGORIE
// 1.GET app_url/categories - zwraca wszystkie kategorie
axios.get('http://localhost:3000/categories')
    .then(response => {
        console.log('Odpowiedź z serwera:', response.data);
    })
    .catch(error => {
        console.error('Błąd:', error);
    });


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


// 3.PATCH app_url/orders/id - zmiana stanu zamówienia o podanym identyfikatorze, dane w formacie JSON PATCH. Dopuszczalne są inne warianty, np. PUT app_url/orders/id z nowym stanem i pozostałymi parametrami zamówienia w ciele żądania.
const newState = {
    numer_telefonu: '666-666-666',
    nazwa_uzytkownika: 'Jane Doe',
    Stan_Zamowienia_idStan_Zamowienia: 4, // Nowy stan zamówienia
};

axios.patch(`http://localhost:3000/orders/1`, newState)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error.response.data);
    });



// 4.GET app_url/orders/status/id - pobranie zamówień z określonym stanem
const statusIdToFetch = 4;

axios.get(`http://localhost:3000/orders/status/${statusIdToFetch}`)
    .then((response) => {
        console.log('Odpowiedź z serwera:', response.data);
    })
    .catch((error) => {
        console.error('Błąd zapytania do serwera:', error.message);
    });



// STAN ZAMOWIENIA
// 1.GET app_url/status - zwraca wszystkie możliwe stany zamówienia
axios.get('http://localhost:3000/status')
    .then(response => {
        console.log('Odpowiedź z serwera:', response.data);
    })
    .catch(error => {
        console.error('Błąd:', error);
    });