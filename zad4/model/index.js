const express = require('express');
const app = express();
const mysql = require('mysql2');

// Połączenie z bazą danych
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mydb'
});

// Test połączenia z bazą danych
db.connect(err => {
    if (err) {
        console.error('Błąd połączenia z bazą danych: ' + err.message);
    } else {
        console.log('Połączono z bazą danych');
    }
});

//PRODUKT

//1. GET app_url/products - zwraca wszystkie produkty
app.get('/products', (req, res) => {
    const query = 'SELECT * FROM produkt';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych: ' + err.message);
            res.status(500).json({error: 'Błąd zapytania do bazy danych'});
            return;
        }
        res.json(results); // Zwróć wyniki z bazy danych jako JSON
    });
});

// 2. GET app_url/products/id - zwraca dane produktu o konkretnym identyfikatorze
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT * FROM products WHERE id = ?';

    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych: ' + err.message);
            res.status(500).json({error: 'Błąd zapytania do bazy danych'});
            return;
        }

        if (results.length === 0) {
            res.status(404).json({error: 'Produkt o podanym ID nie został znaleziony'});
            return;
        }

        res.json(results[0]); // Zwróć dane produktu jako JSON
    });
});

// 3.POST app_url/products - dodaje produkt do bazy (parametry w ciele żądania)
// 4.PUT app_url/products/id - aktualizuje produkt o konkretnym identyfikatorze, pozostałe parametry produktu w ciele żądania. Można też zrobić PUT app_url/products ze wszystkimi parametrami w ciele żądania.

// KATEGORIE
// 1.GET app_url/categories - zwraca wszystkie kategorie
app.get('/categories', (req, res) => {
    const query = 'SELECT * FROM kategoria';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych: ' + err.message);
            res.status(500).json({error: 'Błąd zapytania do bazy danych'});
            return;
        }
        res.json(results); // Zwróć wyniki z bazy danych jako JSON
    });
});

// ZAMOWIENIA
// 1.GET app_url/orders - zwraca wszystkie zamówienia
// 2.POST app_url/orders - dodaje zamówienie (parametry w ciele żądania)
// 3.PATCH app_url/orders/id - zmiana stanu zamówienia o podanym identyfikatorze, dane w formacie JSON PATCH. Dopuszczalne są inne warianty, np. PUT app_url/orders/id z nowym stanem i pozostałymi parametrami zamówienia w ciele żądania.
// 4.GET app_url/orders/status/id - pobranie zamówień z określonym stanem

// STAN ZAMOWIENIA
// 1.GET app_url/status - zwraca wszystkie możliwe stany zamówienia


app.listen(3000, () => {
    console.log('Serwer nasłuchuje na porcie 3000');
});