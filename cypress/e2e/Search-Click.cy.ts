describe('Testing Crag page', () => {
  it('Home page loads', () => {
    cy.visit('/');
  });
  it('Search "par" and click the search button', () => {
    cy.get('form').within(() => {
      cy.get('input').type('par');
      cy.get('button').click();
    });
  });
  it('Check that the URL changes', () => {
    cy.url().should('contain', '/?search=par');
  });
  it('The Sector cards should be visible', () => {
    cy.get('div.grid').within(() => {
      cy.get('a').should('have.length', 9);
    });
  });
  it('Check the "Load more" button works', () => {
    cy.scrollTo('bottom');
    cy.get('div#content').within(() => {
      cy.get('button.button').should('be.visible').click();
    });
    cy.get('div.grid').within(() => {
      cy.get('a').should('have.length', 15);
    });
  });
});
