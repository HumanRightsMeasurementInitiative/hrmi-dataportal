describe('404 specs', () => {
  it('gets the 404 page when visiting an unhandled route', () => {
    cy.visit('/not-a-page', { failOnStatusCode: false })
    cy.contains('The page you were looking for does not exist.')
    cy.contains('a', 'Take me home.')
  })
})
