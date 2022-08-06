import Image from 'next/image';

function Rating({
  rating,
  notBoxed,
  className,
}: {
  rating: string;
  notBoxed?: boolean;
  className?: string;
}) {
  const ratingInt = parseInt(rating);
  return (
    <div
      className={
        'md:px-4 md:py-2 p-2 md:rounded-2xl w-max max-h-10 md:max-h-12 flex items-center gap-x-1 ' +
        (notBoxed === true ? '' : 'shadow-8 bg-[#474747] rounded-lg ') +
        className
      }
    >
      <Image
        src={`/star-${
          ratingInt >= 1 ? 'full' : ratingInt > 0.5 ? 'half' : 'empty'
        }.svg`}
        alt='star svg'
        width={32}
        height={32}
      />
      <Image
        src={`/star-${
          ratingInt >= 2 ? 'full' : ratingInt > 1.5 ? 'half' : 'empty'
        }.svg`}
        alt='star svg'
        width={32}
        height={32}
      />
      <Image
        src={`/star-${
          ratingInt >= 3 ? 'full' : ratingInt > 2.5 ? 'half' : 'empty'
        }.svg`}
        alt='star svg'
        width={32}
        height={32}
      />
      <Image
        src={`/star-${
          ratingInt >= 4 ? 'full' : ratingInt > 3.5 ? 'half' : 'empty'
        }.svg`}
        alt='star svg'
        width={32}
        height={32}
      />
      <Image
        src={`/star-${
          ratingInt >= 5 ? 'full' : ratingInt > 4.5 ? 'half' : 'empty'
        }.svg`}
        alt='star svg'
        width={32}
        height={32}
      />
    </div>
  );
}

export default Rating;
