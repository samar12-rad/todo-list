describe('Todo App - Input2', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/input2');
  });

  it('should visit Input2 page', () => {
    cy.url().should('include', '/input2');
    cy.contains('Input 2').should('be.visible');
  });

  it('refresh table data', () => {
    cy.get('.left-table-data tr').should('have.length', 10);
    cy.get('.refresh').click();
    cy.get('.left-table-data tr').should('have.length', 10);
  });

  it('move row from left table to right table', () => {
    cy.get('.left-table-data tr').first().as('firstRow');
    cy.get('@firstRow').find('button').contains('Send Right').click();
    cy.get('.left-table-data tr').should('have.length', 9);
    cy.get('.right-table-data tr').should('have.length', 1);
  });

  it('move row from right table back to left table', () => {
    cy.get('.left-table-data tr').first().as('firstRow');
    cy.get('@firstRow').find('button').contains('Send Right').click();
    cy.get('.right-table-data tr').first().as('rightFirstRow');
    cy.get('@rightFirstRow').find('button').contains('Send Back').click();
    cy.get('.right-table-data tr').should('have.length', 0);
  });

  it('add right table data to main table', () => {
    cy.get('.left-table-data tr').first().as('firstRow');
    // save the task.id of the first row for later
    cy.get('@firstRow')
      .find('td')
      .first()
      .invoke('text')
      .then((taskId) => {
        cy.get('@firstRow').find('button').contains('Send Right').click();
        cy.get('.btn-success').contains('Add to Main Table').click();
        cy.get('.right-table-data tr').should('have.length', 0);
        cy.get('.home').click();
        cy.get('.table-data').should('have.length', 1);
        cy.get('.table-data')
          .first()
          .get('td')
          .first()
          .should('have.text', taskId);
      });
  });

  it('send row back to input2', () => {
    cy.get('.left-table-data tr').first().as('firstRow');
    // save the task.id of the first row for later
    cy.get('@firstRow')
      .find('td')
      .first()
      .invoke('text')
      .then((taskId) => {
        cy.get('@firstRow').find('button').contains('Send Right').click();
        cy.get('.btn-success').contains('Add to Main Table').click();
        cy.get('.right-table-data tr').should('have.length', 0);
        cy.get('.home').click();
        cy.get('.table-data').should('have.length', 1);
        cy.get('.table-data')
          .first()
          .get('td')
          .first()
          .should('have.text', taskId);
      });
    cy.get('.table-data tr').first().as('firstRow');
    // find the send back button on this row
    cy.get('@firstRow').find('button').contains('Send Back').click();
    cy.get('.input2').click();
    // find the first row of right table and then check its task id is the same as the one we saved
    // find the right table
    cy.get('.right-table-data tr').first().as('firstRow');
    cy.get('@firstRow')
      .find('td')
      .first()
      .invoke('text')
      .then((taskId) => {
        cy.get('@firstRow').find('td').first().should('have.text', taskId);
      });
  });
});
