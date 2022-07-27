import Layout from '../components/layout';

export default function Home() {
  return (
    <>
      <div
        className="mt-12 h-[80vh] flex items-center justify-center flex-col clip-image bg-cover"
        style={{ backgroundImage: 'url("/home.jpg")' }}
      >
        <h1 className="text-white-true font-semibold text-9xl">Climbing Crags</h1>
        <form action="submit">
          <input type="text" />
          <button type="submit">send</button>
        </form>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
