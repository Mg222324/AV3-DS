describe('Questão 3 - Carrinho reflete as ações do usuário', () => {
  it('adiciona 3 produtos, remove 1 e valida o emblema com "2"', () => {
    // 1) Login
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');

    // 2) Adiciona três produtos diferentes
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    cy.get('.shopping_cart_badge').should('have.text', '3');

    // 3) Remove um deles
    cy.get('[data-test="remove-sauce-labs-bike-light"]').click();

    // 4) Valida o emblema do carrinho
    cy.get('.shopping_cart_badge')
      .should('be.visible')
      .and('have.text', '2');
  });
});
