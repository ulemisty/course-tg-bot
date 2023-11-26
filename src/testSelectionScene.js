const { Scenes, Markup } = require('telegraf');
const { CMD_TEXT } = require('./consts');

const testSelectionScene = new Scenes.BaseScene('testselection');

testSelectionScene.enter(async (ctx) => {
    const testKeyboard = Markup.inlineKeyboard([
        [Markup.button.callback('🧫 Деление клетки 1', 'test2'), Markup.button.callback('🧫 Деление клетки 2', 'test1')],
        [Markup.button.callback('🔞 Размножение', 'test3'), Markup.button.callback('🛝 Гаметогенез', 'test8')],
        [Markup.button.callback('✨ Биосинтез белка 1', 'test4'), Markup.button.callback('✨ Биосинтез белка 2', 'test5')],
        [Markup.button.callback('😶‍🌫️ Онтогенез', 'test6'), Markup.button.callback('🦠 Бактерии и вирусы', 'test7')],
        [Markup.button.callback('🧬 Генетика 1', 'test9')],
        [Markup.button.callback('🧬 Генетика 2', 'test10')],
        [Markup.button.callback('🧬 Генетика 3', 'test11')],
        [Markup.button.callback(CMD_TEXT.menu, 'menu')]
    ]).resize();

    ctx.reply('Выберете тест', testKeyboard);
});

testSelectionScene.action('test1', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 1;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test2', (ctx) => {//
    ctx.deleteMessage();
    ctx.reply("Этот тест еще не добавлен")
    ctx.scene.reenter(); 
});

testSelectionScene.action('test3', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 3;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test4', (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Этот тест еще не добавлен")
    ctx.scene.reenter(); 
});

testSelectionScene.action('test5', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 5;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test6', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 6;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test7', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 7;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test8', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 8;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test9', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 9;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test10', (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Этот тест еще не добавлен")
    ctx.scene.reenter(); 
});

testSelectionScene.action('test11', (ctx) => {
    ctx.deleteMessage();
    ctx.reply("Этот тест еще не добавлен")
    ctx.scene.reenter(); 
});



testSelectionScene.action('menu', (ctx) => {
    ctx.deleteMessage(); 
    ctx.scene.enter('mainMenu');
});

module.exports = { testSelectionScene };