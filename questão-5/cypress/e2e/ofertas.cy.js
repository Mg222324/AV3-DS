describe('Questão 5 - Produtos com preço abaixo de $20.00', () => {
  it('lista no console e salva em arquivo os produtos < $20.00', () => {
    cy.visit('/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');

    cy.get('.inventory_item').should('have.length.greaterThan', 0).then(($itens) => {
      const produtos = [...$itens].map((item) => ({
        nome: item.querySelector('.inventory_item_name').innerText.trim(),
        preco: parseFloat(
          item.querySelector('.inventory_item_price').innerText.replace('$', '')
        ),
      }));

      const ofertas = produtos.filter((p) => p.preco < 20.0);

      const linhas = ofertas.map((p) => `- ${p.nome}: $${p.preco.toFixed(2)}`);
      cy.task('log', `Produtos mapeados: ${produtos.length}`);
      cy.task('log', `Ofertas (< $20.00):\n${linhas.join('\n')}`);

      cy.writeFile('cypress/results/ofertas.json', ofertas);

      expect(ofertas.length, 'quantidade de ofertas').to.be.greaterThan(0);
      ofertas.forEach((p) => expect(p.preco).to.be.lessThan(20));
    });
  });
});
