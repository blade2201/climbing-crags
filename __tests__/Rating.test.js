import { render, screen } from '@testing-library/react';
import Rating from '../components/ui/Rating';
import '@testing-library/jest-dom';

beforeEach(() => {
  render(<Rating />);
});

describe('Rating', () => {
  it('renders rating component', () => {
    render(<Rating />);
  });

  it('should render 5 stars', () => {
    screen.getAllByRole('img').forEach((element) => {
      expect(element).toContainHTML('img alt="star svg"');
    });
  });
});
