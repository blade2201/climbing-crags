import { Crag, Route, Sector } from "../../types/commonTypes";
import { CommentType } from "../../types/Comment";

export const mockComment: CommentType = {
  _id: "Test _id",
  title: "Test title",
  comment: "Test comment",
  rating: 2.5,
  path: "Test path",
  user: "Test user",
  comment_rating: 3,
  id: "Test id",
  votes: {
    "test@test.com": 1,
  },
};

export const mockRoute: Route = {
  _id: "Test _id",
  grade_id: "1",
  sector_id: "Test sector_id",
  crag_id: "Test crag_id",
  name: "Test name",
  rating: "Test rating",
  id: "Test id",
  sector: "Test sector",
  crag: "Test crag",
  images: [
    {
      src: "https://res.cloudinary.com/blade2201/image/upload/v1659513305/routes/jst5pk76sovop6dv8szg.jpg",
      id: "routes/jst5pk76sovop6dv8szg",
    },
  ],
  avgRating: "Test avgRating",
  comments: [mockComment],
};

export const mockSector: Sector = {
  country: "Test country",
  crag: "Test crag",
  crag_id: "Test crag_id",
  images: [
    [
      {
        src: "https://res.cloudinary.com/blade2201/image/upload/v1659513305/routes/jst5pk76sovop6dv8szg.jpg",
        id: "routes/jst5pk76sovop6dv8szg",
      },
    ],
  ],
  routes: [mockRoute],
  sector: "Test sector",
  sector_id: "Test sector_id",
  _id: "Test _id",
};

export const mockCrag: Crag = {
  country: "Test Country",
  crag: "Test Crag",
  images: [
    [
      {
        src: "https://res.cloudinary.com/blade2201/image/upload/v1659513305/routes/jst5pk76sovop6dv8szg.jpg",
        id: "routes/jst5pk76sovop6dv8szg",
      },
    ],
  ],
  routes: [mockRoute],
  sectors: [mockSector],
  _id: "Test Id",
};
