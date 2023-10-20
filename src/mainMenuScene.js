const { Markup, Scenes } = require('telegraf');
const { CMD_TEXT } = require('./consts');
const { checkId, checkUsername, initByUsername } = require('./spreadsheet')

const mainMenuScene = new Scenes.BaseScene('mainMenu');

mainMenuScene.enter(async(ctx) => {
    
    ctx.session.is_payed = await checkId(ctx.from.id);

    if((ctx.session.is_payed) == false){
        ctx.session.is_payed = await checkUsername(ctx.from.username);
        if(ctx.session.is_payed){
            initByUsername(ctx.from.username, ctx.from.id)
        }
    }
    
    if ( ctx.session.is_payed) {
        ctx.reply(`Добро пожаловать, ${ctx.from.first_name}\n\n🏠 Главное меню 🏠`, Markup.inlineKeyboard([
            [Markup.button.callback("📊 Статистика", 'stats'), Markup.button.callback("❌ Ошибки", 'mistakes')],
            [Markup.button.callback("📃 Тесты", 'testselection')],
        ]).resize());
    }else{
        ctx.reply(`Добро пожаловать, ${ctx.from.first_name}\n\n🏠 Главное меню 🏠`, Markup.inlineKeyboard([
            [Markup.button.callback(CMD_TEXT.buy, 'buy')],
            [Markup.button.callback(CMD_TEXT.about, 'about'), Markup.button.callback(CMD_TEXT.freetest, 'freetest')],
        ]).resize());
    } 
    
});

mainMenuScene.action('stats', (ctx) => {
    ctx.scene.enter('stats');
});

mainMenuScene.action('mistakes', (ctx) => {
    ctx.reply("ошибки пока недоступны(")
    ctx.scene.reenter(); 
});

mainMenuScene.action('testselection', (ctx) => {
    ctx.scene.enter('testselection');
});

mainMenuScene.action('about', (ctx) => {
    ctx.editMessageText("Подробнее о курсе можно узнать в @sliv_noo", Markup.inlineKeyboard([
        [Markup.button.callback(CMD_TEXT.menu, 'menu')],
    ]).resize())
});

mainMenuScene.action('freetest', (ctx) => {
    ctx.session.cur_test = 0;
    ctx.session.current_task = -1;
    ctx.scene.enter('testsloving');
    
});

mainMenuScene.action('buy', (ctx) => {
    ctx.editMessageText("Чтобы купить курс нанишите @Nooooooo5o", Markup.inlineKeyboard([
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