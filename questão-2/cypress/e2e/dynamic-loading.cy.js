describe('Questão 2 - Dynamic Loading', () => {
  it('aguarda o loader sumir e valida o texto "Hello World!"', () => {
    cy.visit('/dynamic_loading/1');

    cy.contains('button', 'Start').click();

    // O loader aparece...
    cy.get('#loading').should('be.visible');

    // ...e depois desaparece (espera dinâmica, sem sleep fixo)
    cy.get('#loading', { timeout: 20000 }).should('not.be.visible');

    // Texto final exibido corretamente
    cy.get('#finish')
      .should('be.visible')
      .find('h4')
      .should('have.text', 'Hello World!');
  });
});
