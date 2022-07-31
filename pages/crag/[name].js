import Layout from '../../components/layout';
import { useState } from 'react';
import { calcRoutesAndDifficulty } from '../../utils/infoCalc';
import Image from 'next/image';
import InfoCard from '../../components/ui/InfoCard';
import ListSection from '../../components/ListSection';
import clientPromise from '../../utils/mongodb';
import CommentSection from '../../components/CommentSection';
import cragImage from '../../public/home.jpg';

export default function CragPage({ crag, comments }) {
  const [cragData] = useState(crag[0]);
  const [info] = useState(calcRoutesAndDifficulty(cragData, 'crags'));

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
            src={cragImage}
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
      <section className="px-4 md:px-36 md:pt-12 pb-16">
        <ListSection title={'Sectors'} items={cragData.sectors} />
      </section>
      <CommentSection comments={comments} />
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
  let comments;
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

    const commentsCollection = db.collection('comments');
    const commentsCursor = await commentsCollection.find({ path: `/crag/${ctx.params.name}` });
    comments = await commentsCursor
      .map((comment) => {
        return { ...comment, _id: comment._id.toString() };
      })
      .toArray();
    comments.sort((a, b) => b.comment_rating - a.comment_rating);
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      crag,
      comments,
    },
  };
}
