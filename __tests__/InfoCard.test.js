import { cleanup, render, screen } from '@testing-library/react';
import InfoCard from '../components/ui/InfoCard';
import '@testing-library/jest-dom';

beforeEach(() => {
  render(<InfoCard />);
});

afterEach(cleanup);

describe('InfoCard', () => {
  it('should render InfoCard', () => {
    expect(screen.getByText('Grades:')).toBeInTheDocument();
    screen.debug();
  });
});
