describe('Todo App', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('should visit localhost:5173', () => {
    cy.visit('http://localhost:5173');
  });

  it('should display a input field', () => {
    cy.get('.new-todo').should('be.visible');
  });

  it('should display add todo button', () => {
    cy.get('.add-todo').should('be.visible');
  });

  it('data should enter in input field', () => {
    cy.get('.new-todo').type('hello');
  });

  it('should add todo', () => {
    cy.get('.new-todo').type('hello');
    cy.get('.add-todo').click();
  });

  it('should display item in todo list', () => {
    cy.get('.new-todo').type('hello');
    cy.get('.add-todo').click();
    cy.get('.todo-list-item').should('be.visible');
  });

  it('should delete todo', () => {
    cy.get('.new-todo').type('hello');
    cy.get('.add-todo').click();
    cy.get('.todo-list-item').should('not.have.text', 'hello');
    cy.get('.delete-todo').click();
    cy.get('.todo-list-item').should('not.exist');
  });

  it('should send back todo', () => {
    cy.get('.new-todo').type('hello');
    cy.get('.add-todo').click();
    cy.get('.todo-list-item').should('not.have.text', 'hello');
    cy.get('.send-back-todo').click();
    cy.get('.todo-list-item').should('not.exist');
  });

  it('should clear todo', () => {
    cy.get('.new-todo').type('hello');
    cy.get('.add-todo').click();
    cy.get('.new-todo').type('hello');
    cy.get('.add-todo').click();
    cy.get('.new-todo').type('hello');
    cy.get('.add-todo').click();
    cy.get('.todo-list-item').should('be.visible');
    cy.get('.clear-todo').click();
    cy.get('.todo-list-item').should('not.exist');
  });

  it('should purge todo', () => {
    cy.get('.new-todo').type('hello');
    cy.get('.add-todo').click();
    cy.get('.new-todo').type('hello');
    cy.get('.add-todo').click();
    cy.get('.new-todo').type('hello');
    cy.get('.add-todo').click();
    cy.get('.todo-list-item').should('be.visible');
    cy.get('.purge-todo').click();
    cy.get('.todo-list-item').should('not.exist');
  });

  it('should find Input1 and Input 2 button', () => {
    cy.get('.input1').should('be.visible');
    cy.get('.input2').should('be.visible');
  });

  it('should click on Input1 button and navigate to input1 page', () => {
    cy.get('.input1').click();
    cy.url().should('include', '/input1');
  });

  it('should click on Input2 button and navigate to input2 page', () => {
    cy.get('.input2').click();
    cy.url().should('include', '/input2');
  });

  it('should click on Home button and navigate to home page', () => {
    cy.get('.input2').click();
    cy.url().should('include', '/input2');
    cy.get('.home').click();
    cy.url().should('include', '/');
    cy.get('.input1').click();
    cy.url().should('include', '/input1');
    cy.get('.home').click();
    cy.url().should('include', '/');
  });

  it('add a new todo, add todo from input1 and input 2 , and clear all', () => {
    cy.get('.new-todo').type('hello');
    cy.get('.add-todo').click();
    cy.get('.input1').click();
    cy.get('.left-table-data tr').first().as('firstRow');
    // save the task.id of the first row for later
    cy.get('@firstRow').find('button').contains('Send Right').click();
    cy.get('.right-table-data tr').first().as('rightFirstRow');
    cy.get('@rightFirstRow')
      .find('td')
      .first()
      .invoke('text')
      .then((taskId) => {
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
    cy.get('.input2').click();
    cy.get('.left-table-data tr').first().as('firstRow');
    // save the task.id of the first row for later
    cy.get('@firstRow').find('button').contains('Send Right').click();
    cy.get('.right-table-data tr').first().as('rightFirstRow');
    cy.get('@rightFirstRow')
      .find('td')
      .first()
      .invoke('text')
      .then((taskId) => {
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
    cy.get('.clear-todo').click();

    cy.get('.table-data').should('have.length', 1);
    // check the length of right tables of input1 and input 2 page
    //check the task.id of the first row of input1 and input2 page right table
    cy.get('.input1').click();
    cy.get('@taskId1').then((taskId1) => {
      cy.get('.right-table-data tr')
        .first()
        .get('td')
        .first()
        .should('have.text', taskId1);
    });
    cy.get('.right-table-data tr').should('have.length', 1);
    cy.get('.home').click();
    cy.get('.input2').click();
    cy.get('@taskId2').then((taskId2) => {
      cy.get('.right-table-data tr')
        .first()
        .get('td')
        .first()
        .should('have.text', taskId2);
    });
    cy.get('.right-table-data tr').should('have.length', 1);
  });

  it('add a new todo, add todo from input1 and input 2 , and purge all', () => {
    cy.get('.new-todo').type('hello');
    cy.get('.add-todo').click();
    cy.get('.input1').click();
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
      });
    cy.get('.input2').click();
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
      });
    cy.get('.purge-todo').click();
    //check the length of table now
    cy.get('.table-data').should('have.length', 1);
    // check the length of right tables of input1 and input 2 page
    cy.get('.input1').click();
    cy.get('.right-table-data tr').should('have.length', 0);
    cy.get('.home').click();
    cy.get('.input2').click();
    cy.get('.right-table-data tr').should('have.length', 0);
  });
});
