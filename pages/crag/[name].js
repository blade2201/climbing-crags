import Layout from '../../components/layout';
import { connectToRealm, gradesObj } from '../../utils/realmApp';
import { useState } from 'react';

export default function CragPage({ crag, grades }) {
  const [cragData, setCragData] = useState(crag[0]);

  return (
    <section className="px-4 md:px-36 pt-8 relative">
      {cragData && <div>{cragData.country}</div>}
    </section>
  );
}

CragPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getStaticPaths() {
  const { client } = await connectToRealm();
  const cragsDb = client.db('Climbing-crags').collection('crags');
  const crags = await cragsDb.find({});
  const paths = crags.map((crag) => ({ params: { name: crag.crag.toLowerCase() } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(ctx) {
  let crag;
  let grades;
  try {
    const { client } = await connectToRealm();
    const cragsDb = client.db('Climbing-crags').collection('crags');
    crag = await cragsDb.aggregate([
      { $match: { crag: { $regex: new RegExp('^' + ctx.params.name + '$', 'i') } } },
      { $project: { _id: 0 } },
    ]);
  } catch (error) {
    console.error(error);
  }

  try {
    grades = await gradesObj();
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      crag,
      grades,
    },
  };
}
