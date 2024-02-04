import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Страница чисел Фибоначчи', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('кнопка "Рассчитать" должна быть неактивной при пустом поле ввода', () => {
    cy.get('.input-form input').should('be.empty');
    cy.get('.input-form button').should('be.disabled');
  });

  it('числа генерируются корректно', () => {
    const expectedFibonacciSequence = [1, 1, 2, 3, 5];

    cy.get('.input-form input').type('5');
    cy.get('.input-form button').click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('.circles')
      .children()
      .should('have.length', expectedFibonacciSequence.length)
      .each((circle, index) => {
        const expectedNumber = expectedFibonacciSequence[index];
        cy.wrap(circle).should('contain.text', expectedNumber);
      });
  });
});
