use mydb;

insert into stan_zamowienia(nazwa)
values("NIEZATWIERDZONE");

insert into stan_zamowienia(nazwa)
values("ZATWIERDZONE");

insert into stan_zamowienia(nazwa)
values("ANULOWANE");

insert into stan_zamowienia(nazwa)
values("ZREALIZOWANE");

select * from stan_zamowienia;