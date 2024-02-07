import data from '../fixtures/orphanages.json'

describe('Mapa', () => {
  it('deve escolher um orfanato no mapa', () => {
    const orphanage = data.map

    cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })

    cy.postOrphanage(orphanage)

    cy.goToPage('map')

    cy.openOrphanage(orphanage)
  })
})
