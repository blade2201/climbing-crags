import { render } from '@testing-library/react';
import * as React from 'react';
import CragPage, {
  getStaticPaths,
  getStaticProps,
} from '../../pages/crag/[name]';
import { mockCrag } from './mock.spec';

describe('The Crag page', () => {
  it('getStaticPaths works', async () => {
    const paths = await getStaticPaths({});
    expect(paths).toEqual(mockCrag);
  });

  it('getStaticProps works', async () => {
    const props = await getStaticProps({
      params: { name: 'crag-name' },
    });
    expect(props).toEqual(mockCrag);

    it('renders', async () => {
      const { getByText } = render(<CragPage />);
      expect(getByText('crag-name')).toBeInTheDocument();
    });
  });
});
