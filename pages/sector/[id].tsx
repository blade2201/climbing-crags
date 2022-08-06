import Layout from "../../components/Layout";
import { useState, useEffect, ReactElement, ReactNode } from "react";
import { calcRoutesAndDifficulty } from "../../utils/infoCalc";
import Image from "next/image";
import InfoCard from "../../components/ui/InfoCard";
import RoutesTable from "../../components/RoutesTable";
import clientPromise from "../../utils/mongodb";
import Link from "next/link";
import {
  routesWithCommentsPipeline,
  sectorPagePipeline,
} from "../../utils/pipelines";
import { buildUrl } from "cloudinary-build-url";
import { GetStaticPaths, GetStaticProps } from "next";
import { Route, Sector } from "../../types/mattTypes";
import {
  AggregationCursor,
  Collection,
  Db,
  FindCursor,
  MongoClient,
} from "mongodb";

type sectorPageProps = {
  routes: Route[];
  sector: Sector;
};

export default function SectorPage({
  routes,
  sector,
}: sectorPageProps): JSX.Element {
  const [sectorData, setSectorData] = useState<Sector>(sector);
  const [info, setInfo] = useState<{
    routes: string;
    rating: string;
    difficulties: string;
  }>(calcRoutesAndDifficulty(sector, "sectors"));
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  useEffect(() => {
    if (sector.images?.length) {
      const imageId: string = sector.images[0][0].id;
      const url: string = buildUrl(imageId, {
        cloud: {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_ID,
        },
        transformations: {
          effect: "blur:1000",
          quality: 1,
        },
      });
      setImagePreviewUrl(url);
    }
  }, [sector]);

  return (
    <>
      <section className="px-4 md:px-36 pt-12 relative min-h-[70vh]">
        <div>
          <h1 className="text-3xl md:text-6xl font-semibold md:font-bold mb-4 text-white-high">
            {sectorData.sector}
          </h1>
          <h4 className="md:text-4xl text-white-high">
            <Link href={`/crag/${sectorData.crag.toLowerCase()}`}>
              <a>
                {sectorData.crag}, {sectorData.country}
              </a>
            </Link>
          </h4>
        </div>
        <div
          className="absolute w-[150%] h-3/5 top-1/4 -left-32 md:top-10 md:left-[35%] md:w-[70%] md:h-full -rotate-2 bg-cover bg-center rounded-4xl overflow-hidden"
          style={{
            backgroundImage: imagePreviewUrl
              ? `url(${imagePreviewUrl})`
              : 'url("https://res.cloudinary.com/blade2201/image/upload/c_crop,e_blur:400,h_949,q_30,w_1920/v1659337484/routes/wd5qupjyrgkmtwcuhoe9.jpg")',
          }}
        >
          <Image
            src={
              sector.images && sector.images.length
                ? sector.images[0][0].src
                : "https://res.cloudinary.com/blade2201/image/upload/c_crop,h_949,w_1920/v1659337484/routes/wd5qupjyrgkmtwcuhoe9.jpg"
            }
            alt="crag image"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <InfoCard
          routes={info.routes}
          difficulties={info.difficulties}
          rating={parseInt(info.rating)}
          type={"sector"}
          classes={
            "absolute z-10 md:left-[23%] md:top-[40%] top-2/3 left-[10%]"
          }
        />
      </section>
      <section className="px-4 md:px-36 md:pt-12 pb-32">
        <RoutesTable
          routes={routes}
          sector={sectorData.sector}
          crag={sectorData.crag}
        />
      </section>
    </>
  );
}

SectorPage.getLayout = function getLayout(page: ReactElement): ReactNode {
  return <Layout>{page}</Layout>;
};

/*
  TODO: add sorting by rating, difficulty, alphabetical, etc.
  routes.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
  });
*/

// this preloads all the possible paths for the crag page
export const getStaticPaths: GetStaticPaths = async () => {
  let paths: { params: { id: string } }[] = [];
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("Climbing-crags");
    const sectorsCollection: Collection<Sector> = db.collection("sectors");
    const sectorsCursor: FindCursor<Sector> = await sectorsCollection.find({});
    const sectors: { sector_id: string }[] = await sectorsCursor
      .map((sector: Sector) => {
        return { sector_id: sector.sector_id };
      })
      .toArray();

    paths = sectors.map((sector) => ({ params: { id: sector.sector_id } }));
  } catch (error) {
    console.error(error);
  }
  return {
    paths,
    fallback: false,
  };
};

// this preloads all the crag info for the specific paths
export const getStaticProps: GetStaticProps = async (ctx) => {
  let sectors: Sector[] = [];
  let routes: Route[] = [];
  try {
    const client: MongoClient = await clientPromise;
    const db: Db = client.db("Climbing-crags");
    const routesCollection: Collection<Route> = db.collection("routes");
    const sectorsCollection: Collection<Sector> = db.collection("sectors");
    const sectorCursor: AggregationCursor<Sector> =
      await sectorsCollection.aggregate(sectorPagePipeline(ctx));
    sectors = await sectorCursor
      .map((sector: Sector) => {
        return { ...sector, _id: sector._id.toString() };
      })
      .toArray();
    const routesCursor: AggregationCursor<Route> =
      await routesCollection.aggregate(routesWithCommentsPipeline(ctx));
    routes = await routesCursor
      .map((route: Route) => {
        return { ...route, _id: route._id.toString() };
      })
      .toArray();
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      routes,
      sector: sectors[0],
    },
  };
};
