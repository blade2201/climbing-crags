import Rating from './ui/Rating';
import { getFrGrade } from '../utils/infoCalc';
import Link from 'next/link';
import { RoutesType } from '../additional';

type RoutesTableType = {
  routes: RoutesType[];
  crag: string;
  sector: string;
};

export default function RoutesTable({ routes, crag, sector }: RoutesTableType) {
  return (
    <div>
      <h3 className="text-5xl pb-10 pt-16 bold">Routes</h3>
      <div className="grid grid-cols-12 border-y-2 border-white px-3 py-[10px] text-sm md:text-xl gap-6">
        <div className="col-span-1 text-center hidden md:block">GRADE</div>
        <div className="col-span-5 hidden md:block">NAME</div>
        <div className="col-span-6 md:hidden">GRADE & NAME</div>
        <div className="col-span-2 hidden md:block text-center">COMMENTS</div>
        <div className="col-span-2 col-start-9 hidden md:block text-center">
          IMAGES
        </div>
        <div className="col-span-6 md:col-span-2 md:col-start-11 text-center">
          RATING
        </div>
      </div>
      {routes.map((item, i) => {
        return (
          <Link key={i} href={`/route/${item.id}`}>
            <a>
              <div className="grid grid-cols-12 border-y border-white p-3 text-sm md:text-xl gap-6 font-semibold hover:bg-dark-card">
                <div className="col-span-1 text-white-true flex items-center justify-center">
                  {getFrGrade(item.grade_id)}
                </div>
                <div className="col-span-5 text-white-true case capitalize">
                  {item.name}
                  <div className="font-normal text-base -mt-1">
                    {crag} ,{sector}
                  </div>
                </div>
                <div className="col-span-2 hidden md:flex items-center justify-center">
                  {item.comments ? item.comments.length : 0}
                </div>
                <div className="col-span-2 col-start-9 hidden md:flex items-center justify-center">
                  {item.images ? item.images.length : 0}
                </div>
                <div className="col-span-6 md:col-span-2 md:col-start-11 flex justify-center items-center">
                  <Rating
                    rating={item.avgRating ? item.avgRating : item.rating}
                    notBoxed={true}
                    className={''}
                  />
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
