import Rating from './Rating';

export default function InfoCard({ rating, routes, difficulties, classes, type }) {
  return (
    <div className={'md:p-8 p-4 rounded-2xl md:rounded-4xl bg-dark-card shadow-8 w-max ' + classes}>
      <p className="md:text-2xl">
        N° {type === 'crag' ? 'Sectors' : 'Routes'}:{' '}
        <span className="font-bold text-primary-400">{routes}</span>
      </p>
      <p className="md:text-2xl md:pb-10 pb-6">
        Grades: <span className="font-bold text-primary-400">{difficulties}</span>
      </p>
      <p className="md:text-2xl pb-2">People&apos;s rating:</p>
      <Rating rating={rating} />
    </div>
  );
}
