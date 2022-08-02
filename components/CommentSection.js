import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Star from '../public/star-empty.svg';
import { useForm } from 'react-hook-form';
import Comment from './ui/Comment';
import Rating from './ui/Rating';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { useSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';

export default function CommentSection({ comments }) {
  const { data: session } = useSession();
  const [parent] = useAutoAnimate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      comment: '',
      title: '',
    },
  });

  const router = useRouter();
  const [rating, setRating] = useState();
  const [commentsState, setComments] = useState(comments);
  const [commentRating, setCommentRating] = useState(0);

  useEffect(() => {
    let averageRating = 0;
    comments.forEach((comment) => {
      averageRating += comment.rating;
    });
    if (comments.length > 0) {
      averageRating = averageRating / comments.length;
    }
    setCommentRating(averageRating);
  }, [comments]);

  function handleClick(value) {
    if (rating === value) {
      setRating(0);
    } else {
      setRating(value);
    }
  }

  async function onSubmit({ comment, title }) {
    const data = { title, comment, rating };
    reset();
    setRating(0);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          path: router.asPath,
          user: session.user.name || 'default',
        }),
      });
      const json = await response.json();
      setComments([...commentsState, { ...data, comment_rating: 0, _id: json.insertedId }]);

      await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: router.asPath }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCommentsClick(id, upvote) {
    let vote;
    let modifyingVote;
    const newComments = commentsState
      .map((comment) => {
        if (comment._id === id) {
          if (comment.votes && session) {
            if (comment.votes[session.user.email] === 1) {
              if (upvote) {
                vote = 0;
                modifyingVote = -1;
              } else {
                vote = -1;
                modifyingVote = -2;
              }
            } else if (comment.votes[session.user.email] === 0) {
              if (upvote) {
                vote = 1;
                modifyingVote = 1;
              } else {
                vote = -1;
                modifyingVote = -1;
              }
            } else if (comment.votes[session.user.email] === -1) {
              if (upvote) {
                vote = 1;
                modifyingVote = 2;
              } else {
                vote = 0;
                modifyingVote = 1;
              }
            }
          } else {
            if (upvote) {
              vote = 1;
              modifyingVote = 1;
            } else {
              vote = -1;
              modifyingVote = -1;
            }
          }
          return {
            ...comment,
            comment_rating: comment.comment_rating + modifyingVote,
            votes: { ...comment.votes, [session.user.email]: vote },
          };
        }
        return comment;
      })
      .sort((a, b) => b.comment_rating - a.comment_rating);
    setComments(newComments);
    try {
      await fetch('/api/comments', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          vote: vote,
          modifyingVote: modifyingVote,
          path: router.asPath,
          email: session.user.email,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="px-4 md:px-36 md:pt-12 pb-32">
      <h2 className="text-5xl pb-10 pt-16 font-bold relative">
        Comments
        <span className="absolute top-0 md:top-16 right-0 flex text-sm font-normal items-center gap-x-4">
          Average comment rating:
          <Rating rating={commentRating} />
        </span>
      </h2>
      <div className="grid md:grid-cols-2 gap-x-6">
        <div className="col-span-1" ref={parent}>
          {commentsState.map((comment) => (
            <Comment
              user={session ? session.user.email : null}
              comment={comment}
              key={comment._id}
              onClick={(upvote) => handleCommentsClick(comment._id, upvote)}
            />
          ))}
        </div>
        <div className="col-span-1 relative group">
          <form
            action="submit"
            className="bg-dark-card shadow-8 rounded-4xl p-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="text-white-high text-4xl font-bold pb-8">How was it ?</h3>
            <input
              {...register('title', { required: 'Please fill in this field' })}
              type="text"
              placeholder="Title..."
              className="w-full"
            />
            <p className="pl-2 text-red-500 mt-2 text-sm">{errors.title?.comment}</p>
            <textarea
              {...register('comment', { required: 'Please fill in this field' })}
              className="md:mt-8 mt-2"
              name="comment"
              placeholder="Comment"
              id=""
              cols="30"
              rows="7"
            />
            <p className="pl-2 text-red-500 mt-1 text-sm">{errors.comment?.comment}</p>
            <p className="text-sm md:text-xl mb-2 mt-8">Rating</p>
            <div className="flex justify-between">
              <div className="origin-left scale-75 md:scale-100 star-container cursor-pointer flex flex-row-reverse bg-[#474747] rounded-2xl px-4 py-2 items-center shadow-8">
                <Star
                  onClick={() => {
                    handleClick(5);
                  }}
                  className={rating > 4 ? 'filled' : ''}
                />
                <Star
                  onClick={() => {
                    handleClick(4);
                  }}
                  className={rating > 3 ? 'filled' : ''}
                />
                <Star
                  onClick={() => {
                    handleClick(3);
                  }}
                  className={rating > 2 ? 'filled' : ''}
                />
                <Star
                  onClick={() => {
                    handleClick(2);
                  }}
                  className={rating > 1 ? 'filled' : ''}
                />
                <Star
                  onClick={() => {
                    handleClick(1);
                  }}
                  className={rating > 0 ? 'filled' : ''}
                />
              </div>
              <button className="button" type="submit">
                SEND
              </button>
            </div>
          </form>
          {!session ? (
            <div className="absolute group-hover:opacity-100 transition-opacity duration-200 opacity-0 top-0 left-0 w-full h-full flex flex-col backdrop-blur-sm items-center justify-center rounded-4xl">
              <h3 className="text-3xl pb-10 text-center">Log in to leave a comment</h3>
              <button className="button" onClick={() => signIn('google')}>
                Log in
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
}
