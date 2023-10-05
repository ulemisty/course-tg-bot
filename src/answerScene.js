const { Scenes, Markup } = require('telegraf');
const { testScene } = require('./testScene');

const answerScene = new Scenes.BaseScene('answer');

answerScene.enter(async (ctx) => {
    ctx.reply("Введите ваш ответ:");
});

answerScene.hears(/.+/, async (ctx) => {
    ctx.session.curUserAnswer = ctx.message.text;
    
});



module.exports = { answerScene }; 