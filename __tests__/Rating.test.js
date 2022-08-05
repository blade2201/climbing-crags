import { cleanup, render, screen } from '@testing-library/react';
import Rating from '../components/ui/Rating';
import '@testing-library/jest-dom';

beforeEach(() => {
  render(<Rating />);
});

afterEach(cleanup);

describe('Rating', () => {
  it('renders rating component', () => {
    render(<Rating />);
  });

  it('should render 5 stars', () => {
    expect(screen.getAllByAltText('star svg').length).toBe(5);
  });

  it('should take any number between 0 and 5', () => {
    const ratings = [3.2, 0.333, 5, 4.22222225];
    ratings.forEach((rating) => {
      render(<Rating rating={rating} />);
    });
  });
});
