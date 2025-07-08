describe('Navigation', () => {
  it('Should navigate to the login page', () => {
    // start from the index page
    cy.visit('/')

    // inside a div with role "menu" find a link with href containing "/auth/login"
    cy.get('a[href*="/auth/login"] button').click()

    // the new url should include "/auth/login"
    cy.url().should('include', '/auth/login')

    // the new page should contain a button with "Iniciar Sesión"
    cy.get('button').contains('Iniciar Sesión')

  })
})