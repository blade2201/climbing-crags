export const searchCragsPipeline = (ctx) => {
  return [
    {
      $search: {
        index: 'searchCrags',
        text: {
          query: ctx.query.search || '',
          path: ['crag', 'country'],
          fuzzy: {},
        },
      },
    },
    {
      $lookup: {
        from: 'sectors',
        localField: 'sectors.sector_id',
        foreignField: 'sector_id',
        as: 'sectors',
      },
    },
    {
      $lookup: {
        from: 'routes',
        localField: 'sectors.routes.id',
        foreignField: 'id',
        as: 'routes',
      },
    },
    {
      $addFields: {
        images: '$routes.images',
      },
    },
    {
      $project: {
        'routes._id': 0,
        'sectors._id': 0,
      },
    },
  ];
};

export const searchSectorsPipeline = (ctx) => {
  return [
    {
      $search: {
        index: 'searchSectors',
        text: {
          query: ctx.query.search || '',
          path: ['sector', 'routes.name'],
          fuzzy: {},
        },
      },
    },
    {
      $lookup: {
        from: 'routes',
        localField: 'routes.id',
        foreignField: 'id',
        as: 'routes',
      },
    },
    {
      $addFields: {
        images: '$routes.images',
      },
    },
    {
      $project: {
        'routes._id': 0,
      },
    },
  ];
};

export const cragPagePipeline = (ctx) => {
  return [
    {
      $match: {
        crag: { $regex: new RegExp('^' + ctx.params.name + '$', 'i') },
      },
    },
    {
      $lookup: {
        from: 'routes',
        localField: 'routes.id',
        foreignField: 'id',
        as: 'routes',
      },
    },
    {
      $addFields: {
        images: '$routes.images',
      },
    },
    {
      $project: {
        'routes._id': 0,
      },
    },
  ];
};

export const routesWithCommentsPipeline = (ctx) => {
  return [
    {
      $match: {
        sector_id: ctx.params.id,
      },
    },
    {
      $lookup: {
        from: 'comments',
        localField: 'id',
        foreignField: 'id',
        as: 'comments',
      },
    },
    {
      $addFields: {
        avgRating: { $avg: '$comments.rating' },
      },
    },
    {
      $project: {
        'comments._id': 0,
      },
    },
  ];
};

export const singleCragPipeline = (ctx) => {
  return [
    {
      $match: {
        crag: { $regex: new RegExp('^' + ctx.params.name + '$', 'i') },
      },
    },
    {
      $lookup: {
        from: 'sectors',
        localField: 'sectors.sector_id',
        foreignField: 'sector_id',
        as: 'images',
      },
    },
    {
      $lookup: {
        from: 'routes',
        localField: 'images.routes.id',
        foreignField: 'id',
        as: 'images',
      },
    },
    {
      $addFields: {
        images: '$images.images',
      },
    },
  ];
};

export const sectorPagePipeline = (ctx) => {
  return [
    { $match: { sector_id: ctx.params.id } },
    {
      $lookup: {
        from: 'routes',
        localField: 'routes.id',
        foreignField: 'id',
        as: 'images',
      },
    },
    {
      $addFields: {
        images: '$images.images',
      },
    },
  ];
};
