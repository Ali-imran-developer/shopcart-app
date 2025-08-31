import 'dotenv/config';

export default {
  expo: {
    name: "new-shopcart",
    slug: "new-shopcart",
    version: "1.0.0",
    scheme: "shopcart",
    android: {
      package: "com.new.shopcart",
    },
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
      eas: {
        projectId: "a2b46acf-51f1-4921-858a-360f95978e7b",
      },
    },
  },
};
