const exercise1 = require('../../exercises/exercise1');

describe('fizzBuz tests', () => {
   it('throwing an error', () => {
      expect(() => {
         exercise1.fizzBuzz('3');
      }).toThrow();
      expect(() => {
         exercise1.fizzBuzz(undefined);
      }).toThrow();
      expect(() => {
         exercise1.fizzBuzz(null);
      }).toThrow();
      expect(() => {
         exercise1.fizzBuzz({ id: '1234' });
      }).toThrow();
   });

   it('divisible by 3 and 5', () => {
      expect(exercise1.fizzBuzz(3)).not.toBe('FizzBuzz');
      expect(exercise1.fizzBuzz(5)).not.toBe('FizzBuzz');
      expect(exercise1.fizzBuzz(7)).not.toBe('FizzBuzz');
      expect(exercise1.fizzBuzz(15)).toBe('FizzBuzz');
      expect(exercise1.fizzBuzz(45)).toBe('FizzBuzz');
   });

   it('divisible by 3', () => {
      expect(exercise1.fizzBuzz(3)).toBe('Fizz');
      expect(exercise1.fizzBuzz(9)).toBe('Fizz');
      expect(exercise1.fizzBuzz(5)).not.toBe('Fizz');
      expect(exercise1.fizzBuzz(7)).not.toBe('Fizz');
   });

   it('divisible by 5', () => {
      expect(exercise1.fizzBuzz(5)).toBe('Buzz');
      expect(exercise1.fizzBuzz(25)).toBe('Buzz');
      expect(exercise1.fizzBuzz(2)).not.toBe('Buzz');
      expect(exercise1.fizzBuzz(8)).not.toBe('Buzz');
   });

   it('not divisible by 3 or 5', () => {
      expect(exercise1.fizzBuzz(7)).toBe(7);
      expect(exercise1.fizzBuzz(9)).not.toBe(9);
      expect(exercise1.fizzBuzz(101)).toBe(101);
      expect(exercise1.fizzBuzz(13)).toBe(13);
   });
});
