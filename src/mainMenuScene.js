const { Markup, Scenes } = require('telegraf');
const { CMD_TEXT } = require('./consts');

const mainMenuScene = new Scenes.BaseScene('mainMenu');

mainMenuScene.enter((ctx) => {
    ctx.reply("Главное меню", Markup.inlineKeyboard([
        [Markup.button.callback(CMD_TEXT.buy, 'buy')],
        [Markup.button.callback(CMD_TEXT.about, 'about'), Markup.button.callback(CMD_TEXT.freetest, 'freetest')],
    ]).resize());
});

mainMenuScene.action('about', (ctx) => {
    ctx.editMessageText("дабдаб", Markup.inlineKeyboard([
        [Markup.button.callback(CMD_TEXT.menu, 'menu')],
    ]).resize())
});

mainMenuScene.action('freetest', (ctx) => {
    ctx.scene.enter('test');
});

mainMenuScene.action('buy', (ctx) => {
    ctx.editMessageText("купитькупитькупитькупить!!!", Markup.inlineKeyboard([
        [Markup.button.callback(CMD_TEXT.menu, 'menu')],
    ]).resize())
});

mainMenuScene.action('menu', (ctx) => {
    ctx.deleteMessage(); 
    ctx.scene.reenter(); 
});

module.exports = {
    mainMenuScene,
    
};