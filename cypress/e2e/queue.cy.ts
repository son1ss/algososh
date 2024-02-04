import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Страница очереди', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/queue');
  });

  it('кнопка "Добавить" должна быть неактивной при пустом поле ввода', () => {
    cy.get('.input-form input').should('be.empty');
    cy.get('.input-form button:contains("Добавить")').should('be.disabled');
  });

  it('правильное добавление элемента в очередь', () => {
    const inputValue = 'I1';

    cy.get('.input-form input').type(inputValue);
    cy.get('.input-form button:contains("Добавить")').click();

    cy.get('.circles')
      .children()
      .first()
      .find('div[class^="circle"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      });
    cy.get('.circles')
      .children()
      .first()
      .should('contain.text', inputValue)
      .should('contain.text', 'head')
      .should('contain.text', 'tail')
      .wait(SHORT_DELAY_IN_MS)
      .find('div[class^="circle"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('default'));
      });
  });

  it('правильное удаление элемента из очереди', () => {
    const inputValue = 'I1';

    cy.get('.input-form input').type(inputValue);
    cy.get('.input-form button:contains("Добавить")').click();

    cy.get('.input-form button:contains("Удалить")').click();

    cy.get('.circles')
      .children()
      .first()
      .find('div[class^="circle"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      });
    cy.get('.circles')
      .children()
      .first()
      .should('not.contain.text', inputValue)
      .should('not.contain.text', 'head')
      .should('contain.text', 'tail')
      .wait(SHORT_DELAY_IN_MS)
      .find('div[class^="circle"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('default'));
      });

    cy.get('.circles').children().eq(1).should('contain.text', 'head');
  });

  it('правильное поведение кнопки "Очистить"', () => {
    const inputValues = ['I1', 'I2', 'I3'];

    inputValues.forEach((value) => {
      cy.get('.input-form input').type(value);
      cy.get('.input-form button:contains("Добавить")').click();
      cy.wait(SHORT_DELAY_IN_MS);
    });

    cy.get('.input-form button:contains("Очистить")').click();

    cy.get('.circles')
      .children()
      .each((el, index) => {
        cy.wrap(el)
          .should('not.contain.text', inputValues[index])
          .should('not.contain.text', 'tail')
          .find('div[class^="circle"]')
          .should('satisfy', (elements) => {
            const classList: string[] = Array.from(elements[0].classList);
            return classList.some((name) => name.includes('default'));
          });
      })
      .first()
      .should('contain.text', 'head');
  });
});
