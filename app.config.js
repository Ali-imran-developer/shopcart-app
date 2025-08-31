import 'dotenv/config';

export default {
  expo: {
    name: "new-shopcart",
    slug: "new-shopcart",
    version: "1.0.0",
    scheme: "shopcart",
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
};
