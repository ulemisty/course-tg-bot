const { Scenes, Markup } = require('telegraf');
const { CMD_TEXT } = require('./consts');

const testSelectionScene = new Scenes.BaseScene('testselection');

testSelectionScene.enter(async (ctx) => {
    ctx.reply('Выберете тест', Markup.inlineKeyboard([
        [Markup.button.callback('Биосинтез белка 1', 'test1')],
        [Markup.button.callback('Биосинтез белка 2', 'test2')],
        [Markup.button.callback('Деление клетки 1', 'test3')],
        [Markup.button.callback('Деление клетки 2', 'test1')],
        [Markup.button.callback(CMD_TEXT.menu, 'menu')],
    ]).resize());
});

testSelectionScene.action('test1', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 1;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test2', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 2;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test3', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 3;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test4', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 4;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('menu', (ctx) => {
    ctx.deleteMessage(); 
    ctx.scene.enter('mainMenu');
});

module.exports = { testSelectionScene };