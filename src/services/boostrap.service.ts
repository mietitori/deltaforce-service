import pino from "pino";
import { usersDao } from "../dao/users.dao";
import { cryptUtils } from "../utils/crypto";
import { configService } from "./config.service";
const logger = pino({
  name: "service:bootstrap"
});

const init = async () => {
  logger.info("Starting boostrap");
  const users = await usersDao.list();
  if (users.length === 0) {
    const adminEmail = configService.services.bootstrap.admin.email;
    const adminUser = configService.services.bootstrap.admin.username;
    const password = cryptUtils.generatedPassword();
    logger.info(`Adding default user: ${adminUser} with email: ${adminEmail} and password: ${password}`);
    await usersDao.addUser({
      email: adminEmail,
      isActive: true,
      level: "ADMIN",
      passwd: password
    });
  }
};

export const bootstrapService = {
  init
};
