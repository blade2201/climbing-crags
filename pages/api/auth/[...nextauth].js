import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../utils/mongodb';
import EmailProvider from 'next-auth/providers/email';
import GoogleProvider from 'next-auth/providers/google';
// import Auth0Provider from 'next-auth/providers/auth0';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    /*     EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }), */
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    /*
    Auth0Provider({
      clientId: process.env.AUTH0_ID,
      clientSecret: process.env.AUTH0_SECRET,
      issuer: process.env.AUTH0_ISSUER,
    }), */
  ],
  secret: process.env.SECRET,
  session: {
    jwt: true,
  },
  theme: {
    colorScheme: 'dark',
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = 'admin';
      return token;
    },
  },
  debug: false,
});
