import Card from './card';

function ListSection({ title, items }) {
  return (
    <>
      <div>
        <h3 className="text-3xl pb-10">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3">
          {items.map((item, i) => {
            return <Card key={i} item={item} />;
          })}
        </div>
      </div>
    </>
  );
}

export default ListSection;
