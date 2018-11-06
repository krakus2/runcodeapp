const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors = {};
    if (Validator.isEmpty(data.imieINazwisko)) {
        errors.imieINazwisko = 'Imię i nazwisko jest wymagane';
    }

    if (!Validator.isLength(data.imieINazwisko, { min: 1, max: 60 })) {
        errors.tytulZadania = 'Maksymalna długość imienia i nazwiska to 60 znaków';
    }

    if (Validator.isEmpty(data.nazwaFunkcji)) {
        errors.imieINazwisko = 'Nazwa funkcji jest wymagana';
    }

    if (!Validator.isLength(data.nazwaFunkcji, { min: 1, max: 40 })) {
        errors.tytulZadania = 'Maksymalna długość nazwy funkcji to 40 znaków';
    }

    if (Validator.isEmpty(data.tytulZadania)) {
        errors.tytulZadania = 'Tytuł zadania jest wymagany';
    }

    if (!Validator.isLength(data.tytulZadania, { min: 1, max: 20 })) {
        errors.tytulZadania = 'Maksymalna długość tytułu to 20 znaków';
    }

    if (Validator.isEmpty(data.opisZadania)) {
        errors.opisZadania = 'Tytuł zadania jest wymagany';
    }

    if (!Validator.isLength(data.opisZadania, { min: 5, max: 160 })) {
        errors.opisZadania = 'Minimalna długość opisu to 5, a maksymalna 160 znaków';
    }

    if (Validator.isEmpty(data.code)) {
        errors.opisZadania = 'Przykładowy kod zadania jest wymagany';
    }

    if (!Validator.isLength(data.code, { min: 1, max: 1000 })) {
        errors.opisZadania = 'Maksymalna długość kodu to 1000 znaków';
    }

    if (isEmpty(data.iloscArg)) {
        errors.iloscArg = 'Podaj ilość argumentów';
    }

    if (data.iloscArg < 0 || data.iloscArg > 5) {
        errors.iloscArg = 'Ilość argumentów nie może być mniejsza niż 0 oraz większa niż 5';
    }

    if (isEmpty(data.iloscWynikow)) {
        errors.iloscWynikow = 'Wymagany jest przynajmniej 1 przykładowy wynik';
    }

    if (data.iloscWynikow < 1) {
        errors.iloscWynikow = 'Ilość danych do testu nie może być mniejsza niż 1';
    }

    if (isEmpty(data.args)) {
        errors.args = 'Typy paramtrów są wymagane';
    }

    if (isEmpty(data.returnArgs)) {
        errors.returnArgs = 'Typ zwracany przez funkcję jest wymagany';
    }

    if (isEmpty(data.wyniki)) {
        errors.wyniki = 'Dane do testów są wymagane';
    }

    if (isEmpty(data.czyRekurencja)) {
        errors.czyRekurencja = 'Określenie, czy w funkcji zachodzi rekurencja jest wymagane';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
