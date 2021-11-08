import { Telegraf } from "telegraf";
import { configService } from "./config.service";
export class TelegramBotService {
  telegramBot: Telegraf;
  constructor() {
    this.telegramBot = new Telegraf(configService.services.telegram.token);
    //    this.telegramBot.start();
  }
}
