import Chevron from '../../public/chevron.svg';
import Rating from './Rating';
export default function Comment({ comment }) {
  return (
    <div className="bg-dark-card p-8 rounded-4xl flex items-center shadow-8 gap-x-8 mb-6">
      <div className="gap-y-4 flex flex-col justify-center">
        <Chevron className="cursor-pointer" />
        <p className="text-center font-semibold text-2xl">{comment.comment_rating}</p>
        <Chevron className="rotate-180 cursor-pointer" />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between min-w-full items-center mb-3">
          <h3 className="text-2xl font-bold text-white-high ">{comment.title}</h3>
          <Rating notBoxed={true} rating={comment.rating} className="max-w-[150px]" />
        </div>
        <p className="text-white">{comment.comment}</p>
      </div>
    </div>
  );
}
