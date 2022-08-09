import { render, screen } from '@testing-library/react';
import React from 'react';
import Rating from '../../components/ui/Rating';

describe('Rating', () => {
  it('renders the stars correctly', () => {
    render(<Rating rating={3.5} />);
    const firstStar = screen.getByTestId('star-1');
    const secondStar = screen.getByTestId('star-2');
    const thirdStar = screen.getByTestId('star-3');
    const fourthStar = screen.getByTestId('star-4');
    const fifthStar = screen.getByTestId('star-5');

    expect(firstStar).toHaveClass('/star-full.svg');
    expect(secondStar).toHaveClass('/star-full.svg');
    expect(thirdStar).toHaveClass('/star-full.svg');
    expect(fourthStar).toHaveClass('/star-half.svg');
    expect(fifthStar).toHaveClass('/star-empty.svg');
  });
});
