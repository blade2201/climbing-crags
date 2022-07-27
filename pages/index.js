import Layout from '../components/layout';
import Head from 'next/head';

export default function Home() {
  return <h1 className="text-3xl">Hello World</h1>;
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
