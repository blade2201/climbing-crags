describe('Testing Crag page', () => {
  it('Home page loads', () => {
    cy.visit('/');
  });
  it('Search "Alien" and click it', () => {
    cy.get('input').type('Alien');
    cy.get('a[href="/route/47-3-640"]').click();
  });
  it('Check if Route "Alien" page loads', () => {
    cy.url().should('contain', '/route/47-3-640');
  });
  it('Click on the Crag name', () => {
    cy.get('a[href="/crag/finale"]').should('be.visible').click();
  });
  it('Check if Crag "Finale" page loads', () => {
    cy.url().should('contain', '/crag/finale');
  });
  it('Click on the logo', () => {
    cy.get('a[href="/"]').click();
  });
  it('Check if Home page loads', () => {
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
