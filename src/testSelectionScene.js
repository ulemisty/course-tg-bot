const { Scenes, Markup } = require('telegraf');
const { CMD_TEXT } = require('./consts');

const testSelectionScene = new Scenes.BaseScene('testselection');

testSelectionScene.enter(async (ctx) => {
    const testKeyboard = Markup.inlineKeyboard([
        [ Markup.button.callback('🧫 Деление клетки 2', 'test1')],
        [Markup.button.callback('🔞 Размножение', 'test3'), Markup.button.callback('🛝 Гаметогенез', 'test8')],
        [Markup.button.callback('✨ Биосинтез белка 2', 'test5')],
        [Markup.button.callback('😶‍🌫️ Онтогенез', 'test6'), Markup.button.callback('🦠 Бактерии и вирусы', 'test7')],
        [Markup.button.callback('🧬 Генетика 1', 'test9')],
        [Markup.button.callback('🧬 Зад генетика 2', 'test22')],
        [Markup.button.callback('🫄 Генетика 1-3 (повторение)', 'test24')],
        [Markup.button.callback('🧑‍🦽 Генетика 5', 'test20')],
        [Markup.button.callback('🧑‍🦽 Генетика 4', 'test12')],
        [Markup.button.callback('🧑‍🦽 Генетика 5', 'test20')],
        [Markup.button.callback('🧑‍🦽 Генетика 6', 'test21')],
        [Markup.button.callback('🥸 Селекция и биотехнология', 'test30')],
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

testSelectionScene.action('test24', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 24;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test22', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 22;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test3', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 3;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
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

testSelectionScene.action('test11', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 11;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test12', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 12;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test20', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 20;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test21', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 21;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('test30', (ctx) => {
    ctx.deleteMessage();
    ctx.session.cur_test = 30;
    ctx.scene.enter('testsloving');
    ctx.session.current_task = -1;
});

testSelectionScene.action('menu', (ctx) => {
    ctx.deleteMessage(); 
    ctx.scene.enter('mainMenu');
});

module.exports = { testSelectionScene };