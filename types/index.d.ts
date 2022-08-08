declare global {
  var _mongoClientPromise: Promise;

  type Sector = {
    sector: string;
    sector_id: string;
    crag_id: string;
    crag: string;
    country: string;
    routes: array[];
  };

  type Route = {
    grade_id: string;
    sector_id: string;
    crag_id: string;
    name: string;
    rating: string;
    id: string;
    sector: string;
    crag: string;
  };

  type Difficulty = {
    high: number;
    low: number;
  };
}

export {};
