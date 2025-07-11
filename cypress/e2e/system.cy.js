describe('System Test', () => {
  it('Logs in as waiter and register a new order', () => {
    cy.visit('/auth/login')
    const email = "mozo@test.com"
    const password = "test123"
    cy.get("input[name=email]").type(email)
    cy.get("input[name=password]").type(`${password}{enter}`)
    cy.get("a[href*='/panel-de-control/ordenes/nueva-orden']").click()
    cy.get("button[aria-label='Order Royal']").click()
    cy.get("button[aria-label='Toggle orden']").click()
    cy.get("p").contains("Royal").should("exist")
    cy.get("button").contains("Enviar").click()
    cy.url().should("include", "/panel-de-control/ordenes")
    cy.get("p[class='truncate']").contains("Royal").should("exist")
  })
  it("Logs in as cook and changes order status to 'ready'", () => {
    cy.visit('/auth/login')
    const cocineroEmail = "cocinero@test.com"
    const cocineroPassword = "test123"
    cy.get("input[name=email]").type(cocineroEmail)
    cy.get("input[name=password]").type(`${cocineroPassword}{enter}`)
    cy.get("a").contains("Gestionar ordenes").first().click()
    cy.get("p[class='truncate']").contains("Royal").should("exist")
    cy.get("button").contains("Marcar como Listo para entregar").first().click()
    cy.get("section[aria-label='Notifications alt+T']").should("contain", "¡Un pedido está listo!")
    cy.get("button").contains("Listos").click()
    cy.get("p[class='truncate']").contains("Royal").should("exist")
  })
  it("Logs in as waiter and changes order status to 'delivered'", () => {
    cy.visit('/auth/login')
    const mozoEmail = "mozo@test.com"
    const mozoPassword = "test123"
    cy.get("input[name=email]").type(mozoEmail)
    cy.get("input[name=password]").type(`${mozoPassword}{enter}`)
    cy.get("a").contains("Gestionar ordenes").first().click()
    cy.get("button").contains("Listos").click()
    cy.get("p[class='truncate']").contains("Royal").should("exist")
    cy.get("button").contains("Marcar como entregado").first().click()
    cy.get("section[aria-label='Notifications alt+T']").should("contain", "Pedido entregado!")
    cy.get("button").contains("Entregado").click()
    cy.get("p[class='truncate']").contains("Royal").should("exist")
  })
})