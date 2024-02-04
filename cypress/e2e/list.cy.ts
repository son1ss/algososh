import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';
import { circlesSelector, innerCirclesSelector } from '../constants/selectors';

const circleContentSelector = 'div[class^="circle_content"]';
const addTailButtonSelector = '.grid-form button:contains("Добавить в tail")';
const addHeadButtonSelector = '.grid-form button:contains("Добавить в head")';
const addIndexButtonSelector = '.grid-form button:contains("Добавить по индексу")';
const removeIndexButtonSelector = '.grid-form button:contains("Удалить по индексу")';
const indexInputSelector = '#index';
const valueInputSelector = '#value';
const smallCircleSelector = 'div[class*="circle_small"]';

describe('Страница связанного списка', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list');
    const inputValues = ['DI1', 'DI2', 'DI3'];
    inputValues.forEach((value) => {
      cy.get(valueInputSelector).type(value);
      cy.get(addTailButtonSelector).click();
    });
    cy.wait(DELAY_IN_MS * 2);
  });

  it('кнопка "Добавить в head" должна быть неактивной при пустом поле ввода', () => {
    cy.get(valueInputSelector).should('be.empty');
    cy.get(addHeadButtonSelector).should('be.disabled');
  });

  it('кнопка "Добавить в tail" должна быть неактивной при пустом поле ввода', () => {
    cy.get(valueInputSelector).should('be.empty');
    cy.get(addTailButtonSelector).should('be.disabled');
  });

  it('кнопки "Добавить по индексу" и "Удалить по индексу" должны быть неактивными при пустом поле ввода индекса', () => {
    cy.get(indexInputSelector).should('have.value', '');
    cy.get(addIndexButtonSelector).should('be.disabled');
    cy.get(removeIndexButtonSelector).should('be.disabled');
  });

  it('отрисовка дефолтного списка', () => {
    cy.get(circlesSelector).find(circleContentSelector).should('have.length', 3);
  });

  it('правильное добавление элемента в head', () => {
    const inputValue = 'I1';

    cy.get(valueInputSelector).type(inputValue);
    cy.get(addHeadButtonSelector).click();

    cy.get(circlesSelector)
      .find(circleContentSelector)
      .first()
      .find(smallCircleSelector)
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      })
      .should('contain.text', inputValue);

    cy.get(circlesSelector)
      .find(circleContentSelector)
      .first()
      .should('contain.text', inputValue)
      .should('contain.text', 'Head')
      .find(innerCirclesSelector)
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('modified'));
      });
  });

  it('правильное добавление элемента в tail', () => {
    const inputValue = 'I1';

    cy.get(valueInputSelector).type(inputValue);
    cy.get(addTailButtonSelector).click();

    cy.get(circlesSelector)
      .find(circleContentSelector)
      .last()
      .find(smallCircleSelector)
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      })
      .should('contain.text', inputValue);

    cy.get(circlesSelector)
      .find(circleContentSelector)
      .last()
      .should('contain.text', inputValue)
      .should('contain.text', 'Tail')
      .find(innerCirclesSelector)
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('modified'));
      });
  });

  it('правильное добавление элемента по индексу', () => {
    const inputValue = 'I1';
    const index = 2;

    cy.get(valueInputSelector).type(inputValue);
    cy.get(indexInputSelector).type(String(index));
    cy.get(addIndexButtonSelector).click();

    cy.get(circlesSelector)
      .find(circleContentSelector)
      .eq(index)
      .find(smallCircleSelector)
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      })
      .should('contain.text', inputValue);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(circlesSelector)
      .find(circleContentSelector)
      .eq(index)
      .find(innerCirclesSelector)
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('modified'));
      })
      .should('contain.text', inputValue);
  });

  it('правильное удаление элемента из head', () => {
    const inputValue = 'I1';

    cy.get(valueInputSelector).type(inputValue);
    cy.get(addHeadButtonSelector).click();

    cy.get('.grid-form button:contains("Удалить из head")').click();

    cy.get(circlesSelector)
      .find(circleContentSelector)
      .first()
      .find(smallCircleSelector)
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      })
      .should('contain.text', inputValue);

    cy.get(circlesSelector).find(circleContentSelector).should('have.length', 3);
  });

  it('правильное удаление элемента из tail', () => {
    const inputValue = 'I1';

    cy.get(valueInputSelector).type(inputValue);
    cy.get(addTailButtonSelector).click();

    cy.wait(SHORT_DELAY_IN_MS * 2);

    cy.get('.grid-form button:contains("Удалить из tail")').click();

    cy.get(circlesSelector)
      .find(circleContentSelector)
      .last()
      .find(smallCircleSelector)
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      })
      .should('contain.text', inputValue);

    cy.get(circlesSelector).find(circleContentSelector).should('have.length', 3);
  });

  it('правильное удаление элемента по индексу', () => {
    const inputValue = 'I1';
    const index = 2;

    cy.get(valueInputSelector).type(inputValue);
    cy.get(indexInputSelector).type(String(index));
    cy.get(addIndexButtonSelector).click();

    cy.wait(SHORT_DELAY_IN_MS * (index + 1));

    cy.get(indexInputSelector).type(String(index));
    cy.get(removeIndexButtonSelector).click();

    cy.get(circlesSelector)
      .find(circleContentSelector)
      .eq(index)
      .find(smallCircleSelector)
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      })
      .should('contain.text', inputValue);

    cy.get(circlesSelector).find(circleContentSelector).should('have.length', 3);
  });
});
