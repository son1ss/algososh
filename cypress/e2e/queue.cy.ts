import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import {
  inputSelector,
  addButtonSelector,
  circlesSelector,
  innerCirclesSelector,
  deleteButtonSelector,
  clearButtonSelector,
} from '../constants/selectors';

describe('Страница очереди', () => {
  beforeEach(() => {
    cy.visit('/queue');
  });

  it('кнопка "Добавить" должна быть неактивной при пустом поле ввода', () => {
    cy.get(inputSelector).should('be.empty');
    cy.get(addButtonSelector).should('be.disabled');
  });

  it('правильное добавление элемента в очередь', () => {
    const inputValue = 'I1';

    cy.get(inputSelector).type(inputValue);
    cy.get(addButtonSelector).click();

    cy.get(circlesSelector)
      .children()
      .first()
      .find(innerCirclesSelector)
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      });
    cy.get(circlesSelector)
      .children()
      .first()
      .should('contain.text', inputValue)
      .should('contain.text', 'head')
      .should('contain.text', 'tail')
      .wait(SHORT_DELAY_IN_MS)
      .find(innerCirclesSelector)
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('default'));
      });
  });

  it('правильное удаление элемента из очереди', () => {
    const inputValue = 'I1';

    cy.get(inputSelector).type(inputValue);
    cy.get(addButtonSelector).click();

    cy.get(deleteButtonSelector).click();

    cy.get(circlesSelector)
      .children()
      .first()
      .find(innerCirclesSelector)
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      });
    cy.get(circlesSelector)
      .children()
      .first()
      .should('not.contain.text', inputValue)
      .should('not.contain.text', 'head')
      .should('contain.text', 'tail')
      .wait(SHORT_DELAY_IN_MS)
      .find(innerCirclesSelector)
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('default'));
      });

    cy.get(circlesSelector).children().eq(1).should('contain.text', 'head');
  });

  it('правильное поведение кнопки "Очистить"', () => {
    const inputValues = ['I1', 'I2', 'I3'];

    inputValues.forEach((value) => {
      cy.get(inputSelector).type(value);
      cy.get(addButtonSelector).click();
      cy.wait(SHORT_DELAY_IN_MS);
    });

    cy.get(clearButtonSelector).click();

    cy.get(circlesSelector)
      .children()
      .each((el, index) => {
        cy.wrap(el)
          .should('not.contain.text', inputValues[index])
          .should('not.contain.text', 'tail')
          .find(innerCirclesSelector)
          .should('satisfy', (elements) => {
            const classList: string[] = Array.from(elements[0].classList);
            return classList.some((name) => name.includes('default'));
          });
      })
      .first()
      .should('contain.text', 'head');
  });
});
