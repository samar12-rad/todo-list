
	describe('template spec', () => {
		it('passes', () => {
		  cy.visit('https://example.cypress.io')
		})
		it('passes on google', () => {
			cy.visit('https://google.com')
		  })
	  });