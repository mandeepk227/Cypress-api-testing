describe('execute pokemon GET api from pokemon name', () => {

  context('Positive scenario', () => {

    const pokename = "pikachu"

    beforeEach(() => {
    cy.request({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon/' + pokename,
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

  });

  context('Negative scenario', () => {

    const pokename = "any"

    beforeEach(() => {
      cy.request({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/' + pokename,
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
    
  });
});