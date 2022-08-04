import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { calcRoutesAndDifficulty } from '../../utils/infoCalc';
import Image from 'next/image';
import InfoCard from '../../components/ui/InfoCard';
import RoutesTable from '../../components/RoutesTable';
import clientPromise from '../../utils/mongodb';
import Link from 'next/link';
import { routesWithCommentsPipeline, sectorPagePipeline } from '../../utils/pipelines';
import { buildUrl } from 'cloudinary-build-url';

export default function SectorPage({ routes, sector }) {
  const [sectorData, setSectorData] = useState(sector);
  const [info, setInfo] = useState(calcRoutesAndDifficulty(sector, 'sectors'));
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  useEffect(() => {
    if (sector.images?.length) {
      console.log('saodkas');
      const imageId = sector.images[0][0].id;
      const url = buildUrl(imageId, {
        cloud: {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_ID,
        },
        transformations: {
          effect: 'blur:1000',
          quality: 1,
        },
      });
      setImagePreviewUrl(url);
    }
  }, [sector]);

  return (
    <>
      <section className="px-4 md:px-36 pt-12 relative min-h-[70vh]">
        <div>
          <h1 className="relative z-30 text-3xl md:text-6xl font-semibold md:font-bold mb-4 text-white-high">
            {sectorData.sector}
          </h1>
          <h4 className="relative z-30 md:text-4xl text-white-high">
            <Link href={`/crag/${sectorData.crag.toLowerCase()}`}>
              <a>
                {sectorData.crag}, {sectorData.country}
              </a>
            </Link>
          </h4>
        </div>
        <div
          className="absolute w-[150%] h-3/5 top-1/4 -left-32 md:top-10 md:left-[35%] md:w-[70%] md:h-full -rotate-2 bg-cover bg-center rounded-4xl overflow-hidden"
          style={{
            backgroundImage: imagePreviewUrl
              ? `url(${imagePreviewUrl})`
              : 'url("https://res.cloudinary.com/blade2201/image/upload/c_crop,e_blur:400,h_949,q_30,w_1920/v1659337484/routes/wd5qupjyrgkmtwcuhoe9.jpg")',
          }}
        >
          <Image
            src={
              sector.images && sector.images.length
                ? sector.images[0][0].src
                : 'https://res.cloudinary.com/blade2201/image/upload/c_crop,h_949,w_1920/v1659337484/routes/wd5qupjyrgkmtwcuhoe9.jpg'
            }
            alt="crag image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <InfoCard
          routes={info.routes}
          difficulties={info.difficulties}
          rating={info.rating}
          type={'sector'}
          classes={'absolute z-10 md:left-[23%] md:top-[40%] top-2/3 left-[10%]'}
        />
      </section>
      <section className="px-4 md:px-36 md:pt-12 pb-32">
        <RoutesTable routes={routes} sector={sectorData.sector} crag={sectorData.crag} />
      </section>
    </>
  );
}

SectorPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

/*
  TODO: add sorting by rating, difficulty, alphabetical, etc.
  routes.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });
*/

// this preloads all the possible paths for the crag page
export async function getStaticPaths() {
  let paths;
  try {
    const client = await clientPromise;
    const db = client.db('Climbing-crags');
    const sectorsCollection = db.collection('sectors');
    const sectorsCursor = await sectorsCollection.find({});
    const sectors = await sectorsCursor
      .map((sector) => {
        return { sector_id: sector.sector_id };
      })
      .toArray();

    paths = sectors.map((sector) => ({ params: { id: sector.sector_id } }));
  } catch (error) {
    console.error(error);
  }
  return {
    paths,
    fallback: false,
  };
}

// this preloads all the crag info for the specific paths
export async function getStaticProps(ctx) {
  let sectors;
  let routes;
  try {
    const client = await clientPromise;
    const db = client.db('Climbing-crags');
    const routesCollection = db.collection('routes');
    const sectorsCollection = db.collection('sectors');
    const sectorCursor = await sectorsCollection.aggregate(sectorPagePipeline(ctx));
    sectors = await sectorCursor
      .map((sector) => {
        return { ...sector, _id: sector._id.toString() };
      })
      .toArray();
    const routesCursor = await routesCollection.aggregate(routesWithCommentsPipeline(ctx));
    routes = await routesCursor
      .map((route) => {
        return { ...route, _id: route._id.toString() };
      })
      .toArray();
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      routes,
      sector: sectors[0],
    },
  };
}
