import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Climbing Crags</title>
        <meta name="description" content="Trip advisor for climbing crags" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <header className="bg-dark shadow-16 fixed w-screen top-0 z-50">
        <div className="max-width-7xl lg:px-36 px-4 h-16 py-2 flex items-center">
          <Link href="/">
            <a className="gap-x-4 flex items-center">
              <Image src="/logo.svg" alt="logo" width={44} height={44} />
              <p className="text-white-high text-xl">Climbing Crags</p>
            </a>
          </Link>
        </div>
      </header>
      <main className="bg-dark text-white min-h-screen pt-16 overflow-x-hidden">{children}</main>
    </>
  );
}
