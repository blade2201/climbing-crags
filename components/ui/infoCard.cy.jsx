import InfoCard from './InfoCard';

describe('<InfoCard>', () => {
  it('mounts', () => {
    cy.mount(
      <InfoCard
        rating={3}
        routes={'10+'}
        difficulties={'6a - 6c'}
        classes={'absolute z-10 md:left-[23%] md:top-[40%] top-2/3 left-[10%]'}
        type={'sector'}
      />
    );
  });

  it('All text renders correctly', () => {
    cy.mount(
      <InfoCard
        rating={3}
        routes={'10+'}
        difficulties={'6a - 6c'}
        classes={'absolute z-10 md:left-[23%] md:top-[40%] top-2/3 left-[10%]'}
        type={'sector'}
      />
    );
    cy.get('[id="numberOfRoutes"]').should('have.text', 'N° Routes: 10+');
    cy.get('[id="grades"]').should('have.text', 'Grades: 6a - 6c');
  });
});
