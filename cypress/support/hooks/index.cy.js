describe('Setup', () => {
  before(() => {
    cy.dropCollection('orphanages')
  })

  it('Drop Successfully', () => {
    cy.log('Drop  Successfully')
  })
})
