describe("Nuvem Doce - MVP", () => {
  beforeEach(() => {
    cy.visit("/index.html", {
      onBeforeLoad(win) {
        win.localStorage.clear();
      }
    });
  });

  it("CT01 - exibe pagina inicial e cardapio", () => {
    cy.get('[data-cy="brand-logo"]').should("contain", "Nuvem Doce");
    cy.get('[data-cy="home-section"]').should("contain", "Doces artesanais");

    cy.get('[data-cy="hero-menu-button"]').click();

    cy.get('[data-cy="cardapio-section"]').should("be.visible");
    cy.contains("Bolo de Chocolate de Pote").should("be.visible");
    cy.contains("Cupcake Morango").should("be.visible");
  });

  it("CT02 - adiciona produto ao carrinho e calcula totais", () => {
    cy.get('[data-cy="add-product-0"]').click();
    cy.get('[data-cy="cart-count"]').should("contain", "1");
    cy.get('[data-cy="hero-order-button"]').click();

    cy.get('[data-cy="cart-modal"]').should("be.visible");
    cy.get('[data-cy="cart-items"]').should("contain", "Bolo de Chocolate de Pote");
    cy.get('[data-cy="subtotal"]').should("contain", "15,00");
    cy.get('[data-cy="entrega"]').should("contain", "10,00");
    cy.get('[data-cy="total-final"]').should("contain", "25,00");
  });

  it("CT03 - altera quantidade e remove produto do carrinho", () => {
    cy.get('[data-cy="add-product-0"]').click();
    cy.get('[data-cy="hero-order-button"]').click();

    cy.get('[data-cy="quantity-plus-0"]').click();
    cy.get('[data-cy="cart-quantity-0"]').should("contain", "2");
    cy.get('[data-cy="subtotal"]').should("contain", "30,00");
    cy.get('[data-cy="total-final"]').should("contain", "40,00");

    cy.get('[data-cy="quantity-minus-0"]').click();
    cy.get('[data-cy="cart-quantity-0"]').should("contain", "1");
    cy.get('[data-cy="total-final"]').should("contain", "25,00");

    cy.get('[data-cy="remove-item-0"]').click();
    cy.get('[data-cy="cart-items"]').should("contain", "Seu carrinho esta vazio");
    cy.get('[data-cy="subtotal"]').should("contain", "0,00");
    cy.get('[data-cy="entrega"]').should("contain", "0,00");
    cy.get('[data-cy="total-final"]').should("contain", "0,00");
    cy.get('[data-cy="cart-count"]').should("contain", "0");
  });

  it("CT04 - envia formulario de contato", () => {
    const alerta = cy.stub();
    cy.on("window:alert", alerta);

    cy.get('[data-cy="contact-name"]').type("Maria Cliente");
    cy.get('[data-cy="contact-email"]').type("maria@email.com");
    cy.get('[data-cy="contact-message"]').type("Quero encomendar cupcakes para uma festa.");
    cy.get('[data-cy="contact-form"]').submit().then(() => {
      expect(alerta).to.have.been.calledWith("Mensagem enviada com sucesso! Em breve entraremos em contato.");
    });

    cy.get('[data-cy="contact-name"]').should("have.value", "");
    cy.get('[data-cy="contact-email"]').should("have.value", "");
    cy.get('[data-cy="contact-message"]').should("have.value", "");
  });
});
