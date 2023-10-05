const { Scenes, Markup } = require('telegraf');
const test = require('../tests/test0.json');
const { CMD_TEXT } = require('./consts');
const { default: axios } = require('axios');
const { getStats } = require('./spreadsheet');

const statsScene = new Scenes.BaseScene('stats');

statsScene.enter(async (ctx) => {
    const id = ctx.from.id;
    const stats = await getStats(id);
    console.log(id, stats);

    if (stats) {
        const { correctAnswers, totalAnswers } = stats;
        ctx.reply(`Ваша статистика:\n \n✅ Правильные ответы: ${correctAnswers}\n❌ Ошибки: ${totalAnswers-correctAnswers}`, Markup.inlineKeyboard([
            [Markup.button.callback(CMD_TEXT.menu, 'menu')],
        ]).resize());
    } else {
        ctx.reply("No statistics found.", Markup.inlineKeyboard([
            [Markup.button.callback(CMD_TEXT.menu, 'menu')],
        ]).resize());
    }
});

statsScene.action('menu', (ctx) => {
    ctx.deleteMessage(); 
    ctx.scene.enter('mainMenu');
});

module.exports = { statsScene };