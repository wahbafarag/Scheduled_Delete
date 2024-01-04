export const envConfigurations = () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  mongodb: { MONGO_URI: process.env.MONGO_URI },
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN_MS,
  },

  tokens: {
    access: {
      expiresIn: process.env.JWT_EXPIRES_IN_MS, // temporary
      token_type: process.env.ACCESS_TOKEN_TYPE,
      secret: process.env.ACCESS_TOKEN_SECRET,
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

  mail: {
    from: process.env.SENDGRID_FROM,
    sendGrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      W_tempID: process.env.SENDGRID_WELCOME_TEMPLATE_ID,
      A_tempID: process.env.ACCOUNT_DELETED_TEMPLATE_ID,
    },
    nodeMailer: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 465,
      secure: Boolean(process.env.SECURE) || true,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_AUTH_USER,
        pass: process.env.SMTP_AUTH_PASS,
      },
    },
  },
});
