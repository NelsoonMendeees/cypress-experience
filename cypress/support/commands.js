Cypress.Commands.add('goTo', (url, latitude = -16.3635412, longitude = -48.9584537) => {
    const mockGeolocation = (win, latitude, longitude) => {
      cy.stub(win.navigator.geolocation, 'getCurrentPosition', (cb) => {
        return cb({ coords: { latitude, longitude } })
      })
    }
    cy.visit(url, {
      onBeforeLoad: (win) => {
        mockGeolocation(win, latitude, longitude)
      }
    })
  })
  
  Cypress.Commands.add('goToPage', (url) => {
    cy.visit(url, {
      onBeforeLoad({ navigator }) {
        const latitude = -16.3635412
        const longitude = -48.9584537
        cy.stub(navigator.geolocation, 'getCurrentPosition').callsArgWith(0, {
          coords: { latitude, longitude }
        })
      }
    })
  })
  
  Cypress.Commands.add('setMapPosition', (position) => {
    window.localStorage.setItem('hope-qa:latitude', position.latitude)
    window.localStorage.setItem('hope-qa:longitude', position.longitude)
  })
  
  Cypress.Commands.add('removeByName', (orphanage) => {
    cy.request({
      url: 'http://localhost:3333/helper/orphanages',
      method: 'DELETE',
      qs: {
        name: orphanage.name
      }
    }).then((response) => {
      expect(response.status).to.eq(204)
    })
  })
  
  Cypress.Commands.add('postOrphanage', (orphanage) => {
    cy.fixture(`images/${orphanage.image}`, 'binary')
      .then((image) => Cypress.Blob.binaryStringToBlob(image, 'image/png'))
      .then((blob) => {
        const formData = new FormData()
  
        formData.append('name', orphanage.name)
        formData.append('description', orphanage.description)
        formData.append('latitude', orphanage.latitude)
        formData.append('longitude', orphanage.longitude)
        formData.append('opening_hours', orphanage.opening_hours)
        formData.append('open_on_weekends', orphanage.open_on_weekends)
        formData.append('images', blob, orphanage.image)
  
        cy.request({
          url: 'http://localhost:3333/orphanages',
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data' },
          body: formData
        }).then((response) => {
          expect(response.status).to.eql(201)
        })
      })
  })
  