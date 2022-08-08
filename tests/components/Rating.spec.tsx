import { render, screen } from '@testing-library/react';
import { getFontDefinitionFromNetwork } from 'next/dist/server/font-utils';
import React from 'react';
import Rating from '../../components/ui/Rating';

describe('Rating', () => {
  it('renders the stars correctly', () => {
    render(<Rating rating={3.5} />);

    const logoImg = screen.getby('img');
    expect(logoImg.getElement(0).props.src).toEqual('images/logo.png');

    const thirdStar = screen.getByRole('star-3');
    const fourthStar = screen.getByTestId('star-4');
    const fifthStar = screen.getByTestId('star-5');

    expect(thirdStar).findByRole('img');
    expect(fourthStar).toHaveClass('half');
    expect(fifthStar).toHaveClass('empty');
  });
});
