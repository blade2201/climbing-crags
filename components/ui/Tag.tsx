import Image from 'next/image';

type TagProps = {
  text: string | number;
  star: boolean;
};

function Tag({ text, star }: TagProps) {
  return (
    <div className="px-2 py-1 font-semibold border border-primary-600 rounded-4xl text-sm min-w-[30px] flex justify-center gap-x-1">
      {text}{' '}
      {star && (
        <Image src="/star-small.svg" alt="star svg" width={15} height={14} />
      )}
    </div>
  );
}

export default Tag;
