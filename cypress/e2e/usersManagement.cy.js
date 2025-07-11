describe("Users Management", () => {
  beforeEach(() => {
    cy.visit('/auth/login')
    const adminEmail = "admin@test.com"
    const adminPassword = "test123"
    cy.get("input[name=email]").type(adminEmail)
    cy.get("input[name=password]").type(`${adminPassword}{enter}`)
    cy.get("a").contains("Gestionar usuarios").first().click()
    
  })
  describe("Basic flow", () => {
    it("logs in as admin and accesses users management", () => {
      cy.url().should("include", "/panel-de-control/usuarios")
      cy.get("h1").should("contain", "Usuarios")
      cy.get("p[class='text-gray-400 text-sm']").contains("Administrador")
    })
    it("displays users in a table with the columns 'name', 'lastname', 'email' and 'role'", () => {
      cy.get("table").should("exist")
      cy.get("thead tr").within(() => {
        cy.get("th").eq(1).should("contain", "Nombre")
        cy.get("th").eq(2).should("contain", "Apellido")
        cy.get("th").eq(3).should("contain", "Email")
        cy.get("th").eq(4).should("contain", "Rol")
      })
    })
    it("edits an user info", () => {
      const updaterName = "UpdatedName"
      const updaterLastname = "UpdatedLastname"
      const updaterEmail = "updated@test.come"
      const updaterRole = "Cocinero"
      cy.get('.\[\&_tr\:last-child\]\:border-0 > :nth-child(1) > :nth-child(1) > .peer')
      cy.get("button[aria-label='Editar usuario']").click()
      cy.get("input[name=nombre]").clear().type(updaterName)
      cy.get("input[name=apellido]").clear().type(updaterLastname)
      cy.get("input[name=email]").clear().type(updaterEmail)
      cy.get("select[name=rol]").select(updaterRole)
      cy.get("button[type=submit]").click() 
      cy.get("section[aria-label='Notifications alt+T']").should("contain", "Usuario actualizado correctamente")
      cy.get("tbody tr").first().within(() => {
        cy.get("td").eq(0).should("contain", updaterName)
        cy.get("td").eq(1).should("contain", updaterLastname)
        cy.get("td").eq(2).should("contain", updaterEmail)
        cy.get("td").eq(3).should("contain", updaterRole)
      })
    })
    it("removes an user", () => {
      cy.get("tbody tr").first().within(() => {
        cy.get("input[type=checkbox]").check()
      })
      cy.get("button[aria-label='Eliminar usuario']").click()
    })
    it("searches and filters users", () => {})
  })
})