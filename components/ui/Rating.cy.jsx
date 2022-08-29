import Rating from './Rating';

describe('<Rating>', () => {
  it('mounts', () => {
    cy.mount(<Rating rating={3} />);
  });

  it('shows the correct number of stars per rating', () => {
    cy.mount(<Rating rating={2.5} />);
    cy.get('[data-testid="star-1"]').should('have.class', '/star-full.svg');
    cy.get('[data-testid="star-2"]').should('have.class', '/star-full.svg');
    cy.get('[data-testid="star-3"]').should('have.class', '/star-half.svg');
    cy.get('[data-testid="star-4"]').should('have.class', '/star-empty.svg');
    cy.get('[data-testid="star-5"]').should('have.class', '/star-empty.svg');
  });
});
