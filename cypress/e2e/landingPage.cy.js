describe("Landing Page", () => {
  beforeEach(() => {
    cy.visit('/')
  })
  describe("Basic flow", () => {
    it("access to the landing page", () => {
      cy.title().should("eq", "Restobar Villa 29")
      cy.get("h1").should("contain", "EL HOGAR DE LA BUENA")
      cy.get("h1").should("contain", "MÚSICA, COCTELES Y")
      cy.get("h1").should("contain", "BUENOS MOMENTOS EN LIMA")
    })
    it("nagivates through menu", () => {
      cy.get(".flex-row").get("a").contains("Nosotros").parent().click({force: true})
      cy.url().should("include", "#nosotros")
      cy.get(".flex-row").get("a").contains("Más Pedidos").parent().click({force: true})
      cy.url().should("include", "#mas-pedidos")
      cy.get(".flex-row").get("a").contains("Promociones").parent().click({force: true})
      cy.url().should("include", "#promociones")
      cy.get(".flex-row").get("a").contains("Ubícanos").parent().click({force: true})
      cy.url().should("include", "#ubicacion")
      cy.get(".flex-row").get("a").contains("Carta").parent().click({force: true})
      cy.url().should("include", "#carta")
      cy.get(".flex-row").get("a").contains("Login").parent().click({force: true})
      cy.url().should("include", "/auth/login")
    })
    it("shows the footer with contact information", () => {
      cy.get("footer").should("exist")
      cy.get("footer").contains("Contáctanos").should("exist")
    })
    it("shows the footer with social media", () => {
      cy.get("footer a[aria-label='Facebook']").should("exist")
      cy.get("footer a[aria-label='Instagram']").should("exist")
      cy.get("footer a[aria-label='Tiktok']").should("exist")
    })
  })
})