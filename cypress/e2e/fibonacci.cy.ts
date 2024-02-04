import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { inputSelector, circlesSelector, buttonSelector } from '../constants/selectors';

describe('Страница чисел Фибоначчи', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('кнопка "Рассчитать" должна быть неактивной при пустом поле ввода', () => {
    cy.get(inputSelector).should('be.empty');
    cy.get(buttonSelector).should('be.disabled');
  });

  it('числа генерируются корректно', () => {
    const expectedFibonacciSequence = [1, 1, 2, 3, 5];

    cy.get(inputSelector).type('5');
    cy.get(buttonSelector).click();

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circlesSelector)
      .children()
      .should('have.length', expectedFibonacciSequence.length)
      .each((circle, index) => {
        const expectedNumber = expectedFibonacciSequence[index];
        cy.wrap(circle).should('contain.text', expectedNumber);
      });
  });
});
