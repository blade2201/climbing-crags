import Layout from '../../components/Layout';
import { useState } from 'react';
import { calcRoutesAndDifficulty } from '../../utils/infoCalc';
import Image from 'next/image';
import InfoCard from '../../components/ui/InfoCard';
import ListSection from '../../components/ListSection';
import clientPromise from '../../utils/mongodb';
import { cragPagePipeline, singleCragPipeline } from '../../utils/pipelines';

type CragPageProps = {
  crag: CragsType[];
  sectors: SectorsType[];
};

export default function CragPage({ crag, sectors }: CragPageProps) {
  const cragData = crag[0];
  const info = calcRoutesAndDifficulty(cragData, 'crags');

  return (
    <>
      <section className="px-4 md:px-36 pt-12 relative min-h-[70vh]">
        <div>
          <h1 className="text-3xl md:text-6xl font-semibold md:font-bold mb-4 text-white-high">
            {cragData.crag}
          </h1>
          <h4 className="md:text-4xl text-white-high">{cragData.country}</h4>
        </div>
        <div className="absolute w-[150%] h-3/5 top-1/4 -left-32 md:top-10 md:left-[35%] md:w-[70%] md:h-full -rotate-2">
          <Image
            className="rounded-4xl"
            src={
              cragData.images && cragData.images.length
                ? cragData.images[0][0].src
                : 'https://res.cloudinary.com/blade2201/image/upload/c_crop,h_949,w_1920/v1659337484/routes/wd5qupjyrgkmtwcuhoe9.jpg'
            }
            alt="crag image"
            layout="fill"
            objectFit="cover"
            objectPosition={'right'}
            priority={true}
          />
        </div>
        <InfoCard
          routes={info.routes}
          difficulties={info.difficulties ? info.difficulties : ''}
          rating={info.rating ? parseFloat(info.rating) : 0}
          type={'crag'}
          classes={
            'absolute z-10 md:left-[23%] md:top-[40%] top-2/3 left-[10%]'
          }
        />
      </section>
      <section className="px-4 md:px-36 md:pt-12 pb-16">
        <ListSection title={'Sectors'} items={sectors} />
      </section>
    </>
  );
}

CragPage.getLayout = function getLayout(page: CragPageProps) {
  return <Layout>{page}</Layout>;
};

// this preloads all the possible paths for the crag page
export async function getStaticPaths() {
  let paths;
  try {
    const client = await clientPromise;
    const db = client.db('Climbing-crags');
    const cragsCollection = db.collection('crags');
    const cragsCursor = await cragsCollection.find({});
    const crags = await cragsCursor
      .map((crag) => {
        return { crag: crag.crag };
      })
      .toArray();

    paths = crags.map((crag) => ({
      params: { name: crag.crag.toLowerCase() },
    }));
  } catch (error) {
    console.log(error);
  }

  return {
    paths,
    fallback: false,
  };
}

// this preloads all the crag info for the specific paths
export async function getStaticProps(ctx: any) {
  let crag;
  let sectors;
  try {
    const client = await clientPromise;
    const db = client.db('Climbing-crags');
    const cragsCollection = db.collection('crags');
    const sectorsCollection = db.collection('sectors');
    const cragsCursor = await cragsCollection.aggregate(
      singleCragPipeline(ctx)
    );
    crag = await cragsCursor
      .map((crag) => {
        return { ...crag, _id: crag._id.toString() };
      })
      .toArray();
    const sectorsCursor = await sectorsCollection.aggregate(
      cragPagePipeline(ctx)
    );
    sectors = await sectorsCursor
      .map((sector) => {
        return { ...sector, _id: sector._id.toString() };
      })
      .toArray();
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      crag,
      sectors,
    },
  };
}
