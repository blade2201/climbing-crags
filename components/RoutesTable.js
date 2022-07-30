import Rating from './ui/Rating';
import { getFrGrade } from '../utils/infoCalc';
import Link from 'next/link';

export default function RoutesTable({ routes, crag, sector }) {
  return (
    <div>
      <h3 className="text-5xl pb-10 pt-16 bold">Routes</h3>
      <div className="grid grid-cols-12 border-y-2 border-white px-3 py-[10px] text-xl gap-6">
        <div className="col-span-1 text-center">GRADE</div>
        <div className="col-span-5">NAME</div>
        {/* <div className="col-span-2">COMMENTS</div>
        <div className="col-span-2">IMAGES</div> */}
        <div className="col-span-2 col-start-11 text-center">RATING</div>
      </div>
      {routes.map((item, i) => {
        return (
          <Link key={i} href={`/route/${item.id}`}>
            <a>
              <div className="grid grid-cols-12 border-y border-white p-3 text-xl gap-6 font-semibold hover:bg-dark-card">
                <div className="col-span-1 text-white-true flex items-center justify-center">
                  {getFrGrade(item.grade_id)}
                </div>
                <div className="col-span-5 text-white-true case capitalize">
                  {item.name}
                  <div className="font-normal text-base -mt-1">
                    {crag} ,{sector}
                  </div>
                </div>
                {/* <div className="col-span-2">COMMENTS</div>
        <div className="col-span-2">IMAGES</div> */}
                <div className="col-span-2 col-start-11 flex justify-center items-center">
                  <Rating rating={item.rating} notBoxed={true} />
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
}
