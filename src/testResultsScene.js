const { Scenes, Markup } = require('telegraf');
const test = require('../tests/test0.json');
const { CMD_TEXT } = require('./consts');
const { default: axios } = require('axios');
const { getStats } = require('./spreadsheet');

const testResultsScene = new Scenes.BaseScene('result');

testResultsScene.enter(async (ctx) => {
    ctx.reply(`Результат:\n \n✅ Правильные ответы: ${ctx.session.testCorrects}/${10}`, Markup.inlineKeyboard([
        [Markup.button.callback(CMD_TEXT.menu, 'menu')],
    ]).resize());
});

testResultsScene.action('menu', (ctx) => {
    ctx.deleteMessage(); 
    ctx.scene.enter('mainMenu');
});

module.exports = { testResultsScene };