import nodemailer from "nodemailer";
import pino from "pino";
import { configService } from "./config.service";
const logger = pino({
  name: "services:mailer"
});

export class MailerService {
  trasporter: nodemailer.Transporter;

  constructor() {
    this.trasporter = nodemailer.createTransport({
      host: configService.services.mailer.host,
      port: Number(configService.services.mailer.port),
      auth: {
        user: configService.services.mailer.auth.user,
        pass: configService.services.mailer.auth.pass
      }
    });
  }

  public async sendMail(to: string, subject: string, text: string, html: string) {
    logger.info(`Sendind email to ${to} subject: ${subject}`);
    return await this.trasporter.sendMail({
      from: configService.services.mailer.sender,
      to,
      subject,
      text,
      html
    });
  }
}
