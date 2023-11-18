const cors = require('cors'); 
const express = require('express');
const app = express();
const mysql = require('mysql2');


app.use(express.json());
app.use(cors());



app.listen(3000, () => {
    console.log('Serwer nasłuchuje na porcie 3000');
});
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
    const query = 'SELECT produkt.*, kategoria.nazwa AS nazwa_kategorii FROM produkt JOIN kategoria ON produkt.Kategoria_idKategoria = kategoria.idKategoria';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych: ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
            return;
        }

        const productsWithCategoryNames = results.map((product) => {
            return {
                idProdukt: product.idProdukt,
                nazwa: product.nazwa,
                opis: product.opis,
                cena_jednostkowa: product.cena_jednostkowa,
                waga_jednostkowa: product.waga_jednostkowa,
                nazwa_kategorii: product.nazwa_kategorii
            };
        });

        res.json(productsWithCategoryNames);
    });
});

// 2. GET app_url/products/id - zwraca dane produktu o konkretnym identyfikatorze
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const query = 'SELECT produkt.*, kategoria.nazwa AS nazwa_kategorii FROM produkt JOIN kategoria ON produkt.Kategoria_idKategoria = kategoria.idKategoria WHERE produkt.idProdukt = ?';

    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych: ' + err.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Produkt o podanym ID nie został znaleziony' });
            return;
        }

        res.json(results[0]); // Zwróć dane produktu, w tym nazwę kategorii, jako JSON
    });
});

// 3.POST app_url/products - dodaje produkt do bazy (parametry w ciele żądania)
app.post('/products', (req, res) => {
    const {nazwa, opis, cena_jednostkowa, waga_jednostkowa, Kategoria_idKategoria} = req.body;

    if(!nazwa || !opis || !cena_jednostkowa || !waga_jednostkowa || !Kategoria_idKategoria) {
        res.status(400).json({ error: 'Brak wymaganych danych produktu' });
        return;
    }

    if(cena_jednostkowa <= 0 || waga_jednostkowa <= 0) {
        res.status(400).json({ error: 'Cena i waga muszą być liczbami dodatnimi' });
        return;
    }

    if(nazwa.length > 45 || opis.length > 255) {
        res.status(400).json({ error: 'Nazwa i opis nie mogą być dłuższe niż 45 i 255 znaków' });
        return;
    }

    if(!Number.isInteger(Kategoria_idKategoria)) {
        res.status(400).json({ error: 'ID kategorii musi być liczbą całkowitą' });
        return;
    }

    if(Kategoria_idKategoria <= 0) {
        res.status(400).json({ error: 'ID kategorii musi być liczbą dodatnią' });
        return;
    }

    if(nazwa.length === 0 || opis.length === 0) {
        res.status(400).json({ error: 'Nazwa i opis nie mogą być puste' });
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
        if(nazwa.length > 45) {
            res.status(400).json({ error: 'Nazwa nie może być dłuższa niż 45 znaków' });
            return;
        }
        if(nazwa.length === 0) {
            res.status(400).json({ error: 'Nazwa nie może być pusta' });
            return;
        }
        updateFields.push('nazwa = ?');
        values.push(nazwa);
    }

    if (opis) {
        if(opis.length > 255) {
            res.status(400).json({ error: 'Opis nie może być dłuższy niż 255 znaków' });
            return;
        }
        if(opis.length === 0) {
            res.status(400).json({ error: 'Opis nie może być pusty' });
            return;
        }
        updateFields.push('opis = ?');
        values.push(opis);
    }

    if (cena_jednostkowa) {
        if(cena_jednostkowa <= 0) {
            res.status(400).json({ error: 'Cena musi być liczbą dodatnią' });
            return;
        }
        updateFields.push('cena_jednostkowa = ?');
        values.push(cena_jednostkowa);
    }

    if (waga_jednostkowa) {
        if(waga_jednostkowa <= 0) {
            res.status(400).json({ error: 'Waga musi być liczbą dodatnią' });
            return;
        }
        updateFields.push('waga_jednostkowa = ?');
        values.push(waga_jednostkowa);
    }

    if (Kategoria_idKategoria) {
        if(!Number.isInteger(Kategoria_idKategoria)) {
            res.status(400).json({ error: 'ID kategorii musi być liczbą całkowitą' });
            return;
        }
        if(Kategoria_idKategoria <= 0) {
            res.status(400).json({ error: 'ID kategorii musi być liczbą dodatnią' });
            return;
        }

        const checkCategoryQuery = 'SELECT idKategoria FROM kategoria WHERE idKategoria = Kategoria_idKategoria';

        db.query(checkCategoryQuery, (categoryErr, categoryResults) => {
            if (categoryErr) {
                console.error('Błąd zapytania do bazy danych: ' + categoryErr.message);
                res.status(500).json({error: 'Błąd zapytania do bazy danych'});
                return;
            }

            if (categoryResults.length === 0) {
                res.status(404).json({error: 'Kategoria o podanym ID nie istnieje'});
                return;
            }
        });

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
app.post('/orders', (req, res) => {
    const { data_zamowienia, nazwa_uzytkownika, email, numer_telefonu, Stan_Zamowienia_idStan_Zamowienia, items } = req.body;

    if (!data_zamowienia || !nazwa_uzytkownika || !email || !numer_telefonu || !Stan_Zamowienia_idStan_Zamowienia || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Nieprawidłowe dane zamówienia' });
    }

    if (/[a-zA-Z]/.test(numer_telefonu)) {
        return res.status(400).json({ error: 'Numer telefonu nie może zawierać liter' });
    }


    db.beginTransaction(err => {
        if (err) {
            return res.status(500).json({ error: 'Błąd transakcji' });
        }

        // Sprawdź, czy produkty istnieją w bazie danych
        const productIds = items.map(item => item.Produkt_idProdukt);
        const checkProductsQuery = 'SELECT idProdukt FROM produkt WHERE idProdukt IN (?)';
        db.query(checkProductsQuery, [productIds], (checkProductsErr, productResults) => {
            if (checkProductsErr) {
                db.rollback(() => {
                    return res.status(500).json({error: 'Błąd sprawdzania produktów'});
                });
            }

            if (productResults.length !== productIds.length) {
                db.rollback(() => {
                    return res.status(400).json({error: 'Nieprawidłowe identyfikatory produktów'});
                });
            }
        });

        // Dodaj zamówienie do tabeli `orders`
        const orderQuery = 'INSERT INTO zamowienie (data_zamowienia, nazwa_uzytkownika, email, numer_telefonu, Stan_Zamowienia_idStan_Zamowienia) VALUES (?, ?, ?, ?, ?)';
        db.query(orderQuery, [data_zamowienia, nazwa_uzytkownika, email, numer_telefonu, Stan_Zamowienia_idStan_Zamowienia], (orderErr, orderResult) => {
            if (orderErr) {
                db.rollback(() => {
                    return res.status(500).json({ error: 'Błąd dodawania zamówienia' });
                });
            }
            const orderId = orderResult.insertId;

            // Dodaj produkty do tabeli `order_items`
            const itemQuery = 'INSERT INTO zamowienie_produkt (Zamowienie_idZamowienie, Produkt_idProdukt, ilosc) VALUES (?, ?, ?)';
            items.forEach(item => {
                const { Produkt_idProdukt, ilosc } = item;
                if(ilosc <= 0) {
                    db.rollback(() => {
                        return res.status(400).json({ error: 'Ilość produktu musi być liczbą dodatnią' });
                    });
                }
                if(/[a-zA-Z]/.test(ilosc)) {
                    db.rollback(() => {
                        return res.status(400).json({ error: 'Ilość produktu nie może zawierać liter' });
                    });
                }

                db.query(itemQuery, [orderId, Produkt_idProdukt, ilosc], itemErr => {
                    if (itemErr) {
                        db.rollback(() => {
                            return res.status(500).json({ error: 'Błąd dodawania produktu do zamówienia' });
                        });
                    }
                });
            });

            db.commit(commitErr => {
                if (commitErr) {
                    db.rollback(() => {
                        return res.status(500).json({ error: 'Błąd transakcji' });
                    });
                }

                return res.status(201).json({ message: 'Zamówienie zostało dodane' });
            });
        });
    });
});



// 3.PATCH app_url/orders/id - zmiana stanu zamówienia o podanym identyfikatorze, dane w formacie JSON PATCH. Dopuszczalne są inne warianty, np. PUT app_url/orders/id z nowym stanem i pozostałymi parametrami zamówienia w ciele żądania.
app.patch('/orders/:id', (req, res) => {
    const orderId = parseInt(req.params.id);
    const newState = req.body; // Przyjmujemy dane w formacie JSON PATCH lub JSON PUT

    if (!newState || Object.keys(newState).length === 0) {
        return res.status(400).json({ error: 'Brak danych do aktualizacji' });
    }

    // Check if the 'numer_telefonu' is a valid numeric value
    if ('numer_telefonu' in newState && /[a-zA-Z]/.test(newState.numer_telefonu)) {
        return res.status(400).json({ error: 'Numer telefonu nie może zawierać liter' });
    }

    db.beginTransaction(err => {
        if (err) {
            return res.status(500).json({ error: 'Błąd transakcji' });
        }

        // Przykładowe zapytanie do bazy danych, aby sprawdzić aktualny stan zamówienia
        const currentStatusQuery = 'SELECT Stan_Zamowienia_idStan_Zamowienia FROM zamowienie WHERE idZamowienie = ? FOR UPDATE';
        db.query(currentStatusQuery, [orderId], (currentStatusErr, currentStatusResults) => {
            if (currentStatusErr) {
                return db.rollback(() => {
                    res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
                });
            }

            if (currentStatusResults.length === 0) {
                return db.rollback(() => {
                    res.status(404).json({ error: 'Zamówienie o podanym ID nie istnieje' });
                });
            }

            const currentStatusId = currentStatusResults[0].Stan_Zamowienia_idStan_Zamowienia;

            // Jeśli obecny stan to 3 ("ANULOWANE"), zwróć błąd
            if (currentStatusId === 3) {
                return db.rollback(() => {
                    res.status(400).json({ error: 'Nie można zmienić statusu zamówienia o statusie "ANULOWANE"' });
                });
            }

            if ((currentStatusId === 4 && newState.Stan_Zamowienia_idStan_Zamowienia !== 4) || (currentStatusId === 2 && newState.Stan_Zamowienia_idStan_Zamowienia === 1)) {
                return db.rollback(() => {
                    res.status(400).json({ error: 'Nie można dokonać takiej zmiany stanu zamówienia' });
                });
            }

            // Przykładowe zapytanie do bazy danych, aby sprawdzić, czy nowy stan istnieje
            const checkQuery = 'SELECT * FROM stan_zamowienia WHERE idStan_Zamowienia = ?';
            db.query(checkQuery, [newState.Stan_Zamowienia_idStan_Zamowienia], (checkErr, checkResults) => {
                if (checkErr) {
                    return db.rollback(() => {
                        res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
                    });
                }

                if (checkResults.length === 0) {
                    return db.rollback(() => {
                        res.status(400).json({ error: 'Podany stan zamówienia nie istnieje' });
                    });
                }

                // Budujemy zapytanie aktualizacji
                const updateFields = { Stan_Zamowienia_idStan_Zamowienia: newState.Stan_Zamowienia_idStan_Zamowienia };
                if (newState.data_zamowienia) updateFields.data_zamowienia = newState.data_zamowienia;
                if (newState.nazwa_uzytkownika) updateFields.nazwa_uzytkownika = newState.nazwa_uzytkownika;
                if (newState.email) updateFields.email = newState.email;
                if (newState.numer_telefonu) updateFields.numer_telefonu = newState.numer_telefonu;

                const updateQuery = 'UPDATE zamowienie SET ? WHERE idZamowienie = ?';
                db.query(updateQuery, [updateFields, orderId], (err, results) => {
                    if (err) {
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
                        });
                    }

                    db.commit(commitErr => {
                        if (commitErr) {
                            return db.rollback(() => {
                                res.status(500).json({ error: 'Błąd transakcji' });
                            });
                        }

                        res.json({ message: 'Zaktualizowano zamówienie' });
                    });
                });
            });
        });
    });
});

// 4.GET app_url/orders/status/id - pobranie zamówień z określonym stanem
app.get('/orders/status/:id', (req, res) => {
    const statusId = parseInt(req.params.id);

    // Sprawdzenie, czy podany stan istnieje w bazie danych
    const checkStatusQuery = 'SELECT * FROM stan_zamowienia WHERE idStan_Zamowienia = ?';
    db.query(checkStatusQuery, [statusId], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('Błąd zapytania do bazy danych: ' + checkErr.message);
            res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
            return;
        }

        if (checkResults.length === 0) {
            res.status(404).json({ error: 'Podany stan zamówienia nie istnieje' });
            return;
        }

        // Pobranie zamówienia o podanym stanie
        const query = 'SELECT * FROM zamowienie WHERE Stan_Zamowienia_idStan_Zamowienia = ?';
        db.query(query, [statusId], (err, results) => {
            if (err) {
                console.error('Błąd zapytania do bazy danych: ' + err.message);
                res.status(500).json({ error: 'Błąd zapytania do bazy danych' });
                return;
            }
            res.json(results);
        });
    });
});

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

// 2. GET app_url/products/id_zamowienia - zwraca produkty w zamówieniu o konkretnym identyfikatorze
app.get('/products/order/:id_zamowienia', (req, res) => {
    const orderId = req.params.id_zamowienia;
    const query = 'SELECT zamowienie_produkt.ilosc, produkt.nazwa AS nazwa_produktu, produkt.opis, produkt.cena_jednostkowa, produkt.waga_jednostkowa, produkt.Kategoria_idKategoria FROM zamowienie_produkt JOIN produkt ON zamowienie_produkt.Produkt_idProdukt = produkt.idProdukt WHERE zamowienie_produkt.Zamowienie_idZamowienie = ?';

    db.query(query, [orderId], (err, results) => {
        if (err) {
            console.error('Błąd zapytania do bazy danych: ' + err.message);
            res.status(500).json({error: 'Błąd zapytania do bazy danych'});
            return;
        }

        if (results.length === 0) {
            res.status(404).json({error: 'Zamówienie o podanym ID nie istnieje'});
            return;
        }

        res.json(results);
    });
});


app.use((req, res, next) => {
    res.status(404).send('Nie znaleziono strony ;((');
  });
  
 