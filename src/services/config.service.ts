export const configService = {
  services: {
    mailer: {
      host: process.env.MAILER_HOST,
      port: process.env.MAILER_PORT,
      auth: {
        user: process.env.MAILER_USERNAME,
        pass: process.env.MAILER_PASSWORD
      },
      sender: process.env.MAILER_SENDER
    },
    telegram: {
      token: process.env.TELEGRAM_TOKEN
    },
    bootstrap: {
      admin: {
        email: process.env.ADMIN_EMAIL,
        username: process.env.ADMIN_USERNAME
      }
    }
  }
};
