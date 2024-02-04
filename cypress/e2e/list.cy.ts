import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Страница связанного списка', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list');
    const inputValues = ['DI1', 'DI2', 'DI3'];
    inputValues.forEach((value) => {
      cy.get('#value').type(value);
      cy.get('.grid-form button:contains("Добавить в tail")').click();
    });
    cy.wait(DELAY_IN_MS * 2);
  });

  it('кнопка "Добавить в head" должна быть неактивной при пустом поле ввода', () => {
    cy.get('#value').should('be.empty');
    cy.get('.grid-form button:contains("Добавить в head")').should('be.disabled');
  });

  it('кнопка "Добавить в tail" должна быть неактивной при пустом поле ввода', () => {
    cy.get('#value').should('be.empty');
    cy.get('.grid-form button:contains("Добавить в tail")').should('be.disabled');
  });

  it('кнопки "Добавить по индексу" и "Удалить по индексу" должны быть неактивными при пустом поле ввода индекса', () => {
    cy.get('#index').should('have.value', '');
    cy.get('.grid-form button:contains("Добавить по индексу")').should('be.disabled');
    cy.get('.grid-form button:contains("Удалить по индексу")').should('be.disabled');
  });

  it('отрисовка дефолтного списка', () => {
    cy.get('.circles').find('div[class^="circle_content"]').should('have.length', 3);
  });

  it('правильное добавление элемента в head', () => {
    const inputValue = 'I1';

    cy.get('#value').type(inputValue);
    cy.get('.grid-form button:contains("Добавить в head")').click();

    cy.get('.circles')
      .find('div[class^="circle_content"]')
      .first()
      .find('div[class*="circle_small"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      })
      .should('contain.text', inputValue);

    cy.get('.circles')
      .find('div[class^="circle_content"]')
      .first()
      .should('contain.text', inputValue)
      .should('contain.text', 'Head')
      .find('div[class^="circle"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('modified'));
      });
  });

  it('правильное добавление элемента в tail', () => {
    const inputValue = 'I1';

    cy.get('#value').type(inputValue);
    cy.get('.grid-form button:contains("Добавить в tail")').click();

    cy.get('.circles')
      .find('div[class^="circle_content"]')
      .last()
      .find('div[class*="circle_small"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      })
      .should('contain.text', inputValue);

    cy.get('.circles')
      .find('div[class^="circle_content"]')
      .last()
      .should('contain.text', inputValue)
      .should('contain.text', 'Tail')
      .find('div[class^="circle"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('modified'));
      });
  });

  it('правильное добавление элемента по индексу', () => {
    const inputValue = 'I1';
    const index = 2;

    cy.get('#value').type(inputValue);
    cy.get('#index').type(String(index));
    cy.get('.grid-form button:contains("Добавить по индексу")').click();

    cy.get('.circles')
      .find('div[class^="circle_content"]')
      .eq(index)
      .find('div[class*="circle_small"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      })
      .should('contain.text', inputValue);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('.circles')
      .find('div[class^="circle_content"]')
      .eq(index)
      .find('div[class^="circle"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('modified'));
      })
      .should('contain.text', inputValue);
  });

  it('правильное удаление элемента из head', () => {
    const inputValue = 'I1';

    cy.get('#value').type(inputValue);
    cy.get('.grid-form button:contains("Добавить в head")').click();

    cy.get('.grid-form button:contains("Удалить из head")').click();

    cy.get('.circles')
      .find('div[class^="circle_content"]')
      .first()
      .find('div[class*="circle_small"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      })
      .should('contain.text', inputValue);

    cy.get('.circles').find('div[class^="circle_content"]').should('have.length', 3);
  });

  it('правильное удаление элемента из tail', () => {
    const inputValue = 'I1';

    cy.get('#value').type(inputValue);
    cy.get('.grid-form button:contains("Добавить в tail")').click();

    cy.wait(SHORT_DELAY_IN_MS * 2);

    cy.get('.grid-form button:contains("Удалить из tail")').click();

    cy.get('.circles')
      .find('div[class^="circle_content"]')
      .last()
      .find('div[class*="circle_small"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      })
      .should('contain.text', inputValue);

    cy.get('.circles').find('div[class^="circle_content"]').should('have.length', 3);
  });

  it('правильное удаление элемента по индексу', () => {
    const inputValue = 'I1';
    const index = 2;

    cy.get('#value').type(inputValue);
    cy.get('#index').type(String(index));
    cy.get('.grid-form button:contains("Добавить по индексу")').click();

    cy.wait(SHORT_DELAY_IN_MS * (index + 1));

    cy.get('#index').type(String(index));
    cy.get('.grid-form button:contains("Удалить по индексу")').click();

    cy.get('.circles')
      .find('div[class^="circle_content"]')
      .eq(index)
      .find('div[class*="circle_small"]')
      .should('satisfy', (elements) => {
        const classList: string[] = Array.from(elements[0].classList);
        return classList.some((name) => name.includes('changing'));
      })
      .should('contain.text', inputValue);

    cy.get('.circles').find('div[class^="circle_content"]').should('have.length', 3);
  });
});
