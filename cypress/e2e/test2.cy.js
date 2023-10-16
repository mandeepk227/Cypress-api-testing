describe('execute pokemon GET api from pokemon id after getting data from pokemon name', () => {

  context('Positive scenario', () => {

  const pokename = "pikachu"
  let pokeId = 0;

    before(() => {
      cy.request({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/' + pokename,
        headers: {
          'Content-Type': 'application/json'  
        },
        failOnStatusCode:false
      }).then((response)=> {
        //save pokemon id
        pokeId = response.body.id
      })
    });

    beforeEach(() => {
      cy.request({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/' + pokeId,
        headers: {
          'Content-Type': 'application/json'  
        },
        failOnStatusCode:false
      }).as('getdata')
    });

    it('verify response status code is 200', () => {
      cy.get('@getdata').should((response)=> {
        expect(response.status).to.eq(200);
      })
    });

    it('verify details of pokemon', () => {
      cy.get('@getdata').then((response)=> {
        expect(response.body).to.have.property('abilities');
        expect(response.body.forms[0]).to.have.property('name','pikachu');
        expect(response).to.have.property('headers');
      })
    });

    it('Should have at least one ability in the response', () => {
      cy.get('@getdata')
        .its('body.abilities')
        .should('be.an', 'array')
        .and('have.length.gt', 0);
    });

  })

  context('Negative scenario', () => {

    const invalidPokId = 0
  
    beforeEach(() => {
      cy.request({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/' + invalidPokId,
        headers: {
          'Content-Type': 'application/json'  
        },
        failOnStatusCode:false
      }).as('getdata')
  
    });
  
    it('verify response status code is 404', () => {
      cy.get('@getdata').should((response)=> {
        expect(response.status).to.eq(404);
      })
    });

  })
});