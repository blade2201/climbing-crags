import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import UserPlaceholder from '../public/user.svg';

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Climbing Crags</title>
        <meta name="description" content="Trip advisor for climbing crags" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <header className="bg-dark shadow-16 fixed w-screen top-0 z-50">
        <div className="max-width-7xl lg:px-36 px-4 h-16 py-2 flex items-center justify-between">
          <Link href="/" shallow={true}>
            <a className="gap-x-4 flex items-center">
              <Image src="/logo.svg" alt="logo" width={44} height={44} />
              <p className="text-white-high text-xl">Climbing Crags</p>
            </a>
          </Link>
          <div>
            {session ? (
              <div className="group text-white flex flex-row items-center relative cursor-pointer">
                {session.user.name}
                <div className="w-8 h-8 ml-4 relative rounded-3xl overflow-hidden bg-white p-1">
                  {session.user.image ? (
                    <Image alt="Logged User image" layout="fill" src={session.user.image} />
                  ) : (
                    <UserPlaceholder />
                  )}
                </div>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="group-hover:opacity-100 transition-opacity flex opacity-0 absolute w-full h-full bg-primary-400 items-center justify-center rounded-3xl"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="px-4 py-2 bg-primary-600 text-white-true rounded-3xl hover:bg-primary-400 transition-colors duration-200 font-semibold"
              >
                Log in
              </button>
            )}
          </div>
        </div>
      </header>
      <main className="bg-dark text-white min-h-screen pt-16 overflow-x-hidden">{children}</main>
    </>
  );
}
