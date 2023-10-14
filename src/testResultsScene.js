const { Scenes, Markup } = require('telegraf');
const { CMD_TEXT } = require('./consts');

const testResultsScene = new Scenes.BaseScene('result');

testResultsScene.enter(async (ctx) => {
    const currentTestNum = ctx.session.cur_test; 
    const testPath = `../tests/t${currentTestNum}.json`; 
    test = require(testPath); 
    ctx.reply(`Результат:\n \n✅ Правильные ответы: ${ctx.session.testCorrects}/${test.length}`, Markup.inlineKeyboard([
        [Markup.button.callback(CMD_TEXT.menu, 'menu')],
    ]).resize());
});

testResultsScene.action('menu', (ctx) => {
    ctx.deleteMessage(); 
    ctx.scene.enter('mainMenu');
});

module.exports = { testResultsScene };