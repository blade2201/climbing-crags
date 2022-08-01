import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { calcRoutesAndDifficulty } from '../utils/infoCalc';
import Tag from './ui/Tag';
function Card({ item, type }) {
  const [routesCount, setRoutesCount] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (item) {
      let { routes, rating, difficulties } = calcRoutesAndDifficulty(item, type);
      switch (type) {
        case 'crags':
          setRoutesCount(routes);
          setRating(rating);
          setDifficulty(difficulties);
          break;
        case 'sectors':
          setRoutesCount(routes);
          setRating(rating);
          setDifficulty(difficulties);
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
          src={item.images && item.images.length ? item.images[0][0] : '/home.jpg'}
          alt="card-image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative">
        <div className="pt-4 flex gap-x-2.5">
          {difficulty ? <Tag text={difficulty} /> : null}
          {routesCount ? (
            <Tag text={routesCount + (type === 'crags' ? ' sectors' : ' routes')} />
          ) : null}
          {true ? <Tag text={rating || parseInt(item.rating).toFixed(1)} star={true} /> : null}
        </div>
        <h4 className="pt-4 font-bold text-2xl text-white-high max-w-[60%] capitalize">
          {type === 'crags' ? item.crag : type === 'sectors' ? item.sector : item.name}
        </h4>
        <h5>
          {type === 'crags' ? item.country : type === 'sectors' ? item.crag + ', ' : item.sector}
          {(type === 'sectors' || type === 'routes') && <br />}
          {type === 'sectors' ? item.country : type === 'routes' ? item.crag : ''}
          <br />
        </h5>

        <Link
          href={
            type === 'crags'
              ? '/crag/' + item.crag.toLowerCase()
              : type === 'sectors'
              ? '/sector/' + item.sector_id
              : '/route/' + item.id
          }
        >
          <a className="h-min absolute bottom-0 right-0 button">see more</a>
        </Link>
      </div>
    </div>
  );
}

export default Card;
//
