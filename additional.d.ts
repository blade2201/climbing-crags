export type CommentsType = {
  _id: string;
  title: string;
  comment: string;
  rating: number;
  path?: string;
  user?: string;
  comment_rating: number;
  id?: string;
  votes?: {
    [key: string]: number;
  };
};

export type RoutesType = {
  _id: string;
  grade_id: number;
  sector_id: number;
  crag_id: number;
  name: string;
  rating: number;
  id: string;
  sector: string;
  crag: string;
  images: [
    {
      src: string;
      id: string;
    }
  ];
  comments?: CommentsType[];
  avgRating?: number;
};
