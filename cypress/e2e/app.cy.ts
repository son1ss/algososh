import { testUrl } from '../constants/selectors';

describe('Приложение', () => {
  it('должно успешно запускаться', () => {
    cy.visit(testUrl);
  });
});
