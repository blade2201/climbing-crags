import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import * as Realm from 'realm-web';
import ListSection from '../components/ListSection';

export default function Home({ grades }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(router.query.search || '');
  const [allRoutes, setAllRoutes] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const [allCrags, setAllCrags] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    router.push(`/?search=${searchTerm.toLowerCase()}`, null, { shallow: true });
  };

  useEffect(() => {
    document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
  }, [allCrags]);

  useEffect(() => {
    async function getData() {
      const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      const user = await app.logIn(credentials);
      // const client = app.currentUser.mongoClient('mongodb-atlas');
      // const gradesDb = client.db('Climbing-crags').collection('grades');
      // const grade = await gradesDb.find();
      if (router.query.search) {
        const crags = await user.functions.searchCrags(router.query.search);
        setAllCrags(crags);
        const areas = await user.functions.searchAreas(router.query.search);
        setAllAreas(areas);
        const routes = await user.functions.searchRoutes(router.query.search);
        setAllRoutes(routes);
      } else {
        setAllCrags([]);
        setAllAreas([]);
        setAllRoutes([]);
      }
    }
    try {
      getData();
    } catch (e) {
      console.log(e);
    }
  }, [router.query.search]);

  return (
    <>
      <div
        className="mt-12 h-[80vh] flex items-center justify-center flex-col clip-image bg-cover mb-20 bg-[-15rem_center] md:bg-center"
        style={{ backgroundImage: 'url("/home.jpg")' }}
      >
        <h1 className="text-white-true font-semibold md:text-9xl text-4xl">Climbing Crags</h1>
        <form
          action="submit"
          className="md:mt-20 mt-12 md:w-1/2 w-full flex md:gap-x-6 gap-x-2 px-4"
          onSubmit={handleOnSubmit}
        >
          <input
            type="text"
            placeholder="Type to search..."
            className="w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
          <button className="button" type="submit">
            Search
          </button>
        </form>
      </div>
      <div id="content" className="md:px-36 px-4 mb-40">
        {allCrags.length !== 0 && <ListSection title={'Crags'} items={allCrags} grades={grades} />}
        {allAreas.length !== 0 && (
          <ListSection title={'Sectors'} items={allAreas} grades={grades} />
        )}
        {allRoutes.length !== 0 && (
          <ListSection title={'Routes'} items={allRoutes} grades={grades} />
        )}
      </div>
    </>
  );
}
Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps = async (ctx) => {
  const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
  const app = new Realm.App({ id: REALM_APP_ID });
  const credentials = Realm.Credentials.anonymous();
  const user = await app.logIn(credentials);
  const client = app.currentUser.mongoClient('mongodb-atlas');
  const gradesDb = client.db('Climbing-crags').collection('grades');
  const grades = await gradesDb.find({});
  const gradesObj = {};
  grades.forEach((grade) => {
    gradesObj[grade.id] = [grade.fra_routes, grade.usa_routes];
  });

  return {
    props: {
      grades: gradesObj,
    },
  };
};
