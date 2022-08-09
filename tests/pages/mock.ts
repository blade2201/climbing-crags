import { Crag, Route, Sector } from '../../types/mattTypes';
import { CommentType } from '../../types/Comment';

export const mockComment: CommentType = {
  _id: 'Test _id',
  title: 'Test title',
  comment: 'Test comment',
  rating: 2.5,
  path: 'Test path',
  user: 'Test user',
  comment_rating: 3,
  id: 'Test id',
  votes: {
    'test@test.com': 1,
  },
};

export const mockRoute: Route = {
  _id: 'Test _id',
  grade_id: 'Test grade_id',
  sector_id: 'Test sector_id',
  crag_id: 'Test crag_id',
  name: 'Test name',
  rating: 'Test rating',
  id: 'Test id',
  sector: 'Test sector',
  crag: 'Test crag',
  images: [
    {
      src: 'Test src',
      id: 'Test id',
    },
  ],
  avgRating: 'Test avgRating',
  comments: [mockComment],
};

export const mockSector: Sector = {
  country: 'Test country',
  crag: 'Test crag',
  crag_id: 'Test crag_id',
  images: [
    [
      {
        src: 'Test src',
        id: 'Test id',
      },
    ],
  ],
  routes: [mockRoute],
  sector: 'Test sector',
  sector_id: 'Test sector_id',
  _id: 'Test _id',
};

export const mockCrag: Crag = {
  country: 'Test Country',
  crag: 'Test Crag',
  images: [
    [
      {
        src: 'Test Src',
        id: 'Test Id',
      },
    ],
  ],
  routes: [mockRoute],
  sectors: [mockSector],
  _id: 'Test Id',
};
