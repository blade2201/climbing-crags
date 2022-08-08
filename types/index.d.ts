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
}

export {};
