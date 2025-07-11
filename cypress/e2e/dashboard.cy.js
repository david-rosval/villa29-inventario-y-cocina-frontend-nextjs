describe("Dashboard page", () => {
  beforeEach(() => {
    cy.visit('/auth/login')
    const adminEmail = "admin@test.com"
    const adminPassword = "test123"
    cy.get("input[name=email]").type(adminEmail)
    cy.get("input[name=password]").type(`${adminPassword}{enter}`)
    cy.get("a").contains("Ir al dashboard").first().click()
  })
  describe("Basic flow", () => {
    it("displays the dashboard page with statistics", () => {
      cy.url().should("include", "/panel-de-control/dashboard")
      cy.get("h1").should("contain", "Reportes")
    })
    it("displays delivery average time", () => {
      cy.get("div").contains("Tiempo promedio de entrega").should("exist")
    })
    it("displays total earnings", () => {
      cy.get("div").contains("Ganancias totales").should("exist")
    })
    it("displays delivered orders", () => {
      cy.get("div").contains("Pedidos entregados").should("exist")
    })
    it("displays monthly growth", () => {
      cy.get("div").contains("Crecimiento mensual").should("exist")
    })
    it("displays income chart", () => {
      cy.get("div").contains("Ingresos").should("exist")
      cy.get('.rounded-xl.w-full > .p-6').should("exist")
    })
    it("changes between monthly and daily income", () => {
      cy.get('[data-active="false"]').click()
      cy.get('[data-active="false"]').click()
    })
    it("displays top products", () => {
      cy.get("div").contains("Top productos").should("exist")
    })
    it("displays sales chart by product category", () => {
      cy.get("div").contains("Ventas según Categorías de productos").should("exist")
      cy.get('svg[class="recharts-surface"]').eq(1).should("exist")
    })
  })
})