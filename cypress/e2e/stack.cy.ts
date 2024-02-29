import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import {
  inputSelector,
  addButtonSelector,
  circlesSelector,
  innerCirclesSelector,
  deleteButtonSelector,
  clearButtonSelector,
} from '../constants/selectors';

describe('Страница стека', () => {
  beforeEach(() => {
    cy.visit('/stack');
  });

  it('кнопка "Добавить" должна быть неактивной при пустом поле ввода', () => {
    cy.get(inputSelector).should('be.empty');
    cy.get(addButtonSelector).should('be.disabled');
  });

  it('правильное добавление элемента в стек', () => {
    const inputValue = 'I1';

    cy.get(inputSelector).type(inputValue);
    cy.get(addButtonSelector).click();

    cy.get(circlesSelector)
      .children()
      .should('have.length', 1)
      .first()
      .should('contain.text', inputValue)
      .find(innerCirclesSelector)
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

    cy.get(inputSelector).type(inputValue);
    cy.get(addButtonSelector).click();

    cy.get(circlesSelector).children().should('have.length', 1);

    cy.get(deleteButtonSelector).click();

    cy.get(circlesSelector)
      .children()
      .first()
      .find(innerCirclesSelector)
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      });
    cy.get(circlesSelector).children().should('have.length', 0);
  });

  it('правильное поведение кнопки "Очистить"', () => {
    const inputValues = ['I1', 'I2', 'I3'];

    inputValues.forEach((value) => {
      cy.get(inputSelector).type(value);
      cy.get(addButtonSelector).click();
    });

    cy.get(circlesSelector).children().should('have.length', inputValues.length);

    cy.get(clearButtonSelector).click();

    cy.get(circlesSelector).children().should('have.length', 0);
  });
});
