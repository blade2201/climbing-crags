import { render } from '@testing-library/react';
import React from 'react';
import CragPage, {
  getStaticPaths,
  getStaticProps,
} from '../../pages/crag/[name]';
import { mockCrag } from './mock';

describe('The Crag page', () => {
  it('getStaticPaths works', async () => {
    const paths = await getStaticPaths({});
    expect(paths).equal(mockCrag);
  });
  // describe('The Crag page', () => {
  //   it('getStaticPaths works', async () => {
  //     const paths = await getStaticPaths({});
  //     expect(paths).toEqual(
  //       expect.objectContaining({
  //         props: {
  //           name: 'erto',
  //         },
  //         fallback: false,
  //       })
  //     );
  //   });

  it('getStaticProps works', async () => {
    const props = await getStaticProps({
      params: { name: 'crag-name' },
    });
    expect(props).toEqual(mockCrag);

    it('renders', async () => {
      // const { getByText } = render(<CragPage />);
      // expect(getByText('crag-name')).toBeInTheDocument();
    });
  });
});
