import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import CardSkeleton from '../components/cardSkeleton';
import Layout from '../components/layout';
import ListSection from '../components/ListSection';
import * as realmAppUtil from '../utils/realmApp';

export default function Home({ grades }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [allRoutes, setAllRoutes] = useState([]);
  const [allSectors, setAllSectors] = useState([]);
  const [allCrags, setAllCrags] = useState([]);

  useEffect(() => {
    setAllCrags([]);
    document.getElementById('content').scrollIntoView({ behavior: 'smooth' });
    async function getData() {
      const { user } = await realmAppUtil.connectToRealm();
      if (router.query.search) {
        const crags = await user.functions.searchCrags(router.query.search);
        setAllCrags(crags);
        //!! TODO change searchArea to serchSectors
        /* const sectors = await user.functions.searchAreas(router.query.search);
        setAllSectors(sectors); */
        /* const routes = await user.functions.searchRoutes(router.query.search);
        setAllRoutes(routes); */
      } else {
        setAllCrags([]);
        setAllSectors([]);
        setAllRoutes([]);
      }
    }
    try {
      if (router.query.search) getData();
    } catch (e) {
      console.log(e);
    }
  }, [router.query.search]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    router.push(`/?search=${searchTerm.toLowerCase()}`, null, { shallow: true });
    setSearchTerm('');
  };

  return (
    <>
      <div className="mt-12 h-[66vh] md:h-[80vh] flex items-center justify-center flex-col relative">
        <div
          className="clip-image bg-cover mb-20 bg-[-15rem_center] md:bg-center absolute w-full h-full"
          style={{ backgroundImage: 'url("/home.jpg")' }}
        ></div>
        <h1 className="text-white-true font-semibold md:text-9xl text-4xl z-10">Climbing Crags</h1>
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
          <button className="button z-10" type="submit">
            Search
          </button>
        </form>
      </div>
      <div id="content" className="md:px-36 px-4 mb-40">
        {allCrags.length !== 0 ? (
          <ListSection title={'Crags'} items={allCrags} grades={grades} />
        ) : (
          <CardSkeleton />
        )}
        {/* {allSectors.length !== 0 ? (
          <ListSection title={'Sectors'} items={allSectors} grades={grades} />
        ) : (
          <CardSkeleton />
        )} */}
        {/* {allRoutes.length !== 0 && (
          <ListSection title={'Routes'} items={allRoutes} grades={grades} />
        )} */}
      </div>
    </>
  );
}
Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// TODO make realmAppUtil.getGrades() async
export async function getServerSideProps(ctx) {
  let grades = realmAppUtil.gradesObj();

  return {
    props: {
      grades,
    },
  };
}
