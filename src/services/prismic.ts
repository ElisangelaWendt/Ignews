import Prismic from '@prismicio/client'

//const Prismic = require('@prismicio/client');

export function getPrismicClient(req?: unknown) {
  const prismic = Prismic.client(
    process.env.PRISMIC_END_POINT,
    { 
      req: req,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    }
  );
  return prismic;
}