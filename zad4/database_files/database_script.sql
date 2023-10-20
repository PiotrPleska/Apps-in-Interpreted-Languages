-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`Kategoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Kategoria` (
  `idKategoria` INT NOT NULL AUTO_INCREMENT,
  `nazwa` VARCHAR(45) NULL,
  PRIMARY KEY (`idKategoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Produkt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Produkt` (
  `idProdukt` INT NOT NULL AUTO_INCREMENT,
  `nazwa` VARCHAR(45) NULL,
  `opis` VARCHAR(90) NULL,
  `cena_jednostkowa` FLOAT NULL,
  `waga_jednostkowa` FLOAT NULL,
  `Kategoria_idKategoria` INT NOT NULL,
  PRIMARY KEY (`idProdukt`, `Kategoria_idKategoria`),
  INDEX `fk_Produkt_Kategoria1_idx` (`Kategoria_idKategoria` ASC) VISIBLE,
  CONSTRAINT `fk_Produkt_Kategoria1`
    FOREIGN KEY (`Kategoria_idKategoria`)
    REFERENCES `mydb`.`Kategoria` (`idKategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Stan_Zamowienia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Stan_Zamowienia` (
  `idStan_Zamowienia` INT NOT NULL AUTO_INCREMENT,
  `nazwa` VARCHAR(45) NULL,
  PRIMARY KEY (`idStan_Zamowienia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Zamowienie`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Zamowienie` (
  `idZamowienie` INT NOT NULL AUTO_INCREMENT,
  `data_zamowienia` DATETIME NULL,
  `nazwa_uzytkownika` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  `numer_telefonu` VARCHAR(45) NULL,
  `towar` VARCHAR(45) NULL,
  `liczba_sztuk` VARCHAR(45) NULL,
  `Stan_Zamowienia_idStan_Zamowienia` INT NOT NULL,
  PRIMARY KEY (`idZamowienie`, `Stan_Zamowienia_idStan_Zamowienia`),
  INDEX `fk_Zamowienie_Stan Zamowienia_idx` (`Stan_Zamowienia_idStan_Zamowienia` ASC) VISIBLE,
  CONSTRAINT `fk_Zamowienie_Stan Zamowienia`
    FOREIGN KEY (`Stan_Zamowienia_idStan_Zamowienia`)
    REFERENCES `mydb`.`Stan_Zamowienia` (`idStan_Zamowienia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Zamowienie_Produkt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Zamowienie_Produkt` (
  `idZamowienie_Produkt` INT NOT NULL AUTO_INCREMENT,
  `ilosc` INT NULL,
  `Produkt_idProdukt` INT NOT NULL,
  `Zamowienie_idZamowienie` INT NOT NULL,
  PRIMARY KEY (`idZamowienie_Produkt`, `Produkt_idProdukt`, `Zamowienie_idZamowienie`),
  INDEX `fk_Zamowienie_Produkt_Produkt1_idx` (`Produkt_idProdukt` ASC) VISIBLE,
  INDEX `fk_Zamowienie_Produkt_Zamowienie1_idx` (`Zamowienie_idZamowienie` ASC) VISIBLE,
  CONSTRAINT `fk_Zamowienie_Produkt_Produkt1`
    FOREIGN KEY (`Produkt_idProdukt`)
    REFERENCES `mydb`.`Produkt` (`idProdukt`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Zamowienie_Produkt_Zamowienie1`
    FOREIGN KEY (`Zamowienie_idZamowienie`)
    REFERENCES `mydb`.`Zamowienie` (`idZamowienie`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
