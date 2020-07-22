describe('login specs', () => {
  it('gets the login page when visiting the correct route', () => {
    cy.visit('/login', { failOnStatusCode: false })
    cy.contains('Login')
    cy.contains('a', 'Forgot your password?')
    cy.contains('button', 'LOGIN')
    cy.contains("fwd now requires accounts to have passwords. If you have an existing account, but haven't yet created a password, click here.")
  })
})
