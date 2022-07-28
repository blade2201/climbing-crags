import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import * as Realm from 'realm-web';
import ListSection from '../components/listSection';

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [allRoutes, setAllRoutes] = useState([]);
  const [allAreas, setAllAreas] = useState([]);
  const [allCrags, setAllCrags] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    router.push(`/?search=${searchTerm.toLowerCase()}`);
  };

  useEffect(() => {
    console.log('query changed');
    async function getRoutes() {
      const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
      const app = new Realm.App({ id: REALM_APP_ID });
      const credentials = Realm.Credentials.anonymous();
      const user = await app.logIn(credentials);
      // const client = app.currentUser.mongoClient('mongodb-atlas');
      // const cragsDb = client.db('Climbing-crags').collection('Crags');
      // const crags = await cragsDb.find({limit: 6});
      if (router.query.search) {
        const crags = await user.functions.searchCrags(router.query.search);
        const areas = await user.functions.searchAreas(router.query.search);
        const routes = await user.functions.searchRoutes(router.query.search);
        setAllCrags(crags);
        setAllAreas(areas);
        setAllRoutes(routes);
        document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
      }
    }

    getRoutes();
    // (async () => {
    // })();
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
        <ListSection title={'Crags'} items={allCrags} />
        <ListSection title={'Areas'} items={allAreas} />
        <ListSection title={'Routes'} items={allRoutes} />
      </div>
    </>
  );
}
Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
