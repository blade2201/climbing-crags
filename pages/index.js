import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import * as Realm from 'realm-web';
import ListSection from '../components/listSection';

export default function Home({ allRoutes }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    router.push(`/?search=${searchTerm}`);
  };

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
      <div className="md:px-36 px-4 mb-40">
        <ListSection title={'Crags'} items={[]} />
        <ListSection title={'Areas'} items={[]} />
        <ListSection title={'Routes'} items={allRoutes} />
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(ctx) {
  // Fetch data from external API
  let allRoutes = [];
  if (ctx.query.search) {
    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    const user = await app.logIn(credentials);
    // const client = app.currentUser.mongoClient('mongodb-atlas');
    // const cragsDb = client.db('Climbing-crags').collection('Crags');
    // const crags = await cragsDb.find();
    allRoutes = await user.functions.searchRoutes(ctx.query.search);
  }

  return { props: { allRoutes } };
}
