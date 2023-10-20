const axios = require('axios');

axios.get('http://localhost:3000/products')
    .then(response => {
        console.log('Odpowiedź z serwera:', response.data);
    })
    .catch(error => {
        console.error('Błąd:', error);
    });

axios.get('http://localhost:3000/products/1')
    .then(response => {
        console.log('Odpowiedź z serwera:', response.data);
    })
    .catch(error => {
        console.error('Błąd:', error);
    });

axios.get('http://localhost:3000/categories')
    .then(response => {
        console.log('Odpowiedź z serwera:', response.data);
    })
    .catch(error => {
        console.error('Błąd:', error);
    });