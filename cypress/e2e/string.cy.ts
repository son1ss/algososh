import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Страница разворота строки', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/recursion');
  });

  it('кнопка "Рассчитать" должна быть неактивной при пустом поле ввода', () => {
    cy.get('.input-form input').should('be.empty');
    cy.get('.input-form button').should('be.disabled');
  });

  it('строка должна разворачиваться корректно', () => {
    const inputString = 'TestString';

    cy.get('.input-form input').type(inputString);
    cy.get('.input-form button').click();

    cy.get('.circles').children().should('have.length', inputString.length);

    for (let i = 0; i < inputString.length / 2; i++) {
      cy.get(`.circles`)
        .children()
        .eq(i)
        .should('contain.text', inputString[inputString.length - i - 1])
        .find('div[class^="circle"]')
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
    cy.get('.circles')
      .children()
      .should('have.length', inputString.length)
      .each((circle) => {
        cy.wrap(circle)
          .find('div[class^="circle"]')
          .should('satisfy', (elements) => {
            const classList: string[] = Array.from(elements[0].classList);
            return classList.some((name) => name.includes('modified'));
          });
      });
  });
});
