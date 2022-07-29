import Image from 'next/image';

function Rating({ rating }) {
  return (
    <div className="px-4 py-2 bg-[#474747] rounded-2xl w-max flex items-center gap-x-1 shadow-8">
      <Image
        src={`/star-${rating > 1 ? 'full' : rating > 0.5 ? 'half' : 'empty'}.svg`}
        alt="star svg"
        width={32}
        height={32}
      />
      <Image
        src={`/star-${rating > 2 ? 'full' : rating > 1.5 ? 'half' : 'empty'}.svg`}
        alt="star svg"
        width={32}
        height={32}
      />
      <Image
        src={`/star-${rating > 3 ? 'full' : rating > 2.5 ? 'half' : 'empty'}.svg`}
        alt="star svg"
        width={32}
        height={32}
      />
      <Image
        src={`/star-${rating > 4 ? 'full' : rating > 3.5 ? 'half' : 'empty'}.svg`}
        alt="star svg"
        width={32}
        height={32}
      />
      <Image
        src={`/star-${rating > 5 ? 'full' : rating > 4.5 ? 'half' : 'empty'}.svg`}
        alt="star svg"
        width={32}
        height={32}
      />
    </div>
  );
}

export default Rating;
