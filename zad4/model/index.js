const express = require('express');
const app = express();
const mysql = require('mysql2');

app.use(express.json());

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
    const query = 'SELECT * FROM produkt WHERE idProdukt = ?';

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
app.post('/products', (req, res) => {
    const {nazwa, opis, cena_jednostkowa, waga_jednostkowa, Kategoria_idKategoria} = req.body;

    if(!nazwa || !opis || !cena_jednostkowa || !waga_jednostkowa || !Kategoria_idKategoria) {
        res.status(400).json({ error: 'Brak wymaganych danych produktu' });
        return;
    }
    const query = 'INSERT INTO produkt (nazwa, opis, cena_jednostkowa, waga_jednostkowa, Kategoria_idKategoria) VALUES (?, ?, ?, ?, ?)';

    db.query(query, [nazwa, opis, cena_jednostkowa, waga_jednostkowa, Kategoria_idKategoria], (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych: ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
            return;
        }

        const productId = results.insertId // ID dodanego produktu

        res.status(201).json({ id: productId, nazwa, opis, cena_jednostkowa, waga_jednostkowa, Kategoria_idKategoria });
    });
});


// 4.PUT app_url/products/id - aktualizuje produkt o konkretnym identyfikatorze, pozostałe parametry produktu w ciele żądania. Można też zrobić PUT app_url/products ze wszystkimi parametrami w ciele żądania.
app.put('/products/:id', (req, res) => {
    const productId = req.params.id;
    const {nazwa, opis, cena_jednostkowa, waga_jednostkowa, Kategoria_idKategoria} = req.body;

    if(!nazwa && !opis && !cena_jednostkowa && !waga_jednostkowa && !Kategoria_idKategoria) {
        res.status(400).json({ error: 'Brak wymaganych danych produktu' });
        return;
    }

    const updateFields = [];
    const values = [];

    if (nazwa) {
        updateFields.push('nazwa = ?');
        values.push(nazwa);
    }

    if (opis) {
        updateFields.push('opis = ?');
        values.push(opis);
    }

    if (cena_jednostkowa) {
        updateFields.push('cena_jednostkowa = ?');
        values.push(cena_jednostkowa);
    }

    if (waga_jednostkowa) {
        updateFields.push('waga_jednostkowa = ?');
        values.push(waga_jednostkowa);
    }

    if (Kategoria_idKategoria) {
        updateFields.push('Kategoria_idKategoria = ?');
        values.push(Kategoria_idKategoria);
    }

    values.push(productId);

    const query = `UPDATE produkt SET ${updateFields.join(', ')} WHERE idProdukt = ?`;

    db.query(query, values, (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych: ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
            return;
        }

        if (results.affectedRows === 0) {
            res.status(404).json({ error: 'Produkt o podanym ID nie został znaleziony' });
            return;
        }
        res.json({ message: 'Produkt został zaktualizowany' });
    });
});

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
app.get('/orders', (req, res) => {
    const query = 'SELECT * FROM zamowienie';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych: ' + err.message);
            res.status(500).json({error: 'Błąd zapytania do bazy danych'});
            return;
        }
        res.json(results); // Zwróć wyniki z bazy danych jako JSON
    });
});


// 2.POST app_url/orders - dodaje zamówienie (parametry w ciele żądania)


//              PRZYKLAD WYGENEROWANY PRZEZ CHAT
// app.post('/orders', (req, res) => {
//     const { customer, items } = req.body;
//
//     if (!customer || !items || !Array.isArray(items) || items.length === 0) {
//         res.status(400).json({ error: 'Nieprawidłowe dane zamówienia' });
//         return;
//     }
//
//     db.beginTransaction(err => {
//         if (err) {
//             res.status(500).json({ error: 'Błąd transakcji' });
//             return;
//         }
//
//         // Dodaj zamówienie do tabeli `orders`
//         const orderQuery = 'INSERT INTO orders (customer) VALUES (?)';
//         db.query(orderQuery, [customer], (orderErr, orderResult) => {
//             if (orderErr) {
//                 db.rollback(() => {
//                     res.status(500).json({ error: 'Błąd dodawania zamówienia' });
//                 });
//                 return;
//             }
//
//             const orderId = orderResult.insertId;
//
//             // Dodaj produkty do tabeli `order_items`
//             const itemQuery = 'INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)';
//             items.forEach(item => {
//                 const { product_id, quantity } = item;
//                 db.query(itemQuery, [orderId, product_id, quantity], itemErr => {
//                     if (itemErr) {
//                         db.rollback(() => {
//                             res.status(500).json({ error: 'Błąd dodawania produktu do zamówienia' });
//                         });
//                         return;
//                     }
//                 });
//             });
//
//             db.commit(commitErr => {
//                 if (commitErr) {
//                     db.rollback(() => {
//                         res.status(500).json({ error: 'Błąd transakcji' });
//                     });
//                     return;
//                 }
//
//                 res.status(201).json({ message: 'Zamówienie zostało dodane' });
//             });
//         });
//     });
// });



// 3.PATCH app_url/orders/id - zmiana stanu zamówienia o podanym identyfikatorze, dane w formacie JSON PATCH. Dopuszczalne są inne warianty, np. PUT app_url/orders/id z nowym stanem i pozostałymi parametrami zamówienia w ciele żądania.
// 4.GET app_url/orders/status/id - pobranie zamówień z określonym stanem

// STAN ZAMOWIENIA
// 1.GET app_url/status - zwraca wszystkie możliwe stany zamówienia
app.get('/status', (req, res) => {
    const query = 'SELECT * FROM stan_zamowienia';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych: ' + err.message);
            res.status(500).json({error: 'Błąd zapytania do bazy danych'});
            return;
        }
        res.json(results); // Zwróć wyniki z bazy danych jako JSON
    });
});

app.listen(3000, () => {
    console.log('Serwer nasłuchuje na porcie 3000');
});