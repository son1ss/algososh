import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { inputSelector, circlesSelector, innerCirclesSelector, buttonSelector } from '../constants/selectors';

describe('Страница разворота строки', () => {
  beforeEach(() => {
    cy.visit('/recursion');
  });

  it('кнопка "Рассчитать" должна быть неактивной при пустом поле ввода', () => {
    cy.get(inputSelector).should('be.empty');
    cy.get(buttonSelector).should('be.disabled');
  });

  it('строка должна разворачиваться корректно', () => {
    const inputString = 'TestString';

    cy.get(inputSelector).type(inputString);
    cy.get(buttonSelector).click();

    cy.get(circlesSelector).children().should('have.length', inputString.length);

    for (let i = 0; i < inputString.length / 2; i++) {
      cy.get(circlesSelector)
        .children()
        .eq(i)
        .should('contain.text', inputString[inputString.length - i - 1])
        .find(innerCirclesSelector)
        .should('satisfy', (elements) => {
          const classList: string[] = Array.from(elements[0].classList);
          return classList.some((name) => name.includes('changing'));
        })
        .wait(SHORT_DELAY_IN_MS)
        .and('satisfy', (elements) => {
          const classList: string[] = Array.from(elements[0].classList);
          return classList.some((name) => name.includes('modified'));
        });
    }
    cy.get(circlesSelector)
      .children()
      .should('have.length', inputString.length)
      .each((circle) => {
        cy.wrap(circle)
          .find(innerCirclesSelector)
          .should('satisfy', (elements) => {
            const classList: string[] = Array.from(elements[0].classList);
            return classList.some((name) => name.includes('modified'));
          });
      });
  });
});
