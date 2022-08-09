import Image from 'next/image';

const generateName = (rating: number, index: number) => {
  if (rating > index - 1) {
    if (index - rating > 0) {
      return '/star-half.svg';
    } else {
      return '/star-full.svg';
    }
  }
  return '/star-empty.svg';
};

function Rating({
  rating,
  notBoxed,
  className,
}: {
  rating: number;
  notBoxed?: boolean;
  className?: string;
}) {
  return (
    <div
      className={
        'md:px-4 md:py-2 p-2 md:rounded-2xl w-max max-h-10 md:max-h-12 flex items-center gap-x-1 ' +
        (notBoxed === true ? '' : 'shadow-8 bg-[#474747] rounded-lg ') +
        className
      }
    >
      <Image
        src={generateName(rating, 1)}
        alt='star svg'
        width={32}
        height={32}
        data-testid='star-1'
        className={generateName(rating, 1)}
      />
      <Image
        src={generateName(rating, 2)}
        alt='star svg'
        width={32}
        height={32}
        data-testid='star-2'
        className={generateName(rating, 2)}
      />
      <Image
        src={generateName(rating, 3)}
        alt='star svg'
        width={32}
        height={32}
        data-testid='star-3'
        className={generateName(rating, 3)}
      />
      <Image
        src={generateName(rating, 4)}
        alt='star svg'
        width={32}
        height={32}
        data-testid='star-4'
        className={generateName(rating, 4)}
      />
      <Image
        src={generateName(rating, 5)}
        alt='star svg'
        width={32}
        height={32}
        data-testid='star-5'
        className={generateName(rating, 5)}
      />
    </div>
  );
}

export default Rating;
