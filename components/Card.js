import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Tag from './ui/Tag';
function Card({ item, type, grades }) {
  const [routesCount, setRoutesCount] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (item) {
      switch (type) {
        case 'crags':
          setRoutesCount(item.sectors.length);
          let lowestDifficulty = 1000;
          let HighestDifficulty = 0;
          item.sectors.forEach((sector) => {
            let lowest = sector.routes.reduce(function (prev, curr) {
              return prev.grade_id < curr.grade_id ? prev : curr;
            });
            if (parseInt(lowest.grade_id) < lowestDifficulty) {
              lowestDifficulty = parseInt(lowest.grade_id);
            }
            let highest = sector.routes.reduce(function (prev, curr) {
              return prev.grade_id > curr.grade_id ? prev : curr;
            });
            if (parseInt(highest.grade_id) > HighestDifficulty) {
              HighestDifficulty = parseInt(highest.grade_id);
            }
          });
          setDifficulty(`${grades[lowestDifficulty][0]} - ${grades[HighestDifficulty][0]}`);
          break;
        case 'sectors':
          setRoutesCount(item.routes.length + '+');
          break;
        default:
          break;
      }
    }
  }, [item, type]);

  return (
    <div className="col-span-1 bg-dark-card rounded-4xl p-5 shadow-8">
      <div className="rounded-3xl overflow-hidden aspect-video relative">
        <Image
          src="/home.jpg"
          alt="card-image"
          width={400}
          height={200}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative">
        <h4 className="pt-2 font-bold text-2xl text-white-high">
          {type === 'crags' ? item.crag : type === 'sectors' ? item.sector : item.name}
        </h4>
        <h5>
          {type === 'crags'
            ? item.country
            : type === 'sectors'
            ? item.crag + ', ' + item.country
            : item.sector + ', ' + item.crag}
        </h5>
        <div className="pt-3 flex gap-x-2.5">
          {difficulty ? <Tag text={difficulty} /> : null}
          {routesCount ? (
            <Tag text={routesCount + (type === 'crags' ? ' sectors' : ' routes')} />
          ) : null}
          {true ? <Tag text={'1'} star={true} /> : null}
        </div>
        <Link
          href={
            type === 'crags'
              ? '/crag/' + item.crag.toLowerCase()
              : type === 'sectors'
              ? '/sectors/' + item.sector_id
              : '/route/' + item._id.toString()
          }
        >
          <a className="h-min absolute bottom-0 right-0 button">see more </a>
        </Link>
      </div>
    </div>
  );
}

export default Card;
