describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link]') // Corrigido: faltava o ']'
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link]')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Marca todas as tarefas como completas e depois as limpa', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}');

    cy.get('[data-cy=toggle-all-checkbox]').click();
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]:checked').should('have.length', 2);

    cy.get('[data-cy=clear-completed-btn]').click();
    cy.get('[data-cy=todos-list]').children().should('have.length', 0);
  });


  it('Edita uma tarefa existente', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('Tarefa Original{enter}');

    cy.get('[data-cy=todos-list] > li').dblclick();  // Editar a tarefa
    cy.get('[data-cy=todos-list] > li input.edit').clear().type('Tarefa Editada{enter}');

    cy.get('[data-cy=todos-list] > li').should('have.text', 'Tarefa Editada');
  });

  it('Verifica a contagem de itens restantes', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]')
      .type('Tarefa 1{enter}')
      .type('Tarefa 2{enter}');

    cy.get('[data-cy=todo-count]').should('contain', '2');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]').first().click();
    cy.get('[data-cy=todo-count]').should('contain', '1');

  });




});
