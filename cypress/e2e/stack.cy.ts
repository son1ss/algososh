import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Страница стека', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/stack');
  });

  it('кнопка "Добавить" должна быть неактивной при пустом поле ввода', () => {
    cy.get('.input-form input').should('be.empty');
    cy.get('.input-form button:contains("Добавить")').should('be.disabled');
  });

  it('правильное добавление элемента в стек', () => {
    const inputValue = 'I1';

    cy.get('.input-form input').type(inputValue);
    cy.get('.input-form button:contains("Добавить")').click();

    cy.get('.circles')
      .children()
      .should('have.length', 1)
      .first()
      .should('contain.text', inputValue)
      .find('div[class^="circle"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      })
      .wait(SHORT_DELAY_IN_MS)
      .and('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('default'));
      });
  });

  it('правильное удаление элемента из стека', () => {
    const inputValue = 'I1';

    cy.get('.input-form input').type(inputValue);
    cy.get('.input-form button:contains("Добавить")').click();

    cy.get('.circles').children().should('have.length', 1);

    cy.get('.input-form button:contains("Удалить")').click();

    cy.get('.circles')
      .children()
      .first()
      .find('div[class^="circle"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      });
    cy.get('.circles').children().should('have.length', 0);
  });

  it('правильное поведение кнопки "Очистить"', () => {
    const inputValues = ['I1', 'I2', 'I3'];

    inputValues.forEach((value) => {
      cy.get('.input-form input').type(value);
      cy.get('.input-form button:contains("Добавить")').click();
    });

    cy.get('.circles').children().should('have.length', inputValues.length);

    cy.get('.input-form button:contains("Очистить")').click();

    cy.get('.circles').children().should('have.length', 0);
  });
});
