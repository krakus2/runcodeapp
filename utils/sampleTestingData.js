module.exports = {
   //valid data
   taskData: {
      imieINazwisko: "Filip 'test' Krakowiak",
      tytulZadania: 'Zadanie Testowe nr 1',
      opisZadania: 'Opis zadania testowego',
      nazwaFunkcji: 'zadTest',
      iloscArg: 2,
      iloscWynikow: 2,
      args: ['Tablica []', 'int', 'Typ prosty', 'int'],
      returnArgs: ['Typ prosty', 'int'],
      code: `
         public static void Main()
            {
               Student Student = new Student();
               Console.WriteLine("Student details - {0}", Student);
               Student.Name = "BOB";
               Student.Age = 99;
            }
      `,
      wyniki: ['1,2,4,3,6,4,8,9', '2', '4', '1,3,0,6,4,-8,2', '-2', '1'],
      czyRekurencja: false,
      czyPrzeczytano: false
   },
   //data with too short task description
   //API should throw an error
   taskDataError: {
      imieINazwisko: "Filip 'test' Krakowiak",
      tytulZadania: 'Zadanie Testowe nr 1',
      opisZadania: 'Opis',
      nazwaFunkcji: 'zadTest',
      iloscArg: 2,
      iloscWynikow: 2,
      args: ['Tablica []', 'int', 'Typ prosty', 'int'],
      returnArgs: ['Typ prosty', 'int'],
      code: `
         public static void Main()
            {
               Student Student = new Student();
               Console.WriteLine("Student details - {0}", Student);
               Student.Name = "BOB";
               Student.Age = 99;
            }
      `,
      wyniki: ['1,2,4,3,6,4,8,9', '2', '4', '1,3,0,6,4,-8,2', '-2', '1'],
      czyRekurencja: false,
      czyPrzeczytano: false
   }
};
