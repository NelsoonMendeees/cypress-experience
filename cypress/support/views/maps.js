Cypress.Commands.add('openOrphanage', (orphanage) => {
  const popup = '.leaflet-popup-content'

  cy.goToPage('map')

  cy.get('.leaflet-marker-icon').as('mapList')

  cy.get('@mapList').each((el, index, list) => {
    cy.get('@mapList').eq(index).click({ force: true })
    cy.wait(1000)

    cy.get(popup).as('divName')

    cy.get('@divName')
      .invoke('text')
      .then((txt) => {
        if (txt === orphanage.name) {
          cy.get('@mapList').eq(index).as('foundItem')
        } else {
          cy.log('Orfanato não localizado! Verifique seu coódigo.')
        }
      })
  })
  cy.get('@foundItem').click({ force: true })

  cy.contains(popup, orphanage.name).find('a').click({ force: true })

  cy.contains('h1', orphanage.name).should('be.visible')

  cy.googleMapLink(orphanage)
})
