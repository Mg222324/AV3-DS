describe('Questão 4 - Laptop mais caro', () => {
  it('extrai nome e preço do laptop mais caro e valida que o preço é > $0', () => {
    // Intercepta a chamada que carrega os produtos da categoria
    cy.intercept('POST', '**/bycat').as('porCategoria');

    cy.visit('/');
    cy.contains('#itemc', 'Laptops').click();
    cy.wait('@porCategoria');

    cy.get('#tbodyid .card').should('have.length.greaterThan', 0);

    cy.get('#tbodyid .card').then(($cards) => {
      const laptops = [...$cards].map((card) => {
        const nome = card.querySelector('.card-title a').innerText.trim();
        const preco = parseFloat(
          card.querySelector('h5').innerText.replace(/[^0-9.]/g, '')
        );
        return { nome, preco };
      });

      const maisCaro = laptops.reduce((a, b) => (b.preco > a.preco ? b : a));

      cy.log(`Laptop mais caro: ${maisCaro.nome} - $${maisCaro.preco}`);
      cy.task('log', `Laptop mais caro: ${maisCaro.nome} - $${maisCaro.preco}`);

      expect(maisCaro.preco, 'preço do laptop mais caro').to.be.greaterThan(0);
    });
  });
});
