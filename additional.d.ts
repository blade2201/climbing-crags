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
