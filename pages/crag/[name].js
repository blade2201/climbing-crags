import Layout from '../../components/layout';
import { useState } from 'react';
import { calcRoutesAndDifficulty } from '../../utils/infoCalc';
import Image from 'next/image';
import InfoCard from '../../components/ui/InfoCard';
import ListSection from '../../components/ListSection';
import clientPromise from '../../utils/mongoDb';
import { gradesObj } from '../../utils/realmApp';

export default function CragPage({ crag, grades }) {
  //const [cragData, setCragData] = useState(crag[0]);
  const [cragData, setCragData] = useState({
    crag: 'Erto',
    country: 'ITA',
    sectors: [
      {
        sector: 'big',
        sector_id: '1834',
        crag_id: '62',
        crag: 'Erto',
        country: 'ITA',
        routes: [
          {
            grade_id: '36',
            sector_id: '1834',
            crag_id: '62',
            name: 'molina',
            rating: '2.0000000000000000',
          },
          {
            grade_id: '40',
            sector_id: '1834',
            crag_id: '62',
            name: 'mata hari',
            rating: '2.0000000000000000',
          },
          {
            grade_id: '40',
            sector_id: '1834',
            crag_id: '62',
            name: 'pipistrelli',
            rating: '1.5000000000000000',
          },
          {
            grade_id: '42',
            sector_id: '1834',
            crag_id: '62',
            name: 'alien',
            rating: '1.2000000000000000',
          },
          {
            grade_id: '42',
            sector_id: '1834',
            crag_id: '62',
            name: 'pipistrelli',
            rating: '3.0000000000000000',
          },
          {
            grade_id: '44',
            sector_id: '1834',
            crag_id: '62',
            name: 'alien diretta',
            rating: '2.0000000000000000',
          },
          {
            grade_id: '44',
            sector_id: '1834',
            crag_id: '62',
            name: 'brooklyn',
            rating: '2.0000000000000000',
          },
          {
            grade_id: '44',
            sector_id: '1834',
            crag_id: '62',
            name: 'la passera',
            rating: '2.5000000000000000',
          },
          {
            grade_id: '44',
            sector_id: '1834',
            crag_id: '62',
            name: 'la passera scopaiola',
            rating: '1.5000000000000000',
          },
          {
            grade_id: '44',
            sector_id: '1834',
            crag_id: '62',
            name: 'mano di clown 2° tiro',
            rating: '2.0000000000000000',
          },
        ],
      },
      {
        sector: 'No big',
        sector_id: '3139',
        crag_id: '62',
        crag: 'Erto',
        country: 'ITA',
        routes: [
          {
            grade_id: '13',
            sector_id: '3139',
            crag_id: '62',
            name: 'melissa',
            rating: '2.0000000000000000',
          },
          {
            grade_id: '13',
            sector_id: '3139',
            crag_id: '62',
            name: 'per i più piccini',
            rating: '2.0000000000000000',
          },
          {
            grade_id: '21',
            sector_id: '3139',
            crag_id: '62',
            name: '8',
            rating: '0.00000000000000000000',
          },
          {
            grade_id: '23',
            sector_id: '3139',
            crag_id: '62',
            name: 'mauro',
            rating: '1.00000000000000000000',
          },
          {
            grade_id: '23',
            sector_id: '3139',
            crag_id: '62',
            name: 'senza nome',
            rating: '3.0000000000000000',
          },
          {
            grade_id: '25',
            sector_id: '3139',
            crag_id: '62',
            name: 'stunt man',
            rating: '2.0000000000000000',
          },
          {
            grade_id: '31',
            sector_id: '3139',
            crag_id: '62',
            name: 'batman',
            rating: '2.0000000000000000',
          },
          {
            grade_id: '31',
            sector_id: '3139',
            crag_id: '62',
            name: 'test: se non passi vendi tutto',
            rating: '2.0000000000000000',
          },
          {
            grade_id: '36',
            sector_id: '3139',
            crag_id: '62',
            name: '17',
            rating: '2.0000000000000000',
          },
          {
            grade_id: '36',
            sector_id: '3139',
            crag_id: '62',
            name: '6',
            rating: '0.00000000000000000000',
          },
        ],
      },
      {
        sector: 'Contessa',
        sector_id: '3342',
        crag_id: '62',
        crag: 'Erto',
        country: 'ITA',
        routes: [
          {
            grade_id: '33',
            sector_id: '3342',
            crag_id: '62',
            name: 'molina',
            rating: '0.00000000000000000000',
          },
          {
            grade_id: '38',
            sector_id: '3342',
            crag_id: '62',
            name: 'pensionati',
            rating: '2.5000000000000000',
          },
          {
            grade_id: '40',
            sector_id: '3342',
            crag_id: '62',
            name: 'mata hari',
            rating: '0.00000000000000000000',
          },
          {
            grade_id: '44',
            sector_id: '3342',
            crag_id: '62',
            name: 'la passera',
            rating: '3.0000000000000000',
          },
          {
            grade_id: '49',
            sector_id: '3342',
            crag_id: '62',
            name: 'contessa',
            rating: '1.4523809523809524',
          },
          {
            grade_id: '49',
            sector_id: '3342',
            crag_id: '62',
            name: 'libellula rosa',
            rating: '1.2000000000000000',
          },
          {
            grade_id: '51',
            sector_id: '3342',
            crag_id: '62',
            name: 'libellula rosa',
            rating: '0.25000000000000000000',
          },
        ],
      },
    ],
  });
  const [info, setInfo] = useState(calcRoutesAndDifficulty(cragData, 'crags'));

  return (
    <>
      <section className="px-4 md:px-36 pt-12 relative min-h-[70vh]">
        <div>
          <h1 className="text-3xl md:text-6xl font-semibold md:font-bold mb-4 text-white-high">
            {cragData.crag}
          </h1>
          <h4 className="md:text-4xl text-white-high">{cragData.country}</h4>
        </div>
        <div className="absolute w-[150%] h-3/5 top-1/4 -left-32 md:top-10 md:left-[35%] md:w-full md:h-full -rotate-2">
          <Image
            className="rounded-4xl"
            src="/home.jpg"
            alt="crag image"
            layout="fill"
            objectFit="cover"
            priority={true}
          />
        </div>
        <InfoCard
          routes={info.routes}
          difficulties={info.difficulties}
          rating={info.rating}
          type={'crag'}
          classes={'absolute z-10 md:left-[23%] md:top-[40%] top-2/3 left-[10%]'}
        />
      </section>
      <section className="px-4 md:px-36 md:pt-12 pb-32">
        <ListSection title={'Sectors'} items={cragData.sectors} />
      </section>
    </>
  );
}

CragPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// this preloads all the possible paths for the crag page
export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db('Climbing-crags');
  const cragsCollection = db.collection('crags');
  const cragsCursor = await cragsCollection.find({});
  const crags = await cragsCursor
    .map((crag) => {
      return { crag: crag.crag };
    })
    .toArray();

  const paths = crags.map((crag) => ({ params: { name: crag.crag.toLowerCase() } }));
  return {
    paths,
    fallback: false,
  };
}

// this preloads all the crag info for the specific paths
export async function getStaticProps(ctx) {
  let crag;
  let grades;
  try {
    const client = await clientPromise;
    const db = client.db('Climbing-crags');
    const cragsCollection = db.collection('crags');
    const cragsCursor = await cragsCollection.find({
      crag: { $regex: new RegExp('^' + ctx.params.name + '$', 'i') },
    });
    crag = await cragsCursor
      .map((crag) => {
        return { ...crag, _id: crag._id.toString() };
      })
      .toArray();
  } catch (error) {
    console.error(error);
  }

  grades = gradesObj();

  return {
    props: {
      crag,
      grades,
    },
  };
}
