describe("Login", () => {
  // user navigates to the login page
  beforeEach(() => {
    cy.visit('/auth/login')
  })

  describe("Basic flow", () => {
    it("displays the login form",  () => {
      // the system shows the login form with email and password fields
      cy.get("input[name=email]").should("exist")
      cy.get("input[name=password]").should("exist")
      cy.get("button[type=submit]").should("exist")
    })

    it("validates credencials against database and sets auth cookie when logging in via form submission", () => {
      const email = "davidr@test.com"
      const password = "test123"
      
      // the user enters valid credentials and submits the form
      cy.get("input[name=email]").type(email)
      cy.get("input[name=password]").type(`${password}{enter}`)

      // if the credentials are valid, the system allows the user to log in and redirects to panel-de-control page
      cy.url().should("include", "/panel-de-control")
      cy.getCookie("token").should("exist")
      cy.get("h1").should("contain", "Panel de control")
    }) 

    it("should display users and dashboard options when loggin in as admin", () => {
      const adminEmail = "admin@test.com"
      const adminPassword = "test123"

      cy.get("input[name=email]").type(adminEmail)
      cy.get("input[name=password]").type(`${adminPassword}{enter}`)

      cy.url().should("include", "/panel-de-control")
      cy.get("h1").should("contain", "Panel de control")

      // if the user is an admin, the system displays the users and dashboard options as well as the admin role label
      cy.get("p[class='text-gray-400 text-sm']").contains("Administrador")
      cy.get("img[alt='ordenes']").should("exist")
      cy.get("img[alt='usuarios']").should("exist")
      cy.get("img[alt='crear-orden']").should("exist")
      cy.get("img[alt='dashboard']").should("exist")
    })
  })

  describe("Exceptional flow", () => {
    it("should display message error when inserting an invalid email format", () => {
      const invalidEmail = "invalid-email"
      
      cy.get("input[name=email]").type(`${invalidEmail}{enter}`)

      cy.get('p[id=":R2puun7mj6:-form-item-message"]').should("contain", "El email no es válido")
    })

    it("should display message error when inserting an invalid password format", () => {
      const invalidPassword = "123"
      
      cy.get("input[name=password]").type(`${invalidPassword}{enter}`)

      cy.get('p[id=":R4puun7mj6:-form-item-message"]').should("contain", "La contraseña debe tener al menos 6 caracteres")
    })

    it("should display message error when inserting empty fields", () => {
      // the user enters an invalid email format
      cy.get("button[type=submit]").click()

      // the system displays an error message indicating that the email format is invalid
      cy.get('p[id=":R2puun7mj6:-form-item-message"]').should("contain", "El campo email no puede estar vacío")
      cy.get('p[id=":R4puun7mj6:-form-item-message"]').should("contain", "El campo contraseña no puede estar vacío")
    })

    it("should display message error when inserting non existing email", () => {
      const invalidEmail = "invalid@test.com"
      const invalidPassword = "invalid123"

      cy.get("input[name=email]").type(invalidEmail)
      cy.get("input[name=password]").type(`${invalidPassword}{enter}`)

      cy.get("section[aria-label='Notifications alt+T']").should("contain", "Error al obtener el usuario por email")
    })

    it("should display message error when inserting valid email but invalid password", () => {
      const validEmail = "admin@test.com"
      const invalidPassword = "invalid-password"

      cy.get("input[name=email]").type(validEmail)
      cy.get("input[name=password]").type(`${invalidPassword}{enter}`)

      cy.get("section[aria-label='Notifications alt+T']").should("contain", "Credenciales inválidas")
    })   
  })
}) 

