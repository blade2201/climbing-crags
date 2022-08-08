import Image from 'next/image';

type RatingProps = {
  rating: number;
  notBoxed: boolean;
  className: string;
};

// rating = number > 0 < 5, notBoxed = bool, className = (optional)tailwind styling
function Rating({ rating, notBoxed, className }: RatingProps) {
  return (
    <div className={'md:px-4 md:py-2 p-2 md:rounded-2xl w-max max-h-10 md:max-h-12 flex items-center gap-x-1 ' + (notBoxed === true ? '' : 'shadow-8 bg-[#474747] rounded-lg ') + className}>
      <Image src={`/star-${rating >= 1 ? 'full' : rating > 0.5 ? 'half' : 'empty'}.svg`} alt="star svg" width={32} height={32} />
      <Image src={`/star-${rating >= 2 ? 'full' : rating > 1.5 ? 'half' : 'empty'}.svg`} alt="star svg" width={32} height={32} />
      <Image src={`/star-${rating >= 3 ? 'full' : rating > 2.5 ? 'half' : 'empty'}.svg`} alt="star svg" width={32} height={32} />
      <Image src={`/star-${rating >= 4 ? 'full' : rating > 3.5 ? 'half' : 'empty'}.svg`} alt="star svg" width={32} height={32} />
      <Image src={`/star-${rating >= 5 ? 'full' : rating > 4.5 ? 'half' : 'empty'}.svg`} alt="star svg" width={32} height={32} />
    </div>
  );
}

export default Rating;
