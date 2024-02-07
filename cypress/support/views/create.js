Cypress.Commands.add('goToCreate', () => {
  cy.goToPage('orphanages/create')

  cy.get('legend').should('be.visible').should('have.text', 'Cadastro')
})

Cypress.Commands.add('createOrphanage', (orphanage) => {
  cy.setMapPosition(orphanage)

  cy.get('input[name=name]').as('fieldName')
  cy.get('#description').as('fieldDescription')
  cy.get('input[type="file"]').as('fieldImage')
  cy.get('#opening_hours').as('fieldOpeningHours')

  orphanage.name 
    ? cy.get('@fieldName').type(orphanage.name) 
    : cy.log('Empty field name')

  orphanage.description
    ? cy.get('@fieldDescription').type(orphanage.description, { delay: 0 })
    : cy.log('Empty field description')

  orphanage.image
    ? cy.get('@fieldImage').selectFile(`cypress/fixtures/images/${orphanage.image}`, { force: true })
    : cy.log('Empty field image')

  orphanage.opening_hours
    ? cy.get('@fieldOpeningHours').type(orphanage.opening_hours)
    : cy.log('Empty field opening hours')

  cy.contains('button', orphanage.open_on_weekends ? 'Sim' : 'Não')
    .scrollIntoView()
    .click()

  cy.get('.save-button').click()
})
