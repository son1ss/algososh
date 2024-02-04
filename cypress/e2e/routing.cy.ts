describe('Роутинг', () => {
  it('должна корректно переходить на главную страницу', () => {
    cy.visit('http://localhost:3000');
  });

  it('должна корректно переходить на страницу Recursion', () => {
    cy.visit('http://localhost:3000/recursion');
  });

  it('должна корректно переходить на страницу Fibonacci', () => {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('должна корректно переходить на страницу Sorting', () => {
    cy.visit('http://localhost:3000/sorting');
  });

  it('должна корректно переходить на страницу Stack', () => {
    cy.visit('http://localhost:3000/stack');
  });

  it('должна корректно переходить на страницу Queue', () => {
    cy.visit('http://localhost:3000/queue');
  });

  it('должна корректно переходить на страницу List', () => {
    cy.visit('http://localhost:3000/list');
  });
});
