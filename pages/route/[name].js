import Layout from '../../components/layout';
import Image from 'next/image';
import clientPromise from '../../utils/mongodb';
import { getFrGrade } from '../../utils/infoCalc';
import Rating from '../../components/ui/Rating';
import Link from 'next/link';
import CommentSection from '../../components/CommentSection';
export default function RoutePage({ route, comments }) {
  return (
    <>
      <section className="px-4 md:px-36 pt-12 relative min-h-[70vh]">
        <div>
          <h1 className="text-3xl md:text-6xl font-semibold md:font-bold mb-4 text-white-high capitalize">
            {route.name}
          </h1>
          <h4 className="md:text-4xl text-white-high">
            <Link href={`/sector/${route.sector_id}`}>
              <a>{route.sector}, </a>
            </Link>
            <Link href={`/crag/${route.crag.toLowerCase()}`}>
              <a>{route.crag}</a>
            </Link>
          </h4>
          <div className="pt-20 text-2xl text-white flex items-center gap-x-4">
            Grade:
            <div className="border rounded-full aspect-square p-4 border-primary-600">
              {getFrGrade(route.grade_id)}
            </div>
          </div>
          <div className="pt-8 text-2xl text-white flex items-center gap-x-4">
            Rating: <Rating rating={route.rating} />
          </div>
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
      <CommentSection comments={comments} />
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
      return { id: route.id };
    })
    .toArray();

  const paths = routes.map((route) => ({ params: { name: route.id } }));
  return {
    paths,
    fallback: false,
  };
}

// this preloads all the crag info for the specific paths
export async function getStaticProps(ctx) {
  let route;
  let comments;
  try {
    const client = await clientPromise;
    const db = client.db('Climbing-crags');
    const routesCollection = db.collection('routes');
    const routesCursor = await routesCollection.find({
      id: ctx.params.name,
    });
    route = await routesCursor
      .map((route) => {
        return { ...route, _id: route._id.toString() };
      })
      .toArray();
    const commentsCollection = db.collection('comments');
    const commentsCursor = await commentsCollection.find({ path: `/route/${ctx.params.name}` });
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
      route: route[0],
      comments,
    },
  };
}
