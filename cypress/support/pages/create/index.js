import popup from '../components/popup'

class CreatePage {
  constructor() {
    this.popup = popup
  }
  
  go() {
    cy.goToPage('orphanages/create')

    cy.get('legend').should('be.visible').should('have.text', 'Cadastro')
  }

  form(orphanage) {
    const image = 'cypress/fixtures/images/kids-playground-1.png'

    cy.get('input[name=name]').type(orphanage.name)

    cy.get('#description').type(orphanage.description, { delay: 0 })

    cy.get('input[type="file"]').selectFile(image, { force: true })

    cy.get('#opening_hours').scrollIntoView().type(orphanage.opening_hours)

    cy.contains('button', orphanage.open_on_weekends).click()
  }

  submit() {
    cy.get('.save-button').click()
  }
}

export default new CreatePage()
