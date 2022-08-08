import { render, screen } from '@testing-library/react';
import { getFontDefinitionFromNetwork } from 'next/dist/server/font-utils';
import React from 'react';
import Rating from '../../components/ui/Rating';
import ReactTestUtils from 'react-dom/test-utils';

describe('Rating', () => {
  it('renders the stars correctly', () => {
    render(<Rating rating={3.5} />);

    const thirdStar = screen.getByTestId('star-3');
    const fourthStar = screen.getByTestId('star-4');
    const fifthStar = screen.getByTestId('star-5');

    console.log(fourthStar);
    expect(thirdStar.src).toEqual('/star-full.svg');
    expect(fourthStar).toHaveAttribute('src', '/star-half.svg');
    expect(fifthStar).toHaveAttribute('src', '/star-empty.svg');
  });
});
