import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { calcRoutesAndDifficulty } from "../utils/infoCalc";
import { buildUrl } from "cloudinary-build-url";
import Tag from "./ui/Tag";

type route = {
  _id: string;
  grade_id: string;
  sector_id: string;
  crag_id: string;
  name: string;
  rating: string;
  id: string;
  sector: string;
  crag: string;
  images: [
    {
      src: string;
      id: string;
    }
  ];
};

type sector = {
  _id: string;
  sector: string;
  sector_id: string;
  crag_id: string;
  crag: string;
  country: string;
  routes: [route];
};

type crag = {
  _id: string;
  crag: string;
  country: string;
  sectors: [sector];
};

type cardProps = {
  item: crag | sector | route;
  type: string;
};

function Card({ item, type }: cardProps) {
  const [routesCount, setRoutesCount] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string | undefined>("");
  const [rating, setRating] = useState<number | string | undefined>(0);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  useEffect(() => {
    if (item) {
      let { routes, rating, difficulties } = calcRoutesAndDifficulty(
        item,
        type
      );
      switch (type) {
        case "crags":
          setRoutesCount(routes);
          setRating(rating);
          setDifficulty(difficulties);
          break;
        case "sectors":
          setRoutesCount(routes);
          setRating(rating);
          setDifficulty(difficulties);
          //CHECK THIS LOGIC
          if ("routes" in item) setRoutesCount(item.routes.length + "+");
          break;
        default:
          break;
      }
    }
    //CHECK THIS LOGIC
    if ("images" in item && item.images.length) {
      const imageId = item.images[0][0].id;
      const url = buildUrl(imageId, {
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
  }, [item, type]);

  return (
    <div className="col-span-1 bg-dark-card rounded-4xl p-5 shadow-8 relative">
      <div
        className="rounded-3xl overflow-hidden aspect-video relative bg-cover bg-center"
        style={{
          backgroundImage: imagePreviewUrl
            ? `url(${imagePreviewUrl})`
            : 'url("https://res.cloudinary.com/blade2201/image/upload/c_crop,e_blur:400,h_949,q_30,w_1920/v1659337484/routes/wd5qupjyrgkmtwcuhoe9.jpg")',
        }}
      >
        <Image
          src={
            item.images && item.images.length
              ? item.images[0][0].src
              : "https://res.cloudinary.com/blade2201/image/upload/c_crop,h_949,w_1920/v1659337484/routes/wd5qupjyrgkmtwcuhoe9.jpg"
          }
          alt="card-image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="">
        <div className="pt-4 flex gap-x-2.5">
          {difficulty ? <Tag text={difficulty} /> : null}
          {routesCount ? (
            <Tag
              text={routesCount + (type === "crags" ? " sectors" : " routes")}
            />
          ) : null}
          {true ? (
            <Tag
              text={rating.toString() || parseInt(item.rating).toFixed(1)}
              star={true}
            />
          ) : null}
        </div>
        <h4 className="pt-4 font-bold text-2xl text-white-high max-w-[60%] capitalize">
          {type === "crags"
            ? item.crag
            : type === "sectors"
            ? item.sector
            : item.name}
        </h4>
        <h5>
          {type === "crags"
            ? item.country
            : type === "sectors"
            ? item.crag + ", "
            : item.sector}
          {(type === "sectors" || type === "routes") && <br />}
          {type === "sectors"
            ? item.country
            : type === "routes"
            ? item.crag
            : ""}
          <br />
        </h5>

        <Link
          href={
            type === "crags"
              ? "/crag/" + item.crag.toLowerCase()
              : type === "sectors"
              ? "/sector/" + item.sector_id
              : "/route/" + item.id
          }
        >
          <a className="h-min absolute bottom-5 right-5 button">see more</a>
        </Link>
      </div>
    </div>
  );
}

export default Card;
//
