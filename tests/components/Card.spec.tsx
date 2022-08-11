import { render, screen } from '@testing-library/react';
import Card from '../../components/Card';
import { mockCrag } from '../mock';

it('renders everything that its supposed to render', () => {
  console.log(<Card item={mockCrag} type='crags' />);
  render(<Card item={mockCrag} type='crags' />);
});
