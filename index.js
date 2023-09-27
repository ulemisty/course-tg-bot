const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
const setupBot = require('./src/bot');
const { saveId } = require('./src/spreadsheet');

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

setupBot(bot);

bot.launch();
