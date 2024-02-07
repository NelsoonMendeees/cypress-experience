import data from '../fixtures/orphanages.json'
import validate from '../fixtures/validate.json'
import createPage from '../support/pages/create'
import { generator } from '../support/factory'

describe('Registro de Orfanatos', () => {
  context('Cadastro', () => {
    it('deve cadastar um novo orfanato', () => {
      const orphanage = generator()

      // cy.removeByName(orphanage)

      cy.goToCreate()

      cy.createOrphanage(orphanage)

      cy.popupHaveText('Orfanato cadastrado com sucesso.')
    })

    it('não deve cadastrar orfanato com nome duplicado', () => {
      const orphanage = generator()

      // cy.deleteMany({ name: orphanage.name }, { collection: 'orphanages' })

      cy.postOrphanage(orphanage)

      cy.goToCreate()

      cy.createOrphanage(orphanage)

      createPage.popup.haveText(`Já existe um cadastro com o nome: ${orphanage.name}`)
    })
  })

  context('Validação de Campos Obrigatórios', () => {
    validate.orphanages.forEach((validate) => {
      it(`${validate.scenario}`, () => {
        cy.goToCreate()
        cy.createOrphanage(validate)

        cy.alertHaveText(validate)
      })
    })
  })
})
