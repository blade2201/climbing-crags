import { render, screen } from '@testing-library/react';
import React from 'react';
import Comment from '../../components/ui/Comment';
import { mockComment } from '../mock';

const mockOnClickFunction = (vote: boolean) => {
  return vote;
};

describe('Comment', () => {
  it('renders the stars correctly', () => {
    render(
      <Comment
        comment={mockComment}
        onClickFunction={mockOnClickFunction}
        user='test@test.com'
      />
    );

    const upvote = screen.getByTestId('upvote');
    const downvote = screen.getByTestId('downvote');
    const comment_rating = screen.getByTestId('rating');

    expect(upvote).toHaveClass('half');
    expect(fifthStar).toHaveClass('empty');
  });
});
