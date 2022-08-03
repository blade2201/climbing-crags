import Chevron from '../../public/chevron.svg';
import Rating from './Rating';
export default function Comment({ comment, onClick, user }) {
  return (
    <div className="bg-dark-card p-4 md:p-8 rounded-4xl flex items-center shadow-8 gap-x-8 mb-6">
      <div className="gap-y-4 flex flex-col justify-center">
        <Chevron
          onClick={() => onClick(true)}
          className={`cursor-pointer w-4 md:w-8 ${
            comment.votes && comment.votes[user] === 1
              ? 'stroke-primary-300'
              : user
              ? 'stroke-white-true'
              : 'pointer-events-none stroke-white'
          }`}
        />
        <p
          className={`text-center font-semibold text-2xl select-none ${
            comment.votes && comment.votes[user] === 1
              ? 'text-primary-300'
              : comment.votes && comment.votes[user] === -1
              ? 'text-red-500'
              : ''
          }`}
        >
          {comment.comment_rating}
        </p>
        <Chevron
          onClick={() => onClick(false)}
          className={`cursor-pointer  w-4 md:w-8 rotate-180 ${
            comment.votes && comment.votes[user] === -1
              ? 'stroke-red-500'
              : user
              ? 'stroke-white-true'
              : 'pointer-events-none stroke-white'
          }`}
        />
      </div>
      <div className="flex-grow">
        <div className="flex justify-between min-w-full items-start mb-3 ">
          <h3 className="text-2xl font-bold text-white-high">{comment.title}</h3>
          <div>
            {comment.user !== 'default' ? (
              <div className="text-right pr-4">{comment.user}</div>
            ) : (
              <></>
            )}
            <Rating
              notBoxed={true}
              rating={comment.rating}
              className="max-w-[100px] md:max-w-[150px]"
            />
          </div>
        </div>
        <p className="text-white">{comment.comment}</p>
      </div>
    </div>
  );
}
