import Rating from './Rating';

export default function InfoCard({ rating, routes, difficulties, classes }) {
  return (
    <div className={'p-8 rounded-4xl bg-dark-card shadow-8 w-max ' + classes}>
      <p className="text-2xl">
        N° Sectors: <span className="font-bold text-primary-400">{routes}</span>
      </p>
      <p className="text-2xl pb-10">
        Grades: <span className="font-bold text-primary-400">{difficulties}</span>
      </p>
      <p className="text-2xl pb-2">People&apos;s rating:</p>
      <Rating rating={rating} />
    </div>
  );
}
