describe('Приложение', () => {
  it('должно успешно запускаться', () => {
    cy.visit('http://localhost:3000/');
  });
});