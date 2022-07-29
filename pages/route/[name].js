import Layout from '../../components/layout';
import Image from 'next/image';
import clientPromise from '../../utils/mongoDb';

export default function RoutePage({ route }) {
  return (
    <>
      <section className="px-4 md:px-36 pt-12 relative min-h-[70vh]">
        <div>
          <h1 className="text-3xl md:text-6xl font-semibold md:font-bold mb-4 text-white-high capitalize">
            {route.name}
          </h1>
          <h4 className="md:text-4xl text-white-high">
            {route.sector}, {route.crag}
          </h4>
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
      </section>
    </>
  );
}

RoutePage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// this preloads all the possible paths for the crag page
export async function getStaticPaths() {
  const client = await clientPromise;
  const db = client.db('Climbing-crags');
  const routesCollection = db.collection('routes');
  const routesCursor = await routesCollection.find({});
  const routes = await routesCursor
    .map((route) => {
      return { name: route.name.toLowerCase() + '-' + route.grade_id };
    })
    .toArray();

  const paths = routes.map((route) => ({ params: { name: route.name } }));
  return {
    paths,
    fallback: false,
  };
}

// this preloads all the crag info for the specific paths
export async function getStaticProps(ctx) {
  let route;
  try {
    const client = await clientPromise;
    const db = client.db('Climbing-crags');
    const routesCollection = db.collection('routes');
    const routesCursor = await routesCollection.find({
      name: ctx.params.name.split('-')[0],
      grade_id: ctx.params.name.split('-')[1],
    });
    route = await routesCursor
      .map((route) => {
        return { ...route, _id: route._id.toString() };
      })
      .toArray();
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      route: route[0],
    },
  };
}
