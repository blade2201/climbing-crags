describe('Home page', () => {
  it('loads', () => {
    cy.visit('/');
  });
  it('Search "Alien" and click it', () => {
    cy.get('input').type('Alien');
    cy.get('a[href="/route/47-3-640"]').click();
  });
});

describe('Route page', () => {
  it('Route "Alien" page loads', () => {
    cy.url().should('contain', '/route/47-3-640');
  });
  it('Crag name is clickable', () => {
    cy.get('a[href="/crag/finale"]').should('be.visible').click();
  });
});

describe('Crag page', () => {
  it('Check if Crag "Finale" page loads', () => {
    cy.url().should('contain', '/crag/finale');
  });
  it('Click on the logo', () => {
    cy.get('a[href="/"]').click();
  });
});

describe('Home page', () => {
  it('Check if Home page loads', () => {
    cy.url().should('eq', 'http://localhost:3000/');
  });
});
