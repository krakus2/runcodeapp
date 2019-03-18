const validateProfileInput = require('../../validators/task');
const sampleData = require('../../utils/sampleTestingData');
let taskData = { ...sampleData.taskData };
const taskDataError = { ...sampleData.taskDataError };
const taskDataErrors1 = { ...sampleData.taskDataErrors1 };
const taskDataErrors2 = { ...sampleData.taskDataErrors2 };

describe('validateProfileInput', () => {
   it('should return proper object if given data is in the right shape', () => {
      expect(validateProfileInput(taskData)).toEqual({ errors: {}, isValid: true });
   });

   it('should return error object', () => {
      expect(validateProfileInput(taskDataError)).toEqual({
         errors: { opisZadania: 'Minimalna długość opisu to 5, a maksymalna 500 znaków' },
         isValid: false
      });
      expect(validateProfileInput(taskDataErrors1)).toEqual({
         errors: {
            imieINazwisko: 'Imię i nazwisko jest wymagane',
            tytulZadania: 'Tytuł zadania jest wymagany',
            nazwaFunkcji: 'Nazwa funkcji jest wymagana',
            opisZadania: 'Minimalna długość opisu to 5, a maksymalna 500 znaków',
            code: 'Przykładowy kod zadania jest wymagany',
            iloscArg: 'Ilość argumentów nie może być mniejsza niż 0 oraz większa niż 5',
            iloscWynikow: 'Ilość danych do testu nie może być mniejsza niż 1',
            args: 'Typy paramtrów są wymagane',
            returnArgs: 'Typ zwracany przez funkcję jest wymagany',
            wyniki: 'Dane do testów są wymagane',
            czyRekurencja: 'Określenie, czy w funkcji zachodzi rekurencja jest wymagane'
         },
         isValid: false
      });

      expect(validateProfileInput(taskDataErrors2)).toEqual({
         errors: {
            imieINazwisko: 'Maksymalna długość imienia i nazwiska to 80 znaków',
            tytulZadania: 'Maksymalna długość tytułu to 100 znaków',
            nazwaFunkcji: 'Maksymalna długość nazwy funkcji to 60 znaków',
            opisZadania: 'Minimalna długość opisu to 5, a maksymalna 500 znaków',
            code: 'Przykładowy kod zadania jest wymagany',
            iloscArg: 'Ilość argumentów nie może być mniejsza niż 0 oraz większa niż 5',
            iloscWynikow: 'Ilość danych do testu nie może być mniejsza niż 1',
            args: 'Typy paramtrów są wymagane',
            returnArgs: 'Typ zwracany przez funkcję jest wymagany',
            wyniki: 'Dane do testów są wymagane',
            czyRekurencja: 'Określenie, czy w funkcji zachodzi rekurencja jest wymagane'
         },
         isValid: false
      });
   });
});
