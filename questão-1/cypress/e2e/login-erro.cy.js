describe('Questão 1 - Mensagem de erro no login', () => {
  it('exibe erro com campos em branco e a classe CSS "error"', () => {
    cy.visit('/login');

    // Garante campos em branco
    cy.get('#username').clear();
    cy.get('#password').clear();

    cy.get('button[type="submit"]').click();

    // 1) Texto da mensagem
    cy.get('#flash')
      .should('be.visible')
      .and('contain.text', 'Your username is invalid!');

    // 2) Classe CSS "error" (balão vermelho)
    cy.get('#flash').should('have.class', 'error');
  });
});
