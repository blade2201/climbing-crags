import { useEffect, useState } from 'react';
import Card from './Card';

type ListSectionProps = {
  title: string;
  items: (CragsType & SectorsType)[];
};

function ListSection({ title, items }: ListSectionProps) {
  const [shownItems, setShownItems] = useState(items.slice(0, 9));
  const handleClick = () => {
    setShownItems([
      ...shownItems,
      ...items.slice(shownItems.length, shownItems.length + 6),
    ]);
  };

  useEffect(() => {
    setShownItems(items.slice(0, 9));
  }, [items]);

  useEffect(() => {
    if (shownItems.length > 9) {
      scrollBy({ top: 1000, behavior: 'smooth' });
    }
  }, [shownItems]);

  return (
    <>
      <div className="list-section">
        <h3 className="text-5xl pb-10 pt-16 bold">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
          {shownItems.map((item, i) => {
            return <Card key={i} item={item} type={title.toLowerCase()} />;
          })}
        </div>
        {shownItems.length > 6 && items.length > 9 ? (
          <div
            className={`flex justify-center bg-load-more transition-all duration-200 relative py-24 ${
              shownItems.length >= items.length ? 'mt-10' : '-mt-40'
            }`}
          >
            <button className="button" onClick={handleClick}>
              Load More
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default ListSection;
