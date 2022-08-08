declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      SECRET: string;
      GOOGLE_ID: string;
      GOOGLE_SECRET: string;
      NEXT_PUBLIC_CLOUDINARY_ID: string;
    }
  }
}
