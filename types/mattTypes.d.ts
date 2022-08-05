export declare type Route = {
  _id: string;
  grade_id: string;
  sector_id: string;
  crag_id: string;
  name: string;
  rating: string;
  id: string;
  sector: string;
  crag: string;
  images: [
    {
      src: string;
      id: string;
    }
  ];
};

export declare type Sector = {
  country: string;
  crag: string;
  crag_id: string;
  images: [
    [
      {
        src: string;
        id: string;
      }
    ]
  ];
  routes: [Route];
  sector: string;
  sector_id: string;
  _id: string;
};

export declare type Crag = {
  country: string;
  crag: string;
  images: [
    [
      {
        src: string;
        id: string;
      }
    ]
  ];
  routes: [Route];
  sectors: [Sector];
  _id: string;
};

export declare type Grade =
  | {
      id: string;
      fra_routes: string;
      usa_routes: string;
    }
  | string[]
  | null;

// export declare function processEnv(loadedEnvFiles: LoadedEnvFiles, dir?: string, log?: Log): Env;
// export declare function loadEnvConfig(dir: string, dev?: boolean, log?: Log): {
//   combinedEnv: Env;
//   loadedEnvFiles: LoadedEnvFiles;
// };
// export {};
