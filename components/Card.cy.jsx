import Card from './Card';
import { mockCrag, mockSector } from '../tests/mock';

describe('<Card>', () => {
  it('Crag variant mounts', () => {
    cy.mount(<Card type='crags' item={mockCrag} />);
  });
  it('Sector variant mounts', () => {
    cy.mount(<Card type='sectors' item={mockSector} />);
  });
});
