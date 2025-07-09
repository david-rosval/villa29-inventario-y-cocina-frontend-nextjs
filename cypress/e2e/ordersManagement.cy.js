
describe("Orders Management", () => {
  beforeEach(() => {
    cy.visit('/auth/login')
  })
  describe("Basic flow", () => {
    it("registers a new order", () => {
      const mozoEmail = "mozo@test.com"
      const mozoPassword = "test123"
      cy.get("input[name=email]").type(mozoEmail)
      cy.get("input[name=password]").type(`${mozoPassword}{enter}`)
      cy.get("a[href*='/panel-de-control/ordenes/nueva-orden']").click()
      cy.get("button[aria-label='Order Royal']").click()
      cy.get("button[aria-label='Toggle orden']").click()
      cy.get("p").contains("Royal").should("exist")
      cy.get("button").contains("Enviar").click()
      cy.url().should("include", "/panel-de-control/ordenes")
      cy.get("p[class='truncate']").contains("Royal").should("exist")
    })
    it("changes order status to 'ready'", () => {
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
    it("changes order status to 'delivered'", () => {
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
  describe("Exceptional flow", () => {
    // login as waiter/cashier
    it("shows error alert when sending an empty order", () => {
      const mozoEmail = "mozo@test.com"
      const mozoPassword = "test123"
      cy.get("input[name=email]").type(mozoEmail)
      cy.get("input[name=password]").type(`${mozoPassword}{enter}`)
      cy.get("a[href*='/panel-de-control/ordenes/nueva-orden']").click()
      cy.get("button[aria-label='Toggle orden']").click()
      cy.get("p").contains("Agrega pedidos").should("exist")
      cy.get("button").contains("Enviar").click()
      cy.get("section[aria-label='Notifications alt+T']").should("contain", "No hay pedidos en la orden")
    })
    it("deletes an order item when pressing '-' button below 0", () => {
      const mozoEmail = "mozo@test.com"
      const mozoPassword = "test123"
      cy.get("input[name=email]").type(mozoEmail)
      cy.get("input[name=password]").type(`${mozoPassword}{enter}`)
      cy.get("a[href*='/panel-de-control/ordenes/nueva-orden']").click()
      cy.get("button[aria-label='Order Royal']").click()
      cy.get("button[aria-label='Toggle orden']").click()
      cy.get("p").contains("Royal").should("exist")
      cy.get("button[aria-label='remove 1 Royal']").click()
      cy.get("p").contains("Agrega pedidos").should("exist")
    })
  })
})