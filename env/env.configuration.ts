export const envConfigurations = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodb: { MONGO_URI: process.env.MONGO_URI },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN_MS,
  },

  tokens: {
    access: {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN_MS,
      token_type: process.env.ACCESS_TOKEN_TYPE,
    },
    refresh: {
      token_type: process.env.REFRESH_TOKEN_TYPE,
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN_MS,
    },
  },
  hash: {
    secret: process.env.HASH_SECRET,
  },
});
