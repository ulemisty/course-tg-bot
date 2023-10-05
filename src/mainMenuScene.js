const { Markup, Scenes } = require('telegraf');
const { CMD_TEXT } = require('./consts');
const { checkId } = require('./spreadsheet')

const mainMenuScene = new Scenes.BaseScene('mainMenu');

mainMenuScene.enter((ctx) => {
    console.log(checkId(ctx.from.id));
    if (checkId(ctx.from.id) == true) {
        ctx.reply("Главное меню", Markup.inlineKeyboard([
            [Markup.button.callback("📊 Статистика", 'stats'), Markup.button.callback("❌ Ошибки", 'mistakes')],
            [Markup.button.callback("📃 Тесты", 'tests')],
        ]).resize());
    }else{
        ctx.reply("Главное меню", Markup.inlineKeyboard([
            [Markup.button.callback(CMD_TEXT.buy, 'buy')],
            [Markup.button.callback(CMD_TEXT.about, 'about'), Markup.button.callback(CMD_TEXT.freetest, 'freetest')],
        ]).resize());
    } 
    
});

mainMenuScene.action('stats', (ctx) => {
    ctx.scene.enter('stats');
});

mainMenuScene.action('mistakes', (ctx) => {
    ctx.scene.enter('mistakes');
});

mainMenuScene.action('tests', (ctx) => {
    ctx.scene.enter('tests');
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