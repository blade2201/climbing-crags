import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import CardSkeleton from '../components/cardSkeleton';
import Layout from '../components/layout';
import ListSection from '../components/ListSection';
import { gradesObj } from '../utils/grades';
import clientPromise from '../utils/mongodb';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Home({ grades, crags, sectors }) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [allSectors, setAllSectors] = useState([]);
  const [allCrags, setAllCrags] = useState([]);
  const [autocomplete, setAutocomplete] = useState([]);
  const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);

  useEffect(() => {
    setAllCrags(crags);
    setAllSectors(sectors);
    const content = document.getElementById('content');
    if (content) {
      content.scrollIntoView({ behavior: 'smooth' });
    }
  }, [router.query.search]);

  useEffect(() => {
    setAutoCompleteLoading(true);
    async function getAutocomplete() {
      if (searchTerm.length > 0) {
        try {
          const response = await fetch(`/api/routes/autocomplete/${searchTerm}`);
          const autocompletedRoutes = await response.json();
          setAutocomplete(autocompletedRoutes);
          setAutoCompleteLoading(false);
        } catch (error) {
          console.error('daosdoasdoiasoidoasodiaos', error);
        }
      } else {
        setAutocomplete([]);
      }
    }
    getAutocomplete();
  }, [searchTerm]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    router.push(`/?search=${searchTerm.toLowerCase()}`);
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
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Type to search..."
              className="w-full"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            {searchTerm.length > 0 && (
              <div
                className={`absolute w-full top-[70px] overflow-hidden bg-dark-card ${
                  autocomplete.length || autoCompleteLoading ? 'border-2' : ''
                } border-primary-600 text-white-high shadow-8 rounded-4xl boder-box`}
              >
                {autocomplete.length ? (
                  autocomplete.map((el) => {
                    return (
                      <Link key={el._id} href={'/route/' + el.id}>
                        <a className="py-2 md:px-6 px-3 first:pt-4 last:pb-4 block bg-dark-card hover:bg-dark cursor-pointer">
                          <div className="last:border-0 border-b border-primary-600 capitalize">
                            {el.name}, {el.sector}, {el.crag}
                          </div>
                        </a>
                      </Link>
                    );
                  })
                ) : autoCompleteLoading ? (
                  <a className="py-2 md:px-6 px-3 first:pt-4 last:pb-4 block bg-dark-card hover:bg-dark cursor-pointer">
                    <div className="last:border-0 border-b border-primary-600 capitalize">
                      <SkeletonTheme baseColor="#333333" highlightColor="#575757">
                        <Skeleton />
                      </SkeletonTheme>
                    </div>
                  </a>
                ) : (
                  <></>
                )}
              </div>
            )}
          </div>
          <button className="button z-10" type="submit">
            Search
          </button>
        </form>
      </div>
      {router.query.search && (
        <div id="content" className="md:px-36 px-4 mb-40">
          {allCrags.length === 0 && allSectors.length === 0 ? (
            <h3 className="text-5xl pb-10 pt-16 bold">
              No results found for:
              <span className="font-semibold text-primary-400"> {router.query.search}</span>
            </h3>
          ) : (
            <h3 className="text-5xl pb-10 pt-16 bold">
              Results for:
              <span className="font-semibold text-primary-400"> {router.query.search}</span>
            </h3>
          )}
          {allCrags.length !== 0 && (
            <ListSection title={'Crags'} items={allCrags} grades={grades} />
          )}
          {allSectors.length !== 0 && (
            <ListSection title={'Sectors'} items={allSectors} grades={grades} />
          )}
        </div>
      )}
    </>
  );
}
Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// TODO make realmAppUtil.getGrades() async
export async function getServerSideProps(ctx) {
  let grades = gradesObj();
  let crags;
  let sectors;
  if (ctx.query.search) {
    const client = await clientPromise;
    const db = client.db('Climbing-crags');
    const cragsCollection = db.collection('crags');
    const sectorsCollection = db.collection('sectors');
    const cragsPipeline = [
      {
        $search: {
          index: 'searchCrags',
          text: {
            query: ctx.query.search || '',
            path: ['crag', 'country'],
            fuzzy: {},
          },
        },
      },
    ];
    const sectorsPipeline = [
      {
        $search: {
          index: 'searchSectors',
          text: {
            query: ctx.query.search || '',
            path: ['sector', 'routes.name'],
            fuzzy: {},
          },
        },
      },
    ];
    const cragCursor = await cragsCollection.aggregate(cragsPipeline);
    const sectorsCursor = await sectorsCollection.aggregate(sectorsPipeline);
    crags = await cragCursor
      .map((crag) => {
        return { ...crag, _id: crag._id.toString() };
      })
      .toArray();
    sectors = await sectorsCursor
      .map((sector) => {
        return { ...sector, _id: sector._id.toString() };
      })
      .toArray();
  }

  return {
    props: {
      grades,
      crags: crags || [],
      sectors: sectors || [],
    },
  };
}
